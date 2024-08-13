import styles from './ContactSidebar.module.scss'
import Icon from '@renderer/components/widgets/Icon/Icon'
import { MaterialSymbol } from 'material-symbols'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Avatar, Tabs, TabsProps } from 'antd'
import { useEffect, useState } from 'react'

interface Navigation {
  name: string
  icon: MaterialSymbol
  link: string
  color: string
}

type ContactInformation = {
  id: number
  profileImg: string
  name: string
  remark: string
  grouping: string
  whatsUp: string
  block: boolean
}

type ContactListOrderedNaming = {
  // initials: [
  //   {
  //     initialChar: string
  //     contacts: ContactInformation[]
  //   }
  // ]
  [key: string]: ContactInformation[]
}

const ContactsExample: ContactInformation[] = [
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
    remark: '',
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
  const [allContacts, setAllContacts] = useState<ContactInformation[]>([])
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
        {allContacts.map((contact, index) => (
          <div className={styles.contactWrapper} key={index}>
            <Avatar
              src={contact.profileImg}
              className={styles.avatar}
              style={{
                color: '#f56a00',
                backgroundColor: '#fde3cf'
              }}
            />
            <div className={styles.nameWrapper}>
              <p>{contact.name}</p>
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
      let newData = data.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
      console.log(newData)

      newData.map((item, index) => {
        let initials = newData[index].name.slice(0, 1)
        console.log(initials)

        //  let initialsgrouping
      })
      setAllContacts(newData)
      return newData
    }
    return []
  }

  useEffect(() => {
    let test = handleContactsAscending(ContactsExample)
    console.log(test)
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
