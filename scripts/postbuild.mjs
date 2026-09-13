/**
 * Runs after `next build` (npm "postbuild"). Checks that the static export in `out/`
 * is complete and contains nothing that needs a server, and copies public/.htaccess
 * into out/ in case Next skipped the dotfile.
 */
import { copyFileSync, existsSync, readdirSync, renameSync, rmSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";

const OUT = "out";
const REQUIRED = [
  "index.html",
  "404.html",
  ".htaccess",
  "sendMail.php",
  "sitemap.xml",
  "robots.txt",
  "llms.txt",
  "og/de.png",
  "og/en.png",
  "images/hero-section/hero-bg.webp",
  ...["de", "en"].flatMap((l) => [
    `${l}/index.html`,
    `${l}/imprint/index.html`,
    `${l}/data-save/index.html`,
    `${l}/projects/join/index.html`,
    `${l}/projects/el-pollo-loco/index.html`,
    `${l}/projects/simplify/index.html`,
    `${l}/projects/school-infos/index.html`,
  ]),
];
const FORBIDDEN_DIRS = ["api", "proxy", "server"];

if (!existsSync(OUT)) fail(`"${OUT}/" does not exist. Is output: "export" set in next.config.ts?`);

if (!existsSync(join(OUT, ".htaccess"))) {
  copyFileSync(join("public", ".htaccess"), join(OUT, ".htaccess"));
  console.log("postbuild: copied public/.htaccess -> out/.htaccess");
}

const flattened = flattenSegmentDirs(OUT);
if (flattened) console.log(`postbuild: flattened ${flattened} client prefetch files (Windows export quirk).`);

const missing = REQUIRED.filter((f) => !existsSync(join(OUT, f)));
if (missing.length) fail(`missing in ${OUT}/:\n  ${missing.join("\n  ")}`);

for (const dir of FORBIDDEN_DIRS) {
  if (existsSync(join(OUT, dir))) fail(`"${OUT}/${dir}" exists: a server-only route slipped into the export.`);
}

// Files without extension cannot get a content type from Apache (except .htaccess).
const noExt = [];
walk(OUT, (file) => {
  const name = file.split(/[\\/]/).pop();
  if (name !== ".htaccess" && extname(name) === "") noExt.push(file);
});
if (noExt.length) fail(`files without extension:\n  ${noExt.join("\n  ")}`);

console.log(`postbuild: ${OUT}/ complete (${REQUIRED.length} required files present, ${countFiles(OUT)} files total).`);

/**
 * Next 16 on Windows writes the client router's segment prefetch files into nested
 * folders (out/de/__next.$d$locale/imprint/__PAGE__.txt): the export joins segment
 * paths with backslashes but only converts forward slashes to dots. The browser
 * requests the dotted name (__next.$d$locale.imprint.__PAGE__.txt), which is also
 * what a Linux build produces. Rename the files accordingly and drop the folders.
 */
function flattenSegmentDirs(dir) {
  let count = 0;
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (!statSync(p).isDirectory()) continue;
    if (entry.startsWith("__next.")) {
      const files = [];
      walk(p, (file) => files.push(file));
      for (const file of files) {
        const dotted = relative(p, file).split(/[\\/]/).join(".");
        renameSync(file, join(dir, `${entry}.${dotted}`));
        count++;
      }
      rmSync(p, { recursive: true, force: true });
    } else {
      count += flattenSegmentDirs(p);
    }
  }
  return count;
}

function walk(dir, visit) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, visit);
    else visit(p);
  }
}

function countFiles(dir) {
  let n = 0;
  walk(dir, () => n++);
  return n;
}

function fail(message) {
  console.error(`postbuild FAILED: ${message}`);
  process.exit(1);
}
