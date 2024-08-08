import SettingsTopbar from '@renderer/components/layouts/SettingsTopbar/SettingsTopbar'
import Icon from '@renderer/components/widgets/Icon/Icon'

export default function DeviceManagement() {
  return (
    <>
      <SettingsTopbar>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Icon name="chevron_left" />
          设备管理
        </div>
      </SettingsTopbar>
    </>
  )
}
