import Topbar from '@renderer/components/layouts/Topbar/Topbar'
import styles from './MyGroups.module.scss'
import { useTranslation } from 'react-i18next'
import { Empty } from 'antd'

export default function MyGroups() {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.contacts.myGroups' })

  return (
    <>
      <Topbar>
        <p>{t('myGroups')}</p>
      </Topbar>
      <div className="flex-center max-wh">
        <Empty />
      </div>
    </>
  )
}
