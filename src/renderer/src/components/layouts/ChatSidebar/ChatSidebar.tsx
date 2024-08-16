import Icon from '@renderer/components/widgets/Icon/Icon'
import styles from './ChatSidebar.module.scss'
import { Avatar, Badge, Button, Input } from 'antd'
import { useState } from 'react'
import { padZero, toReadableDate, toReadableTime } from '@renderer/utilities/Utilities'
import { Link, useLocation } from 'react-router-dom'
import { sampleChats } from '@renderer/sampleData'

export default function ChatSidebar() {
  const [chats, setChats] = useState(sampleChats)
  const { pathname } = useLocation()
  const getTimestamp = (timestamp: Date | string) => {
    const d = new Date(timestamp)
    if (d.getDate() === new Date().getDate()) {
      return toReadableTime(timestamp)
    }
    if (d.getDate() === new Date().getDate() - 1) {
      return 'Yesterday'
    }
    return toReadableDate(timestamp, true)
  }
  return (
    <div className={styles.chatSidebar}>
      <div className={styles.chatSidebarUtils}>
        <Input prefix={<Icon name="search" size={16} />} variant="filled" />
        <Button icon={<Icon name="person_add" size={16} />} />
      </div>
      <div className={styles.chatList}>
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
              <Badge status="success" dot classNames={{ indicator: styles.avatarBadge }}>
                <Avatar src={chat.imageUrl} icon={<Icon name="person" fill size={24} />} />
              </Badge>
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
                    {!Number.isNaN(chat.unread) && chat.unread! > 0 && (
                      <div className={styles.unreadBadge}>{chat.muted ? chat.unread : null}</div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}
