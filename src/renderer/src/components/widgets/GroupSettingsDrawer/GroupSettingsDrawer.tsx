import { Avatar, Badge, Button, Drawer, Modal, Switch } from 'antd'
import ProfilePopover from '../ProfilePopover/ProfilePopover'
import Separator from '../Separator/Separator'
import Icon from '../Icon/Icon'
import styles from './GroupSettingsDrawer.module.scss'
import { useEffect, useState } from 'react'
import GroupSettingsEditDrawer from '../GroupSettingsEditDrawer/GroupSettingsEditDrawer'
import { CometChat } from '@cometchat/chat-sdk-javascript'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  group: CometChat.Group
}

export default function GroupSettingsDrawer({ isOpen, setIsOpen, group }: Props) {
  const [modal, modalContextHolder] = Modal.useModal()
  const [groupMembers, setGroupMembers] = useState<CometChat.GroupMember[]>([])
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false)

  useEffect(() => {
    getGroupMembers()
  }, [])

  const clearChatHistory = async () => {
    const confirm = await modal.confirm({
      title: '清空聊天记录',
      content: '确定要清空聊天记录吗？',
      centered: true,
      okText: '清空'
    })
  }

  const leaveGroup = async () => {
    const confirm = await modal.confirm({
      title: '退出群聊',
      content: '确定要退出群聊吗？',
      centered: true,
      okText: '退出'
    })
  }

  const getGroupMembers = async () => {
    const limit = 50
    const groupMembersRequest = new CometChat.GroupMembersRequestBuilder(group.getGuid())
      .setLimit(limit)
      .build()
    const groupMembers = await groupMembersRequest.fetchNext()
    setGroupMembers(groupMembers)
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
            />
            <p>Add members</p>
          </div>
          <div className={styles.groupSettingsMemberAction}>
            <Avatar
              icon={<Icon name="link" fill size={20} />}
              style={{ backgroundColor: '#0081ff' }}
            />
            <p>Invite via Link</p>
          </div>
        </div>
        <Separator />
        {groupMembers &&
          groupMembers.map((member) => (
            <ProfilePopover key={member.getUid()} member={member}>
              <div className={styles.groupSettingsMemberWrapper}>
                <Avatar src={member.getAvatar()} icon={<Icon name="person" fill size={20} />} />
                <p>{member.getName()}</p>
                {member.getUid() === group.getOwner() && <Badge count={'Owner'} color="red" />}
                {member.getScope() === 'admin' && member.getUid() !== group.getOwner() && (
                  <Badge count={'Admin'} color="blue" />
                )}
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
      <div>{modalContextHolder}</div>
      <div>
        <GroupSettingsEditDrawer isOpen={isEditDrawerOpen} setIsOpen={setIsEditDrawerOpen} />
      </div>
    </>
  )
}
