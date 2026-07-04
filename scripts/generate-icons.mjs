// One-off tool: generates public/favicon.svg and public/icons/*.png from a
// single hand-authored SVG design.
//
// The icon depicts a stylized speech bubble — evoking "Tak" (speak) — with
// a small accent dot, rather than sarnami-bol-naa's "ā" macron glyph, since
// Sranan Tongo's plain Latin orthography has no diacritics to reference
// (see settings/sranantongo/language-settings.json's romanization notes).
// Colors intentionally reuse the same Suriname-flag-derived palette as
// sarnami-bol-naa/rarelang-server's default theme — both languages are
// spoken in Suriname, and the rarelang platform's other content repo
// already established this palette as the shared visual baseline; only the
// glyph differs per language. Built entirely from primitive shapes (no font
// dependency), so it renders identically everywhere.
//
// Usage: node scripts/generate-icons.mjs
// Requires the "sharp" devDependency (kept in package.json for future
// regeneration if the design ever needs to change).
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const COLORS = {
  forest: "#377E3F",
  cream: "#fdf6ec",
  gold: "#ECC81D",
  flame: "#B40A2D",
};

/**
 * Builds a speech-bubble glyph (rounded rect body + a small tail triangle)
 * with a gold accent dot inside, as a group of primitives, centered on
 * (256, 256) in a 512-unit design grid, then scaled/translated by `scale`
 * around the center. scale=1 gives a bold, full-bleed treatment (used for
 * icon-192 / icon-512 / favicon); a smaller scale keeps everything inside
 * the ~80% maskable safe-zone circle.
 */
function glyphGroup(scale) {
  return `
    <g transform="translate(256 256) scale(${scale}) translate(-256 -256)">
      <!-- speech bubble body -->
      <rect x="146" y="166" width="220" height="160" rx="56" fill="${COLORS.cream}" />
      <!-- tail, pointing down-left from the bubble's bottom edge -->
      <path d="M 210 320 L 176 372 L 246 322 Z" fill="${COLORS.cream}" />
      <!-- accent dot, evoking a spoken syllable -->
      <circle cx="256" cy="246" r="26" fill="${COLORS.gold}" />
    </g>
  `;
}

function iconSvg({ size, scale, rounded }) {
  const r = rounded ? size * 0.22 : 0;
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
      <rect x="0" y="0" width="512" height="512" rx="${rounded ? 512 * 0.22 : 0}" fill="${COLORS.forest}" />
      ${glyphGroup(scale)}
    </svg>
  `;
}

async function main() {
  // favicon.svg: same design, full-bleed square, no forced rounding (browsers
  // handle the tab-icon shape themselves).
  const faviconSvg = iconSvg({ size: 64, scale: 1, rounded: false }).trim();
  writeFileSync(resolve(root, "public/favicon.svg"), faviconSvg + "\n");

  // icon-192 / icon-512 ("any" purpose): full-bleed square background, bold glyph.
  const icon192 = iconSvg({ size: 192, scale: 1, rounded: false });
  const icon512 = iconSvg({ size: 512, scale: 1, rounded: false });

  // icon-maskable-512: background must fill the entire canvas edge-to-edge,
  // but the glyph is scaled down (~0.85x) so its farthest point (the tail
  // tip) stays comfortably inside the 80% safe zone circle (radius 204.8 of
  // a 512 canvas) after OS masks crop the art.
  const iconMaskable512 = iconSvg({ size: 512, scale: 0.85, rounded: false });

  const targets = [
    ["public/icons/icon-192.png", icon192, 192],
    ["public/icons/icon-512.png", icon512, 512],
    ["public/icons/icon-maskable-512.png", iconMaskable512, 512],
  ];

  for (const [relPath, svg, size] of targets) {
    const outPath = resolve(root, relPath);
    await sharp(Buffer.from(svg)).resize(size, size).png().toFile(outPath);
    console.log(`wrote ${relPath}`);
  }
  console.log(`wrote public/favicon.svg`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
