import { readdir, readFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import * as pagefind from "pagefind";

const BUILD_DIR = join(process.cwd(), ".next", "server", "app");
const OUTPUT_PATH = "public/pagefind";

/** Recursively collect every .html file under a directory. */
async function collectHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectHtmlFiles(full)));
    } else if (entry.name.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

/** `.next/server/app/docs/.../button.html` -> `/docs/.../button` */
function toPublicUrl(filePath) {
  const rel = relative(BUILD_DIR, filePath).split(sep).join("/");
  const withoutExt = rel.slice(0, -".html".length);
  return withoutExt === "index" ? "/" : `/${withoutExt}`;
}

function fail(message) {
  console.error(`build-search-index: ${message}`);
  process.exit(1);
}

let htmlFiles;
try {
  htmlFiles = await collectHtmlFiles(BUILD_DIR);
} catch {
  fail(`no prerendered HTML at ${BUILD_DIR} — run \`next build\` first`);
}

const { index, errors: createErrors } = await pagefind.createIndex({
  forceLanguage: "en",
});
if (createErrors.length || !index) fail(createErrors.join("\n"));

let indexed = 0;
for (const file of htmlFiles) {
  const content = await readFile(file, "utf-8");
  // Pagefind's service indexes whatever it is handed; the CLI's "skip pages
  // without a body" rule is ours to enforce here.
  if (!content.includes("data-pagefind-body")) continue;

  const { errors } = await index.addHTMLFile({
    url: toPublicUrl(file),
    content,
  });
  if (errors.length) fail(`${file}: ${errors.join("\n")}`);
  indexed += 1;
}

if (!indexed) {
  fail(
    `indexed 0 of ${htmlFiles.length} pages — is \`data-pagefind-body\` still on the docs <article>?`
  );
}

const { errors: writeErrors } = await index.writeFiles({
  outputPath: OUTPUT_PATH,
});
if (writeErrors.length) fail(writeErrors.join("\n"));

await pagefind.close();

console.log(
  `build-search-index: indexed ${indexed} of ${htmlFiles.length} pages -> ${OUTPUT_PATH}`
);
