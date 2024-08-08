import Icon from '@renderer/components/widgets/Icon/Icon'
import '@renderer/styles/settings.scss'
import { Button, Input, Modal, Select } from 'antd'
import { useState } from 'react'
import styles from './AccountSecurity.module.scss'
import { Link } from 'react-router-dom'
import SettingsTopbar from '@renderer/components/layouts/SettingsTopbar/SettingsTopbar'

export default function AccountSecurity() {
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [phone, setPhone] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isAccountDeleteModalOpen, setIsAccountDeleteModalOpen] = useState(false)
  return (
    <>
      <SettingsTopbar>Account Security</SettingsTopbar>
      <div className="settingsCardList">
        <div className="settingsCard">
          <div className="settingsCardItem" onClick={() => setIsPhoneModalOpen(true)}>
            <h4>手机号</h4>
            <Icon name="chevron_right" weight={200} />
          </div>
          <div className="settingsCardItem" onClick={() => setIsPasswordModalOpen(true)}>
            <h4>设置密码</h4>
            <Icon name="chevron_right" weight={200} />
          </div>
        </div>
        <div className="settingsCard">
          <Link to="/settings/account-security/device-management" className="settingsCardItem">
            <h4>设备管理</h4>
            <Icon name="chevron_right" weight={200} />
          </Link>
        </div>
        <div className="settingsCard">
          <div className="settingsCardItem" onClick={() => setIsAccountDeleteModalOpen(true)}>
            <h4>注销账户</h4>
            <Icon name="chevron_right" weight={200} />
          </div>
        </div>
      </div>
      <Modal
        title="绑定手机号"
        centered
        open={isPhoneModalOpen}
        width={350}
        onCancel={() => setIsPhoneModalOpen(false)}
        footer={
          <Button block type="primary">
            继续
          </Button>
        }
      >
        <div className={styles.modalContent}>
          <p>绑定手机号后，下次登录可使用手机号进行登录。</p>
          <div className={styles.selectContainer}>
            <Select className={styles.selectField} />
            <div className={styles.label}>国家/地区</div>
          </div>
          <div className={styles.inputContainer}>
            <Input className={styles.inputField} placeholder="请填写手机号" />
            <div className={styles.label}>+60</div>
          </div>
        </div>
      </Modal>
      <Modal
        title="设置密码"
        centered
        open={isPasswordModalOpen}
        width={350}
        onCancel={() => setIsPasswordModalOpen(false)}
        footer={
          <Button block type="primary">
            继续
          </Button>
        }
      >
        <div className={styles.modalContent}>
          <p>修改后，可以通过新密码登录。</p>
          <div className={styles.inputContainer}>
            <Input className={styles.inputField} placeholder="请填写旧密码" />
            <label className={styles.label}>旧密码</label>
          </div>
          <div className={styles.inputContainer}>
            <Input className={styles.inputField} placeholder="请填写新密码" />
            <label className={styles.label}>新密码</label>
          </div>
          <div className={styles.inputContainer}>
            <Input className={styles.inputField} placeholder="请两次填写新密码" />
            <label className={styles.label}>确认密码</label>
          </div>
          <p>密码必须是8-16位英文字母、数字、字符组合（不能是纯数字）</p>
        </div>
      </Modal>
      <Modal
        centered
        title="注销成功后将清空您的所有数据，并且不能再恢复，确定注销吗？"
        closeIcon={null}
        open={isAccountDeleteModalOpen}
        onCancel={() => setIsAccountDeleteModalOpen(false)}
      ></Modal>
    </>
  )
}
