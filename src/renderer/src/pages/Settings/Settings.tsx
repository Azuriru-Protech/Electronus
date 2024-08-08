import { useEffect } from 'react'
import './Settings.scss'
import { Outlet, redirect, replace, useNavigate } from 'react-router'
import PageWrapper from '@renderer/components/layout/PageWrapper/PageWrapper'

type Props = {
  children: React.ReactNode
}

export default function Settings(): JSX.Element {
  const navigate = useNavigate()

  return (
    <div style={{ color: 'red' }}>
      <PageWrapper>
        <Outlet />
      </PageWrapper>
    </div>
  )
}
