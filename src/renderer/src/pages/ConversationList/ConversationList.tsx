import { useEffect, useState } from 'react'
import styles from './ConversationList.module.scss'
import { CometChat, Group, User } from '@cometchat/chat-sdk-javascript'
import { v4 } from 'uuid'
import { Avatar, Badge, Button, Dropdown, Input, message, Modal } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { getAllUsers, toReadableDate, toReadableTime } from '@renderer/utilities/Utilities'
import Icon from '@renderer/components/widgets/Icon/Icon'
import { contextMenuItemStyle, contextMenuStyle } from '@renderer/configs/common'
import Profile from '@renderer/components/widgets/Profile/Profile'
import Conversation from '../../components/widgets/Conversation/Conversation'

export default function ConversationList() {
  const { pathname } = useLocation()
  const [conversations, setConversations] = useState<CometChat.Conversation[]>([])
  const [currentUser, setCurrentUser] = useState<any | null>(null)
  const [userPresenceListenerId, setUserPresenceListenerId] = useState<string>(v4())
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false)
  const [messageApi, messageContextHolder] = message.useMessage()
  const [searchResult, setSearchResult] = useState<any[]>([])
  const [selectedUser, setSelectedUser] = useState<any | null>(null)
  const [mode, setMode] = useState<'search' | 'add'>('search')
  const [activeConversation, setActiveConversation] = useState<CometChat.Conversation | null>(null)

  useEffect(() => {
    getCurrentUser()
    getConversations()
    subUserPresence()
    return () => {
      CometChat.removeUserListener(userPresenceListenerId)
    }
  }, [])

  const getConversations = async () => {
    const limit = 30
    const conversationRequest = new CometChat.ConversationsRequestBuilder().setLimit(limit).build()
    const conversations = await conversationRequest.fetchNext()
    setConversations(conversations)
  }

  const subUserPresence = () => {
    CometChat.addUserListener(
      userPresenceListenerId,
      new CometChat.UserListener({
        onUserOnline: (onlineUser: User) => {
          updateConversation(onlineUser)
        },
        onUserOffline: (offlineUser: User) => {
          updateConversation(offlineUser)
        }
      })
    )
  }

  const updateConversation = (conversationWith: User) => {
    setConversations((prevConversations) => {
      return prevConversations.map((c) => {
        if (c.getConversationType() === 'user') {
          if ((c.getConversationWith() as User).getUid() === conversationWith.getUid()) {
            c.setConversationWith(conversationWith)
          }
        }
        return c
      })
    })
  }

  const getCurrentUser = async () => {
    const user = await CometChat.getLoggedInUser()
    setCurrentUser(user)
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
      <style jsx>
        {`
          @media (max-width: 576px) {
            .chat-sidebar-wrapper {
              display: ${pathname === '/chat' ? 'block' : 'none'};
            }
          }
          .chat-content-wrapper {
            height: 100vh;
            height: 100dvh;
          }
          @media (max-width: 576px) {
            .chat-content-wrapper {
              display: ${pathname === '/chat' ? 'none' : 'block'};
            }
          }
        `}
      </style>
      <div className={styles.wrapper}>
        <div className="chat-sidebar-wrapper">
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
                    <div
                      className={`${styles.chat} ${conversation.getConversationId() === activeConversation?.getConversationId() && styles.active}`}
                      onClick={() => setActiveConversation(conversation)}
                    >
                      {conversation.getConversationType() === 'user' &&
                      (conversation.getConversationWith() as User).getStatus() === 'online' ? (
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
                      ) : (
                        <Avatar
                          src={
                            conversation.getConversationType() === 'group'
                              ? (conversation.getConversationWith() as Group).getIcon()
                              : (conversation.getConversationWith() as User).getAvatar()
                          }
                          icon={<Icon name="person" fill size={24} />}
                        />
                      )}
                      <div className={styles.chatContent}>
                        <div className={styles.chatContentUpper}>
                          <div className={styles.chatContentTitle}>
                            {conversation.getConversationWith().getName()}
                          </div>
                          <div className={styles.chatContentTimestamp}>
                            {getTimestamp(conversation.getLastMessage().getSentAt())}
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
                    </div>
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
        </div>
        <div className="chat-content-wrapper">
          {activeConversation && (
            <Conversation
              key={activeConversation.getConversationId()}
              conversation={activeConversation}
              currentUser={currentUser}
            />
          )}
        </div>
      </div>
    </>
  )
}
