import Sidebar from '@renderer/components/layouts/Sidebar/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import styles from './Home.module.scss'
import { createRef, useEffect } from 'react'
import { CometChat } from '@cometchat/chat-sdk-javascript'
import { CometChatIncomingCall } from '@cometchat/chat-uikit-react'

export const divRef = createRef<HTMLDivElement>()

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

  return (
    <div className={styles.wrapper}>
      <div
        ref={divRef}
        id="direct-call-container"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'none',
          zIndex: 9999
        }}
      ></div>
      <CometChatIncomingCall />
      <Sidebar />
      <Outlet />
    </div>
  )
}
