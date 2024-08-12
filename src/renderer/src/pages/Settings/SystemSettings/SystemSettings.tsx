import SettingsTopbar from '@renderer/components/layouts/SettingsTopbar/SettingsTopbar'
import Icon from '@renderer/components/widgets/Icon/Icon'
import '@renderer/styles/settings.scss'
import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function SystemSettings() {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'pages.settings.systemSettings' })
  const [clearCacheModal, clearCacheContextHolder] = Modal.useModal()
  const [clearChatHistoryModal, clearChatHistoryContextHolder] = Modal.useModal()
  const [logoutModal, logoutContextHolder] = Modal.useModal()
  const clearCache = async () => {
    const confirm = await clearCacheModal.confirm({
      title: t('clearCache'),
      content: t('clearCacheWarning'),
      okText: t('confirm'),
      cancelText: t('cancel'),
      icon: null,
      centered: true
    })
    if (confirm) {
      console.log('proceed to clear cache')
    }
  }
  const clearChatHistory = async () => {
    const confirm = await clearChatHistoryModal.confirm({
      title: t('clearChatHistory'),
      content: t('clearChatHistoryWarning'),
      okText: t('confirm'),
      cancelText: t('cancel'),
      icon: null,
      centered: true
    })
    if (confirm) {
      console.log('proceed to clear chat history')
    }
  }
  const logout = async () => {
    const confirm = await logoutModal.confirm({
      title: t('logout'),
      content: t('logoutWarning'),
      okText: t('confirm'),
      cancelText: t('cancel'),
      centered: true
    })
    if (confirm) {
      console.log('proceed to logout')
    }
  }
  const getCurrentLanguage = () => {
    if (i18n.language === 'en') {
      return 'English'
    } else if (i18n.language === 'zh-CN') {
      return '简体中文'
    }
    return ''
  }
  return (
    <>
      <SettingsTopbar>{t('systemSettings')}</SettingsTopbar>
      <div className="settingsCardList">
        <div className="settingsCard">
          <Link to="/settings/system-settings/notification" className="settingsCardItem">
            <h3>{t('notification')}</h3>
            <Icon name="chevron_right" weight={200} />
          </Link>
          <Link to="/settings/system-settings/change-language" className="settingsCardItem">
            <h3>{t('changeLanguage')}</h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <p style={{ color: '#78787d' }}>{getCurrentLanguage()}</p>
              <Icon name="chevron_right" weight={200} color="#505050" />
            </div>
          </Link>
          <div className="settingsCardItem" onClick={clearCache}>
            <h3>{t('clearCache')}</h3>
            <Icon name="chevron_right" weight={200} color="#505050" />
          </div>
          <div className="settingsCardItem" onClick={clearChatHistory}>
            <h3>{t('clearChatHistory')}</h3>
            <Icon name="chevron_right" weight={200} color="#505050" />
          </div>
          <Link to="/settings/system-settings/about-us" className="settingsCardItem">
            <h3>{t('aboutUs')}</h3>
            <Icon name="chevron_right" weight={200} color="#505050" />
          </Link>
        </div>
        <div className="settingsCard">
          <div className="settingsCardItem">
            <h3>{t('switchAccount')}</h3>
            <Icon name="chevron_right" weight={200} color="#505050" />
          </div>
        </div>
        <div className="settingsCard">
          <div
            className="settingsCardItem"
            style={{ color: 'red', justifyContent: 'center' }}
            onClick={logout}
          >
            <h3>{t('logout')}</h3>
          </div>
        </div>
      </div>
      <div>{clearCacheContextHolder}</div>
      <div>{logoutContextHolder}</div>
      <div>{clearChatHistoryContextHolder}</div>
    </>
  )
}
