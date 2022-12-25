const baseHref = process.env.BASE_URL || "/";
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Margin",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [{ src: "https://js.stripe.com/v3/" }],
  },
  axios: {
    baseURL: baseHref + "/wp-json/", // Used as fallback if no runtime config is provided
  },
  env: {
    baseUrl: process.env.BASE_URL,
    netlifyFunctionsUrl: process.env.NETFLIFY_FUNCTION_URL,
    wooUser: process.env.WOO_USER,
    wooSecret: process.env.WOO_SECRET,
    stripePublishKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeAccount: process.env.STRIPE_ACCOUNT,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      "postcss-import": {},
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/data.server.js",
    '~/plugins/persistedState.client.js'
    //{ src: '~/plugins/stripe.js', mode: 'client' }
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/tailwindcss", "nuxt-gsap-module"],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios"],
  //server: { host: '0' }
  // default: localhost  }
  // Build Configuration: https://go.nuxtjs.dev/config-build
};
