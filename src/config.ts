import type { LibraryOptions, UserConfig } from 'vite'

export { type UserConfig } from 'vite'

type LibType = Pick<LibraryOptions, 'entry' | 'name' | 'fileName' | 'formats'>

interface RollupType {
  external?: string[]
  banner?: string | (() => string | Promise<string>)
  outDir?: string
}

interface MiscType {
  clean?: boolean
  jsx?: boolean
  dts?: boolean
  sourcemap?: boolean
  minify?: boolean
  watch?: boolean
}

export type BuildOptions = Pick<UserConfig, 'plugins'> & LibType & RollupType & MiscType

export const defineConfig = (options: BuildOptions) => options

export const resolveConfig = async(options: BuildOptions): Promise<UserConfig> => {
  const {
    plugins = [],
    entry,
    name,
    formats = ['es', 'cjs'],
    external = [],
    outDir = 'dist',
    clean = true,
    banner,
    dts = true,
    jsx = false,
    minify = false,
    sourcemap = false,
    watch = false,
  } = options

  const VuePlugin = (await import('@vitejs/plugin-vue')).default

  plugins.push(
    VuePlugin({
      reactivityTransform: true,
      isProduction: true,
    }),
  )

  if (jsx) {
    const VueJsx = (await import('@vitejs/plugin-vue-jsx')).default
    plugins.push(VueJsx())
  }

  if (dts) {
    const TsScriptTargetESNext = 99 // from ts standard lib
    const dtsPlugin = (await import('vite-plugin-dts')).default
    plugins.push(dtsPlugin({
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
    plugins,
    build: {
      outDir,
      emptyOutDir: clean,
      watch: watch ? {} : null,
      lib: {
        entry,
        name,
        formats,
        fileName: (format) => {
          if (format === 'es') return 'index.mjs'
          return 'index.js'
        },
      },
      rollupOptions: {
        external,
        output: {
          banner,
        },
      },
      target: 'esnext',
      sourcemap,
      minify,
    },
  }
}
