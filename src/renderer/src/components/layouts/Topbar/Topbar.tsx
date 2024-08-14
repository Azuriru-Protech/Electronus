import React from 'react'
import styles from './Topbar.module.scss'

type Props = {
  children: React.ReactNode
  className: string
  style?: React.CSSProperties
}

export default function Topbar({ children, className, style }: Props) {
  return (
    <div className={`${styles.settingsHeader} ${className}`} style={style}>
      {children}
    </div>
  )
}
