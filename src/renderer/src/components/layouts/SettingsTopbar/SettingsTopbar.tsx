import styles from './SettingsTopbar.module.scss'
export default function SettingsTopbar({ children }: { children: React.ReactNode }) {
  return <div className={styles.settingsHeader}>{children}</div>
}
