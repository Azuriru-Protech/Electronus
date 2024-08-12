import SettingsTopbar from '@renderer/components/layouts/SettingsTopbar/SettingsTopbar'
import styles from './ChangeLanguage.module.scss'
import Icon from '@renderer/components/widgets/Icon/Icon'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function ChangeLanguage() {
  const { t, i18n } = useTranslation()
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language)
  }
  return (
    <>
      <SettingsTopbar>
        <div className={styles.changeLanguageTopbarWrapper}>
          <Link to="/settings/system-settings" className={styles.changeLanguageTopbarBackIcon}>
            <Icon name="chevron_left" />
          </Link>
          {t('changeLanguage')}
        </div>
      </SettingsTopbar>
      <div className="settingsCardList">
        <div className="settingsCard">
          <div className="settingsCardItem" onClick={() => changeLanguage('en')}>
            <p>English</p>
            {i18n.language === 'en' && (
              <div className={styles.changeLanguageIconWrapper}>
                <Icon name="check" size={12} color="white" />
              </div>
            )}
          </div>
          <div className="settingsCardItem" onClick={() => changeLanguage('zh-CN')}>
            <p>简体中文</p>
            {i18n.language === 'zh-CN' && (
              <div className={styles.changeLanguageIconWrapper}>
                <Icon name="check" size={12} color="white" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
