import { Avatar, Button, Input, Select, Switch } from 'antd'
import styles from './Profile.module.scss'
import Separator from '../Separator/Separator'
import Icon from '../Icon/Icon'

export default function Profile() {
  return (
    <>
      <div className={styles.profileContainer}>
        <div>
          <Avatar icon={<Icon name="person" fill size={36} />} size={56}>
            asd
          </Avatar>
        </div>
        <div className={styles.profileContent}>
          <h3>John</h3>
          <div>
            <p className={styles.profileSubTitle}>Name: John</p>
            <p className={styles.profileSubTitle}>ID: abcd</p>
          </div>
        </div>
      </div>
      <div className={styles.infoWrapper}>
        <p>Remark</p>
        <Input />
        <p>Grouping</p>
        <Select />
        <p>What's Up</p>
        <p></p>
        <p>Block</p>
        <div>
          <Switch size="small" />
        </div>
      </div>
      <Separator />
      <div className={styles.actionWrapper}>
        <Button block type="primary">
          Start Chatting
        </Button>
      </div>
    </>
  )
}
