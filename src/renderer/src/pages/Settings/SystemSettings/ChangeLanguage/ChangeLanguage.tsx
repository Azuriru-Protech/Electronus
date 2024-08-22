import SettingsTopbar from '@renderer/components/layouts/SettingsTopbar/SettingsTopbar'
import styles from './ChangeLanguage.module.scss'
import Icon from '@renderer/components/widgets/Icon/Icon'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function ChangeLanguage() {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'pages.settings.systemSettings' })
  const [locale, setLocale] = useState<string>('system')

  useEffect(() => {
    const storageLocale = localStorage.getItem('locale')
    if (!storageLocale) {
      localStorage.setItem('locale', 'system')
      return
    }
    setLocale(storageLocale)
  }, [])

  const changeLanguage = (language: string) => {
    if (language === 'system') {
      const systemLocale = window.electron.locale()
      switch (systemLocale.toLowerCase()) {
        case 'zh-cn':
          i18n.changeLanguage('zh-CN')
          break
        case 'en-us':
        case 'en-gb':
        case 'en':
          i18n.changeLanguage('en')
          break
        default:
          i18n.changeLanguage('en')
      }
    } else {
      i18n.changeLanguage(language)
    }
    setLocale(language)
    localStorage.setItem('locale', language)
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
          <div className="settingsCardItem" onClick={() => changeLanguage('system')}>
            <h4>System</h4>
            {locale === 'system' && (
              <div className={styles.changeLanguageIconWrapper}>
                <Icon name="check" size={12} color="white" />
              </div>
            )}
          </div>
          <div className="settingsCardItem" onClick={() => changeLanguage('en')}>
            <h4>English</h4>
            {locale === 'en' && (
              <div className={styles.changeLanguageIconWrapper}>
                <Icon name="check" size={12} color="white" />
              </div>
            )}
          </div>
          <div className="settingsCardItem" onClick={() => changeLanguage('zh-CN')}>
            <h4>简体中文</h4>
            {locale === 'zh-CN' && (
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
