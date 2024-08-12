import { Button } from 'antd'
import styles from './Fallback.module.scss'
import { Link } from 'react-router-dom'
export default function Fallback() {
  return (
    <div className={styles.fallbackWrapper}>
      <h1>Page not found</h1>
      <h2>404</h2>
      <Link to="/">
        <Button type="primary">Go Home</Button>
      </Link>
    </div>
  )
}
