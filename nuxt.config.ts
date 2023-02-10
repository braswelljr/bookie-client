import { fileURLToPath } from 'url'

export default defineNuxtConfig({
  modules: [
    // '@nuxtjs/i18n',
    '@nuxt/image-edge',
    '@pinia/nuxt',
    '@nuxtjs/device',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    'nuxt-icons'
  ],
  routeRules: {},
  alias: {
    images: fileURLToPath(new URL('./assets/images', import.meta.url)),
    fonts: fileURLToPath(new URL('./assets/fonts', import.meta.url)),
    style: fileURLToPath(new URL('./assets/style', import.meta.url)),
    data: fileURLToPath(new URL('./assets/other/data', import.meta.url))
  },
  image: {
    provider: 'proxy'
  },
  headlessui: {}
})
