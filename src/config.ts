import type { LibraryOptions, Plugin, UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import ts from 'typescript'

export { type UserConfig } from 'vite'

export type GlobalsOption = Record<string, string> | ((name: string) => string)

type InternalModuleFormat = 'amd' | 'cjs' | 'es' | 'iife' | 'system' | 'umd'

type ModuleFormat = InternalModuleFormat | 'commonjs' | 'esm' | 'module' | 'systemjs'

type LibType = Pick<LibraryOptions, 'entry' | 'name' | 'fileName' | 'formats'>

interface RollupType {
  external?: string[]
  banner?: string | (() => string | Promise<string>)
  globals?: GlobalsOption
  outDir?: string
}

interface MiscType {
  clean?: boolean
  watch?: boolean
}

export type BuildOptions = Pick<UserConfig, 'plugins'> & LibType & RollupType & MiscType

export const defineConfig = (options: BuildOptions): UserConfig => {
  const basePlugins: Plugin[] = [
    Vue({
      reactivityTransform: true,
      isProduction: true,
    }),
    VueJsx(),
  ]

  const basefileName = (format: ModuleFormat): string => {
    if (['es', 'esm'].includes(format)) return 'index.mjs'
    return 'index.js'
  }

  const { plugins = [], entry, name, fileName = basefileName, formats = [], external = [], banner, globals = {}, outDir = 'dist', clean = true, watch = false } = options

  return {
    plugins: [
      dts({
        outputDir: outDir,
        compilerOptions: {
          // Ensure ".d.ts" modules are generated
          declaration: true,
          // Skip ".js" generation
          noEmit: false,
          emitDeclarationOnly: true,
          // Skip code generation when error occurs
          noEmitOnError: true,
          // Avoid extra work
          checkJs: false,
          declarationMap: false,
          skipLibCheck: true,
          preserveSymlinks: false,
          // Ensure we can parse the latest code
          target: ts.ScriptTarget.ESNext,
        },
      }),
      ...basePlugins,
      ...plugins,
    ],
    build: {
      outDir,
      emptyOutDir: clean,
      watch: watch ? { include: entry } : null,
      lib: {
        entry,
        name,
        formats,
        fileName,
      },
      rollupOptions: {
        external,
        output: {
          exports: 'named',
          format: 'esm',
          banner,
          globals: {
            ...globals,
          },
        },
      },
    },
  }
}
