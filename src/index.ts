import type { BuildOptions, LibraryFormats, PluginOption } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Vuejsx from '@vitejs/plugin-vue-jsx'

interface VueLibRet {
  plugins: (PluginOption | PluginOption[])[]
  build: BuildOptions
}

interface VueLibOptions {
  entry: string
  name: string
  formats?: LibraryFormats[]
  external?: string[]
  globals?: Record<string, string>
}

export const defineVueLibConfig = (options: VueLibOptions): VueLibRet => {
  const { entry, name, formats = [], external = [], globals = {} } = options
  const plugins = [
    Vue({
      isProduction: true,
      reactivityTransform: true,
    }),
    Vuejsx(),
  ]

  const BASE_FORMATS: LibraryFormats[] = ['cjs', 'es']
  const BASE_EXTERNAL = ['vue']
  const BASE_GLOBALS = {
    vue: 'Vue',
  }

  const build = {
    lib: {
      entry,
      name,
      formats: Array.from<LibraryFormats>(new Set<LibraryFormats>([...BASE_FORMATS, ...formats])),
      fileName: (format: string) => `index.${format}.js`,
    },
    rollupOptions: {
      external: Array.from(new Set([...BASE_EXTERNAL, ...external])),
      output: {
        globals: Object.assign({}, BASE_GLOBALS, globals),
      },
    },
  }

  return {
    plugins,
    build,
  }
}
