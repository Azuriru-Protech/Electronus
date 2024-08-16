import { Avatar, Badge, Button, Drawer, Modal, Switch } from 'antd'
import ProfilePopover from '../ProfilePopover/ProfilePopover'
import Separator from '../Separator/Separator'
import Icon from '../Icon/Icon'
import styles from './GroupSettingsDrawer.module.scss'
import { useState } from 'react'
import GroupSettingsEditDrawer from '../GroupSettingsEditDrawer/GroupSettingsEditDrawer'

interface GroupMember {
  name: string
  remark: string | null
  imageUrl: string | null
  role: string | null
  id: number
  isBlock: boolean
  signature: string | null
}

const sampleGroupMembers: GroupMember[] = [
  {
    name: 'John',
    remark: 'John Remark',
    imageUrl: 'https://i.pravatar.cc/300',
    role: 'owner',
    id: 1,
    isBlock: false,
    signature: 'this is signature'
  },
  {
    name: 'John1',
    remark: null,
    imageUrl: 'https://i.pravatar.cc/301',
    role: 'admin',
    id: 2,
    isBlock: true,
    signature: null
  },
  {
    name: 'John2',
    remark: null,
    imageUrl: null,
    role: null,
    id: 3,
    isBlock: false,
    signature: null
  }
]

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function GroupSettingsDrawer({ isOpen, setIsOpen }: Props) {
  const [leaveGroupModal, leaveGroupContextHolder] = Modal.useModal()
  const [clearChatHistoryModal, clearChatHistoryContextHolder] = Modal.useModal()
  const [groupMembers, setGroupMembers] = useState(sampleGroupMembers)
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false)

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
            <Button type="text" onClick={() => setIsEditDrawerOpen(true)}>
              Edit
            </Button>
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
        {groupMembers &&
          groupMembers.map((member) => (
            <ProfilePopover key={member.id} {...member}>
              <div className={styles.groupSettingsMemberWrapper}>
                <Avatar src={member.imageUrl} icon={<Icon name="person" fill size={20} />} />
                <p>{member.remark ? member.remark : member.name}</p>
                {member.role && member.role === 'owner' && <Badge count={'Owner'} color="red" />}
                {member.role && member.role === 'admin' && <Badge count={'Admin'} color="blue" />}
              </div>
            </ProfilePopover>
          ))}

        <Separator />
        <Button type="text" className={styles.clearChatHistory} onClick={clearChatHistory} block>
          Clear Chat History
        </Button>
        <Separator />
        <Button type="text" className={styles.clearChatHistory} onClick={leaveGroup} block>
          Leave Group
        </Button>
      </Drawer>
      <div>{clearChatHistoryContextHolder}</div>
      <div>{leaveGroupContextHolder}</div>
      <div>
        <GroupSettingsEditDrawer isOpen={isEditDrawerOpen} setIsOpen={setIsEditDrawerOpen} />
      </div>
    </>
  )
}
