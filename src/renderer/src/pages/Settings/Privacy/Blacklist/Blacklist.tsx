import Topbar from '@renderer/components/layouts/Topbar/Topbar'
import styles from './Blacklist.module.scss'
import { Link } from 'react-router-dom'
import Icon from '@renderer/components/widgets/Icon/Icon'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Avatar } from 'antd'

export const sampleBlacklistUser = [
  {
    imageUrl: 'https://i.pravatar.cc/300',
    name: 'John',
    id: 1,
    isBlock: true,
    signature: null,
    remark: null
  },
  {
    imageUrl: null,
    name: 'Jane',
    id: 2,
    isBlock: true,
    signature: null,
    remark: null
  }
]

export default function Blacklist() {
  const { t } = useTranslation('translation')
  const [blacklistedUser, setBlacklistedUser] = useState(sampleBlacklistUser)
  return (
    <>
      <Topbar>
        <div className={styles.blacklistTopbarWrapper}>
          <Link to="/settings/privacy" className={styles.blacklistTopbarBackIcon}>
            <Icon name="chevron_left" />
          </Link>
          Blacklist
        </div>
      </Topbar>
      <div className="settingsCardList">
        <div className="settingsCard">
          {blacklistedUser.map((user) => (
            <Link
              className="settingsCardItem"
              to={`/settings/privacy/blacklist/${user.id}`}
              key={user.id}
            >
              <div className={styles.userWrapper}>
                <Avatar icon={<Icon name="person" fill />} src={user.imageUrl} />
                <h4>{user.name}</h4>
              </div>
              <Icon name="chevron_right" />
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
