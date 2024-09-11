import Sidebar from '@renderer/components/layouts/Sidebar/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import styles from './Home.module.scss'
import { useEffect } from 'react'
import { CometChat } from '@cometchat/chat-sdk-javascript'
import { CometChatIncomingCall, CometChatOngoingCall } from '@cometchat/chat-uikit-react'

export default function Home() {
  const navigate = useNavigate()
  useEffect(() => {
    checkIfLoggedIn()
  }, [])

  const checkIfLoggedIn = async () => {
    const user = await CometChat.getLoggedInUser()

    if (!user) {
      navigate('/login')
    }
  }

  const handleOnAccept = (e) => {
    console.log(e)

    console.log('custom on accept action')
  }

  return (
    <div className={styles.wrapper}>
      <CometChatIncomingCall />
      {/* <CometChatOngoingCall /> */}
      <Sidebar />
      <Outlet />
    </div>
  )
}
