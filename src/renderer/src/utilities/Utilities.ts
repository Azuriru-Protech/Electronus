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

export const toReadableTime = (time?: string | Date | null) => {
  if (!time) {
    return ''
  }
  const d = new Date(time)
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
