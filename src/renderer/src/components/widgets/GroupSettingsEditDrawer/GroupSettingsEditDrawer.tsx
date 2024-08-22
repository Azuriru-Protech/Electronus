import { useState } from 'react'
import ChangeProfilePictureModal from '../ChangeProfilePictureModal/ChangeProfilePictureModal'
import { Divider, Drawer, Switch } from 'antd'
import SettingsCardItem from '../SettingsCardItem/SettingsCardItem'
import sampleProfilePic from '../../../assets/images/sample-profile-pic.jpg'
import Separator from '../Separator/Separator'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function GroupSettingsEditDrawer({ isOpen, setIsOpen }: Props) {
  const [isProfilePictureModalOpen, setIsProfilePictureModalOpen] = useState(false)
  const [newProfilePicUrl, setNewProfilePicUrl] = useState<string>()
  const [groupEntryVerification, setGroupEntryVerification] = useState(false)
  const [screenCaptureProhibited, setScreenCaptureProhibited] = useState(false)
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

  const settingsData = [
    {
      title: 'Group Entry Verification',
      description:
        'After enabling, enter the group through group links or invitations need to be approved ...',
      state: groupEntryVerification,
      toggleAction: () => setGroupEntryVerification(!groupEntryVerification)
    },
    {
      title: 'Screen Capture Prohibited',
      state: screenCaptureProhibited,
      toggleAction: () => setScreenCaptureProhibited(!screenCaptureProhibited)
    },
    {
      title: 'Hide Notifications',
      description:
        'After enabling, ordinary users will not receive notification on users that are muted, removed or left the group ...',
      state: hideNotifications,
      toggleAction: () => setHideNotifications(!hideNotifications)
    },
    {
      title: 'Group Members Mute',
      state: groupMembersMute,
      toggleAction: () => setGroupMembersMute(!groupMembersMute)
    },
    {
      title: 'Group Members Are Invisible',
      state: groupMembersAreInvisible,
      toggleAction: () => setGroupMembersAreInvisible(!groupMembersAreInvisible)
    },
    {
      title: "Group Members Can't Send Name Card",
      state: groupMembersSendNameCards,
      toggleAction: () => setGroupMembersSendNameCards(!groupMembersSendNameCards)
    },
    {
      title: 'Group Members Are Forbidden to Send Pictures',
      state: groupMembersForbiddenSendPic,
      toggleAction: () => setGroupMembersForbiddenSendPic(!groupMembersForbiddenSendPic)
    },
    {
      title: 'Group Members Are Forbidden to Send Videos',
      state: groupMemberForbiddenSendVid,
      toggleAction: () => setGroupMemberForbiddenSendVid(!groupMemberForbiddenSendVid)
    },
    {
      title: 'Group Members Are Forbidden to Send Files',
      state: groupMembersForbiddenSendFile,
      toggleAction: () => setGroupMembersForbiddenSendFile(!groupMembersForbiddenSendFile)
    },
    {
      title: 'Group Members List Is Not Visible',
      state: groupMembersListNotVisible,
      toggleAction: () => setGroupMembersListNotVisible(!groupMembersListNotVisible)
    },
    {
      title: 'Group Members Cant Modify Name',
      state: groupMembersCantModifyName,
      toggleAction: () => setGroupMembersCantModifyName(!groupMembersCantModifyName)
    },
    {
      title: 'Group Members Cant Add Members',
      state: groupMembersCantAddMembers,
      toggleAction: () => setGroupMembersCantAddMembers(!groupMembersCantAddMembers)
    },
    {
      title: 'Reminder Management',
      state: reminderManagement,
      toggleAction: () => setReminderManagement(!reminderManagement)
    }
  ]

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
      <div className="settingsCardList">
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
      </div>

      <div className="settingsCardList">
        {settingsData.map((setting, index) => (
          <div className="settingsCardItemBorderlessWrapper" key={index}>
            <div className="contentContainer">
              <h4>{setting.title}</h4>
              {setting.description && <p>{setting.description}</p>}
            </div>
            <div className="actionContainer">
              <Switch
                defaultChecked={setting.state}
                onChange={setting.toggleAction}
                size="default"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="settingsCardList">
        <Divider style={{ margin: 0 }} />
        <SettingsCardItem
          title={'Chat History'}
          onClick={() => setIsProfilePictureModalOpen(true)}
        />
        <SettingsCardItem
          title={'Special Remarks'}
          onClick={() => setIsProfilePictureModalOpen(true)}
        />
        <SettingsCardItem
          title={'Special Restrictions'}
          onClick={() => setIsProfilePictureModalOpen(true)}
        />
        <SettingsCardItem
          title={'Mange Inactive Users'}
          onClick={() => setIsProfilePictureModalOpen(true)}
        />
        <Divider style={{ margin: 0 }} />
        <SettingsCardItem
          title={'Chat Sensitive Words'}
          onClick={() => setIsProfilePictureModalOpen(true)}
        />
        <Divider style={{ margin: 0 }} />
        <SettingsCardItem
          title={'Manage Logs'}
          onClick={() => setIsProfilePictureModalOpen(true)}
        />
      </div>
    </Drawer>
  )
}
