import Icon from '@renderer/components/widgets/Icon/Icon'
import styles from './ChatSidebar.module.scss'
import { Avatar, Button, Input } from 'antd'
import { useState } from 'react'
import { padZero } from '@renderer/utilities/Utilities'
import { Link, useLocation } from 'react-router-dom'

const sampleChats = [
  {
    title: '123',
    description: '123',
    pin: false,
    muted: false,
    timestamp: new Date(),
    imageUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
    id: 1,
    online: true
  },
  {
    title: '234',
    description: '234',
    pin: true,
    muted: false,
    timestamp: new Date(),
    imageUrl: null,
    id: 2,
    online: false
  },
  {
    title: '345',
    description: '345',
    pin: false,
    muted: true,
    timestamp: new Date(),
    imageUrl: null,
    id: 3,
    online: true
  },
  {
    title: '456',
    description: '456',
    pin: true,
    muted: true,
    timestamp: new Date(),
    imageUrl: null,
    id: 4,
    online: true
  }
] as const

export default function ChatSidebar() {
  const [chats, setChats] = useState(sampleChats)
  const { pathname } = useLocation()
  const getTimestamp = (timestamp: Date) => {
    if (timestamp.getDate() === new Date().getDate()) {
      const hour = timestamp.getHours()
      const minute = timestamp.getMinutes()
      return `${padZero(hour)}:${padZero(minute)}`
    }
    if (timestamp.getDate() === new Date().getDate() - 1) {
      return 'Yesterday'
    }
    return timestamp.toLocaleDateString()
  }
  return (
    <div className={styles.chatSidebar}>
      <div className={styles.chatSidebarUtils}>
        <Input prefix={<Icon name="search" size={16} />} />
        <Button icon={<Icon name="person_add" size={16} />} />
      </div>
      <Link
        className={`${styles.chat} ${pathname.includes('/system-notification') && styles.active}`}
        to={`/chat/system-notification`}
      >
        <div>
          <div className={styles.notificationIcon}>
            <Icon name="notifications" fill size={20} color="white" />
          </div>
        </div>
        <div className={styles.chatContent}>
          <div className={styles.chatContentUpper}>
            <div className={styles.chatContentTitle}>System Notification</div>
            <div className={styles.chatContentTimestamp}>{getTimestamp(new Date())}</div>
          </div>
          <div className={styles.chatContentLower}>
            <div className={styles.chatContentDescription}>
              欢迎使用欢迎使用欢迎使用欢迎使用欢迎使用欢迎使用
            </div>
            <div className={styles.chatContentIcon}>
              <Icon name="keep" fill color="#9e9e9e" size={16}></Icon>
              <Icon name="volume_off" fill color="#9e9e9e" size={16}></Icon>
            </div>
          </div>
        </div>
      </Link>
      {chats &&
        chats.map((chat) => (
          <Link
            className={`${styles.chat} ${pathname.includes(`/chat/${chat.id}`) && styles.active}`}
            to={`/chat/${chat.id}`}
            key={chat.id}
          >
            <div style={{ position: 'relative' }}>
              <Avatar src={chat.imageUrl} icon={<Icon name="person" fill size={24} />} />
              <div className={styles.online}></div>
            </div>
            <div className={styles.chatContent}>
              <div className={styles.chatContentUpper}>
                <div className={styles.chatContentTitle}>{chat.title}</div>
                <div className={styles.chatContentTimestamp}>{getTimestamp(chat.timestamp)}</div>
              </div>
              <div className={styles.chatContentLower}>
                <div className={styles.chatContentDescription}>{chat.description}</div>
                <div className={styles.chatContentIcon}>
                  {chat.pin && <Icon name="keep" fill color="#9e9e9e" size={16}></Icon>}
                  {chat.muted && <Icon name="volume_off" fill color="#9e9e9e" size={16}></Icon>}
                </div>
              </div>
            </div>
          </Link>
        ))}
      {/* <div className={styles.sidebarChats}>
        <div className={styles.sidebarItem}>
          <div className={styles.sidebarIcon}>
            <Icon name="notifications" />
          </div>
          <div className={styles.sidebarMetadata}>
            <div className={styles.sidebarTitle}>System Notifications</div>
            <div className={styles.sidebarSubtitle}>Welcome</div>
          </div>
        </div>

        <div className={styles.sidebarItem}>
          <div className={styles.sidebarIcon}>
            <Icon name="bookmark" />
          </div>
          <div className={styles.sidebarMetadata}>
            <div className={styles.sidebarTitle}>Bookmarks</div>
            <div className={styles.sidebarSubtitle}>Idk your favorites?</div>
          </div>
        </div>

        {recents.map(({ title, subtitle }, index) => {
          return (
            <div key={index} className={styles.sidebarItem}>
              <div className={styles.sidebarIcon}>
                <Icon name="person" />
              </div>
              <div className={styles.sidebarMetadata}>
                <div className={styles.sidebarTitle}>{title}</div>
                <div className={styles.sidebarSubtitle}>{subtitle}</div>
              </div>
            </div>
          )
        })}
      </div> */}
    </div>
  )
}
