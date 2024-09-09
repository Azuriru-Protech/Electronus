import styles from './Login.module.scss'
import protechHorizontal from '@renderer/assets/images/companyLogo/protech_horizontal.png'
// import LoginTab from "@/components/widgets/LoginTab/LoginTab";
import { useEffect, useState } from 'react'
import { LoginOutlined, QrcodeOutlined } from '@ant-design/icons'
import LoginDefault from '@renderer/components/widgets/LoginDefault/LoginDefault'
import LoginQr from '@renderer/components/widgets/LoginQr/LoginQr'

export default function Login() {
  const [loginType, setLoginType] = useState(0)
  const [loginStatus, setLoginStatus] = useState(0)
  const [reloadQr, setReloadQr] = useState(false)
  const [loginTab, setLoginTab] = useState(0)
  // const [page, setPage] = useState('default')

  const onLoginTabCallback = (index: number) => {
    setLoginTab(index)
  }

  const qrLogin = loginType === 1

  // useEffect(() => {
  //   if (!reloadQr) {
  //     console.log('reloading QR now 2')
  //     setTimeout(() => {
  //       setReloadQr(true)
  //     }, 5000)
  //   }
  // }, [reloadQr])

  const showSpecificPage = (page: string) => {
    switch (page) {
      case 'qr':
        return (
          <LoginQr
            reloadQr={reloadQr}
            loginStatus={loginStatus}
            setReloadQr={setReloadQr}
            setLoginType={setLoginType}
            setLoginStatus={(value: number) => setLoginStatus(value)}
            onLoginTabCallback={(index: number) => onLoginTabCallback(index)}
            loginTab={loginTab}
            setLogintab={(value: number) => setLoginTab(value)}
          />
        )
      default:
        return (
          <LoginDefault
            onLoginTabCallback={(index: number) => onLoginTabCallback(index)}
            loginTab={loginTab}
            setLogintab={(value: number) => setLoginTab(value)}
          />
        )
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.companyImgContainer}>
          <img src={protechHorizontal} width={300} alt="protech-horizontal" />
        </div>
        <div className={styles.card}>
          <div className={styles.qrHidden}>
            {qrLogin ? (
              <LoginOutlined style={{ fontSize: '45px' }} onClick={() => setLoginType(0)} />
            ) : (
              <QrcodeOutlined
                style={{ fontSize: '45px', cursor: 'pointer' }}
                onClick={() => setLoginType(1)}
              />
            )}
            <div className={styles.triangleBox} />
          </div>
          <div className={styles.cardHeader}>
            <h1 className={styles.cardTitle}>{/* <LanguageButton /> */}</h1>
            {qrLogin && (
              <div className={styles.qrLoginWrapper} style={{ marginTop: 10 }}>
                <h2 style={{ fontWeight: 800 }}>Scan Code</h2>
                <p>
                  Use the{' '}
                  <span style={{ fontWeight: 600, textDecoration: 'underline' }}>Protech App</span>{' '}
                  to scan and log in
                </p>
              </div>
            )}
          </div>

          {qrLogin ? showSpecificPage('qr') : showSpecificPage('default')}
        </div>
      </div>
    </div>
  )
}
