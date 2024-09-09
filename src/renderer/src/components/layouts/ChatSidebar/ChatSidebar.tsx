import Icon from '@renderer/components/widgets/Icon/Icon'
import styles from './ChatSidebar.module.scss'
import { Avatar, Badge, Button, Dropdown, Input, message, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { getAllUsers, getData, toReadableDate, toReadableTime } from '@renderer/utilities/Utilities'
import { Link, useLocation } from 'react-router-dom'
import { sampleChats } from '@renderer/sampleData'
import { contextMenuItemStyle, contextMenuStyle } from '@renderer/configs/common'

import Profile from '@renderer/components/widgets/Profile/Profile'
import { CometChat, Conversation, Group, TextMessage, User } from '@cometchat/chat-sdk-javascript'

export default function ChatSidebar() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentUser, setCurrentUser] = useState<any | null>(null)
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false)
  const [messageApi, messageContextHolder] = message.useMessage()
  const [searchResult, setSearchResult] = useState<any[]>([])
  const [selectedUser, setSelectedUser] = useState<any | null>(null)
  const [mode, setMode] = useState<'search' | 'add'>('search')
  const { pathname } = useLocation()

  useEffect(() => {
    const currentUser = getData<any>('currentUser')
    setCurrentUser(currentUser)
    getConversations()
  }, [])

  const getConversations = async () => {
    const limit = 30
    const conversationRequest = new CometChat.ConversationsRequestBuilder().setLimit(limit).build()
    const conversations = await conversationRequest.fetchNext()
    setConversations(conversations)
    // conversations.forEach((c) => {
    //   console.log('conversation: ', c)
    // })
  }

  const getTimestamp = (timestamp: Date | string | number) => {
    let d
    if (typeof timestamp === 'number') {
      if (timestamp / 1000 < new Date().getTime() / 1000) {
        d = new Date(timestamp * 1000)
      } else {
        d = new Date(timestamp)
      }
    } else {
      d = new Date(timestamp)
    }
    if (d.getDate() === new Date().getDate()) {
      return toReadableTime(d)
    }
    if (d.getDate() === new Date().getDate() - 1) {
      return 'Yesterday'
    }
    return toReadableDate(d, true)
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
          {/* <Link
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
          </Link> */}
          {conversations &&
            conversations.map((conversation) => (
              <Dropdown
                key={conversation.getConversationId()}
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
                        Number(conversation.getUnreadMessageCount()) > 0
                          ? `Mark as Unread (${conversation.getUnreadMessageCount()})`
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
                  className={`${styles.chat} ${pathname.includes(`/chat/${conversation.getConversationId()}`) && styles.active}`}
                  to={`/chat/${conversation.getConversationType()}/${conversation.getConversationType() === 'group' ? (conversation.getConversationWith() as Group).getGuid() : (conversation.getConversationWith() as User).getUid()}`}
                  key={conversation.getConversationId()}
                >
                  <Badge status="success" dot classNames={{ indicator: styles.avatarBadge }}>
                    <Avatar
                      src={
                        conversation.getConversationType() === 'group'
                          ? (conversation.getConversationWith() as Group).getIcon()
                          : (conversation.getConversationWith() as User).getAvatar()
                      }
                      icon={<Icon name="person" fill size={24} />}
                    />
                  </Badge>
                  <div className={styles.chatContent}>
                    <div className={styles.chatContentUpper}>
                      <div className={styles.chatContentTitle}>
                        {conversation.getConversationWith().getName()}
                      </div>
                      <div className={styles.chatContentTimestamp}>
                        {getTimestamp(conversation.getLastMessage().sentAt)}
                      </div>
                    </div>
                    <div className={styles.chatContentLower}>
                      <div className={styles.chatContentDescription}>
                        {conversation.getLastMessage().getCategory() === 'message'
                          ? conversation.getLastMessage().getText()
                          : ''}
                      </div>
                      <div className={styles.chatContentIcon}>
                        {/* <Icon name="keep" fill color="#9e9e9e" size={16}></Icon>
                        <Icon name="volume_off" fill color="#9e9e9e" size={16}></Icon> */}
                        {conversation.getUnreadMessageCount() > 0 && (
                          <div className={styles.unreadBadge}>
                            {conversation.getUnreadMessageCount()}
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
