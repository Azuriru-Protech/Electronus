import { useState } from 'react'
import ChangeProfilePictureModal from '../ChangeProfilePictureModal/ChangeProfilePictureModal'
import { Divider, Drawer, Switch } from 'antd'
import SettingsCardItem from '../SettingsCardItem/SettingsCardItem'
import sampleProfilePic from '../../../assets/images/sample-profile-pic.jpg'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function GroupSettingsEditDrawer({ isOpen, setIsOpen }: Props) {
  const [isProfilePictureModalOpen, setIsProfilePictureModalOpen] = useState(false)
  const [newProfilePicUrl, setNewProfilePicUrl] = useState<string>()
  const [groupEntryVerfication, setGroupEntryVerfication] = useState(false)
  const [screenCaptureProhibitied, setScreenCaptureProhibitied] = useState(false)
  const [hideNotifications, setHideNotifications] = useState(false)
  const [groupMembersMute, setGroupMembersMute] = useState(false)
  const [groupMembersAreInvisible, setGroupMembersAreInvisible] = useState(false)
  const [groupMembersSendNameCards, setGroupMembersSendNameCards] = useState(false)
  const [groupMembersForbiddenSendPic, setGroupMembersForbiddenSendPic] = useState(false)
  const [groupMemberForbiddenSendVid, setGroupMemberForbiddenSendVid] = useState(false)
  const [groupMembersForbiddenSendFile, setGroupMembersForbiddenSendFile] = useState(false)
  const [groupMembersListNotVisible, setGroupMembersListNotVisible] = useState(false)
  const [groupMembersCantModifyName, setGroupMembersCantModifyName] = useState(false)
  const [groupMembersCantAddMembers, setGroupMembersCantAddMembers] = useState(false)
  const [reminderManagement, setReminderManagement] = useState(false)

  return (
    <Drawer
      closeIcon={null}
      title={
        <div className={'groupSettingsTitleWrapper'}>
          <h3>群聊设置</h3>
        </div>
      }
      placement="right"
      onClose={() => setIsOpen(false)}
      open={isOpen}
      styles={{ body: { padding: 0, width: '100%' } }}
    >
      <ChangeProfilePictureModal
        isOpen={isProfilePictureModalOpen}
        setIsOpen={setIsProfilePictureModalOpen}
        imageUrl={newProfilePicUrl!}
      ></ChangeProfilePictureModal>
      <SettingsCardItem
        avatar={sampleProfilePic}
        secondaryTitle="Set New Profile Picture"
        onClick={() => setIsProfilePictureModalOpen(true)}
      />
      <Divider style={{ margin: 0 }} />
      <SettingsCardItem title={'Group Name'} content={'HOTDOG'} />
      <Divider style={{ margin: 0 }} />
      <SettingsCardItem
        title={'Group Announcement'}
        content={'123 this is group announcement'}
        onClick={() => setIsProfilePictureModalOpen(true)}
      />
      <Divider style={{ margin: 0 }} />
      <div className="settingsCardList">
        <div className="settingsCard">
          <div className="settingsCardItemBorderless">
            <h4>Group Entry Verification</h4>
            <Switch
              defaultChecked
              onChange={() => setGroupEntryVerfication(!groupEntryVerfication)}
              size="small"
            />
          </div>
          <div className="settingsCardItemBorderless">
            <h4>Screen Capture Prohibited</h4>
            <Switch
              defaultChecked
              onChange={() => setScreenCaptureProhibitied(!screenCaptureProhibitied)}
              size="small"
            />
          </div>
          <div className="settingsCardItemBorderless">
            <h4>Hide Notifications</h4>
            <Switch
              defaultChecked
              onChange={() => setHideNotifications(!hideNotifications)}
              size="small"
            />
          </div>
          <div className="settingsCardItemBorderless">
            <h4>Group Members Mute</h4>
            <Switch
              defaultChecked
              onChange={() => setGroupMembersMute(!groupMembersMute)}
              size="small"
            />
          </div>
          <div className="settingsCardItemBorderless">
            <h4>Group Members Are Invinsible</h4>
            <Switch
              defaultChecked
              onChange={() => setGroupMembersAreInvisible(!groupMembersAreInvisible)}
              size="small"
            />
          </div>
          <div className="settingsCardItemBorderless">
            <h4>Group Members Can't Send Name Card</h4>
            <Switch
              defaultChecked
              onChange={() => setGroupMembersSendNameCards(!groupMembersSendNameCards)}
              size="small"
            />
          </div>
          <div className="settingsCardItemBorderless">
            <h4>Group Members Are Forbidden to Send Pictures</h4>
            <Switch
              defaultChecked
              onChange={() => setGroupMembersForbiddenSendPic(!groupMembersForbiddenSendPic)}
              size="small"
            />
          </div>
          <div className="settingsCardItemBorderless">
            <h4>Group Members Are Forbidden to Send Videos</h4>
            <Switch
              defaultChecked
              onChange={() => setGroupMemberForbiddenSendVid(!groupMemberForbiddenSendVid)}
              size="small"
            />
          </div>
          <div className="settingsCardItemBorderless">
            <h4>Group Members Are Forbidden to Send Videos</h4>
            <Switch
              defaultChecked
              onChange={() => setGroupMemberForbiddenSendVid(!groupMemberForbiddenSendVid)}
              size="small"
            />
          </div>
          <div className="settingsCardItemBorderless">
            <h4>Group Members Are Forbidden to Send Files</h4>
            <Switch
              defaultChecked
              onChange={() => setGroupMembersForbiddenSendFile(!groupMembersForbiddenSendFile)}
              size="small"
            />
          </div>
          <div className="settingsCardItemBorderless">
            <h4>Group Members List Is Not Visible</h4>
            <Switch
              defaultChecked
              onChange={() => setGroupMembersListNotVisible(!groupMembersListNotVisible)}
              size="small"
            />
          </div>
          <div className="settingsCardItemBorderless">
            <h4>Group Members Cant Modify Name</h4>
            <Switch
              defaultChecked
              onChange={() => setGroupMembersCantModifyName(!groupMembersCantModifyName)}
              size="small"
            />
          </div>
          <div className="settingsCardItemBorderless">
            <h4>Group Members Cant Add Members</h4>
            <Switch
              defaultChecked
              onChange={() => setGroupMembersCantAddMembers(!groupMembersCantAddMembers)}
              size="small"
            />
          </div>
          <div className="settingsCardItemBorderless">
            <h4>Reminder Management</h4>
            <Switch
              defaultChecked
              onChange={() => setReminderManagement(!reminderManagement)}
              size="small"
            />
          </div>
        </div>
      </div>
    </Drawer>
  )
}
