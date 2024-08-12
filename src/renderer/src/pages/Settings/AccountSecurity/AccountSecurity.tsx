import Icon from '@renderer/components/widgets/Icon/Icon'
import '@renderer/styles/settings.scss'
import { Button, Input, Modal, Select } from 'antd'
import { useState } from 'react'
import styles from './AccountSecurity.module.scss'
import { Link } from 'react-router-dom'
import SettingsTopbar from '@renderer/components/layouts/SettingsTopbar/SettingsTopbar'
import { useTranslation } from 'react-i18next'

export default function AccountSecurity() {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.settings.accountSecurity' })
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [phone, setPhone] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [deleteAccountModal, deleteAccountContextHolder] = Modal.useModal()

  const deleteAccount = async () => {
    const confirm = await deleteAccountModal.confirm({
      title: t('deleteAccount'),
      content: t('deleteAccountWarning'),
      okText: t('confirm'),
      cancelText: t('cancel'),
      centered: true
    })
    if (confirm) {
      console.log('proceed to delete account')
    }
  }
  return (
    <>
      <SettingsTopbar>{t('accountSecurity')}</SettingsTopbar>
      <div className="settingsCardList">
        <div className="settingsCard">
          <div className="settingsCardItem" onClick={() => setIsPhoneModalOpen(true)}>
            <h4>{t('phoneNumber')}</h4>
            <Icon name="chevron_right" weight={200} />
          </div>
          <div className="settingsCardItem" onClick={() => setIsPasswordModalOpen(true)}>
            <h4>{t('changePassword')}</h4>
            <Icon name="chevron_right" weight={200} />
          </div>
        </div>
        <div className="settingsCard">
          <Link to="/settings/account-security/device-management" className="settingsCardItem">
            <h4>{t('deviceManagement')}</h4>
            <Icon name="chevron_right" weight={200} />
          </Link>
        </div>
        <div className="settingsCard">
          <div className="settingsCardItem" onClick={() => deleteAccount()}>
            <h4>{t('deleteAccount')}</h4>
            <Icon name="chevron_right" weight={200} />
          </div>
        </div>
      </div>
      <Modal
        title={t('bindPhoneNumber')}
        centered
        open={isPhoneModalOpen}
        width={350}
        onCancel={() => setIsPhoneModalOpen(false)}
        footer={
          <Button block type="primary">
            {t('continue')}
          </Button>
        }
      >
        <div className={styles.modalContent}>
          <p>{t('bindPhoneNumberDescription')}</p>
          <div className={styles.selectContainer}>
            <Select className={styles.selectField} />
            <div className={styles.label}>{t('countryRegion')}</div>
          </div>
          <div className={styles.inputContainer}>
            <Input className={styles.inputField} placeholder={t('pleaseFillInPhoneNumber')} />
            <div className={styles.label}>+60</div>
          </div>
        </div>
      </Modal>
      <Modal
        title={t('changePassword')}
        centered
        open={isPasswordModalOpen}
        width={375}
        onCancel={() => setIsPasswordModalOpen(false)}
        footer={
          <Button block type="primary">
            {t('continue')}
          </Button>
        }
      >
        <div className={styles.modalContent}>
          <p>{t('changePasswordDescription')}</p>
          <div className={styles.inputContainer}>
            <Input className={styles.inputField} placeholder={t('pleaseFillInCurrentPassword')} />
            <label className={styles.label}>{t('currentPassword')}</label>
          </div>
          <div className={styles.inputContainer}>
            <Input className={styles.inputField} placeholder={t('pleaseFillInNewPassword')} />
            <label className={styles.label}>{t('newPassword')}</label>
          </div>
          <div className={styles.inputContainer}>
            <Input className={styles.inputField} placeholder={t('pleaseFillInConfirmPassword')} />
            <label className={styles.label}>{t('confirmPassword')}</label>
          </div>
          <p>{t('passwordRequirements')}</p>
        </div>
      </Modal>
      {deleteAccountContextHolder}
    </>
  )
}
