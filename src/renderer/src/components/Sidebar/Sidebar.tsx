import styles from './Sidebar.module.scss'
import ChatIcon from '../../assets/images/icons/chat-icon.svg'
import ContactIcon from '../../assets/images/icons/contacts-icon.svg'
import SettingsIcon from '../../assets/images/icons/settings-icon.svg'

type Props = {}

export default function Sidebar({}: Props) {
  return (
    <div className={styles.sideBarContainer}>
      <div></div>
      {/* <Avatar className="w-15 h-15 flex-shrink-0">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar> */}
      <img src={ChatIcon} />
      <img src={ContactIcon} />
      <a href="/settings" className={styles.settingsIcon}>
        <div>
          <img src={SettingsIcon} />
        </div>
      </a>
    </div>
  )
}
