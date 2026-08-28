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
  integrations: [react(), mdx()],
  vite: {
    resolve: {
      noExternal: ['@javierromario/neondeck'],
    },
  },
});
