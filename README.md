# Vueup

[![NPM version](https://img.shields.io/npm/v/@bryce-loskie/vueup?color=a1b858&label=)](https://www.npmjs.com/package/@bryce-loskie/vueup)

## Vueup makes it easy to build vue component lib

## Get Started

### Install

```bash
pnpm i @bryce-loskie/vueup -D
```

### Configuration

```typescript
// vueup.config.ts
import { defineConfig } from '@bryce-loskie/vueup'

export default defineConfig({
  entry: './src/index.ts',
})
```

Or

package.json

```json
{
  "vueup": {
    "entry": "./src/index.ts"
  }
}
```

### Scripts

package.json

```json
{
  "scripts": {
    "dev": "vueup --watch",
    "build": "vueup",
  }
}
```

### Full configuration

```typescript
import { dirname } from 'path'

type LibraryFormats = "es" | "cjs" | "umd" | "iife"

type BuildOptions = {
  entry: string;
  name?: string | undefined;
  fileName?: string | ((format: ModuleFormat) => string) | undefined;
  formats?: LibraryFormats[] | undefined;
  external?: string[]
  banner?: string | (() => string | Promise<string>)
  outDir?: string
  plugins?: (PluginOption | PluginOption[])[]
  clean?: boolean
  jsx?: boolean
  dts?: boolean
  sourcemap?: boolean
  minify?: boolean
  watch?: boolean
  /**
   * Specify the inlude directories to generate dts files
   */
  include?: string | string[]
  exclude?: string | string[]
}

const defaultOptions = {
  plugins = [vue()], // if dts is true, will include `dts()`, if jsx is true, will include `vueJsx()`
  formats = ['es', 'cjs'],
  external = ['vue'],
  outDir = 'dist',
  clean = true,
  dts = true,
  jsx = false,
  minify = false,
  sourcemap = false,
  watch = false,
// default include (used to generate dts)
  include = `${dirname(entry)}/**/*`,
  exclude = [],
}
```

## License

[MIT](./LICENSE) License © 2022 [guygubaby](https://github.com/guygubaby)
