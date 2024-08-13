import styles from './Separator.module.scss'
type Props = {
  className?: string
  height?: string
  width?: string
  color?: string
  style?: React.CSSProperties
}
export default function Separator({
  className,
  height = '0.667px',
  width = '100%',
  color = 'rgba(5, 5, 5, 0.06)',
  style
}: Props) {
  return (
    <>
      <style jsx>
        {`
          .separator {
            width: ${width};
            height: ${height};
            background-color: ${color};
          }
        `}
      </style>
      <div className={`${styles.separator} ${className}`} style={style}></div>
    </>
  )
}
