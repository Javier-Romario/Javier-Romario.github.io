# JAVIER // HARFORD

Portfolio + blog site for Javier Harford — software engineer. Built with **Astro 7**, **React 19**,
and **MDX**, styled with the [NEONDECK](https://github.com/Javier-Romario/neondeck) cyberpunk
component library (the [@javierromario/neondeck](https://www.npmjs.com/package/@javierromario/neondeck)
npm package).

## What's inside

- **Astro 7 + React 19** via `@astrojs/react`, **MDX** via `@astrojs/mdx`.
- **NEONDECK** as an npm dependency — `@javierromario/neondeck` (imports its components and CSS directly).
- **Portfolio** (`src/pages/index.astro`): experience, skills, education, about, contact — rendered
  with `NeoCard`, `NeoAccordion`, `Badge`, `Divider`, `Text`, `RowSpaceBetween`.
- **Blog** (`src/pages/blog/`): four multi-page series (ISO Tactics, NEON_NATIVE, Blender Masterclass,
  Neon Canvas). Metadata + ordering live in `src/data/blog.ts`; shared post chrome in
  `src/layouts/BlogPost.astro`; styles in `src/styles/blog.css`.
- **React islands**: `HexBackground` hero backdrop, `BlogGrid` series browser, and ~24 live demo
  islands (canvas games, flexbox/state explorers, a Blender shortcut explorer, react-three-fiber).
- **Static output** deployed to GitHub Pages via `withastro/action`.

## Run locally

```sh
npm install
npm run dev        # http://localhost:4321/
npm run build      # static output → dist/
npm run preview
```

## Blog series

Adding or importing a series is scripted — see `docs/blog-import.md` and
`scripts/import-blog-series.mjs`.

## Deploy to GitHub Pages

1. Push to `main`.
2. Repo → **Settings → Pages → Source → GitHub Actions**.
3. The workflow at `.github/workflows/deploy.yml` builds with `withastro/action` and publishes via `actions/deploy-pages`.

This user/org site lives at `https://Javier-Romario.github.io/`. The `site`/`base` pair is configured
in `astro.config.mjs` — change `base` to `/REPO/` for a project site.
