import { useTranslation } from 'react-i18next'
import styles from './ContactsList.module.scss'
import Topbar from '@renderer/components/layouts/Topbar/Topbar'
import { Empty } from 'antd'

export default function ContactsList() {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.contacts.newMessages' })

  return (
    <>
      <Topbar>
        <p>{t('newMessages')}</p>
      </Topbar>
      <div className="flex-center max-wh">
        <Empty />
      </div>
    </>
  )
}
