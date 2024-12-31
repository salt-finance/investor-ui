import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// https://vite.dev/config/
export default defineConfig({
  build: {
    minify: 'terser'
  },
  base: '/investor-ui',
  server: {
    port: 4040
  },
  resolve: {
    alias: {
      $lib: path.resolve(__dirname, 'src/components'),
      data: path.resolve(__dirname, 'src/data'),
      components: path.resolve(__dirname, 'src/components'),
      utils: path.resolve(__dirname, 'src/utils'),
      models: path.resolve(__dirname, 'src/models'),
      views: path.resolve(__dirname, 'src/views'),
      '@': path.resolve(__dirname, 'src/')
    }
  },
  plugins: [svelte(), cssInjectedByJsPlugin({ dev: { enableDev: false } })]
});
