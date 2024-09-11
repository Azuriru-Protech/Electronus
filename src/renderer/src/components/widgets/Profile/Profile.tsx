import { Avatar, Button, Input, Select, Switch } from 'antd'
import styles from './Profile.module.scss'
import Separator from '../Separator/Separator'
import Icon from '../Icon/Icon'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  user: CometChat.User
}

export default function Profile({ user }: Props) {
  const [isBlockChecked, setIsBlockChecked] = useState(user.getBlockedByMe())
  const [remarkInput, setRemarkInput] = useState<string>()

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.profileContainer}>
        <div>
          <Avatar src={user.getAvatar()} icon={<Icon name="person" fill size={36} />} size={56}>
            asd
          </Avatar>
        </div>
        <div className={styles.profileContent}>
          <h3>test</h3>
          <div>
            <p className={styles.profileSubTitle}>Name: {user.getName()}</p>
            <p className={styles.profileSubTitle}>ID: {user.getUid()}</p>
          </div>
        </div>
      </div>
      <div className={styles.infoWrapper}>
        <p>Remark</p>
        <Input value={remarkInput} onChange={(e) => setRemarkInput(e.target.value)} />
        <p>Grouping</p>
        <Select />
        <p>What's Up</p>
        <p>test</p>
        <p>Block</p>
        <div>
          <Switch
            size="small"
            value={isBlockChecked}
            onChange={(checked) => setIsBlockChecked(checked)}
          />
        </div>
      </div>
      <Separator />
      <div className={styles.actionWrapper}>
        <Link to={`/conversation`}>
          <Button block type="primary">
            Start Chatting
          </Button>
        </Link>
        <Button block type="text" style={{ color: 'red' }}>
          Delete Friend
        </Button>
      </div>
    </div>
  )
}
