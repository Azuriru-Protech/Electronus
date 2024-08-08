import Icon from '@renderer/components/widgets/Icon/Icon'
import '@renderer/styles/settings.scss'

export default function AccountSecurity() {
  return (
    <div className="settingsCardList">
      <div className="settingsCard">
        <div className="settingsCardItem">
          <h3>手机号</h3>
          <Icon name="chevron_right" weight={200} />
        </div>
        <div className="settingsCardItem">
          <h3>设置密码</h3>
          <Icon name="chevron_right" weight={200} />
        </div>
      </div>
      <div className="settingsCard">
        <div className="settingsCardItem">
          <h3>设备管理</h3>
          <Icon name="chevron_right" weight={200} />
        </div>
      </div>
      <div className="settingsCard">
        <div className="settingsCardItem">
          <h3>注销账户</h3>
          <Icon name="chevron_right" weight={200} />
        </div>
      </div>
    </div>
  )
}
