import SettingsSidebar from '@renderer/components/layouts/SettingsSidebar/SettingsSidebar'
import '@renderer/styles/settings.scss'
import { Outlet, useNavigate } from 'react-router-dom'
import styles from './Settings.module.scss'
import { useEffect } from 'react'

export default function Settings() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/settings/personal-information')
  }, [])
  return (
    <div className={styles.settingsWrapper}>
      <SettingsSidebar />
      <div className={styles.settingsContentWrapper}>
        <Outlet />
      </div>
    </div>
  )
}
