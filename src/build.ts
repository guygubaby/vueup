import type { UserConfig } from 'vite'
import { build as __build } from 'vite'
import c from 'picocolors'

export const buildLib = async(config: UserConfig) => {
  try {
    await __build(config)
    console.log()
    console.log(c.green('vueup build finished ~'))
    console.log()
  }
  catch (error) {
    console.log(c.red((error as unknown as Error).message) || 'vueup build failed!')
  }
}
