import c from 'picocolors'

export const logger = {
  newline() {
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
