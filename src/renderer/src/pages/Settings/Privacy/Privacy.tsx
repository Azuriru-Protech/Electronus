import './Privacy.scss'
import { Switch } from 'antd'
import RightIcon from '../../../assets/images/icons/right-icon.svg'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import SettingsTopbar from '@renderer/components/layouts/SettingsTopbar/SettingsTopbar'

export default function Privacy(): JSX.Element {
  const [addingFriendVerification, setAddingFriendVerification] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState(false)
  const [ffsayID, setFfsayID] = useState(false)
  const [group, setGroup] = useState(false)
  const [businessCard, setBusinessCard] = useState(false)
  const [myQRCode, setMyQRCode] = useState(false)

  return (
    <>
      <SettingsTopbar>Privacy</SettingsTopbar>
      <div className="privacy-page-wrapper">
        <div className="settingsCard">
          <div className="settingsCardItem">
            <h4> Adding Friend Verification</h4>
            <Switch
              defaultChecked
              onChange={() => setAddingFriendVerification(!addingFriendVerification)}
            />
          </div>
        </div>

        <div className="settingsCardList">
          <div className="settingsCard">
            <div className="settingsCardItem">
              <h4>Phone Number</h4>
              <Switch defaultChecked onChange={() => setPhoneNumber(!phoneNumber)} />
            </div>

            <div className="settingsCardItem">
              <h4>FFSAY ID</h4>
              <Switch defaultChecked onChange={() => setFfsayID(!ffsayID)} />
            </div>

            <div className="settingsCardItem">
              <h4>Group</h4>
              <Switch defaultChecked onChange={() => setGroup(!group)} />
            </div>

            <div className="settingsCardItem">
              <h4>Business Card</h4>
              <Switch defaultChecked onChange={() => setBusinessCard(!businessCard)} />
            </div>

            <div className="settingsCardItem">
              <h4>My QR Code</h4>
              <Switch defaultChecked onChange={() => setMyQRCode(!myQRCode)} />
            </div>
          </div>

          <div className="settingsCard">
            <div className="settingsCardItem">
              <h4>Blacklist</h4>
              <Link to="/settings/privacy/blacklist">
                <img onClick={() => {}} src={RightIcon} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
