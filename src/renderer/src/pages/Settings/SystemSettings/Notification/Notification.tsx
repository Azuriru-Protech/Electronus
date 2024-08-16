import SettingsTopbar from '@renderer/components/layouts/SettingsTopbar/SettingsTopbar'
import styles from './Notification.module.scss'
import Icon from '@renderer/components/widgets/Icon/Icon'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Switch } from 'antd'
import { useState } from 'react'

export default function Notification() {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.settings.systemSettings' })
  const [notification, setNotification] = useState(false)
  const [notificationAlert, setNotificationAlert] = useState(false)

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
            <h4>{t('notification')}</h4>
            <Switch checked={notification} onChange={setNotification} size="small" />
          </div>
          <div className="settingsCardItem">
            <h4>{t('notificationAlert')}</h4>
            <Switch checked={notificationAlert} onChange={setNotificationAlert} size="small" />
          </div>
        </div>
      </div>
    </>
  )
}
