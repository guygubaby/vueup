import type { Options } from 'tsup'

export const tsup: Options = {
  splitting: false,
  sourcemap: false,
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
  entry: [
    'src/index.ts',
    'src/cli.ts',
  ],
  external: [
    'vite',
    'vite-plugin-dts',
    'typescript',
    '@vitejs/plugin-vue',
    '@vitejs/plugin-vue-jsx',
  ],
}
