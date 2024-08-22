import ChatSidebar from '@renderer/components/layouts/ChatSidebar/ChatSidebar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styles from './ChatList.module.scss'
export default function ChatList() {
  const { pathname } = useLocation()
  return (
    <>
      <style jsx>
        {`
          @media (max-width: 576px) {
            .chat-sidebar-wrapper {
              display: ${pathname === '/chat' ? 'block' : 'none'};
            }
          }
          .chat-content-wrapper {
            height: 100vh;
            height: 100dvh;
          }
          @media (max-width: 576px) {
            .chat-content-wrapper {
              display: ${pathname === '/chat' ? 'none' : 'block'};
            }
          }
        `}
      </style>
      <div className={styles.wrapper}>
        <div className="chat-sidebar-wrapper">
          <ChatSidebar />
        </div>
        <div className="chat-content-wrapper">
          <Outlet />
        </div>
      </div>
    </>
  )
}
