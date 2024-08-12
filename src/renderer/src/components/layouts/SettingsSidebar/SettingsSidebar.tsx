import styles from './SettingsSidebar.module.scss'
import Icon from '@renderer/components/widgets/Icon/Icon'
import { MaterialSymbol } from 'material-symbols'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'

interface Navigation {
  name: string
  icon: MaterialSymbol
  link: string
  color: string
}

export default function SettingsSidebar() {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const sideBarNavigations: Navigation[] = [
    {
      name: t('personalInformation'),
      icon: 'id_card',
      link: '/settings/personal-information',
      color: '#b654cb'
    },
    {
      name: t('accountSecurity'),
      icon: 'lock',
      link: '/settings/account-security',
      color: '#f1760d'
    },
    {
      name: t('privacy'),
      icon: 'verified_user',
      link: '/settings/privacy',
      color: '#0084fd'
    },
    {
      name: t('systemSettings'),
      icon: 'settings',
      link: '/settings/system-settings',
      color: '#00cb69'
    },
    {
      name: t('shareInvite'),
      icon: 'share',
      link: '/settings/share-invite',
      color: '#e00501'
    },
    {
      name: t('feedback'),
      icon: 'rate_review',
      link: '/settings/feedback',
      color: '#0042ff'
    },
    {
      name: t('customerService'),
      icon: 'support_agent',
      link: '/settings/customer-service',
      color: '#ff3705'
    }
  ]

  return (
    <div className={styles.settingsSidebarWrapper}>
      <div className={styles.settingsSidebarTitle}>{t('settings')}</div>
      <div className={styles.settingsSidebarList}>
        {sideBarNavigations.map((item, index) => (
          <Link
            to={item.link}
            className={`${styles.settingsSidebarButton} ${pathname === item.link && styles.active}`}
            key={index}
          >
            <div
              className={styles.settingsIcon}
              style={{
                background: `linear-gradient(to top, ${item.color}, ${item.color}b0 100%)`
              }}
            >
              <Icon name={item.icon} color="white" weight={300} />
            </div>
            <div
              className={`${styles.settingsSidebarButtonText} ${index !== 0 && styles.separator}`}
            >
              <div className={styles.settingsSidebarItem}>{item.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
