export interface ChatRoom {
  id: number
  title: string
  description: string
  pin: boolean
  muted: boolean
  timestamp: Date
  imageUrl: string | null
  online: boolean | null
  type: 'chat' | 'group'
  unread: number | null
}

export const sampleChats: ChatRoom[] = [
  {
    title: 'Sample Group',
    description: 'This is a group message',
    pin: false,
    muted: false,
    timestamp: new Date(),
    imageUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
    id: 1,
    online: null,
    type: 'group',
    unread: 0
  },
  {
    title: 'Sample Group 2',
    description: 'another group message',
    pin: true,
    muted: false,
    timestamp: new Date(),
    imageUrl: null,
    id: 2,
    online: false,
    type: 'group',
    unread: 3
  },
  {
    title: 'Sample Chat',
    description: 'this is a chat message',
    pin: false,
    muted: true,
    timestamp: new Date(),
    imageUrl: null,
    id: 3,
    online: true,
    type: 'chat',
    unread: 2
  },
  {
    title: 'Sample Chat 2',
    description: 'this is another chat message',
    pin: true,
    muted: true,
    timestamp: new Date(),
    imageUrl: null,
    id: 4,
    online: true,
    type: 'chat',
    unread: 1
  }
] as const

export type Message = {
  seenAt?: string | null
  sentAt: string
  receivedAt: string
  author: number
  message: string
  id: number
  sendByAuthor: boolean
}

export const sampleMessages: Message[] = [
  {
    seenAt: new Date(2024, 7, 14, 10, 33, 30).toISOString(),
    sentAt: new Date(2024, 7, 14, 10, 33, 30).toISOString(),
    receivedAt: new Date(2024, 7, 14, 10, 33, 30).toISOString(),
    author: 1,
    message:
      'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello',
    id: 1,
    sendByAuthor: true
  },
  {
    seenAt: new Date(2024, 7, 14, 11).toISOString(),
    sentAt: new Date(2024, 7, 14, 11).toISOString(),
    receivedAt: new Date(2024, 7, 14, 11).toISOString(),
    author: 1,
    message:
      'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello',
    id: 2,
    sendByAuthor: true
  },
  {
    seenAt: new Date(2024, 7, 15, 12).toISOString(),
    sentAt: new Date(2024, 7, 15, 12).toISOString(),
    receivedAt: new Date(2024, 7, 15, 12).toISOString(),
    author: 1,
    message: 'Hello',
    id: 3,
    sendByAuthor: true
  },
  {
    seenAt: null,
    sentAt: new Date().toISOString(),
    receivedAt: new Date().toISOString(),
    author: 2,
    message: 'Hello',
    id: 4,
    sendByAuthor: true
  }
]
