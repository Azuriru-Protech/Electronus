export interface User {
  id: number
  name: string
  imageUrl: string | null
  signature: string | null
  online: boolean | null
  isBlocked: boolean
  lastSeen: Date | null
  createdAt: Date
}

export interface UserFriend {
  id: number
  userId: number
  friendId: number
  remark: string | null
  status: 'pending' | 'accepted' | 'blocked'
  createdAt: Date
}

export type Chat = PersonalChat | GroupChat

export interface ChatBase {
  id: number
  name: string
  imageUrl: string | null
  subtitle: string | null
}

export interface PersonalChat extends ChatBase {
  type: 'personal'
  signature: string | null
  remark: string | null
}

export interface GroupChat extends ChatBase {
  type: 'group'
  announcement: string | null
}

export interface GroupMember {
  id: number
  userId: number
  groupId: number
  role: 'owner' | 'admin' | 'member'
  muted: boolean
  mutedAt: Date | null
  mutedUntil: Date | null
  createdAt: Date
}

export interface Message {
  id: number
  sentAt: Date
  authorId: number
  message: string
  seenBy: {
    id: number
    timestamp: Date
  }[]
}
