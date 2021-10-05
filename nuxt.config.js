export default {
  target: "static",
  components: true,
  head: {
    title: "WooNuxt",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Next generation front end for WooCommerce thats build with Nuxt.",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/icon.svg" }, 
      { rel: "apple-touch-icon", sizes: "512x512", href: "/icon_maskable.png" }],
  },

  modules: ["@nuxtjs/pwa", '@nuxtjs/localtunnel'],
  buildModules: ["@nuxtjs/tailwindcss", "@nuxt/image", "nuxt-graphql-request"],

  graphql: {
    clients: {
      default: {
        endpoint: `${process.env.WORDPRESS_URL}/graphql`,
        options: {
          credentials: "include",
          mode: "cors",
        },
      },
    },
  },

  image: {
    provider: "static",
    domains: [process.env.WORDPRESS_URL],
  },

  pwa: {
    manifest: {
      name: "WooNuxt",
      short_name: "WooNuxt",
      display: "standalone",
      lang: "en",
      theme_color: "#ffffff",
      background_color: "#ffffff"
    },
    meta: {
      mobileAppIOS: true,
      theme_color: "#ffffff",
      nativeUI: true
    },
    workbox: {
      // swURL: 'OneSignalSDKWorker.js',
    }
  },

  publicRuntimeConfig: {
    perPage: 12,
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: "/products/page/:pageNumber",
        component: resolve(__dirname, "pages/products"),
      });
      routes.push({
        path: "/product-category/:categorySlug",
        component: resolve(__dirname, "pages/products"),
      });
      routes.push({
        path: "/product-category/:categorySlug/page/:pageNumber",
        component: resolve(__dirname, "pages/products"),
      });
    },
  },
};
