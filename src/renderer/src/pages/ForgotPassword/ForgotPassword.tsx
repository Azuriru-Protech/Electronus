import styles from './ForgotPassword.module.scss'
import protechHorizontal from '@renderer/assets/images/companyLogo/protech_horizontal.png'
// import LoginTab from "@/components/widgets/LoginTab/LoginTab";
import { useEffect, useState } from 'react'
import Icon from '@renderer/components/widgets/Icon/Icon'
import { Link } from 'react-router-dom'
import { Button, Input, Select, Space } from 'antd'
import { OTPProps } from 'antd/es/input/OTP'
import { CountryCode } from '@renderer/utilities/Defaults'
import LoginTab from '@renderer/components/widgets/LoginTab/LoginTab'

const LoginTabs: string[] = ['Forgot Password']

export default function ForgotPassword() {
  const [reloadQr, setReloadQr] = useState(false)
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [countryCodeNumber, setCountryCodeNumber] = useState<{ label: string; value: string }[]>([])
  const [mobileCountry, setMobileCountry] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [loginTab, setLoginTab] = useState(0)

  const onLoginTabCallback = (index: number) => {
    setLoginTab(index)
  }

  const onChange: OTPProps['onChange'] = (text) => {
    console.log('onChange:', text)
  }

  const sharedProps: OTPProps = {
    onChange
  }

  const sendOtp = () => {
    console.log('sendOtp')
    setOtpSent(true)
  }

  useEffect(() => {
    const countryList = CountryCode.map((code) => {
      return {
        label: `${code.dial_code} (${code.name})`,
        value: `${code.dial_code}`
      }
    })
    setCountryCodeNumber(countryList)
  }, [])

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
          <div className={styles.cardBody}>
            <LoginTab data={LoginTabs} onActiveTabCallback={onLoginTabCallback} />

            <div className={styles.bodyWrapper} style={{ marginTop: '12px' }}>
              <Space.Compact>
                <Select
                  defaultValue="+60"
                  options={countryCodeNumber}
                  onChange={(e) => {
                    setMobileCountry(e)
                  }}
                />
                <Input
                  onChange={(e) => {
                    setMobileNumber(e.target.value)
                  }}
                />
              </Space.Compact>
              <div className={styles.otp}>
                <Input.OTP variant="filled" {...sharedProps} />
                <Button className={styles.otpBtn} onClick={sendOtp}>
                  Get OTP
                </Button>
              </div>
              <Button
                className={styles.loginBtn}
                icon={<Icon name="arrow_forward" size={18} weight={600} />}
                iconPosition="end"
                onClick={() => {}}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
