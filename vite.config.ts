import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '#koi': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    // cssCodeSplit: false,
    lib: {
      entry: 'src/koi-table.vue',
      name: 'KoiTable',
      fileName: format => `koi-table.${format}.js`,
    },

    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
