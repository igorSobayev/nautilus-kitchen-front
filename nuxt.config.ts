// import { defineNuxtConfig } from 'nuxt'
// import icons from './icons'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxthq/ui',
    '@pinia/nuxt'
  ],
  ui: {
    icons: ['material-symbols', 'icon-park', 'icon-park-outline', 'mingcute', ]
  },
  css: ['~/assets/css/custom.css'],
  colorMode: {
    preference: 'light'
  }
})
