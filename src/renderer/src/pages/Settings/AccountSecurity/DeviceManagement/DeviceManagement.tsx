import SettingsTopbar from '@renderer/components/layouts/SettingsTopbar/SettingsTopbar'
import Icon from '@renderer/components/widgets/Icon/Icon'
import styles from './DeviceManagement.module.scss'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { padZero } from '@renderer/utilities/Utilities'

const fakeDevices = [
  {
    name: 'John Doe',
    model: 'iPhone 13',
    id: 'abcdefg12345678901',
    current: true,
    lastActive: new Date()
  },
  {
    name: 'Chris Doe',
    model: 'MacBook Pro',
    id: 'abcdefg1234567890',
    current: false,
    lastActive: new Date(2023, 0, 1)
  }
]

export default function DeviceManagement() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.settings.accountSecurity'
  })
  const [devices, setDevices] = useState(fakeDevices)
  const toReadableDate = (date: Date) => {
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    return `${padZero(month, 2)}/${padZero(day, 2)} ${padZero(hour, 2)}:${padZero(minute, 2)}`
  }
  const censoredId = (id: string) => {
    return '****' + id.substring(4, id.length)
  }
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
      <div className={styles.deviceManagementDescription}>{t('deviceManagementDescription')}</div>

      <div className="settingsCardList">
        {devices.map((device) => (
          <div className="settingsCard" style={{ position: 'relative' }} key={device.id}>
            {device.current && (
              <div className={styles.deviceManagementCurrent}>{t('currentDevice')}</div>
            )}
            <div className="settingsCardItem padding-l">
              <div className={styles.deviceManagementDetailWrapper}>
                <p className={styles.deviceManagementDetail}>
                  {device.model} ({device.name})
                </p>
                <p className={styles.deviceManagementDetail}>{censoredId(device.id)}</p>
                <p className={styles.deviceManagementDetailDate}>{toReadableDate(new Date())}</p>
              </div>
              <div className={styles.deviceManagementActionWrapper}>
                <div onClick={() => {}}>
                  <Icon
                    name="edit"
                    color="#91919c"
                    fill
                    className={styles.deviceManagementAction}
                  />
                </div>

                <div onClick={() => {}}>
                  <Icon
                    name="do_not_disturb_on"
                    color="#ea0f1e"
                    fill
                    className={styles.deviceManagementAction}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
