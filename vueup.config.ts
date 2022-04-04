import { defineConfig } from './src/config'

export default defineConfig({
  entry: './src/play/index.ts',
  include: './src/play/*',
  external: ['vue'],
  formats: ['cjs', 'es'],
  watch: false,
  minify: false,
})
