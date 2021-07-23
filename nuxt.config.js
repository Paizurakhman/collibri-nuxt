export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'collibri',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'},
      { rel: "stylesheet", href: "https://pro.fontawesome.com/releases/v5.10.0/css/all.css" }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/sass/main.css',
    // '@invisiburu/vue-picker/dist/vue-picker.min.css',
    'vue-slick-carousel/dist/vue-slick-carousel.css',
    'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/paginate', mode: 'client' },
    { src: '~/plugins/vue-slick-carousel', mode: 'client' },
    { src: '~/plugins/vue-yandex-share', mode: 'client' },
    // { src: '~/plugins/vue-picker', mode: 'client' },
    { src: '~/plugins/skeleton-loader', mode: 'client' },
    { src: '~/plugins/v-lazy-image', mode: 'client' },
    { src: '~/plugins/vue-cookies', mode: 'client' },
    { src: '~/plugins/vue-validate', mode: 'client' },
    { src: '~/plugins/vue-mask', mode: 'client' },
    '~/plugins/vue-directive'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],


  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/recaptcha'
  ],


  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: 'https://admin.collibri.kz/api/'
  },
  recaptcha: {
    hideBadge: true,
    siteKey: '6LeabLEbAAAAAGRVnJzaZ9J7KeDXKplE_DhSZ8Pn',
    version: 2
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
