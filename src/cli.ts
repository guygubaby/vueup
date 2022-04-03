import { loadConfig } from 'unconfig'
import type { UserConfig } from 'vite'
import minimist from 'minimist'
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

  const argv = minimist(process.argv.slice(2), {
    boolean: ['watch'],
    alias: {
      w: 'watch',
    },
  })

  await buildLib(config, argv.watch)
}

build()
