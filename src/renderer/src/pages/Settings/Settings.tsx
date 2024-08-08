import { useEffect } from 'react'
import './Settings.scss'
import { redirect, replace, useNavigate } from 'react-router'

type Props = {
  children: React.ReactNode
}

export default function Settings(): JSX.Element {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/settings/privacy')
  })

  return <div style={{ color: 'red' }} onClick={() => redirect('/settings/privacy')}></div>
}
