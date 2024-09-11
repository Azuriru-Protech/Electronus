import Sidebar from '@renderer/components/layouts/Sidebar/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import styles from './Home.module.scss'
import { useEffect, useState } from 'react'
import { CometChat } from '@cometchat/chat-sdk-javascript'
import {
  CometChatCallEvents,
  CometChatIncomingCall,
  CometChatOngoingCall
} from '@cometchat/chat-uikit-react'
import { v4 } from 'uuid'
import { CometChatCalls } from '@cometchat/calls-sdk-javascript'

export default function Home() {
  const navigate = useNavigate()
  const [callListenerId, setCallListenerId] = useState(v4())
  const [call, setCall] = useState<CometChat.Call | null>(null)
  const [callEndedListener, setCallEndedListener] = useState<any>()
  useEffect(() => {
    checkIfLoggedIn()
    subCallListener()
    CometChatCallEvents.ccCallEnded.subscribe((call: CometChat.Call) => {
      console.log(1)

      //Your Code
    })
    return () => {
      CometChat.removeCallListener(callListenerId)
    }
  }, [])

  const checkIfLoggedIn = async () => {
    const user = await CometChat.getLoggedInUser()

    if (!user) {
      navigate('/login')
    }
  }

  const subCallListener = () => {
    CometChat.addCallListener(
      callListenerId,
      new CometChat.CallListener({
        onIncomingCallReceived: (call: CometChat.Call) => {
          console.log('Incoming call received:', call)
        },
        onOutgoingCallAccepted: (call: CometChat.Call) => {
          console.log('Outgoing call accepted:', call)
          setCall(call)
        },
        onOutgoingCallRejected: (call: CometChat.Call) => {
          console.log('Outgoing call rejected:', call)
          setCall(null)
        },
        onIncomingCallCancelled: (call: CometChat.Call) => {
          console.log('Incoming call canceled:', call)
          setCall(null)
        }
      })
    )
  }

  const subCallEndedListener = () => {
    console.log('sub')

    const ccCallEnded = CometChatCallEvents.ccCallEnded.subscribe((call: CometChat.Call) => {
      setCall(null)
      console.log('call ended', call)
      if (callEndedListener) {
        callEndedListener.unsubscribe()
      }
    })

    setCallEndedListener(ccCallEnded)
  }

  return (
    <div className={styles.wrapper}>
      <CometChatIncomingCall />
      {call && (
        <CometChatOngoingCall
          callSettingsBuilder={new CometChatCalls.CallSettingsBuilder()
            // .setIsAudioOnlyCall(true)
            // .showRecordingButton(true)
            .build()}
          sessionID={call.getSessionId()}
        />
      )}
      <Sidebar />
      <Outlet />
    </div>
  )
}
