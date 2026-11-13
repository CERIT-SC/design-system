// Checks that the component inventory in the AI agents manual matches the
// library's actual exports, so the skill users copy into their AI assistants
// never lists components that don't exist or misses ones that do.
//
// Usage: node scripts/check-ai-manual.mjs

import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const ROOT = process.cwd();
const ENTRY = join(ROOT, "lib", "index.ts");
const MANUAL = join(ROOT, "docs", "getting-started", "AI-agents-manual.mdx");
const PACKAGE_JSON = join(ROOT, "package.json");

function fail(message) {
  console.error(`check-ai-manual: ${message}`);
  process.exit(1);
}

function resolveModule(fromFile, specifier) {
  const base = resolve(dirname(fromFile), specifier);
  for (const candidate of [
    `${base}.ts`,
    `${base}.tsx`,
    join(base, "index.ts"),
    join(base, "index.tsx"),
  ]) {
    if (existsSync(candidate)) return candidate;
  }
  fail(`cannot resolve "${specifier}" from ${fromFile}`);
}

/** Parse the names inside `{ a, b as c, type T }`, skipping type-only names. */
function parseNameList(list) {
  return list
    .split(",")
    .map((part) => part.trim())
    .filter((part) => part && !part.startsWith("type "))
    .map((part) => part.split(/\s+as\s+/).pop().trim());
}

/** Collect every runtime (non-type) export reachable from `file`. */
function collectExports(file, seen = new Set()) {
  const names = new Set();
  if (seen.has(file)) return names;
  seen.add(file);

  const source = readFileSync(file, "utf-8")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "");

  // export * from "./x"
  for (const [, spec] of source.matchAll(/export\s+\*\s+from\s+["']([^"']+)["']/g)) {
    for (const name of collectExports(resolveModule(file, spec), seen)) {
      names.add(name);
    }
  }

  // export { a, b } [from "./x"]  — but not `export type { ... }`
  for (const [, list] of source.matchAll(
    /export\s+\{([^}]*)\}(?:\s*from\s*["'][^"']+["'])?/g
  )) {
    for (const name of parseNameList(list)) names.add(name);
  }

  // export function X / export const X / export class X
  for (const [, name] of source.matchAll(
    /export\s+(?:default\s+)?(?:async\s+)?(?:function|const|let|class)\s+([A-Za-z0-9_$]+)/g
  )) {
    names.add(name);
  }

  return names;
}

/** Names listed in the manual's inventory: lines like `- **module** — A, B, C`. */
function collectInventory(manual) {
  const skillStart = manual.indexOf("## The skill");
  if (skillStart === -1) fail('manual has no "## The skill" section');
  const skill = manual.slice(skillStart);

  const invStart = skill.indexOf("### Component inventory");
  if (invStart === -1) fail('skill has no "### Component inventory" section');
  const afterHeading = skill.indexOf("\n", invStart);
  const invEnd = skill.indexOf("\n### ", afterHeading);
  const inventory = skill.slice(afterHeading, invEnd === -1 ? undefined : invEnd);

  const names = new Set();
  for (const [, list] of inventory.matchAll(/^- \*\*[\w-]+\*\* — (.+)$/gm)) {
    for (const name of list.split(",").map((n) => n.trim()).filter(Boolean)) {
      names.add(name);
    }
  }
  if (names.size === 0) fail("no inventory entries found in the manual");
  return names;
}

const exported = collectExports(ENTRY);
const manual = readFileSync(MANUAL, "utf-8");
const listed = collectInventory(manual);

const missing = [...exported].filter((n) => !listed.has(n)).sort();
const unknown = [...listed].filter((n) => !exported.has(n)).sort();

const { version } = JSON.parse(readFileSync(PACKAGE_JSON, "utf-8"));
const verified = manual.match(/Last verified against `@e-infra\/design-system` \*\*v([^*]+)\*\*/);
if (!verified) {
  console.warn('check-ai-manual: warning — no "Last verified against" line in the manual');
} else if (verified[1] !== version) {
  console.warn(
    `check-ai-manual: warning — manual was last verified against v${verified[1]}, package is v${version}. Review the manual and bump the version line.`
  );
}

if (missing.length || unknown.length) {
  if (missing.length) {
    console.error(
      `Exported but missing from the AI agents manual inventory:\n  ${missing.join("\n  ")}`
    );
  }
  if (unknown.length) {
    console.error(
      `Listed in the AI agents manual inventory but not exported:\n  ${unknown.join("\n  ")}`
    );
  }
  fail(`inventory is out of date — update ${MANUAL.replace(`${ROOT}/`, "")}`);
}

console.log(`check-ai-manual: inventory matches all ${exported.size} exports`);
