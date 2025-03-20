import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import { env, integrations } from './src/utils/astro';

export default defineConfig({
  output: 'static',
  site: 'https://side.my.id',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations,
  server: {
    port: 3000,
    host: true,
  },
  devToolbar: {
    enabled: false,
  },
  compressHTML: true,
  env,
});
