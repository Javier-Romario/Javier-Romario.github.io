# NEONDECK // PAGES

An interactive guide for deploying an Astro site styled with the [NEONDECK](https://github.com/Javier-Romario/neondeck) cyberpunk React component library to GitHub Pages — and a living proof that it works, because the guide itself is built with NEONDECK.

## What's inside

- **Astro 7 + React 19** via `@astrojs/react`.
- **NEONDECK vendored** into `src/neondeck/` (it ships no npm package — see the guide).
- **Path aliases** `@components`, `@common`, `@root` registered in both `tsconfig.json` and `astro.config.mjs` (Vite).
- **React islands**: `MatrixRain` hero, `StepNav` scrollspy, `CodePanel` copy buttons, and a live `Playground` exercising NEONDECK's interactive components.
- **Screenshots** vendored from the NEONDECK repo into `src/assets/screenshots/`.

## Run locally

```sh
npm install
npm run dev        # http://localhost:4321/neondeck-guide/
npm run build      # static output → dist/
npm run preview
```

## Deploy to GitHub Pages

1. Push to `main`.
2. Repo → **Settings → Pages → Source → GitHub Actions**.
3. The workflow at `.github/workflows/deploy.yml` builds with `withastro/action` and publishes via `actions/deploy-pages`.

Project pages live at `https://Javier-Romario.github.io/neondeck-guide/`. The `site`/`base` pair is configured in `astro.config.mjs` — change `base` to `/` for a user/org site.
