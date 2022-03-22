import type { Options } from 'tsup'

export const tsup: Options = {
  splitting: false,
  sourcemap: false,
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
  entryPoints: [
    'src/index.ts',
  ],
  external: [
    'vite',
    '@vitejs/plugin-vue',
    '@vitejs/plugin-vue-jsx',
  ],
}
