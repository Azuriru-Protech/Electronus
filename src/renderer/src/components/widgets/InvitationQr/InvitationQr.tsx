import { Avatar, Button } from 'antd'
import './InvitationQr.scss'
import ProfilePicture from '../../../assets/images/misc/profile-picture.jpg'
import { QRCode } from 'antd'
import { useCallback, useRef, useState } from 'react'
import { makeRandomID } from '@renderer/utilities/Utilities'
import { toPng } from 'html-to-image'
export default function InvitationQr() {
  const [qrCode, setQrCode] = useState(makeRandomID(100))
  const saveQrCodeRef = useRef<HTMLDivElement>(null)

  const updateQrCode = () => {
    setQrCode(makeRandomID(100))
  }

  const saveQrCode = useCallback(async () => {
    if (saveQrCodeRef.current === null) {
      return
    }
    const dataUrl = await toPng(saveQrCodeRef.current, { cacheBust: true, skipFonts: true })
    const link = document.createElement('a')
    link.download = 'invitation.png'
    link.href = dataUrl
    link.click()
    link.remove()
  }, [saveQrCodeRef])

  return (
    <>
      <div className="share-invite-wrapper">
        <div className="generate-invite" ref={saveQrCodeRef}>
          <div className="avatar-wrapper">
            <Avatar size={48} src={ProfilePicture} />
            <div className="detail-wrapper">
              <p className="username">Mr Meow Meow</p>
              <p className="scan-details">Scan the QR Code to add me as a friend</p>
            </div>
          </div>
          <div className="qr-code-wrapper">
            <QRCode value={qrCode} size={320} />
            <p>Invitation code: 0617</p>
          </div>

          <div className="invite-description">
            Your Friend Invited you to join FFSAY. Scan the QR Code with your phone's built-in
            broswer to download the FFSAY APP. After the installation is complete, scan again to
            apply fot both parties as friends, lets experience the FFSAY journey together now
          </div>
        </div>
        <p
          className="update-qr-code-button"
          onClick={() => {
            updateQrCode()
          }}
        >
          Update QR Link
        </p>

        <div className="button-wrapper">
          <Button block={true} onClick={saveQrCode}>
            Save Image
          </Button>
          <Button type="primary" block={true}>
            Share Now
          </Button>
        </div>
      </div>
    </>
  )
}
