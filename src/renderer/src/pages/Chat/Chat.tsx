import Icon from '@renderer/components/widgets/Icon/Icon'
import styles from './Chat.module.scss'
import ChatSidebar from '@renderer/components/layouts/ChatSidebar/ChatSidebar'
import { useParams } from 'react-router-dom'
import { Avatar, Button, Checkbox, Drawer, Dropdown, GetProp, Input } from 'antd'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { EmojiClickData } from 'emoji-picker-react'
import { TextAreaRef } from 'antd/es/input/TextArea'
import { padZero } from '@renderer/utilities/Utilities'
import Separator from '@renderer/components/widgets/Separator/Separator'
import ChatSettingsDrawer from '@renderer/components/widgets/ChatSettingsDrawer/ChatSettingsDrawer'
import GroupSettingsDrawer from '@renderer/components/widgets/GroupSettingsDrawer/GroupSettingsDrawer'

type Message = {
  seenAt?: string | null
  sentAt: string
  receivedAt: string
  author: number
  message: string
  id: number
  sendByAuthor: boolean
}

function generateRecord() {
  return {
    seenAt: new Date().toISOString(),
    sentAt: new Date().toISOString(),
    receivedAt: new Date().toISOString(),
    author: Math.floor(Math.random() * 2) + 1,
    message: `Message ${Math.random()} from author ${Math.floor(Math.random() * 100) + 1}`,
    id: Math.floor(Math.random() * 10000) + 1
  }
}

function generateRecords(count: number) {
  return Array.from({ length: count }, () => generateRecord())
}

const sampleMessages = generateRecords(10)

// function groupMessages(messages: Message[]) {
//   const groupedMessages = messages.reduce(
//     (acc, msg) => {
//       const date = new Date(msg.time)
//       date.setHours(0, 0, 0, 0)

//       const d = date.getTime()
//       if (!acc[d]) {
//         acc[d] = []
//       }
//       acc[d].push(msg)

//       return acc
//     },
//     {} as Record<number, Message[]>
//   )

//   return groupedMessages
// }

// const pad = (n: number) => `${n}`.padStart(2, '0')

// function formatTimestamp(timestamp: number) {
//   const d = new Date(timestamp)

//   const h = d.getHours()
//   const m = d.getMinutes()

//   return `${pad(h)}:${pad(m)}`
// }

// function formatDate(timestamp: number) {
//   const d = new Date(timestamp)

//   const mm = d.getMonth()
//   const dd = d.getDate()

//   return `${pad(dd + 1)}/${pad(mm + 1)}`
// }

export default function Chat() {
  const { chatId } = useParams()
  const [chatInfo, setChatInfo] = useState<any>({})
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const textareaRef = useRef<TextAreaRef>(null)
  const [selectionMode, setSelectionMode] = useState(false)
  const [isChatSettingsDrawerOpen, setIsChatSettingsDrawerOpen] = useState(false)

  const [isGroupSettingsDrawerOpen, setIsGroupSettingsDrawerOpen] = useState(true)

  useEffect(() => {
    const messages = sampleMessages.map((m) => ({ ...m, sendByAuthor: m.author === 1 }))
    setMessages(messages)
  }, [])

  const inputOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log('trigger onchange')
    const value = e.target.value
    setInputValue(value)
  }
  const onEmojiClick = (emoji: EmojiClickData, event: MouseEvent) => {
    if (!textareaRef.current) {
      return
    }
    const textarea = textareaRef.current.resizableTextArea?.textArea
    const currentValue = textarea?.value || ''
    const cursorPositionStart = textarea?.selectionStart || 0
    const cursorPositionEnd = textarea?.selectionEnd || 0
    const valueFront = currentValue.slice(0, cursorPositionStart)
    const valueBack = currentValue.slice(cursorPositionEnd)
    const newValue = valueFront + emoji.emoji + valueBack
    setInputValue(newValue)
  }

  const getReadableTimestamp = (timestamp: string) => {
    const d = new Date(timestamp)
    return `${padZero(d.getHours())}:${padZero(d.getMinutes())}`
  }

  const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
    console.log('checked = ', checkedValues)
  }

  return (
    <div className={styles.wrapper}>
      <ChatSidebar />
      <div className={styles.chatContainer}>
        <div style={{ height: '56px', backgroundColor: 'red' }}>topbar here</div>
        <Checkbox.Group className={styles.chatroom} onChange={onChange}>
          {messages.map((message) => (
            <div className={styles.messageItem}>
              {selectionMode && (
                <div className={styles.messageItemCheckboxWrapper}>
                  <Checkbox value={message.id}></Checkbox>
                </div>
              )}
              <Dropdown
                menu={{
                  items: [
                    {
                      label: 'reply',
                      key: 'reply'
                    },
                    {
                      label: 'forward',
                      key: 'forward'
                    },
                    {
                      label: 'select',
                      key: 'select'
                    },
                    {
                      label: 'copy',
                      key: 'copy'
                    },
                    {
                      label: 'pin',
                      key: 'pin'
                    },
                    {
                      label: 'save',
                      key: 'save'
                    },
                    {
                      label: 'delete',
                      key: 'delete'
                    }
                  ]
                }}
                trigger={['contextMenu']}
                key={message.id}
                className={styles.messageItemContent}
              >
                <div
                  className={`${styles.messageWrapper} ${message.sendByAuthor && styles.messageWrapperAuthor}`}
                >
                  <div>
                    <Avatar src={chatInfo.imageUrl} icon={<Icon name="person" fill size={24} />} />
                  </div>
                  <div
                    className={`${styles.messageContainer} ${message.sendByAuthor && styles.messageContainerAuthor}`}
                  >
                    <p className={styles.message}>{message.message}</p>
                    <div className={styles.messageInfo}>
                      <p className={styles.messageTimestamp}>
                        {getReadableTimestamp(message.sentAt)}
                      </p>
                      {message.sendByAuthor && message.seenAt && (
                        <Icon name="done_all" fill color="#9e9e9e" size={14} />
                      )}
                      {message.sendByAuthor && !message.seenAt && message.sentAt && (
                        <Icon name="check" fill color="#9e9e9e" size={14} />
                      )}
                    </div>
                  </div>
                </div>
              </Dropdown>
            </div>
          ))}
        </Checkbox.Group>
        <div className={styles.messageInputWrapper}>
          <Dropdown
            menu={{
              items: [
                { icon: <Icon name="image" size={20} />, label: 'Image or Video', key: 'media' },
                { icon: <Icon name="folder_open" size={20} />, label: 'File', key: 'file' },
                { icon: <Icon name="id_card" size={20} />, label: 'Namecard', key: 'namecard' }
              ]
            }}
            placement="topLeft"
            arrow={{ pointAtCenter: true }}
          >
            <Button icon={<Icon name="attach_file" />} type="text" />
          </Dropdown>

          <Input.TextArea
            ref={textareaRef}
            onChange={inputOnChange}
            autoSize={{ minRows: 1, maxRows: 8 }}
            // rows={inputRow}
            variant="borderless"
            value={inputValue}
          />
          {/* <Popover
            content={<EmojiPicker onEmojiClick={onEmojiClick} />}
            trigger="click"
            overlayInnerStyle={{ padding: 0 }}
          >
            <Button type="text" icon={<Icon name="mood" />} />
          </Popover> */}
          <Button icon={<Icon name="send" />} type="text" />
        </div>
        <ChatSettingsDrawer
          isOpen={isChatSettingsDrawerOpen}
          setIsOpen={setIsChatSettingsDrawerOpen}
        />
        <GroupSettingsDrawer
          isOpen={isGroupSettingsDrawerOpen}
          setIsOpen={setIsGroupSettingsDrawerOpen}
        ></GroupSettingsDrawer>
      </div>
    </div>
  )
}
