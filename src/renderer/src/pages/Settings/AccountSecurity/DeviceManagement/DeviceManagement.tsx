import SettingsTopbar from '@renderer/components/layouts/SettingsTopbar/SettingsTopbar'
import Icon from '@renderer/components/widgets/Icon/Icon'
import styles from './DeviceManagement.module.scss'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function DeviceManagement() {
  const { t } = useTranslation()
  return (
    <>
      <SettingsTopbar>
        <div className={styles.deviceManagementTopbarWrapper}>
          <Link to="/settings/account-security" className={styles.deviceManagementTopbarBackIcon}>
            <Icon name="chevron_left" />
          </Link>
          {t('deviceManagement')}
        </div>
      </SettingsTopbar>
    </>
  )
}
