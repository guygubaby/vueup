import { loadConfig } from 'unconfig'
import type { UserConfig } from 'vite'
import { buildLib } from './build'

const build = async() => {
  const { config } = await loadConfig<UserConfig>({
    sources: [
      {
        files: 'vueup.config',
        extensions: ['js', 'ts'],
      },
      {
        files: 'package.json',
        extensions: [],
        rewrite(config) {
          // @ts-expect-error
          return config?.vueup
        },
      },
    ],
    merge: true,
  })
  await buildLib(config)
}

build()
