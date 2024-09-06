import { RouterProvider } from 'react-router-dom'
import './i18n/config'
import { router } from './routing'
import { ConfigProvider } from 'antd'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { CometChat } from '@cometchat/chat-sdk-javascript'

export default function App() {
  const { i18n } = useTranslation()
  useEffect(() => {
    localeInit()
    cometInit()
  }, [])

  const localeInit = () => {
    let locale = localStorage.getItem('locale')

    if (!locale) {
      console.log('set locale to system')
      locale = 'system'
      localStorage.setItem('locale', locale)
    }

    if (locale === 'system') {
      console.log('locale is system')
      const systemLocale = window.electron.locale()
      switch (systemLocale.toLowerCase()) {
        case 'zh-cn':
          console.log('set locale to zh-cn')
          i18n.changeLanguage('zh-CN')
          break
        case 'en-us':
        case 'en-gb':
        case 'en':
          console.log('set locale to en')
          i18n.changeLanguage('en')
          break
        default:
          console.log('set locale to default')
          i18n.changeLanguage('en')
      }
    } else {
      console.log('set to existing locale', locale)
      i18n.changeLanguage(locale)
    }
  }

  const cometInit = async () => {
    // const a = await CometChat.login('cometchat-uid-1_1724815421c1f1e18848bcc8e4b61cbbe344d106')
    const loggedInUser = await CometChat.getLoggedInUser()
    console.log('loggedInUser: ', loggedInUser)
    // await getFriends()
    await getGroups()
  }

  const getFriends = async () => {
    const limit: number = 30
    const usersRequest = new CometChat.UsersRequestBuilder()
      .setLimit(limit)
      .friendsOnly(true)
      .build()

    const friends = await usersRequest.fetchNext()

    console.log('friends: ', friends)
  }

  const getGroups = async () => {
    const limit = 30
    const groupsRequest = new CometChat.GroupsRequestBuilder().setLimit(limit).build()
    const groups = await groupsRequest.fetchNext()
    console.log(groups)
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            activeBorderColor: 'var(--primary-dark)',
            hoverBorderColor: 'var(--secondary)'
          }
        }
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}
