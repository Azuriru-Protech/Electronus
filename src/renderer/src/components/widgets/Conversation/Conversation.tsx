import Icon from '@renderer/components/widgets/Icon/Icon'
import styles from './Conversation.module.scss'
import { Avatar, Button, Checkbox, Dropdown, FloatButton, GetProp, message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { toReadableTime } from '@renderer/utilities/Utilities'
import ChatSettingsDrawer from '@renderer/components/widgets/ChatSettingsDrawer/ChatSettingsDrawer'
import GroupSettingsDrawer from '@renderer/components/widgets/GroupSettingsDrawer/GroupSettingsDrawer'
import Topbar from '@renderer/components/layouts/Topbar/Topbar'
import { Message } from '@renderer/sampleData'
import ForwardIcon from '@renderer/assets/images/icons/forward.svg'
import ChatInput from '@renderer/components/widgets/ChatInput/ChatInput'
import {
  BaseMessage,
  Call,
  CometChat,
  CustomMessage,
  Group,
  InteractiveMessage,
  MediaMessage,
  TextMessage,
  User
} from '@cometchat/chat-sdk-javascript'
import { v4 } from 'uuid'
import { setUser } from '@renderer/lib/features/user/userSlice'

type Props = {
  conversation: CometChat.Conversation
  currentUser: User
}

export default function Conversation({ conversation, currentUser }: Props) {
  const [messages, setMessages] = useState<BaseMessage[]>([])
  const [selectionMode, setSelectionMode] = useState(false)
  const [selectedMessageIds, setSelectedMessageIds] = useState<number[]>([])
  const [isChatSettingsDrawerOpen, setIsChatSettingsDrawerOpen] = useState(false)
  const [isGroupSettingsDrawerOpen, setIsGroupSettingsDrawerOpen] = useState(false)
  const [replyChat, setReplyChat] = useState<Message | null>(null)
  const [modal, modalContextHolder] = Modal.useModal()
  const [messageApi, messageContextHolder] = message.useMessage()

  const [messageListenerId, setMessageListenerId] = useState<string>(v4())

  useEffect(() => {
    // setMessages(messages)
    // setChatInfo(chatInfo)
    // setChatType(chatInfo?.type || 'chat')
    // console.log(chatId)
    getMessages()
    subMessageListener()

    return () => {
      CometChat.removeMessageListener(messageListenerId)
    }
  }, [])

  const onChange: GetProp<typeof Checkbox.Group<number>, 'onChange'> = (checkedValues) => {
    setSelectedMessageIds(checkedValues)
  }

  const selectMessage = (messageId: number) => {
    if (!selectionMode) {
      return
    }
    if (selectedMessageIds.includes(messageId)) {
      setSelectedMessageIds(selectedMessageIds.filter((id) => id !== messageId))
      return
    }
    if (selectedMessageIds.length === 0) {
      setSelectedMessageIds([messageId])
    } else {
      setSelectedMessageIds([...selectedMessageIds, messageId])
    }
  }

  const deleteMessage = async (messageId: number) => {
    const confirm = await modal.confirm({
      title: 'Delete Message',
      content: 'Are you sure you want to delete this message?',
      centered: true
    })
    if (!confirm) {
      return
    }
    const a = await CometChat.deleteMessage(messageId.toString()) //UNDO LATER

    // setMessages(messages.filter((m) => m.getId() !== messageId))
    messageApi.open({
      type: 'success',
      content: 'Message deleted successfully'
    })
  }

  const isDateShow = (lastDateStr: string | null, currentDateStr: string) => {
    const lastDate = lastDateStr ? new Date(lastDateStr) : null
    const currentDate = new Date(currentDateStr)
    if (!lastDate) {
      return true
    }
    const isDateSame = lastDate.getDate() === currentDate.getDate()
    const isMonthSame = lastDate.getMonth() === currentDate.getMonth()
    const isYearSame = lastDate.getFullYear() === currentDate.getFullYear()
    return !isDateSame || !isMonthSame || !isYearSame
  }

  const getMessages = async () => {
    const limit: number = 30
    const messagesRequest = new CometChat.MessagesRequestBuilder().setLimit(limit)
    if (conversation.getConversationType() === 'group') {
      messagesRequest.setGUID((conversation.getConversationWith() as Group).getGuid())
    } else {
      messagesRequest.setUID((conversation.getConversationWith() as User).getUid())
    }
    const messages = await messagesRequest.build().fetchPrevious()
    setMessages(messages)
  }

  const getConversationSubtitle = () => {
    if (conversation.getConversationType() === 'group') {
      const group = conversation.getConversationWith() as Group
      return `${group.getMembersCount()} Members`
    } else {
      const user = conversation.getConversationWith() as User
      if (user.getStatus() === 'online') {
        return 'Online'
      } else {
        console.log(user.getLastActiveAt())
        return toReadableTime(user.getLastActiveAt())
      }
    }
  }

  const getConversationImageUrl = () => {
    if (conversation.getConversationType() === 'group') {
      const group = conversation?.getConversationWith() as Group
      if (group?.getIcon) {
        return group?.getIcon()
      }
    } else {
      const user = conversation?.getConversationWith() as User
      if (user?.getName()) {
        return user.getName()
      }
    }
    return ''
  }

  const subMessageListener = () => {
    CometChat.addMessageListener(
      messageListenerId,
      new CometChat.MessageListener({
        onMessageDeleted: (message: BaseMessage) => {
          // replace deleted message
          setMessages((prevMessages) => {
            const newMessages = prevMessages.map((m) => {
              if (m.getId() === message.getId()) {
                return message
              } else {
                return m
              }
            })
            return newMessages
          })
        },
        onTextMessageReceived: (textMessage: TextMessage) => {
          setMessages((prevMessages) => [...prevMessages, textMessage])
        },
        onMediaMessageReceived: (mediaMessage: MediaMessage) => {
          setMessages((prevMessages) => [...prevMessages, mediaMessage])
        },
        onCustomMessageReceived: (customMessage: CustomMessage) => {
          setMessages((prevMessages) => [...prevMessages, customMessage])
        }
      })
    )
  }

  return (
    <>
      <div className={styles.chatContainer}>
        <Topbar className={styles.chatTopbar}>
          <div>
            <h5>{conversation?.getConversationWith().getName()}</h5>
            <p className={styles.chatSubtitle}>{getConversationSubtitle()}</p>
          </div>
          <Button
            type="text"
            icon={<Icon name="more_horiz" />}
            onClick={() => {
              if (conversation.getConversationType() === 'group') {
                setIsGroupSettingsDrawerOpen(true)
              } else {
                setIsChatSettingsDrawerOpen(true)
              }
            }}
          ></Button>
        </Topbar>
        <div className={styles.chatroomWrapper}>
          <Checkbox.Group
            className={styles.chatroom}
            onChange={onChange}
            value={selectedMessageIds}
          >
            {messages.map((message, index) => (
              <React.Fragment key={message.getId()}>
                {message.getCategory() !== 'action' && (
                  <>
                    {/* {isDateShow(messages[index - 1]?.sentAt || null, message.sentAt) && (
                  <div className={styles.dateWrapper}>
                    <div className={styles.dateContainer}>{toReadableDate(message.sentAt)}</div>
                  </div>
                )} */}
                    <div
                      className={`${styles.messageItem} ${selectionMode && styles.selectionMode} ${
                        selectedMessageIds.find((id) => id === message.getId()) && styles.selected
                      }`}
                      onClick={() => {
                        selectMessage(message.getId())
                      }}
                    >
                      {selectionMode && (
                        <div className={styles.messageItemCheckboxWrapper}>
                          <Checkbox value={message.getId()}></Checkbox>
                        </div>
                      )}
                      <div className={styles.messageItemContent}>
                        <div
                          className={`${styles.messageWrapper} ${message.getSender().getUid() === currentUser?.getUid() && styles.messageWrapperAuthor}`}
                        >
                          <Dropdown
                            menu={{
                              items: [
                                { label: 'Mute', key: 'mute' },
                                { label: 'Remove from Group', key: 'remove' }
                              ]
                            }}
                            trigger={['contextMenu']}
                          >
                            <div style={{ width: 32 }}>
                              {(messages[index - 1]?.getSender().getUid() !==
                                message.getSender().getUid() ||
                                index === 0) && (
                                <Avatar
                                  src={message.getSender().getAvatar()}
                                  icon={<Icon name="person" fill size={24} />}
                                />
                              )}
                            </div>
                          </Dropdown>
                          <Dropdown
                            menu={{
                              items: [
                                {
                                  label: 'reply',
                                  key: 'reply',
                                  onClick: () => {
                                    // setReplyChat(message)
                                  }
                                },
                                { label: 'forward', key: 'forward' },
                                {
                                  label: 'select',
                                  key: 'select',
                                  onClick: () => {
                                    setSelectionMode(true)
                                    selectMessage(message.getId())
                                  }
                                },
                                {
                                  label: 'copy',
                                  key: 'copy',
                                  onClick: async () => {
                                    const text = message.getData().getText()
                                    await navigator.clipboard.writeText(text)
                                    const ready = await navigator.clipboard.readText()
                                    if (ready === text) {
                                      messageApi.open({
                                        type: 'success',
                                        content: 'Message copied successfully'
                                      })
                                    } else {
                                      messageApi.open({
                                        type: 'error',
                                        content: 'Message copy failed'
                                      })
                                    }
                                  }
                                },
                                { label: 'pin', key: 'pin' },
                                { label: 'save', key: 'save' },
                                {
                                  label: 'delete',
                                  key: 'delete',
                                  onClick: () => {
                                    deleteMessage(message.getId())
                                  }
                                }
                              ]
                            }}
                            trigger={['contextMenu']}
                          >
                            <div
                              className={`${styles.messageContainer} ${message.getSender().getUid() === currentUser?.getUid() && styles.messageContainerAuthor}`}
                            >
                              {message.getCategory() === 'message' && !message.getDeletedAt() && (
                                <>
                                  {message.getType() === 'text' && (
                                    <p className={styles.message}>
                                      {(message as TextMessage).getText()}
                                    </p>
                                  )}
                                  {message.getType() === 'video' && (
                                    <p className={styles.message}>
                                      this is a video message:{(message as MediaMessage).getURL()}
                                      <video
                                        src={(message as MediaMessage).getURL()}
                                        controls
                                        preload="none"
                                        height={200}
                                      ></video>
                                    </p>
                                  )}
                                  {message.getType() === 'audio' && (
                                    <p className={styles.message}>
                                      this is a audio message:{(message as MediaMessage).getURL()}
                                      <audio src={(message as MediaMessage).getURL()}></audio>
                                    </p>
                                  )}
                                </>
                              )}
                              {message.getCategory() === 'message' && message.getDeletedAt() && (
                                <p className={styles.messageDeleted}>
                                  This message has been deleted
                                </p>
                              )}
                              {message.getCategory() === 'call' && (
                                <>
                                  {message.getType() === 'audio' && (
                                    <p className={styles.message}>this is a call</p>
                                  )}
                                  {message.getType() === 'video' && (
                                    <p className={styles.message}>
                                      {message.getSender().getName()} has{' '}
                                      {(message as Call).getAction()} video call
                                    </p>
                                  )}
                                </>
                              )}
                              {message.getCategory() === 'custom' && (
                                <>
                                  {message.getType() === 'meeting' && (
                                    <p className={styles.message}>this is a meeting call</p>
                                  )}
                                </>
                              )}
                              <div className={styles.messageInfo}>
                                <p className={styles.messageTimestamp}>
                                  {toReadableTime(message.getSentAt())}
                                </p>
                                {message.getSender().getUid() === currentUser?.getUid() && (
                                  <>
                                    {message.getReadAt() && (
                                      <Icon name="done_all" fill color="lightgreen" size={14} />
                                    )}
                                    {!message.getReadAt() && message.getDeliveredAt() && (
                                      <Icon name="done_all" fill color="#9e9e9e" size={14} />
                                    )}
                                    {!message.getReadAt() &&
                                      !message.getDeliveredAt() &&
                                      message.getSentAt() && (
                                        <Icon name="check" fill color="#9e9e9e" size={14} />
                                      )}
                                  </>
                                )}
                              </div>
                            </div>
                          </Dropdown>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </React.Fragment>
            ))}
          </Checkbox.Group>
          <FloatButton
            icon={<Icon name="arrow_downward" />}
            type="default"
            style={{ bottom: 20, position: 'absolute' }}
          />
        </div>
        <div className={`${styles.replyPreviewWrapper} ${replyChat ? '' : styles.hide}`}>
          <div className={styles.replyPreviewContent}>
            <div className={styles.replyPreviewLine}></div>
            <div className={styles.replyPreview}>
              <p className={styles.replyPreviewTitle}>{replyChat?.author}</p>
              <p className={styles.replyPreviewMessage}>{replyChat?.message}</p>
            </div>
          </div>
          <Button
            icon={<Icon name="close" />}
            type="text"
            shape="circle"
            onClick={() => setReplyChat(null)}
          />
        </div>
        {selectionMode ? (
          <div className={styles.selectionActionContainer}>
            <div className={styles.selectionActionWrapper}>
              <div
                className={styles.selectionAction}
                onClick={() => {
                  //todo
                }}
              >
                <Button
                  type="primary"
                  icon={<img src={ForwardIcon} style={{ width: '1.5rem', height: '100%' }} />}
                  shape="circle"
                  style={{ backgroundColor: 'white', color: 'black', padding: '1.5rem' }}
                  size="large"
                />
                <p className={styles.selectionActionText}>Forward</p>
              </div>
              <div
                className={styles.selectionAction}
                onClick={() => {
                  //todo
                }}
              >
                <Button
                  type="primary"
                  icon={<Icon name="bookmark" />}
                  shape="circle"
                  style={{ backgroundColor: 'white', color: 'black', padding: '1.5rem' }}
                  size="large"
                />
                <p className={styles.selectionActionText}>Collection</p>
              </div>
              <div
                className={styles.selectionAction}
                onClick={() => {
                  //todo
                }}
              >
                <Button
                  type="primary"
                  icon={<Icon name="delete" />}
                  shape="circle"
                  style={{ backgroundColor: 'white', color: 'black', padding: '1.5rem' }}
                  size="large"
                />
                <p className={styles.selectionActionText}>Delete</p>
              </div>
              <div className={styles.selectionClose}>
                <Button
                  icon={<Icon name="close" />}
                  type="text"
                  shape="circle"
                  size="large"
                  onClick={() => {
                    setSelectionMode(false)
                    setSelectedMessageIds([])
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <ChatInput />
        )}
        <ChatSettingsDrawer
          isOpen={isChatSettingsDrawerOpen}
          setIsOpen={setIsChatSettingsDrawerOpen}
        />
        <GroupSettingsDrawer
          isOpen={isGroupSettingsDrawerOpen}
          setIsOpen={setIsGroupSettingsDrawerOpen}
        />
      </div>
      <div>{modalContextHolder}</div>
      <div>{messageContextHolder}</div>
    </>
  )
}
