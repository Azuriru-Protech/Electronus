import { Button, Dropdown, Mentions, Popover } from 'antd'
import styles from './ChatInput.module.scss'
import Icon from '../Icon/Icon'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { useRef, useState } from 'react'
import { MentionsRef } from 'antd/es/mentions'
import { contextMenuItemStyle, contextMenuStyle } from '@renderer/configs/common'
import { CometChat, Group, User } from '@cometchat/chat-sdk-javascript'

type Props = {
  conversation: CometChat.Conversation
}

export default function ChatInput({ conversation }: Props) {
  const textareaRef = useRef<MentionsRef>(null)
  const [inputValue, setInputValue] = useState('')

  const inputOnChange = (text: string) => {
    setInputValue(text)
  }

  const onEmojiClick = (emoji: EmojiClickData, event: MouseEvent) => {
    if (!textareaRef.current) {
      return
    }

    const textarea = textareaRef.current.nativeElement.firstChild as HTMLTextAreaElement
    const currentValue = textarea?.value || ''
    const cursorPositionStart = textarea?.selectionStart || 0
    const cursorPositionEnd = textarea?.selectionEnd || 0
    const valueFront = currentValue.slice(0, cursorPositionStart)
    const valueBack = currentValue.slice(cursorPositionEnd)
    const newValue = valueFront + emoji.emoji + valueBack
    setInputValue(newValue)

    // Set the cursor position to the end of the inserted emoji
    const newCursorPosition = cursorPositionStart + emoji.emoji.length
    // Use a timeout to ensure the cursor position is set after the state update
    setTimeout(() => {
      if (!textarea) {
        return
      }
      textarea.setSelectionRange(newCursorPosition, newCursorPosition)
      textarea.focus()
    }, 0)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // Prevent the default Enter behavior (like submitting the form)
      e.preventDefault()
      onSubmit()
    } else if (e.key === 'Enter' && e.shiftKey) {
      // Prevent the default behavior and manually append a newline
      e.preventDefault()
      const newValue = inputValue + '\n'
      setInputValue(newValue)
      // Manually set the value in the textarea to prevent triggering onChange
      if (textareaRef.current) {
        const textarea = textareaRef.current.nativeElement.firstChild as HTMLTextAreaElement
        textarea.value = newValue
      }
    }
  }

  const onSubmit = async () => {
    let receiverID: string
    if (conversation.getConversationType() === 'group') {
      receiverID = (conversation.getConversationWith() as Group).getGuid()
    } else if (conversation.getConversationType() === 'user') {
      receiverID = (conversation.getConversationWith() as User).getUid()
    }
    const receiverType = conversation.getConversationType()
    const textMessage = new CometChat.TextMessage(receiverID!, inputValue, receiverType)
    const message = await CometChat.sendMessage(textMessage)
    console.log('inputValue: ', inputValue)
    setInputValue('')
  }

  return (
    <div className={styles.messageInputWrapper}>
      <Dropdown
        menu={{
          style: contextMenuStyle,
          items: [
            {
              icon: <Icon name="image" size={20} />,
              label: 'Image or Video',
              key: 'media',
              style: contextMenuItemStyle
            },
            {
              icon: <Icon name="folder_open" size={20} />,
              label: 'File',
              key: 'file',
              style: contextMenuItemStyle
            },
            {
              icon: <Icon name="id_card" size={20} />,
              label: 'Namecard',
              key: 'namecard',
              style: contextMenuItemStyle
            }
          ]
        }}
        placement="topLeft"
        arrow={{ pointAtCenter: true }}
      >
        <Button icon={<Icon name="attach_file" />} type="text" shape="circle" />
      </Dropdown>
      <Mentions
        ref={textareaRef}
        onChange={inputOnChange}
        onKeyDown={handleKeyDown}
        autoSize={{ minRows: 1, maxRows: 8 }}
        variant="borderless"
        value={inputValue}
      />
      <Popover
        content={<EmojiPicker onEmojiClick={onEmojiClick} />}
        trigger="click"
        overlayInnerStyle={{ padding: 0 }}
      >
        <Button type="text" icon={<Icon name="mood" />} shape="circle" />
      </Popover>
      <Button icon={<Icon name="send" />} type="text" shape="circle" onClick={onSubmit} />
    </div>
  )
}
