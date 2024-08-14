import { useTranslation } from 'react-i18next'
import styles from './ContactsList.module.scss'
import Topbar from '@renderer/components/layouts/Topbar/Topbar'
import { Avatar, Empty } from 'antd'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  ContactInformation,
  ContactsExample
} from '@renderer/components/layouts/ContactSidebar/ContactSidebar'
import Icon from '@renderer/components/widgets/Icon/Icon'

export default function ContactsList() {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.contacts.newMessages' })
  const { userId } = useParams()
  const [currentContactView, setCurrentContactView] = useState<ContactInformation>(
    {} as ContactInformation
  )

  useEffect(() => {
    ContactsExample.forEach((item) => {
      if (item.id === Number(userId)) {
        console.log(item)
        setCurrentContactView(item)
      }
    })
  })
  return (
    <>
      <Topbar>
        <p>{t('newMessages')}</p>
      </Topbar>
      <div className="flex-center max-wh">
        {currentContactView ? (
          <div className={styles.contactCardWrapper}>
            <div className={styles.header}>
              <Avatar
                src={currentContactView.profileImg}
                className={styles.avatar}
                style={{
                  color: '#1e1e1e',
                  backgroundColor: '#1e1e1e10'
                }}
                icon={<Icon name="person" />}
              />

              <div className={styles.info}>
                <p>{currentContactView.name}</p>
                <p>{currentContactView.id}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-center max-wh">
            <Empty />
          </div>
        )}
      </div>
    </>
  )
}
