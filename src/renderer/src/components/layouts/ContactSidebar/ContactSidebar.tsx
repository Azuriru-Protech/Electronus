import styles from './ContactSidebar.module.scss'
import Icon from '@renderer/components/widgets/Icon/Icon'
import { MaterialSymbol } from 'material-symbols'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Avatar, Empty, Tabs, TabsProps } from 'antd'
import React, { useEffect, useState } from 'react'

interface Navigation {
  name: string
  icon: MaterialSymbol
  link: string
  color: string
}

export type ContactInformation = {
  id: number
  profileImg: string
  name: string
  remark: string
  grouping: string
  whatsUp: string
  block: boolean
}

type ContactListOrderedNaming = {
  [key: string]: ContactInformation[]
}

export const ContactsExample: ContactInformation[] = [
  {
    id: 51255,
    profileImg: '',
    name: 'William Chen',
    remark: '',
    grouping: '',
    whatsUp: 'Irremarkably bullshit',
    block: false
  },
  {
    id: 51254,
    profileImg: '',
    name: 'Baby G',
    remark: '',
    grouping: '',
    whatsUp: 'Im lit',
    block: false
  },
  {
    id: 51253,
    profileImg: '',
    name: 'Baby B',
    remark: '',
    grouping: '',
    whatsUp: 'Im lit',
    block: false
  },
  {
    id: 51252,
    profileImg: '',
    name: 'Jerry',
    remark: 'Jerry And Tom',
    grouping: '',
    whatsUp: 'I have Tom',
    block: false
  }
]

const onChange = (key: string) => {
  console.log(key)
}

export default function ContactSidebar() {
  const { pathname } = useLocation()
  const { t } = useTranslation('translation', { keyPrefix: 'layouts.contactSidebar' })
  const [groupedContacts, setGroupedContacts] = useState<ContactListOrderedNaming>()
  const sideBarNavigations: Navigation[] = [
    {
      name: t('newMessages'),
      icon: 'id_card',
      link: '/contacts/new-messages',
      color: '#b654cb'
    },
    {
      name: t('myGroup'),
      icon: 'lock',
      link: '/contacts/my-group',
      color: '#f1760d'
    },
    {
      name: t('groupAssistant'),
      icon: 'verified_user',
      link: '/contacts/group-assistant',
      color: '#0084fd'
    }
  ]

  const ContactFriendsTabContent = (): React.ReactNode => {
    return (
      <div className={styles.tabItemWrapper}>
        {groupedContacts &&
          Object.keys(groupedContacts).map((key, index) => (
            <div
              className={styles.contactWrapper}
              key={index}
              style={index === 0 ? { paddingTop: 0 } : {}}
            >
              <div className={styles.initialsWrapper} key={index}>
                <p> {key.toUpperCase()}</p>
              </div>
              <div className={styles.contactContainer}>
                {groupedContacts[key].map((contact, index) => (
                  <Link to={`/contacts/${contact.id}`} className={styles.contact} key={index}>
                    <Avatar
                      src={contact.profileImg}
                      className={styles.avatar}
                      style={{
                        color: '#1e1e1e',
                        backgroundColor: '#1e1e1e10'
                      }}
                      icon={<Icon name="person" />}
                    />
                    {contact.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </div>
    )
  }

  const ContactGroupingTabContent = (): React.ReactNode => {
    return (
      <div className={styles.tabItemWrapper}>
        <div></div>
      </div>
    )
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Friends',
      children: ContactFriendsTabContent()
    },
    {
      key: '2',
      label: 'Groups',
      children: ContactGroupingTabContent()
    }
  ]

  const handleContactsAscending = (data: ContactInformation[]) => {
    if (data) {
      const sortedData = data.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
      const groupedData = sortedData.reduce((acc, obj) => {
        // console.log(acc)

        const startingChar = obj.name.charAt(0).toLowerCase() //initials
        if (!acc[startingChar]) {
          acc[startingChar] = []
        }
        acc[startingChar].push(obj)
        return acc
      }, {})
      // console.log(groupedData)
      setGroupedContacts(groupedData)
    }
  }

  useEffect(() => {
    let test = handleContactsAscending(ContactsExample)
    // console.log(test)
  }, [])

  return (
    <div className={styles.settingsSidebarWrapper}>
      <div className={styles.settingsSidebarTitle}>{t('contacts')}</div>
      <div className={styles.settingsSidebarList}>
        {sideBarNavigations.map((item, index) => (
          <Link
            to={item.link}
            className={`${styles.settingsSidebarButton} ${pathname.includes(item.link) && styles.active}  ${index !== 0 && styles.separator}`}
            key={index}
          >
            <div
              className={styles.settingsIcon}
              style={{
                background: `linear-gradient(to top, ${item.color}, ${item.color}b0 100%)`
              }}
            >
              <Icon name={item.icon} color="white" weight={300} />
            </div>
            <div className={`${styles.settingsSidebarButtonText}`}>
              <div className={styles.settingsSidebarItem}>{item.name}</div>
            </div>
          </Link>
        ))}
        <div className={styles.tabWrapper}>
          <Tabs
            defaultActiveKey="1"
            centered
            items={items}
            onChange={onChange}
            className={styles.tabContainer}
          />
        </div>
      </div>
    </div>
  )
}
