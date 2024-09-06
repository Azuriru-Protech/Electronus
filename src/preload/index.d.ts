import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI & {
      store: {
        get: <T = any>(key: string) => T
        set: <T = any>(key: string, val: T) => void
      }
      locale: () => string
      cometchatInfo: () => {
        appId: string
        region: string
        authKey: string
      }
    }
    api: unknown
  }
}
