# Importing blog pages from a full Astro site

How to take an existing, **fully-fledged Astro site** (multi-page MDX + Astro
guide with React islands) and import its pages into this portfolio's blog as a
**series**.

Only applies to **Astro sites**. This is the process used to bring in
`iso-tactics-guide`, `neon-native`, and `blender-masterclass`.

---

## 1. The blog architecture (read first)

```
src/pages/blog/
  index.astro                     # blog home — lists series + posts (auto)
  <series>/
    page.mdx | page.astro         # one route per file: /blog/<series>/<slug>/
src/layouts/BlogPost.astro        # shared post chrome (crumb, progress, prev/next)
src/content.config.ts             # zod schema for the series/posts collections
src/content/series.json           # series metadata (schema-validated at build)
src/content/posts.json            # post metadata + ordering (schema-validated at build)
src/data/blog.ts                  # thin accessors over the collections above
src/components/blog/<series>/     # ported components, demos, lib (whole tree)
src/styles/blog.css               # blog + content styles (uses NEONDECK tokens)
```

**Contract each post must follow:**

- Every page file wraps its body in `<Layout ...>` where `Layout` is
  `src/layouts/BlogPost.astro` (imported as `../../../layouts/BlogPost.astro`
  from `src/pages/blog/<series>/`).
- `<Layout>` requires: `title="..."`, `slug="..."` (must match the slug in
  `src/content/posts.json`), and `series="<series-id>"`.
- The body is raw markdown (`.mdx`) or HTML (`.astro`). Both can use React
  components / islands directly.
- Styling classes (`page-title`, `lede`, `poke`, `formula-card`, `recap`,
  `tldr`, `takeaway`, `pitfall`, `demo-box`, `btn`, `chip`, ...) are defined in
  `src/styles/blog.css`. Reuse them; don't invent new ones unless you add CSS.

**Both `.astro` and `.mdx` pages are supported.** `.astro` pages write HTML +
import React components; `.mdx` pages write markdown + import React components.
**Multi-page within a post** = a series. Order + prev/next come from
`src/content/posts.json` (sorted by `tag`), not the filesystem.

---

## 2. The import tool

```bash
node scripts/import-blog-series.mjs \
  --src ~/Programming/my-astro-site \
  --series my-series \
  [--exclude cheatsheet,glossary] \
  [--skip-components] [--skip-lib] [--dry-run]
```

Run with `--dry-run` first to see what it will copy.

What it automates:

1. `src/pages/*.{mdx,md,astro}` → `src/pages/blog/<series>/`
   (skips `index.*` and `--exclude` slugs).
2. `src/components/**` (the **entire tree**) →
   `src/components/blog/<series>/`. This guarantees every dependency comes
   along: React islands/demos, helper `.astro` callouts, **vendored component
   libraries** (e.g. a site that ships its own `neondeck/`), subdirectories,
   `shared.ts`, `useRaf.ts`, etc.
3. `src/lib/**` (if present) → `src/components/blog/<series>/lib/`.
4. `src/data/**` (if present) → `src/components/blog/<series>/data/`
   (e.g. `nav.ts`, `shortcuts.ts` referenced by components).
5. Rewrites page imports:
   - `../layouts/NAME.astro` → `../../../layouts/BlogPost.astro`
   - `../components/...` → `../../../components/blog/<series>/...`
   - `../lib/...` → `../../../components/blog/<series>/lib/...`
   - `../data/...` → `../../../components/blog/<series>/data/...`
6. Rewrites component/lib/data imports so the copied tree stays self-consistent
   (`../../lib/` → `../lib/`, `../../components/` → `../`, etc., depth-aware).
7. Adds `series="<series>"` to `<Layout title=... slug=...>` (idempotent).

**Install the source site's npm deps** before building (the tool can't do
that). Check its `package.json` — e.g. `blender-masterclass` needed
`three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`.

---

## 3. Manual steps (always do these after the tool)

The tool can't know each site's post metadata, so register the series + posts
in `src/content/series.json` and `src/content/posts.json`. Both are validated
against the zod schema in `src/content.config.ts` at build time — a missing
field, wrong type, or bad `tone` fails the build instead of silently breaking
a page at runtime. A `series` id in `posts.json` that doesn't match any
`series.json` entry is caught too (`reference('series')`), but only as a
logged `[content] Invalid content reference` error — it doesn't fail the
build exit code, so still check the build log, not just "did it build."

```jsonc
// src/content/series.json — one entry
{
  "id": "my-series",
  "title": "My Guide",
  "blurb": "One-line description.",
  "tone": "teal",            // teal | magenta | violet | blue | green
  "tag": "12 STEPS"          // shown on the blog card
}

// src/content/posts.json — one entry per imported page
{
  "id": "my-series/setup",    // "<series>/<slug>" — must be unique across all posts
  "series": "my-series",      // must match a series.json id (schema-checked)
  "slug": "setup",            // must match the file's slug + the mdx slug
  "title": "Setup",
  "tag": "01",
  "blurb": "One-line summary.",
  "formula": "x = y",          // optional — iso-style "formula" line
  "takeaway": "the ONE thing", // optional — neon-native-style takeaway
  "time": 8,                   // optional
  "phase": "core"               // optional — grouping label
}
```

Posts within a series are sorted by `tag` (zero-padded, ascending) for
prev/next order — array order in the JSON doesn't matter. Copy `title` /
`blurb` / `tag` from the source site's own nav (`src/data/nav.ts` or similar).

Then:

```bash
npx astro build        # must pass — this catches any missed import
```

If a page is a top-level section you want in the site header, add a link in
`src/layouts/Layout.astro` (`<a href={`${base}blog/`}>BLOG</a>` already exists).

---

## 4. Gotchas learned the hard way

- **Copy the whole `components/` tree, not just `.tsx`.** Demos import sibling
  files like `shared.ts` and `useRaf.ts`. The tool does this for you — never
  hand-pick individual component files.
- **Code fences vs real imports:** an MDX guide is full of `import X from
  'react-native'` inside ``` code blocks. Only the *top-of-file* imports
  (`../layouts`, `../components`, `../lib`) should be rewritten. The tool's
  regexes only touch those known patterns — never bare package imports.
- **`sd` / `fd` in bash:** `fd -x` does NOT need a trailing `\;` (that's
  `find`). Adding `\;` or chaining with backslash newlines produces
  "Search path '...' is not a directory" errors or duplicated replacements.
  Use `&&` on one line, or just use the import tool.
- **Idempotency:** the `series="..."` insertion must not duplicate. The tool
  guards with `(?![^>]*series=)`. If you ever end up with
  `series="x" series="x" series="x"`, collapse it:
  `sd '( series="<id>"){2,}' ' series="<id>"' <files>`.
- **Layout contract:** a page's `slug` prop must exactly match its
  `posts.json` entry slug, or prev/next + progress bars will be wrong (no
  hard error — this cross-check is between the `.mdx`/`.astro` file and the
  content collection, not something the schema can catch).
- **`.astro` posts:** write plain HTML with the blog classes; use JS template
  literals (`{`...`}`) for code blocks to avoid escaping `<`/`>`/`&`.
- **Non-Astro projects** (e.g. a Rust app) are NOT handled by this tool. Write
  those as hand-authored `.astro`/`.mdx` posts instead.

---

## 5. Checklist for a new import

- [ ] Confirm the source is an **Astro site** (`src/pages/` with `.mdx`/`.astro`).
- [ ] `node scripts/import-blog-series.mjs --dry-run --src ... --series ...`
- [ ] Run it for real.
- [ ] Add a series entry to `src/content/series.json` + all post entries to
      `src/content/posts.json`.
- [ ] Confirm every file's `<Layout ... slug="..." series="...">` matches its
      `posts.json` entry.
- [ ] `npx astro build` passes.
- [ ] Open `/blog/` locally, click through the series, check prev/next + demos.
