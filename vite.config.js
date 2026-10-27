import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons.svg'],
      manifest: {
        name: 'Kumbh Kavach',
        short_name: 'Kavach',
        description:
          'Offline-first crowd safety, SOS, and lost-and-found for Simhastha Kumbh Mela',
        theme_color: '#0B1F33',
        background_color: '#0B1F33',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/server\.arcgisonline\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'map-tiles',
              expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 7 },
            },
          },
        ],
      },
    }),
  ],
})
