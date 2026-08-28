// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// GitHub Pages: user/org site (Javier-Romario.github.io repo) -> base: '/'
// Project site lives under a subpath (/REPO/).
const SITE = 'https://Javier-Romario.github.io';
const BASE = '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  // ClientRouter enables sitewide hover-prefetch by default unless this is
  // explicitly false. Left on, hovering a link fires a fetch that then races
  // (and gets cancelled by) the real navigation fetch on click — shows up as
  // a scary but harmless NS_BINDING_ABORTED in devtools. Never opted into it.
  prefetch: false,
  integrations: [react(), mdx()],
  markdown: {
    shikiConfig: {
      // Dual theme so code blocks follow the user's light/dark setting.
      // defaultColor: false emits --shiki-light / --shiki-dark CSS vars instead
      // of hardcoded colors; blog.css maps them to neondeck's theme selectors.
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: false,
    },
  },
  vite: {
    resolve: {
      noExternal: ['@javierromario/neondeck'],
    },
    build: {
      // three.js (~660 kB minified) powers the 5 Blender 3D demos. It's
      // lazily fetched via client:visible, so the default 500 kB warning is
      // expected noise — keep a threshold high enough to catch real regressions.
      chunkSizeWarningLimit: 900,
    },
  },
});
