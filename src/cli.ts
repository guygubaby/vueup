import { basename } from 'path'
import { loadConfig } from 'unconfig'
import { build as viteBuild } from 'vite'
import c from 'picocolors'
import minimist from 'minimist'
import type { BuildOptions } from './config'
import { resolveConfig } from './config'
import { logger } from './logger'

const build = async () => {
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

  if (!config) {
    logger.error('No config found, for more info', c.underline('https://github.com/guygubaby/vueup'))
    return
  }

  const configNames = sources.map(s => basename(s)).join(', ')
  logger.log(c.green(`Load config from ${c.bold(c.underline(configNames))}`))

  const argv = minimist(process.argv.slice(2), {
    boolean: ['watch'],
    alias: {
      w: 'watch',
    },
  })

  if (argv.watch)
    config.watch = true

  !config.watch && logger.log('Start building ...')

  const buildConfig = await resolveConfig(config)
  const rollupWatcher = await viteBuild(buildConfig)

  // watch mode
  if (config.watch) {
    // @ts-expect-error
    rollupWatcher.on('event', (event) => {
      const { code } = event
      if (code === 'START') {
        logger.newline()
        logger.log('Start building ...')
      }
      else if (code === 'BUNDLE_END') {
        const duration = event.duration
        logger.log(`${c.yellow('⚡️ ')}Build success in ${c.cyan(`${duration}ms`)}`)
      }
      else if (code === 'END') {
        logger.log('Watching file change ...')
        logger.newline()
      }
    })
  }
  else {
    logger.log(`${c.yellow('⚡️ ')}Build success`)
  }
}

build().catch((e) => {
  console.log(e)
  logger.error('build failed')
  process.exit(1)
})
