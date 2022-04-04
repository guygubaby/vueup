import { defineConfig } from './src/config'

export default defineConfig({
  entry: './src/play/index.ts',
  formats: ['cjs', 'es'],
  external: ['vue'],
  include: './src/play/*',
  watch: false,
  minify: false,
  outDir: 'lib',
})
