import Icon from '@renderer/components/widgets/Icon/Icon'
import '@renderer/styles/settings.scss'
import { Avatar, Button, Input, message, Modal, Radio, RadioChangeEvent } from 'antd'
import { useState } from 'react'
import SampleProfilePic from '@renderer/assets/images/sample-profile-pic.jpg'
import SettingsTopbar from '@renderer/components/layouts/SettingsTopbar/SettingsTopbar'
import styles from './PersonalInformation.module.scss'
import { useTranslation } from 'react-i18next'
import ChangeProfilePictureModal from '@renderer/components/widgets/ChangeProfilePictureModal/ChangeProfilePictureModal'
import InvitationQr from '@renderer/components/widgets/InvitationQr/InvitationQr'

export default function PersonalInformation() {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.settings.personalInformation' })
  const [value, setValue] = useState('male')
  const [isProfilePictureModalOpen, setIsProfilePictureModalOpen] = useState(false)
  const [newProfilePic, setNewProfilePic] = useState<File>()
  const [newProfilePicUrl, setNewProfilePicUrl] = useState<string>()
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false)
  const [signature, setSignature] = useState('')
  const [isMyQrOpen, setIsMyQrOpen] = useState(false)
  const [idModal, idContextHolder] = Modal.useModal()
  const [messageApi, messageContextHolder] = message.useMessage()

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)
    messageApi.open({
      type: 'success',
      content: 'Gender changed successfully'
    })
  }

  const showIdModal = async () => {
    const confirm = await idModal.confirm({
      title: `${t('yourIdIs')} abcd1234`,
      icon: null,
      cancelButtonProps: { style: { display: 'none' } },
      okText: t('confirm'),
      centered: true
    })
    if (confirm) {
      console.log('proceed to bind phone number')
    }
  }
  return (
    <>
      <SettingsTopbar>{t('personalInformation')}</SettingsTopbar>
      <div className="settingsCardList">
        <div className="settingsCard">
          <div className="settingsCardItem">
            <div className={styles.settingsCardItemContent} style={{ position: 'relative' }}>
              <label htmlFor="avatarInput">
                <Avatar size={56} icon={<img src={SampleProfilePic} />} />
              </label>
              <Input
                type="file"
                className={styles.fileInput}
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
          <div className="settingsCardItem" onClick={() => showIdModal()}>
            <h4>ID</h4>
            <div className={styles.settingsCardItemContent}>
              1234
              <Icon name="chevron_right" weight={200} />
            </div>
          </div>
          <div className="settingsCardItem" onClick={() => setIsMyQrOpen(true)}>
            <h4>{t('myQrCode')}</h4>
            <div className={styles.settingsCardItemContent}>
              <Icon name="qr_code" weight={200} />
              <Icon name="chevron_right" weight={200} />
            </div>
          </div>
          <div className="settingsCardItem">
            <h4>{t('gender')}</h4>
            <Radio.Group
              onChange={onChange}
              value={value}
              className={styles.settingsCardItemContent}
            >
              <Radio value="male">{t('male')}</Radio>
              <Radio value="female">{t('female')}</Radio>
            </Radio.Group>
          </div>
          <div className="settingsCardItem" onClick={() => setIsSignatureModalOpen(true)}>
            <h4>{t('personalizedSignature')}</h4>
            <div className={styles.settingsCardItemContent}>
              <p>{signature}</p>
              <Icon name="chevron_right" weight={200} />
            </div>
          </div>
        </div>
      </div>
      <ChangeProfilePictureModal
        isOpen={isProfilePictureModalOpen}
        setIsOpen={setIsProfilePictureModalOpen}
        imageUrl={newProfilePicUrl!}
      />
      <Modal
        title={t('personalizedSignature')}
        open={isSignatureModalOpen}
        onCancel={() => {
          setIsSignatureModalOpen(false)
        }}
        footer={
          <div className={styles.signatureModalFooterWrapper}>
            <div className={styles.signatureModalFooter}>
              <Button
                onClick={() => {
                  setIsSignatureModalOpen(false)
                }}
              >
                {t('cancel')}
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setIsSignatureModalOpen(false)
                }}
              >
                {t('confirm')}
              </Button>
            </div>
          </div>
        }
        centered
      >
        <Input.TextArea rows={4} value={signature} onChange={(e) => setSignature(e.target.value)} />
      </Modal>
      <Modal
        title={'My QR Code'}
        open={isMyQrOpen}
        onCancel={() => {
          setIsMyQrOpen(false)
        }}
        footer={null}
        centered
      >
        <InvitationQr />
      </Modal>
      <div>{idContextHolder}</div>
      <div>{messageContextHolder}</div>
    </>
  )
}
