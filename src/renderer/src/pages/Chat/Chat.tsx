import Icon from '@renderer/components/widgets/Icon/Icon'
import styles from './Chat.module.scss'
import ChatSidebar from '@renderer/components/layouts/ChatSidebar/ChatSidebar'
import { useParams } from 'react-router-dom'
import { Input } from 'antd'
import { ChangeEvent, useRef, useState } from 'react'

type Message = {
  time: number
  message: string
  author: number
}

const MOCK_MESSAGES = [
  {
    time: 1722913151589,
    message: 'Hey, did you see the game last night?',
    author: 100001
  },
  {
    time: 1722913152589,
    message: "Yeah, it was intense! Can't believe they won in the last minute.",
    author: 100000
  },
  {
    time: 1722913153589,
    message: 'I know, right? That final goal was insane.',
    author: 100001
  },
  {
    time: 1722913154589,
    message: 'Totally. We should catch the next game together.',
    author: 100000
  },
  {
    time: 1722913155589,
    message: "Sounds like a plan. I'll bring the snacks.",
    author: 100001
  },
  {
    time: 1722913156589,
    message: 'Awesome. Looking forward to it.',
    author: 100000
  },
  {
    time: 1722913157589,
    message: 'Me too! See you then.',
    author: 100001
  },
  {
    time: 1722913158589,
    message: 'Catch you later.',
    author: 100000
  },
  {
    time: 1722913159589,
    message: 'Later!',
    author: 100001
  },
  {
    time: 1722999580744,
    message: 'Hey, did you finish the report?',
    author: 100001
  },
  {
    time: 1722999582244,
    message: "Almost done. I'll send it over in an hour.",
    author: 100000
  },
  {
    time: 1722999583744,
    message: 'Great, thanks! Let me know if you need any help.',
    author: 100001
  },
  {
    time: 1722999585244,
    message: "Will do. How's the new project going?",
    author: 100000
  },
  {
    time: 1722999586744,
    message: "It's going well, just a bit behind schedule.",
    author: 100001
  },
  {
    time: 1722999588244,
    message: 'Need any assistance with that?',
    author: 100000
  },
  {
    time: 1722999589744,
    message: 'Maybe later, but thanks for the offer.',
    author: 100001
  },
  {
    time: 1722999591244,
    message: 'Alright, just let me know.',
    author: 100000
  },
  {
    time: 1722999592744,
    message: 'Will do. Appreciate it!',
    author: 100001
  },
  {
    time: 1722999594244,
    message: 'No problem. Catch you later.',
    author: 100000
  },
  {
    time: 1722999595744,
    message: 'Later!',
    author: 100001
  },
  {
    time: 1722999455717,
    message: "Hey, what's up?",
    author: 100000
  },
  {
    time: 1722999456717,
    message: 'Not much, just chilling. You?',
    author: 100001
  },
  {
    time: 1722999457717,
    message: 'Same here. Wanna grab a coffee later?',
    author: 100000
  },
  {
    time: 1722999458717,
    message: 'Sure, sounds good!',
    author: 100001
  },
  {
    time: 1722999459717,
    message: 'Awesome, see you at 5?',
    author: 100000
  },
  {
    time: 1722999460717,
    message: 'Perfect. See you then.',
    author: 100001
  },
  {
    time: 1722999461717,
    message: 'Great!',
    author: 100000
  },
  {
    time: 1722999462717,
    message: "Don't forget to bring that book you mentioned.",
    author: 100001
  },
  {
    time: 1722999463717,
    message: 'Will do. Thanks for reminding me.',
    author: 100000
  },
  {
    time: 1722999464717,
    message: 'No problem. Looking forward to it.',
    author: 100001
  }
]

function groupMessages(messages: Message[]) {
  const groupedMessages = messages.reduce(
    (acc, msg) => {
      const date = new Date(msg.time)
      date.setHours(0, 0, 0, 0)

      const d = date.getTime()
      if (!acc[d]) {
        acc[d] = []
      }
      acc[d].push(msg)

      return acc
    },
    {} as Record<number, Message[]>
  )

  return groupedMessages
}

const pad = (n: number) => `${n}`.padStart(2, '0')

function formatTimestamp(timestamp: number) {
  const d = new Date(timestamp)

  const h = d.getHours()
  const m = d.getMinutes()

  return `${pad(h)}:${pad(m)}`
}

function formatDate(timestamp: number) {
  const d = new Date(timestamp)

  const mm = d.getMonth()
  const dd = d.getDate()

  return `${pad(dd + 1)}/${pad(mm + 1)}`
}

export default function Chat() {
  const { chatId } = useParams()
  const [inputRow, setInputRow] = useState(1)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const inputOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputRow(e.target.value.split('\n').length)
  }

  return (
    <div className={styles.wrapper}>
      <ChatSidebar />
      <div className={styles.chatContainer}>
        <div style={{ height: '56px', backgroundColor: 'red' }}>topbar here</div>
        <div className={styles.chatroom}></div>
        <div className={styles.messageInputWrapper}>
          <Icon name="attach_file" />
          <Input.TextArea ref={textareaRef} onChange={inputOnChange} rows={inputRow} />
          <Icon name="mood" />
          <Icon name="send" />
        </div>
      </div>
      {/* <div className={styles.chat}>
        <div className={styles.chatHeader}>
          <div className={styles.chatTitle}>My Chat</div>
          <Icon name="view_sidebar" />
        </div>
        <div className={styles.chatTop}>
          <div className={styles.chatDefault}>Default</div>
          <Icon name="keyboard_double_arrow_up" />
        </div>
        <div className={styles.chatMain}>
          {Object.entries(groupMessages(MOCK_MESSAGES)).map(([date, messages]) => {
            return (
              <>
                <div key={date} className={styles.chatDate}>
                  {formatDate(Number(date))}
                </div>
                {messages.map(({ author, message, time }, index) => {
                  return (
                    <div
                      key={index}
                      className={`${styles.chatMessage} ${author === 100000 ? styles.chatMessageMe : styles.chatMessageYou}`}
                    >
                      <div className={styles.chatMessageContent}>{message}</div>
                      <div className={styles.chatMessageTimestamp}>
                        {formatTimestamp(Number(time))}
                      </div>
                    </div>
                  )
                })}
              </>
            )
          })}
        </div>
      </div> */}
    </div>
  )
}
