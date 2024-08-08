import styles from './SettingsSidebar.module.scss'
import PersonalIcon from '../../assets/images/icons/personal-icon.svg'
import SecurityIcon from '../../assets/images/icons/security-icon.svg'
import PrivacyIcon from '../../assets/images/icons/privacy-icon.svg'
import SettingsIcon from '../../assets/images/icons/settings-icon.svg'
import ShareIcon from '../../assets/images/icons/share-icon.svg'
import FeedbackIcon from '../../assets/images/icons/feedback-icon.svg'
import CustomerServiceIcon from '../../assets/images/icons/customer-service-icon.svg'

type Props = {}

export default function SettingsSidebar({}: Props) {
  const sideBarNavigations = [
    {
      name: 'Personal Information',
      icon: PersonalIcon,
      link: '/settings/personal-information',
      color: '#d671ee'
    },
    {
      name: 'Account Security',
      icon: SecurityIcon,
      link: '/settings/account-security',
      color: '#fb9d16'
    },
    {
      name: 'Privacy',
      icon: PrivacyIcon,
      link: '/settings/privacy',
      color: '#239BFE'
    },
    {
      name: 'System Settings',
      icon: SettingsIcon,
      link: '/settings/system-settings',
      color: '#3DD776'
    },
    {
      name: 'Share Invite',
      icon: ShareIcon,
      link: '/settings/share-invite',
      color: '#ED2701'
    },
    {
      name: 'Feedback',
      icon: FeedbackIcon,
      link: '/settings/feedback',
      color: '#175cff'
    },
    {
      name: 'Customer Service',
      icon: CustomerServiceIcon,
      link: '/settings/customer-service',
      color: '#ff5a21'
    }
  ]

  return (
    <div className={styles.settingsSidebarWrapper}>
      <div className={styles.settingsSidebarTitle}>Settings</div>
      <div className={styles.settingsSidebarList}>
        {sideBarNavigations.map((item, index) => (
          <div className={styles.settingsSidebarButton} key={index}>
            <div
              className={styles.settingsIcon}
              style={{
                backgroundColor: item.color
              }}
            >
              <img src={item.icon} />
            </div>
            <div className={styles.settingsSidebarText}>
              <div className={styles.settingsSidebarItem}>{item.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
