import SettingsTopbar from '@renderer/components/layouts/SettingsTopbar/SettingsTopbar'
import Icon from '@renderer/components/widgets/Icon/Icon'
import SettingsCardItem from '@renderer/components/widgets/SettingsCardItem/SettingsCardItem'
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
          <Link className="settingsCardItem" to={'/settings/system-settings/notification'}>
            <h4>{t('notification')}</h4>
            <Icon name="chevron_right" weight={200} />
          </Link>
          <Link to="/settings/system-settings/change-language" className="settingsCardItem">
            <h4>{t('changeLanguage')}</h4>
            <div className="settingsCardItemContent">
              <p style={{ color: '#78787d' }}>{getCurrentLanguage()}</p>
              <Icon name="chevron_right" weight={200} color="#505050" />
            </div>
          </Link>
          <div className="settingsCardItem" onClick={clearChatHistory}>
            <h4>{t('clearCache')}</h4>
            <Icon name="chevron_right" weight={200} />
          </div>
          <div className="settingsCardItem" onClick={clearCache}>
            <h4>{t('clearChatHistory')}</h4>
            <Icon name="chevron_right" weight={200} />
          </div>
          <Link to={'/settings/system-settings/about-us'} className="settingsCardItem">
            <h4>{t('aboutUs')}</h4> <Icon name="chevron_right" weight={200} />
          </Link>
        </div>
        <div className="settingsCard">
          <div className="settingsCardItem" onClick={clearCache}>
            <h4>{t('switchAccount')}</h4>
            <Icon name="chevron_right" weight={200} />
          </div>
        </div>
        <div
          className="settingsCard"
          style={{ background: 'none', display: 'flex', justifyContent: 'flex-end' }}
        >
          <div
            className="settingsCardItem"
            style={{
              color: '#ff4d4f',
              justifyContent: 'center',
              background: '#ffffff',
              borderRadius: 4,
              width: '100%'
            }}
            onClick={logout}
          >
            <h4>{t('logout')}</h4>
          </div>
        </div>
      </div>
      <div>{clearCacheContextHolder}</div>
      <div>{logoutContextHolder}</div>
      <div>{clearChatHistoryContextHolder}</div>
    </>
  )
}
