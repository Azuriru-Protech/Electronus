import Icon from '@renderer/components/widgets/Icon/Icon'
import '@renderer/styles/settings.scss'
import { Avatar, Button, Input, Modal, Radio, RadioChangeEvent } from 'antd'
import { useState } from 'react'
import SampleProfilePic from '@renderer/assets/images/sample-profile-pic.jpg'
import SettingsTopbar from '@renderer/components/layouts/SettingsTopbar/SettingsTopbar'
import styles from './PersonalInformation.module.scss'
import { useTranslation } from 'react-i18next'

export default function PersonalInformation() {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.settings.personalInformation' })
  const [value, setValue] = useState('male')
  const [isProfilePictureModalOpen, setIsProfilePictureModalOpen] = useState(false)
  const [isIdModalOpen, setIsIdModalOpen] = useState(false)
  const [newProfilePic, setNewProfilePic] = useState<File>()
  const [newProfilePicUrl, setNewProfilePicUrl] = useState<string>()
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false)
  const [signature, setSignature] = useState('')
  const [idModal, idContextHolder] = Modal.useModal()

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
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
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}
            >
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              1234
              <Icon name="chevron_right" weight={200} />
            </div>
          </div>
          <div className="settingsCardItem">
            <h4>{t('myQrCode')}</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Icon name="qr_code" weight={200} />
              <Icon name="chevron_right" weight={200} />
            </div>
          </div>
          <div className="settingsCardItem">
            <h4>{t('gender')}</h4>
            <Radio.Group onChange={onChange} value={value} style={{ display: 'flex', gap: '1rem' }}>
              <Radio value="male">{t('male')}</Radio>
              <Radio value="female">{t('female')}</Radio>
            </Radio.Group>
          </div>
          <div className="settingsCardItem" onClick={() => setIsSignatureModalOpen(true)}>
            <h4>{t('personalizedSignature')}</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <p>{signature}</p>
              <Icon name="chevron_right" weight={200} />
            </div>
          </div>
        </div>
      </div>
      <Modal
        classNames={{
          content: styles.profilePictureModalContent,
          header: styles.profilePictureModalHeader
        }}
        title={t('changeProfilePicture')}
        open={isProfilePictureModalOpen}
        onOk={() => {
          setIsProfilePictureModalOpen(false)
        }}
        onCancel={() => {
          setIsProfilePictureModalOpen(false)
        }}
        footer={
          <div className={styles.profilePictureModalFooterWrapper}>
            <div className={styles.profilePictureModalFooter}>
              <Button
                onClick={() => {
                  setIsProfilePictureModalOpen(false)
                }}
              >
                {t('cancel')}
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setIsProfilePictureModalOpen(false)
                }}
              >
                {t('confirm')}
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
      {idContextHolder}
    </>
  )
}
