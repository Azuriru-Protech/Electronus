import Icon from '@renderer/components/widgets/Icon/Icon'
import styles from './ChatSidebar.module.scss'
import { Avatar, Badge, Button, Dropdown, Input, message, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { getAllUsers, getData, toReadableDate, toReadableTime } from '@renderer/utilities/Utilities'
import { Link, useLocation } from 'react-router-dom'
import { sampleChats } from '@renderer/sampleData'
import { contextMenuItemStyle, contextMenuStyle } from '@renderer/configs/common'
import { User } from '@renderer/models/models'
import Profile from '@renderer/components/widgets/Profile/Profile'

export default function ChatSidebar() {
  const [chats, setChats] = useState<any>(sampleChats)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false)
  const [messageApi, messageContextHolder] = message.useMessage()
  const [searchResult, setSearchResult] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [mode, setMode] = useState<'search' | 'add'>('search')
  const { pathname } = useLocation()

  useEffect(() => {
    const currentUser = getData<User>('currentUser')
    setCurrentUser(currentUser)
  }, [])

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
    const allUsers = getAllUsers()
    const result = allUsers.filter(
      (u) => u.name.toLowerCase().includes(value.toLowerCase()) || u.id.toString().includes(value)
    )
    setSearchResult(result)
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
                key={chat.id}
                trigger={['contextMenu']}
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
        title={
          mode === 'search' ? (
            'Add Friend'
          ) : (
            <Button
              onClick={() => {
                setMode('search')
              }}
              shape="circle"
              type="text"
            >
              <Icon name="chevron_left" />
            </Button>
          )
        }
        open={isAddFriendModalOpen}
        onOk={() => setIsAddFriendModalOpen(false)}
        onCancel={() => {
          setSearchResult([])
          setIsAddFriendModalOpen(false)
        }}
        centered
        destroyOnClose={true}
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
        {mode === 'search' && (
          <>
            <div className={styles.addFriendInputSection}>
              <Input.Search placeholder="input search text" onSearch={onSearch} enterButton />
              <p>My ID: {currentUser?.id}</p>
            </div>
            <div className={styles.addFriendResult}>
              <p className={styles.addFriendResultTitle}>Search Result</p>
              {searchResult.map((user) => (
                <div
                  className={styles.addFriendItem}
                  key={user.id}
                  onClick={() => {
                    setMode('add')
                    setSelectedUser(user)
                  }}
                >
                  <Avatar src={user.imageUrl} icon={<Icon name="person" fill />} size={36} />
                  <div>
                    <h4>{user.name}</h4>
                    <p>ID: {user.id}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {mode === 'add' && selectedUser && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Profile {...selectedUser} />
          </div>
        )}
      </Modal>
      {messageContextHolder}
    </>
  )
}
