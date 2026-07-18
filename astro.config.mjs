// @ts-check
import { defineConfig } from 'astro/config';
import mermaid from 'astro-mermaid';

import svelte from '@astrojs/svelte';
import { satteri } from '@astrojs/markdown-satteri';
import { glossaryMdastPlugin } from './src/lib/glossary/satteri-glossary.mjs';

// Serving sub-path. Passed to the glossary plugin so baked [[term]] links
// resolve correctly under it (mirrors lib/paths.ts, which markdown can't reach).
const base = '/lite-learner';

// https://astro.build/config
export default defineConfig({
  base:base,
  integrations: [
    svelte(),
    mermaid({
      theme: 'dark',
      autoTheme: true
    })
  ],
  markdown: {
    // Dual gruvbox themes; defaultColor:false emits --shiki-light/--shiki-dark
    // variables and Layout.astro's CSS picks one based on the active scheme.
    shikiConfig: {
      themes: { light: 'gruvbox-light-medium', dark: 'gruvbox-dark-medium' },
      defaultColor: false,
    },
    // [[term]] / [[term|display]] → glossary popup links, via a Sätteri mdast
    // plugin (Astro 7's default processor). The plugin reads src/content/glossary
    // at config-load time, so restart the dev server after adding/renaming a term.
    processor: satteri({ mdastPlugins: [glossaryMdastPlugin({ base })] }),
  },
  vite: {
    // Per the sqlite-wasm docs: keep Vite from pre-bundling the WASM loader,
    // which breaks its worker/asset URL resolution in dev.
    optimizeDeps: { exclude: ['@sqlite.org/sqlite-wasm'] },
  },
});
