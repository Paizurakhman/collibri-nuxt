const axios = require('axios')
export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'collibri',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
            // {name: "apple-mobile-web-app-capable", content: "yes"},
            // {name: "apple-mobile-web-app-status-bar-style", content: "black"},
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
            { rel: "stylesheet", href: "https://pro.fontawesome.com/releases/v5.10.0/css/all.css" },

            // {rel: "apple-touch-icon", sizes: "114x114", href: "apple-icon-114x114.png"},
            // {rel: "apple-touch-icon", sizes: "120x120", href: "apple-icon-120x120.png"},
            // {rel: "apple-touch-icon", sizes: "144x144", href: "apple-icon-144x144.png"},
            // {rel: "apple-touch-icon", sizes: "152x152", href: "apple-icon-152x152.png"},
            // {rel: "apple-touch-icon", sizes: "180x180", href: "apple-icon-180x180.png"},
            // {rel: "apple-touch-icon", href: "icon.png"},
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/sass/main.css',
        // '@invisiburu/vue-picker/dist/vue-picker.min.css',
        'vue-slick-carousel/dist/vue-slick-carousel.css',
        'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
    ],

    // script: [{
    //     src: '~/static/pixel.js',
    //     type: 'text/javascript'
    // }],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~/plugins/paginate', mode: 'client' },
        { src: '~/plugins/vue-slick-carousel', mode: 'client' },
        { src: '~/plugins/vue-yandex-share', mode: 'client' },
        // { src: '~/plugins/vue-picker', mode: 'client' },
        { src: '~/plugins/skeleton-loader', mode: 'client' },
        { src: '~/plugins/v-lazy-image', mode: 'client' },
        { src: '~/plugins/vue-cookies', mode: 'client' },
        { src: '~/plugins/vue-validate' },
        { src: '~/plugins/vue-mask' },
        { src: '~/plugins/pixel', mode: 'client' },
        '~/plugins/vue-directive'
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],


    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        '@nuxtjs/recaptcha',
        '@nuxtjs/sitemap'
    ],

    sitemap: {
        hostname: 'https://www.collibri.kz/',
        routes: async() => {
            let data = await axios.get("https://admin.collibri.kz/api/sitemap")
            return data.data.map((v) => {
                return { url: v, priority: 1, changefreq: "monthly" }
            })
        }
    },
    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseUrl: 'https://admin.collibri.kz/api/'
    },
    recaptcha: {
        hideBadge: true,
        siteKey: '6Ld8mOEcAAAAANKZqWwXck5Eb9sIhkGziN2GDVF7',
        version: 2
    },
    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        // meta: {
        //   title: "Collibri",
        //   author: "Collibri",
        // },
        // manifest: {
        //   lang: 'en',
        //   name: "Collibri",
        //   mobileAppIOS: true,
        //   appleStatusBarStyle: true
        // },
        // icon: {
        //   // source: '~/static/icon.png',
        //   fileName: 'icon.png',
        //   sizes: [64, 120, 144, 152, 192, 384, 512]
        // }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
}
