import styles from './Underline.module.scss'

export default function Underline({ ...props }) {
  return (
    <div className={`${styles.wrapper} `}>
      <div className={`${styles.line} ${props.show ? styles.active : ''}`} style={props.style} />
    </div>
  )
}
