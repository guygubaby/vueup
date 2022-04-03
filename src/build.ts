import type { UserConfig } from 'vite'
import { build as __build } from 'vite'
import c from 'picocolors'

export const buildLib = async(config: UserConfig, watch: boolean) => {
  try {
    const { build } = config
    if (watch && build && build.lib) {
      config.build = {
        ...build,
        watch: {
          include: build.lib?.entry,
        },
      }
    }
    await __build(config)
    console.log()
    console.log(c.green('vueup build finished ~'))
    console.log()
  }
  catch (error) {
    console.log(c.red((error as unknown as Error).message) || 'vueup build failed!')
  }
}
