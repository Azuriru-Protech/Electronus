import SettingsTopbar from '@renderer/components/layouts/SettingsTopbar/SettingsTopbar'
import styles from './AboutUs.module.scss'
import { Link } from 'react-router-dom'
import Icon from '@renderer/components/widgets/Icon/Icon'
import { useTranslation } from 'react-i18next'
import { Avatar } from 'antd'

export default function AboutUs() {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.settings.systemSettings' })
  return (
    <>
      <SettingsTopbar>
        <div className={styles.aboutUsTopbarWrapper}>
          <Link to="/settings/system-settings" className={styles.aboutUsTopbarBackIcon}>
            <Icon name="chevron_left" />
          </Link>
          {t('aboutUs')}
        </div>
      </SettingsTopbar>
      <div className={styles.aboutUsWrapper}>
        <Avatar shape="square" size={56} icon={<Icon name="verified_user" />} />
        <h3>CHAT1.0.00-0000-release</h3>
      </div>
      <div className="settingsCardList">
        <div className="settingsCard">
          <div className="settingsCardItem">
            <h4>{t('checkForNewVersions')}</h4>
            <Icon name="chevron_right" weight={200} color="#505050"></Icon>
          </div>
          <div className="settingsCardItem">
            <h4>{t('userAgreement')}</h4>
            <Icon name="chevron_right" weight={200} color="#505050"></Icon>
          </div>
          <div className="settingsCardItem">
            <h4>{t('privacyPolicy')}</h4>
            <Icon name="chevron_right" weight={200} color="#505050"></Icon>
          </div>
        </div>
      </div>
    </>
  )
}
