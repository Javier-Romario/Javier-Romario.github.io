// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { fileURLToPath } from 'node:url';

// GitHub Pages: project site lives under a subpath.
// User/org site (Javier-Romario.github.io repo) -> base: '/'
const SITE = 'https://Javier-Romario.github.io';
const BASE = '/neondeck-guide';

export default defineConfig({
  site: SITE,
  base: BASE,
  integrations: [react()],
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
