'use client'
import styles from './Sidebar.module.scss'
import Icon from '@renderer/components/widgets/Icon/Icon'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import SampleProfilePic from '@renderer/assets/images/sample-profile-pic.jpg'
import { Avatar } from 'antd'
import { useState } from 'react'
import { MaterialSymbol } from 'material-symbols'

type Props = {}

type SidebarContent = {
  link: string
  icon: MaterialSymbol
}

const SidebarTabs: SidebarContent[] = [
  {
    link: '/chat/system-notification',
    icon: 'chat'
  },
  {
    link: '/contacts',
    icon: 'contacts'
  }
]

export default function Sidebar({}: Props) {
  const { pathname } = useLocation()
  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.sidebarUpperSection}>
        <div className={styles.avatarWrapper}>
          <Avatar src={SampleProfilePic} className={styles.avatar} />
        </div>
        {SidebarTabs.map((tab, index) => (
          <Link
            to={tab.link}
            key={index}
            className={`${styles.iconWrapper} ${pathname.includes(tab.link) && styles.active}`}
          >
            <Icon name={tab.icon} />
          </Link>
        ))}
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
