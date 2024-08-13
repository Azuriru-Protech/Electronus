import { Avatar, Button, Drawer, Modal, Popover, Switch } from 'antd'
import styles from './ChatSettingsDrawer.module.scss'
import Icon from '../Icon/Icon'
import Separator from '../Separator/Separator'
import ProfilePopover from '../ProfilePopover/ProfilePopover'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function ChatSettingsDrawer({ isOpen, setIsOpen }: Props) {
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
    <>
      <Drawer
        title="聊天设置"
        placement="right"
        onClose={() => setIsOpen(false)}
        open={isOpen}
        getContainer={false}
        styles={{ body: { padding: 0, width: '100%' } }}
      >
        <ProfilePopover placement="left">
          <div className={styles.profileCard}>
            <div>
              <Avatar src={undefined} icon={<Icon name="person" fill />} size={36} />
            </div>
            <div className={styles.profileCardInfo}>
              <p>abc</p>
              <p>ID</p>
            </div>
            <div>
              <Icon name="chevron_right"></Icon>
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
      </Drawer>
      {clearChatHistoryContextHolder}
    </>
  )
}
