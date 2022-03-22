# Vueup

[![NPM version](https://img.shields.io/npm/v/@bryce-loskie/vueup?color=a1b858&label=)](https://www.npmjs.com/package/@bryce-loskie/vueup)

## Vueup makes it easy to define vue lib build options for vite config

## Get Started

```bash
pnpm i @bryce-loskie/vueup -D
```

```typescript
// vite.config.ts
import { resolve } from 'path'
import { defineVueLibConfig } from '@bryce-loskie/vueup'

const { plugins, build } = defineVueLibConfig({
  name: 'foo',
  entry: resolve(__dirname, './src/index.ts'),
})

export default defineConfig({
  test: {},
  plugins,
  build,
})
```

## License

[MIT](./LICENSE) License © 2022 [guygubaby](https://github.com/guygubaby)
