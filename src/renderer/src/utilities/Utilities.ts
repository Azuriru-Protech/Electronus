import { User } from '@renderer/models/models'
import { generateUsers, currentUser as _currentUser } from '../sampleData'

export const debugPrint = (...args: any) => {
  if (isDebug()) {
    console.log(...args)
  }
}

export const isDebug = () => {
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const getSessionId = () => {
  return sessionStorage.getItem('sessionId')
}

export const makeRandomID = (length: number) => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export const padZero = (num: number, places: number = 2) => {
  return String(num).padStart(places, '0')
}

export const toReadableTime = (time?: string | Date | null | number) => {
  if (!time) {
    return ''
  }
  let d
  if (typeof time === 'number') {
    if (time / 1000 < new Date().getTime() / 1000) {
      d = new Date(time * 1000)
    } else {
      d = new Date(time)
    }
  } else {
    d = new Date(time)
  }
  return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
}

export const toReadableDate = (date?: string | Date | null, showYear = false) => {
  if (!date) {
    return ''
  }
  const d = new Date(date)
  return d.toLocaleDateString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: showYear ? 'numeric' : undefined
  })
}

export const getData = <T = any>(key: string) => {
  return window.electron.store.get<T>(key)
}

export const setData = <T = any>(key: string, val: T) => {
  window.electron.store.set<T>(key, val)
}

export const getAllUsers = () => {
  const users = getData<User[]>('users')
  if (!users || !users.length) {
    const newUsers = generateUsers(100)
    setData('users', newUsers)
    return newUsers
  } else {
    return users
  }
}

export const joinBlocks = (users: User[]) => {
  getAllUsers
}

export const getCurrentUser = () => {
  const currentUser = getData<User>('currentUser')
  if (!currentUser) {
    setData('currentUser', _currentUser)
  }
}
