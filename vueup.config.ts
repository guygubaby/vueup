import { defineConfig } from './src/config'

export default defineConfig({
  entry: './src/play/index.ts',
  external: ['vue'],
  watch: false,
})
