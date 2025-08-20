import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        short_name: "CurrencyX",
        name: "Currency Converter",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#1f1f1f",
        background_color: "#000000"
      },
      workbox: {
        runtimeCaching: [
          // cache currency API responses
          {
            urlPattern: /^https:\/\/v6\.exchangerate-api\.com\/v6\/.*\/latest\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "currency-api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60, // 1 hour
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          // cache fonts/images/js/css
          {
            urlPattern: ({ request }: { request: { destination: string } }) =>
              request.destination === "style" ||
              request.destination === "script" ||
              request.destination === "worker" ||
              request.destination === "image" ||
              request.destination === "font",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "assets-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
            },
          },
        ],
      },
    }),
  ],
})
