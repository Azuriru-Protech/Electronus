import Icon from '@renderer/components/widgets/Icon/Icon'
import '@renderer/styles/settings.scss'
import { Avatar, Button, Input, Modal, Radio, RadioChangeEvent } from 'antd'
import { useState } from 'react'
import SampleProfilePic from '@renderer/assets/images/sample-profile-pic.jpg'
import SettingsTopbar from '@renderer/components/layouts/SettingsTopbar/SettingsTopbar'

export default function PersonalInformation() {
  const [value, setValue] = useState('male')
  const [isProfilePictureModalOpen, setIsProfilePictureModalOpen] = useState(false)
  const [isIdModalOpen, setIsIdModalOpen] = useState(false)
  const [newProfilePic, setNewProfilePic] = useState<File>()
  const [newProfilePicUrl, setNewProfilePicUrl] = useState<string>()
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false)
  const [signature, setSignature] = useState('')

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }
  return (
    <>
      <SettingsTopbar>Personal Information</SettingsTopbar>
      <div className="settingsCardList">
        <div className="settingsCard">
          <div className="settingsCardItem">
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}
            >
              <label htmlFor="avatarInput">
                <Avatar size={56} icon={<img src={SampleProfilePic} />} />
              </label>
              <Input
                type="file"
                style={{ visibility: 'hidden', position: 'absolute' }}
                id="avatarInput"
                accept="image/*"
                onChange={(e) => {
                  setNewProfilePic(e.target.files![0])
                  setNewProfilePicUrl(URL.createObjectURL(e.target.files![0]))
                  setIsProfilePictureModalOpen(true)
                }}
              />
              <h4>name</h4>
            </div>
          </div>
        </div>
        <div className="settingsCard">
          <div className="settingsCardItem" onClick={() => setIsIdModalOpen(true)}>
            <h4>ID</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              1234
              <Icon name="chevron_right" weight={200} />
            </div>
          </div>
          <div className="settingsCardItem">
            <h4>我的二维码</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Icon name="qr_code" weight={200} />
              <Icon name="chevron_right" weight={200} />
            </div>
          </div>
          <div className="settingsCardItem">
            <h4>性别</h4>
            <Radio.Group onChange={onChange} value={value} style={{ display: 'flex', gap: '1rem' }}>
              <Radio value="male">男</Radio>
              <Radio value="female">女</Radio>
            </Radio.Group>
          </div>
          <div className="settingsCardItem" onClick={() => setIsSignatureModalOpen(true)}>
            <h4>个性签名</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <p>{signature}</p>
              <Icon name="chevron_right" weight={200} />
            </div>
          </div>
        </div>
      </div>
      <Modal
        styles={{
          content: { padding: 0 },
          header: { padding: '16px 24px', margin: 0 }
        }}
        title="设置头像"
        open={isProfilePictureModalOpen}
        onOk={() => {
          setIsProfilePictureModalOpen(false)
        }}
        onCancel={() => {
          setIsProfilePictureModalOpen(false)
        }}
        footer={
          <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Button
                onClick={() => {
                  setIsProfilePictureModalOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setIsProfilePictureModalOpen(false)
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
        }
        width={350}
        centered
      >
        <img src={newProfilePicUrl} style={{ width: '100%' }} />
      </Modal>
      <Modal
        title="ID"
        open={isIdModalOpen}
        onOk={() => {
          setIsIdModalOpen(false)
        }}
        onCancel={() => {
          setIsIdModalOpen(false)
        }}
        centered
      >
        您的ID是 ABCD1234
      </Modal>
      <Modal
        title="个性签名"
        open={isSignatureModalOpen}
        onCancel={() => {
          setIsSignatureModalOpen(false)
        }}
        footer={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Button
                onClick={() => {
                  setIsSignatureModalOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setIsSignatureModalOpen(false)
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
        }
        centered
      >
        <Input.TextArea rows={4} value={signature} onChange={(e) => setSignature(e.target.value)} />
      </Modal>
    </>
  )
}
