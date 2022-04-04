
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [{
    name: 'test-disable-default-config',
    transform(code, id) {
      console.log(id)
      return undefined
    },
  }],
})
