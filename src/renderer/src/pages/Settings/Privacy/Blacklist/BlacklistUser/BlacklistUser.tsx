import Topbar from '@renderer/components/layouts/Topbar/Topbar'
import styles from './Blacklist.module.scss'
import { Link, useParams } from 'react-router-dom'
import Icon from '@renderer/components/widgets/Icon/Icon'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import Profile from '@renderer/components/widgets/Profile/Profile'
import { sampleBlacklistUser } from '../Blacklist'

export default function BlacklistUser() {
  const { t } = useTranslation('translation')
  const { userId } = useParams()
  const [user, setUser] = useState<any>()
  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = () => {
    const user = sampleBlacklistUser.find((user) => user.id === Number(userId))
    setUser(user)
  }
  return (
    <>
      <Topbar>
        <div className={styles.blacklistUserTopbarWrapper}>
          <Link to="/settings/privacy/blacklist" className={styles.blacklistUserTopbarBackIcon}>
            <Icon name="chevron_left" />
          </Link>
          Details
        </div>
      </Topbar>
      {user && <Profile {...user} />}
    </>
  )
}
