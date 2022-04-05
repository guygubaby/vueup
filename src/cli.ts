import { parentPort } from 'worker_threads'
import { loadConfig } from 'unconfig'
import { build as __build } from 'vite'
import c from 'picocolors'
import type { BuildOptions } from './config'
import { resolveConfig } from './config'
import { logger } from './logger'
import { MessageTypeEnums } from './enums'

const build = async(argv: {
  watch?: boolean
}) => {
  const { config } = await loadConfig<BuildOptions>({
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

  // const configNames = sources.map(s => basename(s)).join(', ')
  // logger.log(c.green(`load config from ${c.bold(c.underline(configNames))}`))

  if (argv.watch) config.watch = true

  const buildConfig = await resolveConfig(config)

  parentPort?.postMessage({
    type: MessageTypeEnums.startBuild,
  })

  await __build(buildConfig)

  parentPort?.postMessage({
    type: MessageTypeEnums.ok,
  })
}

parentPort?.on('message', (data) => {
  const { type, raw } = data
  if (type === MessageTypeEnums.build) {
    build(raw).catch((e) => {
      parentPort?.postMessage({
        type: MessageTypeEnums.error,
        raw: e,
      })
      parentPort?.close()
      process.exit(1)
    })
  }
})

// Dev only
if (!parentPort) {
  build({
    watch: false,
  }).catch((e) => {
    logger.error(e)
    process.exit(1)
  })
}
