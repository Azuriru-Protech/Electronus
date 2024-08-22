import { Link } from 'react-router-dom'
import Icon from '../Icon/Icon'
import { Avatar, Switch } from 'antd'
import styles from './SettingsCardItem.module.scss'

type Props = {
  title?: string | null
  secondaryTitle?: string | null
  icon?: string | null
  last?: boolean | null
  first?: boolean | null
  border?: boolean | null
  small?: boolean | null
  link?: string | null
  avatar?: string | null
  content?: string | null
  onClick?: () => void
}

export default function SettingsCardItem({
  title,
  secondaryTitle,
  first,
  last,
  border,
  link,
  onClick,
  small,
  avatar,
  content
}: Props) {
  const styling = () => {
    let styles = {}

    if (first) {
      styles = {
        ...styles,
        borderRadius: '0.3rem 0.3rem 0 0',
        borderBottom: '1px solid #e1e1e1'
      }
    }

    if (last) {
      styles = {
        ...styles,
        borderRadius: '0 0 0.3rem 0.3rem',
        borderBottom: 'none'
      }
    }

    if (border) {
      styles = {
        ...styles,
        borderBottom: '1px solid #e1e1e1'
      }
    }

    return styles
  }

  const innerDiv = () => {
    return (
      <div className={` ${styles.cardContainer}  ${small ? 'small' : ''}`} style={styling()}>
        <div className={`${styles.cardItem} `} style={content ? { borderBottom: 'none' } : {}}>
          {title && <h4>{title}</h4>}
          {avatar && <Avatar src={avatar} icon={<Icon name="group" fill />} size={42} />}
          <div className={`flex-center`}>
            <p>{secondaryTitle}</p>
            {onClick && <Icon name="chevron_right" weight={200} color="#505050" />}
          </div>
        </div>

        {content && (
          <div
            className={`settingsCardContent ${content ? 'withContent' : ''} `}
            style={content ? { borderBottom: 'none' } : {}}
          >
            <p>{content}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {link ? (
        <Link to={link} className="cardWrapper" onClick={onClick}>
          {innerDiv()}
        </Link>
      ) : (
        <div className="cardWrapper" onClick={onClick}>
          {innerDiv()}
        </div>
      )}
    </>
  )
}
