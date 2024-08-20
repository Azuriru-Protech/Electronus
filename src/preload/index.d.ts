import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI & {
      store: {
        get: <T = any>(key: string) => T
        set: <T = any>(key: string, val: T) => void
      }
    }
    api: unknown
  }
}
