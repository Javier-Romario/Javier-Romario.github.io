## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Blog

The blog lives under `src/pages/blog/` as one folder per "series" (multi-page
guide). Metadata + ordering live in `src/data/blog.ts`; shared chrome in
`src/layouts/BlogPost.astro`; styles in `src/styles/blog.css`.

To import pages from a **full Astro site** (`.mdx` + `.astro` pages and all
their React/astro components), use the import tool and follow the guide:

```bash
node scripts/import-blog-series.mjs --src ~/path/to/site --series my-series --dry-run
```

Full instructions + manual steps + gotchas: `docs/blog-import.md`. Read it
before adding a new blog series.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
