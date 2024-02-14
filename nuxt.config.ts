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
    key: '',
    secret: '',
    tsm: ''
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    'nuxt-cron'
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  cron: {
    runOnInit: false,
    timeZone: 'Europe/Berlin',
    jobsDir: 'tm'
  }
})
