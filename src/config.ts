import { dirname } from 'path'
import type { InlineConfig, LibraryOptions, PluginOption } from 'vite'
import { preTransform } from './preTransform'

type LibType = Pick<LibraryOptions, 'entry' | 'name' | 'fileName' | 'formats'>

interface RollupType {
  external?: string[]
  banner?: string | (() => string | Promise<string>)
  outDir?: string
}

interface MiscType {
  plugins?: (PluginOption | PluginOption[])[]
  clean?: boolean
  jsx?: boolean
  dts?: boolean
  sourcemap?: boolean
  minify?: boolean
  watch?: boolean
  /**
   * Specify the include directories to generate dts files
   */
  include?: string | string[]
  exclude?: string | string[]
}

export type BuildOptions = LibType & RollupType & MiscType

export const defineConfig = (options: BuildOptions) => options

export const resolveConfig = async (options: BuildOptions): Promise<InlineConfig> => {
  const {
    entry,
    name,
    banner,
    plugins = [],
    formats = ['es', 'cjs'],
    external = ['vue'],
    outDir = 'dist',
    clean = true,
    jsx = false,
    minify = false,
    sourcemap = false,
    watch = false,
    dts = true,
    include = `${dirname(entry)}/**/*`,
    exclude = [],
  } = options

  const basePlugins: PluginOption[] = [
    preTransform(),
  ]

  const VuePlugin = (await import('@vitejs/plugin-vue')).default

  basePlugins.push(
    VuePlugin({
      reactivityTransform: true,
      isProduction: true,
    }),
  )

  if (jsx) {
    const VueJsx = (await import('@vitejs/plugin-vue-jsx')).default
    basePlugins.push(VueJsx())
  }

  if (dts) {
    const TsScriptTargetESNext = 99 // from ts standard lib
    const dtsPlugin = (await import('vite-plugin-dts')).default
    basePlugins.push(dtsPlugin({
      include,
      exclude,
      staticImport: true,
      insertTypesEntry: true,
      skipDiagnostics: false,
      logDiagnostics: false,
      compilerOptions: {
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
        target: TsScriptTargetESNext,
      },
    }))
  }

  return {
    configFile: false,
    envFile: false,
    logLevel: 'silent',
    plugins: [
      ...basePlugins,
      ...plugins,
    ],
    build: {
      outDir,
      emptyOutDir: clean,
      target: 'esnext',
      sourcemap,
      // terser has better compression than esbuild
      minify: minify ? 'terser' : false,
      watch: watch ? {} : null,
      lib: {
        entry,
        name,
        formats,
        fileName: (format) => {
          if (format === 'es')
            return 'index.mjs'
          return 'index.js'
        },
      },
      rollupOptions: {
        external,
        output: {
          banner,
          exports: 'named',
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  }
}
