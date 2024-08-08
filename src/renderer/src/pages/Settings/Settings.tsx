import SettingsSidebar from '@renderer/components/layouts/SettingsSidebar/SettingsSidebar'
import '@renderer/styles/settings.scss'
import { Outlet } from 'react-router'
import styles from './Settings.module.scss'

export default function Settings() {
  return (
    <div className={styles.settingsWrapper}>
      <SettingsSidebar />
      <div className={styles.settingsContentWrapper}>
        <div className={styles.settingsHeader}>
          <h1>Settings</h1>
        </div>
        <div className={styles.settingsContent}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
