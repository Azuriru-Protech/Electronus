import styles from './LoginQr.module.scss'
import { ReloadOutlined } from '@ant-design/icons'
import protechQR from '@renderer/assets/images/protechQR.png'
import { Button } from 'antd'

const Steps: string[] = [
  'Login to your account on the Protech App',
  'Navigate to Homepage, click on the scan icon on the top right',
  'Move your camera towards the QR Code and scan it'
]

export default function LoginQr({ ...props }) {
  const loginSuccess = props.loginStatus === 1
  const reloadQr = props.reloadQr
  const setReloadQr = props.setReloadQr
  const setLoginType = props.setLoginType
  const setLoginStatus = props.setLoginStatus

  return (
    <div className={styles.cardBody} style={{ gap: 12 }}>
      {!loginSuccess && (
        <div className={styles.qrContainer}>
          <img src={protechQR} width={175} height={175} alt="protech-qr" />

          <div className={`${styles.expiredOverlay} ${reloadQr ? styles.active : ''}`}>
            <ReloadOutlined
              style={{
                fontSize: '45px',
                color: '#ffffff',
                cursor: 'pointer'
              }}
              onClick={() => setReloadQr(false)}
            />
            <p>Click to Reload</p>
          </div>
        </div>
      )}

      <div className={styles.qrLoginWrapper}>
        {!loginSuccess ? (
          <>
            <div className={styles.qrLoginSteps}>
              {Steps.map((item, index) => (
                <div key={index} className={`${styles.step} `}>
                  <div className={styles.stepNumbering}>{index + 1}</div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <div className={styles.buttonsWrapper}>
              <Button
                className={styles.loginBtn}
                onClick={() => {
                  setLoginType(0)
                }}
              >
                Back
              </Button>
              <Button
                className={styles.loginBtn}
                onClick={() => {
                  setLoginStatus(1)
                  window.location.href = '/chat'
                }}
              >
                Logged In
              </Button>
            </div>
          </>
        ) : (
          <div className={styles.qrLoginSteps} style={{ alignItems: 'center' }}>
            <div className={styles.profile}></div>
            <div className={styles.completionContainer}>
              <p style={{ fontWeight: 600 }}>Non-Binary</p>
              <p style={{ width: '100%', maxWidth: '300px' }}>
                QR scanned successfully, please authoize the login on your phone
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
