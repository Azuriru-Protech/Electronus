import styles from './Topbar.module.scss'
export default function Topbar({ children }: { children: React.ReactNode }) {
  return <div className={styles.settingsHeader}>{children}</div>
}
