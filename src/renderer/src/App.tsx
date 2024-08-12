import { RouterProvider } from 'react-router-dom'
import './i18n/config'
import { router } from './routing'
import { ConfigProvider } from 'antd'

export default function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            activeBorderColor: 'var(--primary-dark)',
            hoverBorderColor: 'var(--secondary)'
          }
        }
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}
