// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  vite: {
    // Per the sqlite-wasm docs: keep Vite from pre-bundling the WASM loader,
    // which breaks its worker/asset URL resolution in dev.
    optimizeDeps: { exclude: ['@sqlite.org/sqlite-wasm'] },
  },
});
