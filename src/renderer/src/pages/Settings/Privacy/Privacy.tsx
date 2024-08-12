import './Privacy.scss'
import { Switch } from 'antd'
import RightIcon from '../../../assets/images/icons/right-icon.svg'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Privacy(): JSX.Element {
  const [addingFriendVerification, setAddingFriendVerification] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState(false)
  const [ffsayID, setFfsayID] = useState(false)
  const [group, setGroup] = useState(false)
  const [businessCard, setBusinessCard] = useState(false)
  const [myQRCode, setMyQRCode] = useState(false)

  return (
    <div>
      <div className="privacy-page-wrapper">
        <div className="privacy-data-wrapper">
          Adding Friend Verification
          <Switch
            defaultChecked
            onChange={() => setAddingFriendVerification(!addingFriendVerification)}
          />
        </div>

        <div className="group-container">
          <div className="privacy-data-wrapper">
            Phone Number
            <Switch defaultChecked onChange={() => setPhoneNumber(!phoneNumber)} />
          </div>

          <hr className="divider" />

          <div className="privacy-data-wrapper">
            FFSAY ID
            <Switch defaultChecked onChange={() => setFfsayID(!ffsayID)} />
          </div>

          <hr className="divider" />

          <div className="privacy-data-wrapper">
            Group
            <Switch defaultChecked onChange={() => setGroup(!group)} />
          </div>

          <hr className="divider" />

          <div className="privacy-data-wrapper">
            Business Card
            <Switch defaultChecked onChange={() => setBusinessCard(!businessCard)} />
          </div>

          <hr className="divider" />
          <div className="privacy-data-wrapper">
            My QR Code
            <Switch defaultChecked onChange={() => setMyQRCode(!myQRCode)} />
          </div>
        </div>

        <div className="privacy-data-wrapper">
          Blacklist
          <Link to="/settings/privacy/blacklist">
            <img onClick={() => {}} src={RightIcon} />
          </Link>
        </div>
      </div>
    </div>
  )
}
