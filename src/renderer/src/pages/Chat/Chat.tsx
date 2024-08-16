import Icon from '@renderer/components/widgets/Icon/Icon'
import styles from './Chat.module.scss'
import ChatSidebar from '@renderer/components/layouts/ChatSidebar/ChatSidebar'
import { useParams } from 'react-router-dom'
import { Avatar, Button, Checkbox, Dropdown, FloatButton, GetProp, message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { toReadableDate, toReadableTime } from '@renderer/utilities/Utilities'
import ChatSettingsDrawer from '@renderer/components/widgets/ChatSettingsDrawer/ChatSettingsDrawer'
import GroupSettingsDrawer from '@renderer/components/widgets/GroupSettingsDrawer/GroupSettingsDrawer'
import Topbar from '@renderer/components/layouts/Topbar/Topbar'
import { ChatRoom, Message, sampleChats, sampleMessages } from '@renderer/sampleData'
import ForwardIcon from '@renderer/assets/images/icons/forward.svg'
import ChatInput from '@renderer/components/widgets/ChatInput/ChatInput'

export default function Chat() {
  const { chatId } = useParams()
  const [chatType, setChatType] = useState<'chat' | 'group'>('chat')
  const [chatInfo, setChatInfo] = useState<ChatRoom>(sampleChats[0])
  const [messages, setMessages] = useState<Message[]>([])
  const [selectionMode, setSelectionMode] = useState(false)
  const [selectedMessages, setSelectedMessages] = useState<number[]>([])
  const [isChatSettingsDrawerOpen, setIsChatSettingsDrawerOpen] = useState(false)
  const [isGroupSettingsDrawerOpen, setIsGroupSettingsDrawerOpen] = useState(false)
  const [replyChat, setReplyChat] = useState<Message | null>(null)
  const [deleteMessageModal, deleteMessageContextHolder] = Modal.useModal()
  const [recallMessageModal, recallMessageContextHolder] = Modal.useModal()
  const [messageApi, messageContextHolder] = message.useMessage()

  useEffect(() => {
    const messages = sampleMessages.map((m) => ({ ...m, sendByAuthor: m.author === 1 }))
    setMessages(messages)
    if (Number.isNaN(Number(chatId))) {
      return
    }
    const chatInfo = sampleChats.find((c) => c.id === Number(chatId))!
    setChatInfo(chatInfo)
    setChatType(chatInfo?.type || 'chat')
  }, [chatId])

  const onChange: GetProp<typeof Checkbox.Group<number>, 'onChange'> = (checkedValues) => {
    setSelectedMessages(checkedValues)
  }

  const selectMessage = (messageId: number) => {
    if (!selectionMode) {
      return
    }
    if (selectedMessages.includes(messageId)) {
      setSelectedMessages(selectedMessages.filter((id) => id !== messageId))
      return
    }
    if (selectedMessages.length === 0) {
      setSelectedMessages([messageId])
    } else {
      setSelectedMessages([...selectedMessages, messageId])
    }
  }

  const deleteMessage = async (messageId: number) => {
    const confirm = await deleteMessageModal.confirm({
      title: 'Delete Message',
      content: 'Are you sure you want to delete this message?',
      centered: true
    })
    if (!confirm) {
      return
    }
    setMessages(messages.filter((m) => m.id !== messageId))
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

  return (
    <>
      <div className={styles.wrapper}>
        <ChatSidebar />
        <div className={styles.chatContainer}>
          <Topbar className={styles.chatTopbar}>
            <div>
              <h5>Name</h5>
              <p className={styles.chatSubtitle}>Online</p>
            </div>
            <Button
              type="text"
              icon={<Icon name="more_horiz" />}
              onClick={() => {
                if (chatType === 'group') {
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
              value={selectedMessages}
            >
              {messages.map((message, index) => (
                <React.Fragment key={message.id}>
                  {isDateShow(messages[index - 1]?.sentAt || null, message.sentAt) && (
                    <div className={styles.dateWrapper}>
                      <div className={styles.dateContainer}>{toReadableDate(message.sentAt)}</div>
                    </div>
                  )}
                  <div
                    className={`${styles.messageItem} ${selectionMode && styles.selectionMode} ${
                      selectedMessages.find((id) => id === message.id) && styles.selected
                    }`}
                    onClick={() => {
                      selectMessage(message.id)
                    }}
                  >
                    {selectionMode && (
                      <div className={styles.messageItemCheckboxWrapper}>
                        <Checkbox value={message.id}></Checkbox>
                      </div>
                    )}
                    <div className={styles.messageItemContent}>
                      <div
                        className={`${styles.messageWrapper} ${message.sendByAuthor && styles.messageWrapperAuthor}`}
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
                            {index === 0 ? (
                              <Avatar
                                src={chatInfo.imageUrl}
                                icon={<Icon name="person" fill size={24} />}
                              />
                            ) : (
                              messages[index - 1].author !== message.author && (
                                <Avatar
                                  src={chatInfo.imageUrl}
                                  icon={<Icon name="person" fill size={24} />}
                                />
                              )
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
                                  setReplyChat(message)
                                }
                              },
                              { label: 'forward', key: 'forward' },
                              {
                                label: 'select',
                                key: 'select',
                                onClick: () => {
                                  setSelectionMode(true)
                                  selectMessage(message.id)
                                }
                              },
                              {
                                label: 'copy',
                                key: 'copy',
                                onClick: async () => {
                                  await navigator.clipboard.writeText(message.message)
                                  const ready = await navigator.clipboard.readText()
                                  if (ready === message.message) {
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
                                  deleteMessage(message.id)
                                }
                              }
                            ]
                          }}
                          trigger={['contextMenu']}
                        >
                          <div
                            className={`${styles.messageContainer} ${message.sendByAuthor && styles.messageContainerAuthor}`}
                          >
                            <p className={styles.message}>{message.message}</p>
                            <div className={styles.messageInfo}>
                              <p className={styles.messageTimestamp}>
                                {toReadableTime(message.sentAt)}
                              </p>
                              {message.sendByAuthor && message.seenAt && (
                                <Icon name="done_all" fill color="#9e9e9e" size={14} />
                              )}
                              {message.sendByAuthor && !message.seenAt && message.sentAt && (
                                <Icon name="check" fill color="#9e9e9e" size={14} />
                              )}
                            </div>
                          </div>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
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
                      setSelectedMessages([])
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
      </div>
      <div>{deleteMessageContextHolder}</div>
      <div>{recallMessageContextHolder}</div>
      <div>{messageContextHolder}</div>
    </>
  )
}
