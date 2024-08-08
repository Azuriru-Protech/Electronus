import './PageWrapper.scss'
import { Outlet } from 'react-router'
export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-wrapper">
      HAHAH
      {children}
    </div>
  )
}
