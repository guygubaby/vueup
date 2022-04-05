import { Worker } from 'worker_threads'
import { join } from 'path'
import type { Ora } from 'ora'
import ora from 'ora'
import c from 'picocolors'
import minimist from 'minimist'
import { logger } from './logger'
import { MessageTypeEnums } from './enums'

export * from './config'

const LogPrefix = c.magenta('vueup ')

const bootstrap = () => {
  const argv = minimist(process.argv.slice(2), {
    boolean: ['watch'],
    alias: {
      w: 'watch',
    },
  })

  let spinner: Ora | null = null

  const worker = new Worker(join(__dirname, 'cli.js'))

  worker.postMessage({
    type: MessageTypeEnums.build,
    raw: argv,
  })

  worker.on('message', (data) => {
    const { type, raw } = data
    if (type === MessageTypeEnums.ok) {
      spinner?.succeed(`${LogPrefix}build success`)
      if (argv.watch)
        logger.log('start watching file change ...')
      else
        process.exit(0)
    }
    else if (type === MessageTypeEnums.error) {
      spinner?.fail('build failed !')
      logger.error(raw)
      logger.newline()
    }
    else if (type === MessageTypeEnums.startBuild) {
      spinner = ora(`${LogPrefix}${c.green('building ...')}`).start()
    }
    else {
      logger.log('unknown message: ', data)
    }
  })
}

try {
  bootstrap()
}
catch (error) {
  console.log(error)
  process.exit(1)
}
