'use client'
import styles from './Sidebar.module.scss'
import Icon from '@renderer/components/widgets/Icon/Icon'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import SampleProfilePic from '@renderer/assets/images/sample-profile-pic.jpg'
import { Avatar } from 'antd'

type Props = {}

export default function Sidebar({}: Props) {
  const { pathname } = useLocation()
  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.sidebarUpperSection}>
        <div className={styles.avatarWrapper}>
          <Avatar src={SampleProfilePic} className={styles.avatar} />
        </div>
        <div className={styles.iconWrapper}>
          <Icon name="chat" />
        </div>
        <div className={styles.iconWrapper}>
          <Icon name="contacts" />
        </div>
      </div>
      <div className={styles.sidebarBottomSection}>
        <Link
          to="/settings"
          className={`${styles.iconWrapper} ${pathname.includes('/settings') && styles.active}`}
        >
          <Icon name="settings" fill className={styles.settingsIcon} />
        </Link>
      </div>
    </div>
  )
}
