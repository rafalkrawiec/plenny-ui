import { defineConfig } from 'vite';
import { externalizer } from '@plenny/vite-externalizer';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    externalizer(),
    dts({ rollupTypes: true }),
    libInjectCss(),
  ],
  build: {
    lib: {
      entry: {
        ui: 'src/ui.ts',
      },
      formats: ['es', 'cjs'],
    },
    minify: 'terser',
    cssMinify: 'lightningcss',
  },
  resolve: {
    dedupe: ['vue', 'pinia'],
  },
});
