import { useState } from 'react'
import './Privacy.scss'
import { Switch } from 'antd'

export default function Privacy(): JSX.Element {
  return (
    <div>
      <div className="privacy-page-wrapper">
        <div className="privacy-data-wrapper">
          Privacy Settings
          <Switch defaultChecked />
        </div>
      </div>

      <div className="privacy-data-wrapper">
        Privacy Settings
        <Switch defaultChecked />
      </div>
    </div>
  )
}
