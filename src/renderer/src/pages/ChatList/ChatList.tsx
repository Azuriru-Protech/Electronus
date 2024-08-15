import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function ChatList() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/chat/system-notification')
  }, [])
  return <></>
}
