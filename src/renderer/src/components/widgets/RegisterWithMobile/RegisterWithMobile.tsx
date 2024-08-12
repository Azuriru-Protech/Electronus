'use client'

import { Button, Checkbox, Input, Select, Space } from 'antd'
import LoginTab from '../LoginTab/LoginTab'
import styles from './RegisterWithMobile.module.scss'
import Icon from '../Icon/Icon'
import { CountryCode } from '@renderer/utilities/Defaults'
import { useEffect, useState } from 'react'
import { OTPProps } from 'antd/es/input/OTP'

const LoginTabs: string[] = ['Mobile Registeration']

export default function RegisterWithMobile({ ...props }) {
  const [countryCodeNumber, setCountryCodeNumber] = useState<{ label: string; value: string }[]>([])
  const [invitationCode, setInvitationCode] = useState('')
  const [name, setName] = useState('')
  const [mobileCountry, setMobileCountry] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [readTnc, setReadTnc] = useState(false)
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [showTimer, setShowTimer] = useState(false)
  const [timerCountdown, setTimerCountdown] = useState(0)
  const onLoginTabCallback = props.onLoginTabCallback
  let interval: any = null

  const onChange: OTPProps['onChange'] = (text) => {
    console.log('onChange:', text)
  }

  const sharedProps: OTPProps = {
    onChange
  }

  const sendOtp = () => {
    console.log('sendOtp')
    setShowOTP(true)
    setOtpSent(true)
    setShowTimer(true)
    startTimerCountdown(60)
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

  const startTimerCountdown = (initial: number) => {
    //countdown for 1 minute

    if (interval) {
      clearInterval(interval)
    }
    setTimerCountdown(initial)

    interval = setInterval(() => {
      if (initial > 0) {
        initial -= 1
        setTimerCountdown(initial)
      } else {
        clearInterval(interval)
        console.log('time is up')
      }
    }, 1000)
  }

  const currentStepUI = () => {
    switch (props.currentStep) {
      case 0:
        return (
          <>
            <Input
              type="text"
              placeholder="Invitation Code"
              onChange={(e) => {
                setInvitationCode(e.target.value)
              }}
            />
            <Input
              type="text"
              placeholder="Account Name"
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
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
              {showOTP && <Input.OTP variant="filled" {...sharedProps} />}
              <Button
                className={`${styles.otpBtn} ${showOTP && styles.otpBtnAvailable} ${timerCountdown !== 0 && styles.otpBtnDisabled}`}
                onClick={sendOtp}
                disabled={timerCountdown !== 0}
              >
                Get OTP
              </Button>
            </div>

            {showTimer && <div>Timer: {timerCountdown}</div>}

            <div className={styles.tnc}>
              <Checkbox
                id="tnc"
                style={{ marginTop: '4px' }}
                onChange={(e) => {
                  setReadTnc(e.target.checked)
                }}
              />
              <p>
                I have read the
                <span>{` Terms and Conditions `}</span>
                and
                <span>{` Privacy Policy `}</span>
              </p>
            </div>

            <Button
              className={styles.loginBtn}
              icon={<Icon name="arrow_forward" size={18} weight={600} />}
              iconPosition="end"
              onClick={() => {
                window.location.href = '/'
              }}
            >
              Next
            </Button>
          </>
        )
      case 1:
        return <></>
      case 2:
        return <></>

      default:
        return <></>
    }
  }

  return (
    <div className={styles.cardBody}>
      <LoginTab data={LoginTabs} onActiveTabCallback={onLoginTabCallback} />
      <div className={styles.wrapper} style={{ marginTop: '12px' }}>
        {currentStepUI()}
      </div>
    </div>
  )
}
