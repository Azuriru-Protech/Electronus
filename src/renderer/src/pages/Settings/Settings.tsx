import SettingsSidebar from '@renderer/components/layouts/SettingsSidebar/SettingsSidebar'
import '@renderer/styles/settings.scss'
import { Outlet } from 'react-router'
import styles from './Settings.module.scss'

export default function Settings() {
  return (
    <div className={styles.wrapper}>
      <SettingsSidebar />
      <Outlet />
    </div>
  )
}
