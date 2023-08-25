const colors = require('tailwindcss/colors')
const indielayer = require('@indielayer/ui/tailwind.preset')

module.exports = {
  darkMode: 'class',
  // load indielayer ui presets
  presets: [indielayer()],
  // allow PurgeCSS to analyze components
  content: [
    './app.vue',
    './**/*.vue',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    'node_modules/@indielayer/ui/**/*',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        secondary: colors.sky,
        success: colors.lime,
        warning: colors.yellow,
        error: colors.red,
      },
    },
  },
  plugins: [],
}
