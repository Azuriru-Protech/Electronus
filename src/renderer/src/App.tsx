import { RouterProvider } from 'react-router-dom'
import './i18n/config'
import { router } from './routing'
import { ConfigProvider } from 'antd'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export default function App() {
  const { i18n } = useTranslation()
  useEffect(() => {
    const locale = localStorage.getItem('locale')
    if (locale) {
      i18n.changeLanguage(locale)
    }
  }, [])

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
