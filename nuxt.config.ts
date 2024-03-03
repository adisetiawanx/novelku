// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@nuxtjs/seo",
    "dayjs-nuxt",
    "@formkit/auto-animate",
    "@vee-validate/nuxt",
    "nuxt-headlessui",
  ],
  routeRules: {
    "/novel": {
      redirect: "/",
    },
    "/admin": {
      redirect: "/admin/dashboard",
    },
    "/admin/**": {
      ssr: false,
    },
  },
  runtimeConfig: {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleRedirectUri: process.env.GOOGLE_REDIRECT_URI,
  },
  site: {
    url: "https://localhost:3000",
    name: "Novelku ID",
    description: "Baca Novel Bahasa Indonesia",
  },
  googleFonts: {
    overwriting: true,
    download: true,
    families: {
      Poppins: {
        wght: [200, 300, 400, 500, 600, 700, 800, 900],
      },
    },
  },
  image: {
    quality: 80,
    format: ["webp"],
    cloudinary: {
      baseURL: "https://res.cloudinary.com/novelku/image/upload",
    },
  },
  dayjs: {
    locales: ["id"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultLocale: "id",
    defaultTimezone: "Indonesia/Jakarta",
  },
});
