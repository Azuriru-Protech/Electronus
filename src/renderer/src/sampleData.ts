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

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const randomGender = () => {
  return randomNumber(0, 1) ? 'men' : 'women'
}

const randomImageUrl = () => {
  return `https://randomuser.me/api/portraits/${randomGender()}/${randomNumber(0, 99)}.jpg`
}

const generateDates = (count: number, min: Date, max: Date) => {
  const dates: Date[] = []
  for (let i = 0; i < count; i++) {
    const date = new Date(min.getTime() + Math.random() * (max.getTime() - min.getTime()))
    dates.push(date)
  }
  return dates.sort((a, b) => b.getTime() - a.getTime())
}

const randomString = (min: number, max: number) => {
  return Math.random().toString(36).substring(min, max)
}

export const generateChats = (count: number): ChatRoom[] => {
  const dates = generateDates(count, new Date(2024, 7, 1), new Date())
  return Array.from({ length: count }, (_, i) => {
    const type = randomNumber(0, 1) ? 'chat' : 'group'
    return {
      title: `${type} ${i + 1}`,
      description: randomString(10, 20),
      pin: randomNumber(0, 1) ? true : false,
      muted: randomNumber(0, 1) ? true : false,
      timestamp: dates[i],
      imageUrl: randomImageUrl(),
      id: i + 1,
      online: type === 'chat' ? (randomNumber(0, 1) ? true : false) : null,
      type: type,
      unread: randomNumber(0, 1) ? null : randomNumber(0, 1000)
    }
  })
}

export const sampleChats = generateChats(100)

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

export const sampleUsers = [
  {
    name: 'John Doe',
    id: 1,
    imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    remark: null,
    signature: null,
    isBlock: false
  }
]

import { User } from './models/models'
import { faker } from '@faker-js/faker'

export const currentUser = {
  id: 1,
  name: 'John',
  imageUrl: null,
  signature: null,
  online: true,
  lastSeen: new Date(),
  createdAt: new Date()
}

export const generateUsers = (n: number): User[] => {
  return Array.from({ length: n }).map((_, i) => ({
    id: i + 2,
    name: faker.internet.displayName(),
    imageUrl: faker.image.avatar(),
    signature: faker.person.jobTitle(),
    online: faker.datatype.boolean(),
    lastSeen: faker.date.past(),
    createdAt: faker.date.past(),
    isBlocked: false
  }))
}
