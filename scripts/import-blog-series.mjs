#!/usr/bin/env node
/**
 * import-blog-series.mjs
 * ------------------------------------------------------------------
 * Import pages from a FULLY-FLEDGED ASTRO SITE into this site's blog
 * as a new "series" (multi-page guide).
 *
 * Only for Astro sites. It pulls in the pages (`.mdx` AND `.astro`) plus
 * every component they depend on — React islands, helper `.astro` callouts,
 * vendored component libraries, and any `src/lib/` + `src/data/` support
 * code — so the pages keep working as-is.
 *
 * Reproduces, mechanically, the process used to port `iso-tactics-guide`,
 * `neon-native`, and `blender-masterclass` into src/pages/blog/.
 *
 * Usage:
 *   node scripts/import-blog-series.mjs \
 *     --src ~/Programming/my-astro-site \
 *     --series my-series \
 *     [--exclude cheatsheet,glossary] \
 *     [--skip-components] [--skip-lib] [--dry-run]
 *
 * What it does:
 *   1. Copies src/pages/*.{mdx,md,astro}      -> src/pages/blog/<series>/
 *      (skips index.* and anything in --exclude)
 *   2. Copies src/components/** (whole tree)   -> src/components/blog/<series>/
 *      (React demos, helper .astro callouts, vendored libs, subdirs — all)
 *   3. Copies src/lib/** (if present)          -> src/components/blog/<series>/lib/
 *   4. Copies src/data/** (if present)         -> src/components/blog/<series>/data/
 *   5. Rewrites page imports:
 *        ../layouts/NAME.astro                 -> ../../../layouts/BlogPost.astro
 *        ../components/...                     -> ../../../components/blog/<series>/...
 *        ../lib/...                            -> ../../../components/blog/<series>/lib/...
 *        ../data/...                           -> ../../../components/blog/<series>/data/...
 *   6. Rewrites component/lib/data imports (depth-aware, no collisions):
 *        root files:     ../lib/ -> ./lib/,   ../components/ -> ./,   ../data/ -> ./data/
 *        subdir files:   ../../lib/ -> ../lib/,  ../../components/ -> ../,  ../../data/ -> ../data/
 *   7. Adds series="<series>" to <Layout title=... slug=...> (idempotent).
 *
 * Manual steps after running (NOT automated — see docs/blog-import.md):
 *   - Add a SERIES entry in src/data/blog.ts.
 *   - Add a POSTS entry per page (copy title/blurb/tag from the source
 *     site's nav.ts / data file).
 *   - Install any new npm deps the source site uses (e.g. three, @react-three/*).
 *   - Verify: `npx astro build` must pass.
 */

import { existsSync, readdirSync, copyFileSync, mkdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, basename, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
function flag(name) {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && (i + 1 < args.length ? args[i + 1] : '');
}
function hasFlag(name) {
  return args.includes(`--${name}`);
}

const src = flag('src');
const series = flag('series');
const exclude = new Set((flag('exclude') || '').split(',').map((s) => s.trim()).filter(Boolean));
const skipComponents = hasFlag('skip-components');
const skipLib = hasFlag('skip-lib');
const dryRun = hasFlag('dry-run');

if (!src || !series) {
  console.error('Missing required flags. Usage:');
  console.error('  node scripts/import-blog-series.mjs --src <site> --series <id> [--exclude a,b] [--skip-components] [--skip-lib] [--dry-run]');
  process.exit(1);
}

const REPO = fileURLToPath(new URL('..', import.meta.url)); // project root
const srcRoot = join(src, 'src');
const pagesSrc = join(srcRoot, 'pages');
const componentsSrc = join(srcRoot, 'components');
const libSrc = join(srcRoot, 'lib');
const dataSrc = join(srcRoot, 'data');

const pagesOut = join(REPO, 'src', 'pages', 'blog', series);
const componentsOut = join(REPO, 'src', 'components', 'blog', series);

if (!existsSync(pagesSrc)) {
  console.error(`Not an Astro site: no src/pages/ in ${src}`);
  process.exit(1);
}

let copied = 0;
let rewritten = 0;

function copy(from, to) {
  if (dryRun) {
    console.log(`  [dry-run] copy ${relative(REPO, from)} -> ${relative(REPO, to)}`);
    return;
  }
  mkdirSync(join(to, '..'), { recursive: true });
  copyFileSync(from, to);
  copied++;
}

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function rewrite(file, pairs) {
  if (dryRun) {
    console.log(`  [dry-run] rewrite ${relative(REPO, file)}`);
    return;
  }
  const before = readFileSync(file, 'utf8');
  let text = before;
  for (const [re, rep] of pairs) {
    text = text.replace(re, rep);
  }
  if (text !== before) rewritten++;
  writeFileSync(file, text);
}

console.log(`\nImporting ${src} -> blog series "${series}"\n`);

// ---- 1. pages (.mdx, .md, .astro) ----
console.log('Pages:');
const pagePred = (f) => {
  const b = basename(f);
  return (
    !b.startsWith('index.') &&
    /\.(mdx|md|astro)$/.test(b) &&
    !exclude.has(b.replace(/\.(mdx|md|astro)$/, ''))
  );
};
for (const f of walk(pagesSrc).filter(pagePred)) {
  copy(f, join(pagesOut, basename(f)));
}

// ---- 2. whole components tree (React + astro helpers + vendored libs) ----
if (!skipComponents) {
  console.log('Components (full tree):');
  for (const f of walk(componentsSrc)) {
    copy(f, join(componentsOut, relative(componentsSrc, f)));
  }
}

// ---- 3. lib (support code used by demos/components) ----
if (!skipLib && existsSync(libSrc)) {
  console.log('Lib:');
  for (const f of walk(libSrc)) {
    copy(f, join(componentsOut, 'lib', relative(libSrc, f)));
  }
}

// ---- 3b. data (nav.ts, shortcuts.ts, ... referenced by components) ----
if (!skipComponents && existsSync(dataSrc)) {
  console.log('Data:');
  for (const f of walk(dataSrc)) {
    copy(f, join(componentsOut, 'data', relative(dataSrc, f)));
  }
}

// ---- 4. rewrite page imports ----
console.log('\nRewriting imports:');

const pagePairs = [
  [/'\.\.\/layouts\/[^']*'/g, `'../../../layouts/BlogPost.astro'`],
  [/'\.\.\/components\/demos\/([^']+)'/g, `'../../../components/blog/${series}/demos/$1'`],
  [/'\.\.\/components\/([^']+)'/g, `'../../../components/blog/${series}/$1'`],
  [/'\.\.\/lib\/([^']+)'/g, `'../../../components/blog/${series}/lib/$1'`],
  [/'\.\.\/data\/([^']+)'/g, `'../../../components/blog/${series}/data/$1'`],
];

// add series attr to <Layout title="..." slug="..."> (idempotent)
const seriesPair = [
  /<Layout\s+title="[^"]*"\s+slug="[^"]*"(?![^>]*series=)([^>]*)>/g,
  (match, rest) => {
    const selfClosing = match.endsWith('/>');
    const stripped = match.replace(/\s*\/?>$/, '');
    return `${stripped} series="${series}"${selfClosing ? ' />' : '>'}`;
  },
];

for (const f of walk(pagesOut).filter((f) => /\.(mdx|md|astro)$/.test(f))) {
  rewrite(f, [...pagePairs, seriesPair]);
}

// ---- 5. rewrite component/lib/data imports (self-consistency) ----
// The component tree moved from src/components/<sub>/X to
// src/components/blog/<series>/<sub>/X. lib/data moved from src/lib|data to
// <series>/lib|data. Rewrites are depth-aware so they don't collide:
//   - root files (depth 0): ../lib/ -> ./lib/, ../components/ -> ./, ../data/ -> ./data/
//   - subdir files (depth 1+): ../../lib/ -> ../lib/, ../../components/ -> ../, ../../data/ -> ../data/
const depth0Pairs = [
  [/'\.\.\/components\/demos\//g, `'./demos/`],
  [/'\.\.\/components\//g, `'./`],
  [/'\.\.\/lib\//g, `'./lib/`],
  [/'\.\.\/data\//g, `'./data/`],
];
const depthNPairs = [
  [/'\.\.\/\.\.\/components\/demos\//g, `'./`],
  [/'\.\.\/\.\.\/components\//g, `'../`],
  [/'\.\.\/\.\.\/lib\//g, `'../lib/`],
  [/'\.\.\/\.\.\/data\//g, `'../data/`],
];

if (!skipComponents) {
  for (const f of walk(componentsOut).filter((f) => /\.(ts|tsx|astro|js)$/.test(f))) {
    const rel = relative(componentsOut, f);
    const depth = rel.split('/').length - 1;
    rewrite(f, depth === 0 ? depth0Pairs : depthNPairs);
  }
}

// ---- summary ----
console.log(`\nDone. ${copied} files copied, ${rewritten} files rewritten (${dryRun ? 'DRY RUN — nothing written' : 'applied'}).`);

console.log(`\nMANUAL STEPS REMAINING:`);
console.log(`  1. Install any new npm deps the source site uses (check its package.json).`);
console.log(`  2. src/data/blog.ts — add SERIES entry:`);
console.log(`     { id: '${series}', title: '...', blurb: '...', tone: 'teal|magenta|violet|blue|green', tag: 'N STEPS' }`);
console.log(`  3. src/data/blog.ts — add POSTS entries (title/blurb/tag from the source site's nav.ts or data file).`);
console.log(`  4. Run: npx astro build   (must pass — it catches any missed import)`);
console.log(`  5. Optional: add a header link in src/layouts/Layout.astro for top-level sections.\n`);
