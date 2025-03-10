// import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
  ],
  // resolve: {
  //   alias: {
  //     '#koi': path.resolve(__dirname, 'src'),
  //   },
  // },
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'KoiTable',
      fileName: format => `koi-table.${format}.js`,
      formats: ['es', 'cjs'],
      cssFileName: 'ui',
    },
    rollupOptions: {
      external: ['vue'],
      // output: {
      //   globals: {
      //     vue: 'Vue',
      //   },
      // },
    },
  },
})
