import { basename } from 'path'
import { loadConfig } from 'unconfig'
import { build as __build } from 'vite'
import c from 'picocolors'
import minimist from 'minimist'
import type { BuildOptions } from './config'
import { resolveConfig } from './config'

const logger = {
  empty() {
    console.log()
  },
  log(...args: any[]) {
    console.log(c.magenta('vueup '), ...args)
  },
  error(...args: any[]) {
    console.error(c.red('vueup '), ...args)
  },
  success(...args: any[]) {
    console.log(c.green('vueup '), ...args)
  },
}

const build = async() => {
  const { config, sources } = await loadConfig<BuildOptions>({
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
    merge: false,
  })

  const configNames = sources.map(s => basename(s)).join(', ')
  logger.log(c.green(`load config from ${c.bold(c.underline(configNames))}`))

  const argv = minimist(process.argv.slice(2), {
    boolean: ['watch'],
    alias: {
      w: 'watch',
    },
  })

  if (argv.watch) config.watch = true

  const buildPlugin = await resolveConfig(config)

  logger.empty()
  logger.log(c.green('start building ...'))
  logger.empty()

  await __build(buildPlugin)
  config.watch && logger.empty()
  logger.log(c.green(config.watch ? 'start watching ...' : 'all done ~'))
  !config.watch && logger.empty()
}

build().catch((e) => {
  console.log(e)
  logger.error('build failed !')
  process.exit(1)
})
