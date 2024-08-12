import styles from './Register.module.scss'
import protechHorizontal from '@renderer/assets/images/companyLogo/protech_horizontal.png'
// import LoginTab from "@/components/widgets/LoginTab/LoginTab";
import { useEffect, useState } from 'react'
import { LoginOutlined, QrcodeOutlined } from '@ant-design/icons'
import LoginDefault from '@renderer/components/widgets/LoginDefault/LoginDefault'
import LoginQr from '@renderer/components/widgets/LoginQr/LoginQr'
import RegisterWithMobile from '@renderer/components/widgets/RegisterWithMobile/RegisterWithMobile'
import Icon from '@renderer/components/widgets/Icon/Icon'
import { Link } from 'react-router-dom'

export default function Register() {
  const [loginType, setLoginType] = useState(0)
  const [loginStatus, setLoginStatus] = useState(0)
  const [reloadQr, setReloadQr] = useState(false)
  const [loginTab, setLoginTab] = useState(0)
  const [registerStep, setRegisterStep] = useState(0)
  const [page, setPage] = useState('default')

  const onLoginTabCallback = (index: number) => {
    setLoginTab(index)
  }

  useEffect(() => {
    if (!reloadQr) {
      console.log('reloading QR now 2')
      setTimeout(() => {
        setReloadQr(true)
      }, 5000)
    }
  }, [reloadQr])

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.companyImgContainer}>
          <img src={protechHorizontal} width={300} alt="protech-horizontal" />
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Link to={'/login'} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Icon name="arrow_back_ios" size={18} weight={600} />
              <p>{` Back To Login`} </p>{' '}
            </Link>
          </div>

          <RegisterWithMobile
            currentStep={registerStep}
            onStepChangeCallback={(value: number) => setRegisterStep(value)}
            loginTab={loginTab}
            setLogintab={(value: number) => setLoginTab(value)}
            onLoginTabCallback={(index: number) => onLoginTabCallback(index)}
          />
        </div>
      </div>
    </div>
  )
}
