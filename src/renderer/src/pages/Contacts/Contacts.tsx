import { Outlet, useNavigate } from 'react-router-dom'
import styles from './Contacts.module.scss'
import { useEffect } from 'react'
import ContactSidebar from '@renderer/components/layouts/ContactSidebar/ContactSidebar'

export default function Contacts() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/contacts/new-messages')
  }, [])
  return (
    <div className={styles.contactsWrapper}>
      <ContactSidebar />
      <div className={styles.contactsContentWrapper}>
        <Outlet />
      </div>
    </div>
  )
}
