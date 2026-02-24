import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      'vue-easy-lightbox$': 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js',
    },
  },
  base: "/",
  build: {
    chunkSizeWarningLimit: 3000,
    // Enable asset hashing for cache busting
    assetsInlineLimit: 4096,
    rollupOptions: {
      external: ['mqtt'],
      output: {
        assetFileNames: (assetInfo) => {
          // Add hash to all assets including images for cache busting
          let extType = assetInfo.name.split('.').pop()
          if (/png|jpe?g|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img'
          } else if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            extType = 'fonts'
          } else if (/\.css$/i.test(assetInfo.name)) {
            extType = 'css'
          }
          return `assets/${extType}/[name]-[hash][extname]`
        }
      }
    }
  },
  server: {
    // Fix 404 error on refresh for SPA routing
    historyApiFallback: true,
    port: 3000,
    host: true
  },
  preview: {
    // Fix 404 error on refresh in preview mode
    port: 3000,
    host: true,
    headers: {
      'Cache-Control': 'public, max-age=0, must-revalidate'
    }
  }
});
