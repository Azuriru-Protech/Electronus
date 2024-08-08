import Icon from '@renderer/components/widgets/Icon/Icon'
import '@renderer/styles/settings.scss'

export default function SystemSettings() {
  return (
    <div className="settingsCardList">
      <div className="settingsCard">
        <div className="settingsCardItem">
          <h3>消息通知</h3>
          <Icon name="chevron_right" weight={200} />
        </div>
        <div className="settingsCardItem">
          <h3>语言切换</h3>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <p style={{ color: '#78787d' }}>简体中文</p>
            <Icon name="chevron_right" weight={200} color="#505050" />
          </div>
        </div>
        <div className="settingsCardItem">
          <h3>清理缓存</h3>
          <Icon name="chevron_right" weight={200} color="#505050" />
        </div>
        <div className="settingsCardItem">
          <h3>清空聊天记录</h3>
          <Icon name="chevron_right" weight={200} color="#505050" />
        </div>
        <div className="settingsCardItem">
          <h3>关于我们</h3>
          <Icon name="chevron_right" weight={200} color="#505050" />
        </div>
      </div>
      <div className="settingsCard">
        <div className="settingsCardItem">
          <h3>切换账号</h3>
          <Icon name="chevron_right" weight={200} color="#505050" />
        </div>
      </div>
      <div className="settingsCard">
        <div className="settingsCardItem" style={{ color: 'red', justifyContent: 'center' }}>
          <h3>退出登录</h3>
        </div>
      </div>
    </div>
  )
}
