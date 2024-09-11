import styles from './Sidebar.module.scss'
import Icon from '@renderer/components/widgets/Icon/Icon'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Avatar, Badge, Button } from 'antd'
import { useEffect, useState } from 'react'
import { MaterialSymbol } from 'material-symbols'
import { CometChat } from '@cometchat/chat-sdk-javascript'
import UserWhiteIcon from '@renderer/assets/images/icons/user-white.svg'
import ChatCircleIcon from '@renderer/assets/images/icons/chat-circle.svg'
import ChatCircleActiveIcon from '@renderer/assets/images/icons/chat-circle-active.svg'
import ContactIcon from '@renderer/assets/images/icons/contact.svg'
import SettingsIcon from '@renderer/assets/images/icons/settings.svg'
import SettingsActiveIcon from '@renderer/assets/images/icons/settings-active.svg'

type Props = {}

type SidebarContent = {
  link: string
  icon: string
  iconActive: string
}

const SidebarTabs: SidebarContent[] = [
  {
    link: '/conversation',
    icon: ChatCircleIcon,
    iconActive: ChatCircleActiveIcon
  },
  {
    link: '/contacts',
    icon: ContactIcon,
    iconActive: ContactIcon
  }
]

export default function Sidebar({}: Props) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState<CometChat.User | null>(null)

  useEffect(() => {
    getCurrentUser()
  }, [])

  const getCurrentUser = async () => {
    const user = await CometChat.getLoggedInUser()
    setCurrentUser(user)
    console.log(user)
  }

  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.sidebarUpperSection}>
        <div className={styles.avatarWrapper}>
          <Button
            type="primary"
            className={styles.avatarBtn}
            size="large"
            icon={<img src={UserWhiteIcon} className={styles.avatar} />}
            onClick={() => {
              navigate('/login')
            }}
          />
        </div>
        <div className={styles.sidebarUpperSectionLinkContainer}>
          {SidebarTabs.map((tab, index) => (
            <Button
              key={index}
              type="text"
              size="large"
              icon={<img src={pathname.includes(tab.link) ? tab.iconActive : tab.icon} />}
              onClick={() => {
                navigate(tab.link)
              }}
            />
          ))}
        </div>
      </div>
      <div className={styles.sidebarBottomSection}>
        {/* <Link to="/login">
          <Icon name="logout" fill className={styles.settingsIcon} size={28} />
        </Link> */}
        <Button
          type="text"
          size="large"
          icon={<img src={pathname.includes('/settings') ? SettingsActiveIcon : SettingsIcon} />}
          onClick={() => {
            navigate('/settings')
          }}
        />
        <Button
          type="text"
          size="large"
          icon={<Avatar src={currentUser?.getAvatar()} size={28} />}
          onClick={() => {
            navigate('/settings')
          }}
        />
      </div>
    </div>
  )
}
