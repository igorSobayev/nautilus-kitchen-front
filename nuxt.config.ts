// import { defineNuxtConfig } from 'nuxt'
import { colors } from '@indielayer/ui'
import icons from './icons'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    // ['@indielayer/ui/nuxt', {
    //   icons,
    //   prefix: 'X',
    //   theme: {
    //     classPrefix: 'x-',
    //     colors: {
    //       primary: colors.indigo,
    //       secondary: colors.sky,
    //       success: colors.lime,
    //       warning: colors.yellow,
    //       error: colors.red,
    //     },
    //   }
    // }],
    '@indielayer/ui/nuxt',
    '@pinia/nuxt'
  ],
  css: ['~/assets/tailwind.css'],
  // build: {
    postcss: {
      // postcssOptions: {
        plugins: {
          'tailwindcss/nesting': {},
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    // },
  // },
})
