import Sidebar from '@renderer/components/Sidebar/Sidebar'
import './PageWrapper.scss'

type Props = {
  children: React.ReactNode
}
export default function PageWrapper({ children }: Props): JSX.Element {
  return (
    <div className="page-wrapper">
      <Sidebar />

      {children}
    </div>
  )
}
