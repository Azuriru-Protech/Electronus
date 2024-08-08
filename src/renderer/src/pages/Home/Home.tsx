import Sidebar from '@renderer/components/layouts/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import styles from './Home.module.scss'

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <Outlet />
    </div>
  )
}
