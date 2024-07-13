
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  plugins: [
    { src: '~/plugins/socket.js', ssr: false }
  ],
  devtools: {enabled: true},
  pages: true,
})