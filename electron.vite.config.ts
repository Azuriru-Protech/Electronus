import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
// Import vite-plugin-electron if needed

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    plugins: [react()],
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src') // Simplified alias
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@renderer/src/styles/utilities.scss" @import "@renderer/src/styles/variables.scss" @import "@renderer/src/styles/__variables.scss";` // Adjust if needed
        }
      }
    }
  }
})
