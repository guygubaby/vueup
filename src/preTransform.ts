import type { PluginOption } from 'vite'
// import { normalizePath } from 'vite'
// import { compileScript, parse } from 'vue/compiler-sfc'

// use this plugin to import outter types for vue sfc
export const preTransform = (): PluginOption => {
  return {
    name: 'vite-plugin-vue-sfc-pre-transform',
    enforce: 'pre',
    apply: 'build',
    // config(config, { command }) {
    //   console.log('command: ', command)
    //   console.log('config', config)
    // },
    // configResolved(resolvedConfig) {
    //   console.log('resolvedConfig: ', resolvedConfig)
    // },
    // resolveId(source, importer) {
    //   console.log('source: ', source)
    //   console.log('importer: ', importer)
    //   return null
    // },
    // load(id) {
    //   console.log('load: ', id)
    //   return null
    // },
    // transform(source, id) {
    //   const VUE_SFC_REG = /\.vue$/
    //   if (!VUE_SFC_REG.test(id))
    //     return null

    //   const { descriptor, errors } = parse(source)
    //   if (errors.length)
    //     return null

    //   const script = compileScript(descriptor, {
    //     id,
    //   })
    //   console.log('script: ', script)
    //   return null
    // },
    // renderStart(outputOptions, inputOptions) {
    //   console.log('outputOptions: ', outputOptions)
    //   console.log('inputOptions: ', inputOptions)
    // },
    // renderChunk(code, chunk, options) {
    //   console.log('code: ', code)
    //   console.log('chunk: ', chunk)
    //   console.log('options: ', options)
    //   return null
    // },
    // writeBundle(options, bundle) {
    //   console.log('options: ', options)
    //   console.log('bundle: ', bundle)
    // },
    // closeBundle() {
    //   console.log('closeBundle')
    // },
  }
}
