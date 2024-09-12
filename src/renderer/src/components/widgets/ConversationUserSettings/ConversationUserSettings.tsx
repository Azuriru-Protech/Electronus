import { Avatar, Button, Modal, Switch } from 'antd'
import styles from './ConversationUserSettings.module.scss'
import Icon from '../Icon/Icon'
import Separator from '../Separator/Separator'
import ProfilePopover from '../ProfilePopover/ProfilePopover'

type Props = {
  user: CometChat.User
}

export default function ConversationUserSettings({ user }: Props) {
  const [clearChatHistoryModal, clearChatHistoryContextHolder] = Modal.useModal()

  const clearChatHistory = async () => {
    const confirm = await clearChatHistoryModal.confirm({
      title: '清空聊天记录',
      content: '确定要清空聊天记录吗？',
      centered: true,
      okText: '清空'
    })
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.settingsHeader}>聊天设置</div>
      <ProfilePopover placement="left" user={user}>
        <div className={styles.profileCard}>
          <div>
            <Avatar src={user.getAvatar()} icon={<Icon name="person" fill />} size={36} />
          </div>
          <div className={styles.profileCardInfo}>
            <p>{user.getName()}</p>
            <p>ID: {user.getUid()}</p>
          </div>
          <div>
            <Icon name="chevron_right" />
          </div>
        </div>
      </ProfilePopover>
      <Separator />
      <div className={styles.profileSearch}>
        <p>搜索聊天内容</p>
        <Icon name="chevron_right"></Icon>
      </div>
      <Separator />
      <div className={styles.profileActionContainer}>
        <div className={styles.profileAction}>
          <p>Mute</p>
          <Switch size="small" />
        </div>
        <div className={styles.profileAction}>
          <p>Sticky on Top</p>
          <Switch size="small" />
        </div>
      </div>
      <Separator />
      <Button type="text" className={styles.clearChatHistory} onClick={clearChatHistory}>
        Clear Chat History
      </Button>
      <div>{clearChatHistoryContextHolder}</div>
    </div>
  )
}
