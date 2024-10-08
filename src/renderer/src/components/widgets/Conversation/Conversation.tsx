import Icon from '@renderer/components/widgets/Icon/Icon'
import styles from './Conversation.module.scss'
import { Avatar, Button, Checkbox, Dropdown, FloatButton, GetProp, message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { toReadableTime } from '@renderer/utilities/Utilities'
import GroupSettingsDrawer from '@renderer/components/widgets/GroupSettingsDrawer/GroupSettingsDrawer'
import Topbar from '@renderer/components/layouts/Topbar/Topbar'
import { Message } from '@renderer/sampleData'
import ForwardIcon from '@renderer/assets/images/icons/forward.svg'
import ChatInput from '@renderer/components/widgets/ChatInput/ChatInput'
import { CometChat } from '@cometchat/chat-sdk-javascript'
import { v4 } from 'uuid'
import { setUser } from '@renderer/lib/features/user/userSlice'
import {
  CometChatCallButtons,
  CometChatCallEvents,
  CometChatDocumentBubble,
  CometChatOngoingCall,
  CometChatOutgoingCall
} from '@cometchat/chat-uikit-react'
import { CometChatCalls } from '@cometchat/calls-sdk-javascript'
import { divRef } from '@renderer/pages/Home/Home'
import ConversationUserSettings from '../ConversationUserSettings/ConversationUserSettings'

type Props = {
  conversation: CometChat.Conversation
  currentUser: CometChat.User
  updateConversationList: (
    message:
      | CometChat.BaseMessage
      | CometChat.TextMessage
      | CometChat.MediaMessage
      | CometChat.CustomMessage
  ) => void
}

export default function Conversation({ conversation, currentUser, updateConversationList }: Props) {
  const [messages, setMessages] = useState<CometChat.BaseMessage[]>([])
  const [selectionMode, setSelectionMode] = useState(false)
  const [selectedMessageIds, setSelectedMessageIds] = useState<number[]>([])
  const [isConversationSettingsOpen, setIsConversationSettingsOpen] = useState(false)
  const [replyChat, setReplyChat] = useState<Message | null>(null)
  const [modal, modalContextHolder] = Modal.useModal()
  const [messageApi, messageContextHolder] = message.useMessage()
  const [call, setCall] = useState<CometChat.Call | null>(null)
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
      messagesRequest.setGUID((conversation.getConversationWith() as CometChat.Group).getGuid())
    } else {
      messagesRequest.setUID((conversation.getConversationWith() as CometChat.User).getUid())
    }
    const messages = await messagesRequest.build().fetchPrevious()
    setMessages(messages)
  }

  const getConversationSubtitle = () => {
    if (conversation.getConversationType() === 'group') {
      const group = conversation.getConversationWith() as CometChat.Group
      return `${group.getMembersCount()} Members`
    } else {
      const user = conversation.getConversationWith() as CometChat.User
      if (user.getStatus() === 'online') {
        return 'Online'
      } else {
        return toReadableTime(user.getLastActiveAt())
      }
    }
  }

  const getConversationImageUrl = () => {
    if (conversation.getConversationType() === 'group') {
      const group = conversation?.getConversationWith() as CometChat.Group
      if (group?.getIcon) {
        return group?.getIcon()
      }
    } else {
      const user = conversation?.getConversationWith() as CometChat.User
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
        onMessageDeleted: (message: CometChat.BaseMessage) => {
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
          // updateConversationList(message)
        },
        onTextMessageReceived: (textMessage: CometChat.TextMessage) => {
          console.log(textMessage)

          setMessages((prevMessages) => [...prevMessages, textMessage])
          // updateConversationList(textMessage)
        },
        onMediaMessageReceived: (mediaMessage: CometChat.MediaMessage) => {
          setMessages((prevMessages) => [...prevMessages, mediaMessage])
          // updateConversationList(mediaMessage)
        },
        onCustomMessageReceived: (customMessage: CometChat.CustomMessage) => {
          setMessages((prevMessages) => [...prevMessages, customMessage])
          // updateConversationList(customMessage)
        }
      })
    )
  }
  // const startVideoCall = async () => {
  //   const callType: string = CometChat.CALL_TYPE.VIDEO
  //   const receiverType: string = CometChat.RECEIVER_TYPE.USER
  //   const callRequest = new CometChat.Call(
  //     (conversation.getConversationWith() as User).getUid(),
  //     callType,
  //     receiverType
  //   )
  //   const call = await CometChat.initiateCall(callRequest)
  //   setCall(call)
  // }

  // const cancelCall = async () => {
  //   if (!call) {
  //     return
  //   }
  //   await CometChat.endCall(call.getSessionId())
  //   setCall(null)
  // }

  const joinMeeting = async (message: CometChat.CustomMessage) => {
    const tokenResult = await CometChatCalls.generateToken(
      (message.getCustomData() as any).sessionId,
      currentUser.getAuthToken()
    )
    const callSettings = new CometChatCalls.CallSettingsBuilder()
      .enableDefaultLayout(true)
      .setIsAudioOnlyCall(false)
      .setCallListener(
        new CometChatCalls.OngoingCallListener({
          onCallEndButtonPressed: () => {
            divRef.current!.style.display = 'none'
          },
          onError: (error) => {
            console.log('Error :', error)
          }
        })
      )
      .build()
    await CometChatCalls.startSession(tokenResult.token, callSettings, divRef.current!)
    divRef.current!.style.display = 'block'
  }

  return (
    <>
      <div className={`${styles.wrapper} ${isConversationSettingsOpen && styles.settingsOpen}`}>
        <div className={styles.chatContainer}>
          <Topbar className={styles.chatTopbar}>
            <div>
              <h5>{conversation?.getConversationWith().getName()}</h5>
              <p className={styles.chatSubtitle}>{getConversationSubtitle()}</p>
            </div>
            <div className={styles.chatAction}>
              {conversation.getConversationType() === 'group' && (
                <CometChatCallButtons
                  group={conversation.getConversationWith() as CometChat.Group}
                  videoCallIconText=""
                  callButtonsStyle={{ buttonBackground: 'transparent', buttonPadding: '0' }}
                />
              )}
              {conversation.getConversationType() === 'user' && (
                <CometChatCallButtons
                  user={conversation.getConversationWith() as CometChat.User}
                  voiceCallIconText=""
                  videoCallIconText=""
                  callButtonsStyle={{ buttonBackground: 'transparent', buttonPadding: '0' }}
                />
              )}
              <Button
                type="text"
                icon={<Icon name="more_horiz" />}
                onClick={() => {
                  setIsConversationSettingsOpen(!isConversationSettingsOpen)
                }}
              />
            </div>
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
                              <div style={{ position: 'relative' }}>
                                <div
                                  className={`${styles.messageContainer} ${message.getSender().getUid() === currentUser?.getUid() && styles.messageContainerAuthor} ${
                                    (messages[index - 1]?.getSender().getUid() !==
                                      message.getSender().getUid() ||
                                      index === 0) &&
                                    styles.messageContainerFirst
                                  }`}
                                >
                                  {message.getCategory() === 'message' &&
                                    !message.getDeletedAt() && (
                                      <>
                                        {message.getType() === 'text' && (
                                          <p className={styles.message}>
                                            {(message as CometChat.TextMessage).getText()}
                                          </p>
                                        )}
                                        {message.getType() === 'video' && (
                                          <p className={styles.message}>
                                            this is a video message:
                                            {(message as CometChat.MediaMessage).getURL()}
                                            <video
                                              src={(message as CometChat.MediaMessage).getURL()}
                                              controls
                                              preload="none"
                                              height={200}
                                            ></video>
                                          </p>
                                        )}
                                        {message.getType() === 'audio' && (
                                          <p className={styles.message}>
                                            this is a audio message:
                                            {(message as CometChat.MediaMessage).getURL()}
                                            <audio
                                              src={(message as CometChat.MediaMessage).getURL()}
                                            ></audio>
                                          </p>
                                        )}
                                      </>
                                    )}
                                  {message.getCategory() === 'message' &&
                                    message.getDeletedAt() && (
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
                                          {(message as CometChat.Call).getAction()} video call
                                        </p>
                                      )}
                                    </>
                                  )}
                                  {message.getCategory() === 'custom' && (
                                    <>
                                      {message.getType() === 'meeting' && (
                                        <>
                                          <p className={styles.message}>this is a meeting call</p>
                                          <Button
                                            type="primary"
                                            onClick={() =>
                                              joinMeeting(message as CometChat.CustomMessage)
                                            }
                                          >
                                            Join Meeting
                                          </Button>
                                        </>
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
            <ChatInput conversation={conversation} />
          )}
          {/* <ChatSettingsDrawer
            isOpen={isChatSettingsDrawerOpen}
            setIsOpen={setIsChatSettingsDrawerOpen}
          />
          {conversation.getConversationType() === 'group' && (
            <GroupSettingsDrawer
              isOpen={isGroupSettingsDrawerOpen}
              setIsOpen={setIsGroupSettingsDrawerOpen}
              group={conversation.getConversationWith() as CometChat.Group}
            />
          )} */}
        </div>

        <div className={`${styles.settingsWrapper} ${isConversationSettingsOpen && styles.active}`}>
          {conversation.getConversationType() === 'user' && (
            <ConversationUserSettings user={conversation.getConversationWith() as CometChat.User} />
          )}
        </div>
      </div>

      <div>{modalContextHolder}</div>
      <div>{messageContextHolder}</div>
    </>
  )
}
