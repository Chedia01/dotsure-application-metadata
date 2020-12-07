export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'dotsure-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  script: [
    {src:'https://use.fontawesome.com/1adc52d596.js', crossorigin:'anonymous'}
  ],
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {src: '~/plugins/local-storage.js', mode: 'client'}
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  axios: {
    // baseURL: 'http://localhost:8000/api'
    proxy: true
  },

  proxy: {
    '/api/': {
      target: 'http://localhost:8000/api',
      pathRewrite: {
        '^/api/': '/'
      }
    }
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
