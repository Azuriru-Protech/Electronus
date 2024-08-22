import './Privacy.scss'
import { Switch } from 'antd'
import RightIcon from '../../../assets/images/icons/right-icon.svg'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import SettingsTopbar from '@renderer/components/layouts/SettingsTopbar/SettingsTopbar'
import Icon from '@renderer/components/widgets/Icon/Icon'

export default function Privacy() {
  const [addingFriendVerification, setAddingFriendVerification] = useState(true)
  const [phoneNumber, setPhoneNumber] = useState(true)
  const [id, setId] = useState(true)
  const [group, setGroup] = useState(true)
  const [businessCard, setBusinessCard] = useState(true)
  const [myQRCode, setMyQRCode] = useState(true)

  return (
    <>
      <SettingsTopbar>Privacy</SettingsTopbar>
      <div className="settingsCardList">
        <div className="settingsCard">
          <div
            className="settingsCardItem"
            onClick={() => setAddingFriendVerification(!addingFriendVerification)}
          >
            <h4> Adding Friend Verification</h4>
            <Switch
              checked={addingFriendVerification}
              onChange={(checked) => setAddingFriendVerification(checked)}
              size="small"
            />
          </div>
        </div>
        <div className="settingsCard">
          <div className="settingsCardItem" onClick={() => setPhoneNumber(!phoneNumber)}>
            <h4>Phone Number</h4>
            <Switch
              checked={phoneNumber}
              onChange={(checked) => setPhoneNumber(checked)}
              size="small"
            />
          </div>

          <div className="settingsCardItem" onClick={() => setId(!id)}>
            <h4>ID</h4>
            <Switch checked={id} onChange={(checked) => setId(checked)} size="small" />
          </div>

          <div className="settingsCardItem" onClick={() => setGroup(!group)}>
            <h4>Group</h4>
            <Switch checked={group} onChange={(checked) => setGroup(checked)} size="small" />
          </div>

          <div className="settingsCardItem" onClick={() => setBusinessCard(!businessCard)}>
            <h4>Business Card</h4>
            <Switch
              checked={businessCard}
              onChange={(checked) => setBusinessCard(checked)}
              size="small"
            />
          </div>

          <div className="settingsCardItem" onClick={() => setMyQRCode(!myQRCode)}>
            <h4>My QR Code</h4>
            <Switch checked={myQRCode} onChange={(checked) => setMyQRCode(checked)} size="small" />
          </div>
        </div>

        <div className="settingsCard">
          <Link className="settingsCardItem" to="/settings/privacy/blacklist">
            <h4>Blacklist</h4>
            <Icon name="chevron_right" />
          </Link>
        </div>
      </div>
    </>
  )
}
