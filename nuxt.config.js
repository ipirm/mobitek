export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  env: {
  	imagesUrl: 'https://mobitek.az/storage' || 'http://localhost:3000'
  },

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // Roboto font
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFCD26' },
  /*
  ** Global CSS
  */
  css: [{
    src: '~/assets/scss/app.scss',
    lang: 'scss'
  }],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/swiper',
    '~/plugins/bus',
    '~/plugins/components',
    {src: '~/plugins/scroll-lock', ssr: false},
    {src: '~/plugins/vue-backtotop', ssr: false}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    [
      'nuxt-i18n',
      {
        noPrefixDefaultLocale: true,
        locales: [
            {code: 'en', iso: 'en-US', file: 'en.json'},
            {code: 'az', iso: 'az-AZ', file: 'az.json'},
            {code: 'ru', iso: 'ru-RU', file: 'ru.json'}
        ],
        defaultLocale: 'en',
        vueI18n: {
          fallbackLocale: 'en'
        },
        lazy: true,
        langDir: 'locales/'
      },
    ],
    '@nuxtjs/toast',
  ],
  toast: {
    position: 'bottom-right',
    duration: 4000
  },
  /*
  ** Build configuration
  */
  build: {
    extend(config, {isDev, isClient}) {
    },
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    }
  }
}
