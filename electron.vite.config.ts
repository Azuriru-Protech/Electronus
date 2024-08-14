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
    plugins: [
      react({
        babel: {
          plugins: ['styled-jsx/babel']
        }
      })
    ],
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src') // Simplified alias
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@renderer/styles/_variables.scss"; @import "@renderer/styles/utilities.scss"; @import "@renderer/styles/breakpoint.scss"; @import "@renderer/styles/_mixins.scss";`
        }
      }
    }
  }
})
