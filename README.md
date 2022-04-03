# Vueup

[![NPM version](https://img.shields.io/npm/v/@bryce-loskie/vueup?color=a1b858&label=)](https://www.npmjs.com/package/@bryce-loskie/vueup)

## Vueup makes it easy to define vue lib build options for vite config

## Get Started

```bash
pnpm i @bryce-loskie/vueup -D
```

```typescript
// vueup.config.ts
import { defineConfig } from '@bryce-loskie/vueup'

export default defineConfig({
  entry: './src/raw/index.ts',
  external: ['vue'],
  formats: ['es', 'cjs'],
  globals: {
    vue: 'Vue',
  },
  clean: true,
})
```

```json
// package.json
{
  "scripts": {
    "dev": "vueup --watch",
    "build": "vueup",
  }
}
```

## License

[MIT](./LICENSE) License © 2022 [guygubaby](https://github.com/guygubaby)
