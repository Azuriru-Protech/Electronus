import SettingsTopbar from '@renderer/components/layouts/SettingsTopbar/SettingsTopbar'
import styles from './Notification.module.scss'
import Icon from '@renderer/components/widgets/Icon/Icon'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function Notification() {
  const { t } = useTranslation()
  return (
    <>
      <SettingsTopbar>
        <div className={styles.notificationTopbarWrapper}>
          <Link to="/settings/system-settings" className={styles.notificationTopbarBackIcon}>
            <Icon name="chevron_left" />
          </Link>
          {t('notification')}
        </div>
      </SettingsTopbar>
      <div className="settingsCardList">
        <div className="settingsCard">
          <div className="settingsCardItem">
            <h3>{t('notification')}</h3>
            <Icon name="chevron_right" weight={200} />
          </div>
        </div>
      </div>
    </>
  )
}
