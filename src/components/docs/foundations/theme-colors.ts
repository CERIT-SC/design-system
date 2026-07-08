import { readFileSync, readdirSync } from "fs";
import { join } from "path";

export interface BrandColor {
  name: string;
  cssVar: string;
  hex: string;
}

export interface Theme {
  key: string;
  label: string;
  colors: BrandColor[];
}

const LIB_PUBLIC_DIR = join(process.cwd(), "lib_public");

const BRAND_TOKENS: { name: string; cssVar: string }[] = [
  { name: "Primary", cssVar: "--primary" },
  { name: "Secondary", cssVar: "--secondary" },
  { name: "Tertiary", cssVar: "--tertiary" },
];

function readToken(css: string, cssVar: string): string | null {
  const match = new RegExp(`[\\s;{]${cssVar}:\\s*(#[0-9a-fA-F]{3,8})`).exec(
    css
  );
  return match ? match[1].toLowerCase() : null;
}

/** Derive a display name from a theme key, honouring an optional override. */
function deriveLabel(key: string, css: string): string {
  // Optional explicit override: `/* @theme Display Name */`
  const override = /\/\*\s*@theme\s+(.+?)\s*\*\//.exec(css);
  if (override) return override[1];

  if (key === "default") return "e-INFRA CZ";

  return key.length <= 4
    ? key.toUpperCase()
    : key.charAt(0).toUpperCase() + key.slice(1);
}

export function getThemes(): Theme[] {
  let files: string[];
  try {
    files = readdirSync(LIB_PUBLIC_DIR).filter((f) => f.endsWith("setup.css"));
  } catch {
    return [];
  }

  const themes: Theme[] = [];

  for (const file of files) {
    const css = readFileSync(join(LIB_PUBLIC_DIR, file), "utf-8");

    const colors: BrandColor[] = [];
    for (const token of BRAND_TOKENS) {
      const hex = readToken(css, token.cssVar);
      if (hex) colors.push({ ...token, hex });
    }

    if (colors.length === 0) continue;

    const key = file.replace(/_?setup\.css$/, "") || "default";
    themes.push({ key, label: deriveLabel(key, css), colors });
  }

  return themes.sort((a, b) => {
    if (a.key === "default") return -1;
    if (b.key === "default") return 1;
    return a.label.localeCompare(b.label);
  });
}
