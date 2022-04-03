import { defineConfig } from './src/config'

export default defineConfig({
  entry: './src/play/index.ts',
  external: ['vue'],
  formats: ['es', 'cjs'],
  globals: {
    vue: 'Vue',
  },
  clean: true,
  outDir: 'lib',
})
