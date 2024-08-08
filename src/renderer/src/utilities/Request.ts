import { APIPaths } from '@renderer/configs/api'
import { debugPrint } from './Utilities'

const callAPI = async (
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  headers: Record<string, string> = {},
  body?: any,
  responseType: 'json' | 'text' | 'blob' = 'json'
) => {
  const requestOptions: any = {
    method: method,
    headers: headers
  }

  if (body) requestOptions.body = JSON.stringify(body)

  try {
    const result = await fetch(url, requestOptions)
    if (responseType === 'json') {
      return result.json()
    } else if (responseType === 'text') {
      return result.text()
    } else if (responseType === 'blob') {
      return result.blob()
    }
    return result
  } catch (error) {
    debugPrint(error)
    return error
  }
}

const constructHeader = (contentType: string = 'application/json', auth: boolean = false) => {
  const headers: Record<string, string> = {}

  if (contentType) headers['Content-Type'] = contentType
  if (auth) headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')

  return headers
}

const constructTarget = (
  path: APIPaths,
  params?: string | string[],
  query?: Record<string, any> | string | string[]
) => {
  let target = APIPaths.apiEndPoint + path
  if (params) {
    if (typeof params === 'string') {
      target = `${target}/${params}`
    } else if (Array.isArray(params)) {
      target = `${target}/${params.join('/')}`
    }
  }
  if (query) {
    if (typeof query === 'string') {
      target = `${target}?${query}`
    } else if (Array.isArray(query)) {
      target = `${target}?${query.join('&')}`
    } else if (typeof query === 'object') {
      target = `${target}?${new URLSearchParams(query).toString()}`
    }
  }
  return target
}

export const login = (username: string, password: string) => {
  return callAPI(constructTarget(APIPaths.login), 'POST', constructHeader(), {
    username,
    password
  })
}
