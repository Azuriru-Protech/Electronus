import Topbar from '@renderer/components/layouts/Topbar/Topbar'
import styles from './NewMessages.module.scss'
import { useTranslation } from 'react-i18next'
import { Empty } from 'antd'

export default function NewMessages() {
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
