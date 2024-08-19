import Icon from '@renderer/components/widgets/Icon/Icon'
import styles from './ChatSidebar.module.scss'
import { Avatar, Badge, Button, Dropdown, Input, message, Modal } from 'antd'
import { useState } from 'react'
import { toReadableDate, toReadableTime } from '@renderer/utilities/Utilities'
import { Link, useLocation } from 'react-router-dom'
import { sampleChats } from '@renderer/sampleData'
import { contextMenuItemStyle, contextMenuStyle } from '@renderer/configs/common'

export default function ChatSidebar() {
  const [chats, setChats] = useState(sampleChats)
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false)
  const [messageApi, messageContextHolder] = message.useMessage()
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
  const onSearch = (value: string) => {
    // TODO
    console.log(value)
  }
  return (
    <>
      <div className={styles.chatSidebar}>
        <div className={styles.chatSidebarUtils}>
          <Input prefix={<Icon name="search" size={16} />} variant="filled" />
          <Button
            icon={<Icon name="person_add" size={16} />}
            type="text"
            onClick={() => setIsAddFriendModalOpen(true)}
          />
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
              <Dropdown
                menu={{
                  items: [
                    {
                      label: 'Pin',
                      key: 'pin',
                      style: contextMenuItemStyle,
                      onClick: () => {
                        messageApi.success('Pinned')
                      }
                    },
                    {
                      label: 'Mute',
                      key: 'muted',
                      style: contextMenuItemStyle,
                      onClick: () => messageApi.success('Muted')
                    },
                    { type: 'divider' },
                    {
                      label:
                        Number(chat.unread) > 0
                          ? `Mark as Unread (${chat.unread})`
                          : 'Mark as Unread',
                      key: 'markAsUnread',
                      style: contextMenuItemStyle,
                      onClick: () => {}
                    },
                    {
                      label: 'Clear Chat History',
                      key: 'clearChatHistory',
                      style: contextMenuItemStyle,
                      onClick: () => {
                        Modal.confirm({
                          title: 'Clear Chat History',
                          content: 'Are you sure you want to clear chat history?',
                          okText: 'Confirm',
                          cancelText: 'Cancel',
                          icon: null,
                          centered: true,
                          onOk: () => {
                            messageApi.success('Cleared')
                          }
                        })
                      }
                    },
                    { type: 'divider' },
                    {
                      label: 'Delete Chat',
                      key: 'deleteChat',
                      style: contextMenuItemStyle,
                      onClick: () => {
                        Modal.confirm({
                          title: 'Delete Chat',
                          content: 'Are you sure you want to delete this chat?',
                          okText: 'Confirm',
                          cancelText: 'Cancel',
                          icon: null,
                          centered: true,
                          onOk: () => {
                            messageApi.success('Deleted')
                          }
                        })
                      }
                    }
                  ],
                  style: contextMenuStyle
                }}
                trigger={['contextMenu']}
              >
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
                      <div className={styles.chatContentTimestamp}>
                        {getTimestamp(chat.timestamp)}
                      </div>
                    </div>
                    <div className={styles.chatContentLower}>
                      <div className={styles.chatContentDescription}>{chat.description}</div>
                      <div className={styles.chatContentIcon}>
                        {chat.pin && <Icon name="keep" fill color="#9e9e9e" size={16}></Icon>}
                        {chat.muted && (
                          <Icon name="volume_off" fill color="#9e9e9e" size={16}></Icon>
                        )}
                        {!Number.isNaN(chat.unread) && chat.unread! > 0 && (
                          <div className={styles.unreadBadge}>
                            {chat.muted ? chat.unread : null}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </Dropdown>
            ))}
        </div>
      </div>
      <Modal
        title="Add Friend"
        open={isAddFriendModalOpen}
        onOk={() => setIsAddFriendModalOpen(false)}
        onCancel={() => setIsAddFriendModalOpen(false)}
        centered
        footer={null}
        styles={{
          content: {
            padding: 0
          },
          header: {
            padding: '1rem'
          },
          footer: {
            borderRadius: '1rem'
          }
        }}
      >
        <div className={styles.addFriendInputSection}>
          <Input.Search placeholder="input search text" onSearch={onSearch} enterButton />
          <p>My ID: 1234</p>
        </div>
        <div className={styles.addFriendResult}>
          <p className={styles.addFriendResultTitle}>Search Result</p>
          <div className={styles.addFriendItem}>
            <Avatar icon={<Icon name="person" fill />} size={36} />
            <div>
              <h4>name</h4>
              <p>ID: 1234</p>
            </div>
          </div>
        </div>
      </Modal>
      {messageContextHolder}
    </>
  )
}
