import Topbar from '@renderer/components/layouts/Topbar/Topbar'
import styles from './GroupAssistant.module.scss'
import { useTranslation } from 'react-i18next'
import { Empty } from 'antd'

export default function GroupAssistant() {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.contacts.groupAssistant' })

  return (
    <>
      <Topbar>
        <p>{t('groupAssistant')}</p>
      </Topbar>
      <div className="flex-center max-wh">
        <Empty />
      </div>
    </>
  )
}
