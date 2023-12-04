import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'




// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 4000
  },
  build: {
    transpile: ['vuetify'],
  },
  runtimeConfig: {
    key: 'e055e01726574bfc90f01595f1d16c65',
    secret: 'Fd2R9dMyKc9UShNzkmQavkzpx1c1ZrKl',
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
