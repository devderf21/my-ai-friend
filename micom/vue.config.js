const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "MiCom - Community Events",
    short_name: "MiCom",
    description: "Discover and share local community events with MiCom.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4DBA87", // Vue green, can be changed
    icons: [
      {
        src: "./img/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "./img/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "./img/icons/android-chrome-maskable-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "./img/icons/android-chrome-maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "./img/icons/apple-touch-icon-180x180.png", // Using a larger Apple icon
        sizes: "180x180",
        type: "image/png",
        purpose: "any apple-touch-icon",
      },
    ],
    // Optional: Workbox plugin options (can be left to default for now)
    // workboxPluginMode: 'GenerateSW', // or 'InjectManifest'
    // workboxOptions: {
    //   // swSrc: 'src/service-worker.js', // if InjectManifest
    //   // ...other Workbox options...
    // }
  }
})
