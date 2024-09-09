import Sidebar from '@renderer/components/layouts/Sidebar/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import styles from './Home.module.scss'
import { useEffect } from 'react'

export default function Home() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/chat')
  }, [])
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <Outlet />
    </div>
  )
}
