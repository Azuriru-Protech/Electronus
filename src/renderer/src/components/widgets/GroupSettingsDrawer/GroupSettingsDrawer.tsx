import { Avatar, Button, Drawer, Modal, Switch } from 'antd'
import ProfilePopover from '../ProfilePopover/ProfilePopover'
import Separator from '../Separator/Separator'
import Icon from '../Icon/Icon'
import styles from './GroupSettingsDrawer.module.scss'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function GroupSettingsDrawer({ isOpen, setIsOpen }: Props) {
  const [leaveGroupModal, leaveGroupContextHolder] = Modal.useModal()
  const [clearChatHistoryModal, clearChatHistoryContextHolder] = Modal.useModal()

  const clearChatHistory = async () => {
    const confirm = await clearChatHistoryModal.confirm({
      title: '清空聊天记录',
      content: '确定要清空聊天记录吗？',
      centered: true,
      okText: '清空'
    })
  }
  const leaveGroup = async () => {
    const confirm = await leaveGroupModal.confirm({
      title: '退出群聊',
      content: '确定要退出群聊吗？',
      centered: true,
      okText: '退出'
    })
  }
  return (
    <>
      <Drawer
        closeIcon={null}
        title={
          <div className={styles.groupSettingsTitleWrapper}>
            <h3>群聊设置</h3>
            <Button type="text">Edit</Button>
          </div>
        }
        placement="right"
        onClose={() => setIsOpen(false)}
        open={isOpen}
        getContainer={false}
        styles={{ body: { padding: 0, width: '100%' } }}
      >
        <div className={styles.groupSettingsProfile}>
          <div>
            <Avatar src={undefined} icon={<Icon name="group" fill />} size={42} />
          </div>
          <p>asdsad</p>
        </div>
        <Separator />
        <div className={styles.groupSettingsAnnouncement}>
          <p>群公告</p>
          <p className={styles.groupSettingsAnnouncementContent}>asdasd</p>
        </div>
        <Separator />
        <div className={styles.groupSettingsMedia}>
          <p>Media, File, Link</p>
          <Icon name="chevron_right"></Icon>
        </div>
        <Separator />
        <div className={styles.groupSettingsAlias}>
          <div>Alias in Group</div>
          <div className={styles.groupSettingsAliasContent}>asdsad</div>
        </div>
        <Separator />
        <div className={styles.groupSettingsSearch}>
          <p>搜索聊天内容</p>
          <Icon name="chevron_right"></Icon>
        </div>
        <Separator />
        <div className={styles.groupSettingsActionContainer}>
          <div className={styles.groupSettingsAction}>
            <p>Mute</p>
            <Switch size="small" />
          </div>
          <div className={styles.groupSettingsAction}>
            <p>Sticky on Top</p>
            <Switch size="small" />
          </div>
        </div>
        <Separator />
        <div className={styles.groupSettingsMemberActionWrapper}>
          <p className={styles.groupSettingsMemberActionTitle}>Group Member</p>
          <div className={styles.groupSettingsMemberAction}>
            <Avatar
              icon={<Icon name="person_add" fill size={20} />}
              style={{ backgroundColor: '#0081ff' }}
            ></Avatar>
            <p>Add members</p>
          </div>
          <div className={styles.groupSettingsMemberAction}>
            <Avatar
              icon={<Icon name="link" fill size={20} />}
              style={{ backgroundColor: '#0081ff' }}
            ></Avatar>
            <p>Invite via Link</p>
          </div>
        </div>
        <Separator />
        <Button type="text" className={styles.clearChatHistory} onClick={clearChatHistory}>
          Clear Chat History
        </Button>
        <Button type="text" className={styles.clearChatHistory} onClick={leaveGroup}>
          Leave Group
        </Button>
      </Drawer>
      <div>{clearChatHistoryContextHolder}</div>
      <div>{leaveGroupContextHolder}</div>
    </>
  )
}
