'use client'

import { Button, Checkbox, Input, Select, Space } from 'antd'
import LoginTab from '../LoginTab/LoginTab'
import styles from './LoginDefault.module.scss'
import Icon from '../Icon/Icon'
import { CountryCode } from '@renderer/utilities/Defaults'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LoginTabs: string[] = ['Mobile Login', 'Account Login']

export default function LoginDefault({ ...props }) {
  const [countryCodeNumber, setCountryCodeNumber] = useState<{ label: string; value: string }[]>([])
  const [invitationCode, setInvitationCode] = useState('')
  const [mobileCountry, setMobileCountry] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [rememberPassword, setRememberPassword] = useState<boolean>(false)
  const [readTnc, setReadTnc] = useState(false)
  const loginTab = props.loginTab
  const onLoginTabCallback = props.onLoginTabCallback

  const navigate = useNavigate()

  useEffect(() => {
    const countryList = CountryCode.map((code) => {
      return {
        label: `${code.dial_code} (${code.name})`,
        value: `${code.dial_code}`
      }
    })
    setCountryCodeNumber(countryList)
  }, [])

  // useEffect(() => {
  //   console.log(
  //     invitationCode,
  //     'invitationCode',
  //     mobileCountry,
  //     'mobileCountry',
  //     rememberPassword,
  //     'rememberPassword',
  //     password,
  //     'password',
  //     mobileNumber,
  //     'mobileNumber',
  //     account,
  //     'account',
  //     readTnc,
  //     'readTnc'
  //   )
  // }, [invitationCode, mobileCountry, rememberPassword, password, mobileNumber, account, readTnc])

  return (
    <div className={styles.cardBody}>
      <LoginTab data={LoginTabs} onActiveTabCallback={onLoginTabCallback} />

      <div className={styles.mobileLoginWrapper} style={{ marginTop: '12px' }}>
        <Input
          type="text"
          placeholder="Invitation Code"
          onChange={(e) => {
            setInvitationCode(e.target.value)
          }}
        />
        {loginTab === 0 && countryCodeNumber ? (
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
        ) : (
          <Input
            type="text"
            placeholder="Account No."
            onChange={(e) => {
              setAccount(e.target.value)
            }}
          />
        )}

        <Input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <div className={styles.rememberPassword}>
          <Checkbox
            id="rmb-pw"
            onChange={(e) => {
              setRememberPassword(e.target.checked)
            }}
          />
          <p>Remember Password</p>
        </div>
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
          icon={<Icon name="login" />}
          iconPosition="end"
          onClick={() => {
            console.log('login')
            navigate('/chat')
          }}
        >
          Login
        </Button>

        <div className={styles.otherFunctions}>
          {loginTab === 0 && (
            <Link to="/register" className={styles.links}>
              <p>Register</p>
            </Link>
          )}

          <Link to="/forgot-password">
            <p>Forgot Password</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
