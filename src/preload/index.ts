import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', {
      ...electronAPI,
      store: {
        get(key) {
          return ipcRenderer.sendSync('electron-store-get', key)
        },
        set(property, val) {
          ipcRenderer.send('electron-store-set', property, val)
        }
        // Other method you want to add like has(), reset(), etc.
      },
      locale: () => ipcRenderer.sendSync('get-locale')

      // Any other methods you want to expose in the window object.
      // ...
    })
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = {
    ...electronAPI,
    store: {
      get: (key) => ipcRenderer.sendSync('electron-store-get', key),
      set: (key, val) => ipcRenderer.send('electron-store-set', key, val)
    }
  }
  // @ts-ignore (define in dts)
  window.api = api
}
