// import { defineNuxtConfig } from 'nuxt'
// import icons from './icons'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    'nuxt-rating',
    '@nuxtjs/i18n',
  ],
  ui: {
    icons: ['material-symbols', 'icon-park', 'icon-park-outline', 'mingcute', 'emojione-v1']
  },
  css: ['~/assets/css/custom.css'],
  colorMode: {
    preference: 'light'
  }
})
