// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import { fileURLToPath } from 'node:url';

// GitHub Pages: user/org site (Javier-Romario.github.io repo) -> base: '/'
// Project site lives under a subpath (/REPO/).
const SITE = 'https://Javier-Romario.github.io';
const BASE = '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  integrations: [react(), mdx()],
  vite: {
    resolve: {
      alias: {
        '@components': fileURLToPath(new URL('./src/neondeck/components', import.meta.url)),
        '@common': fileURLToPath(new URL('./src/neondeck/common', import.meta.url)),
        '@root': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
