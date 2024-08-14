import { Avatar, Button, Input, Select, Switch } from 'antd'
import styles from './Profile.module.scss'
import Separator from '../Separator/Separator'
import Icon from '../Icon/Icon'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  imageUrl: string | null
  name: string
  id: number
  remark: string | null
  isBlock: boolean
  signature: string | null
}

export default function Profile({ imageUrl, name, id, remark, isBlock, signature }: Props) {
  const [isBlockChecked, setIsBlockChecked] = useState(isBlock)
  const [remarkInput, setRemarkInput] = useState<string>()
  useEffect(() => {
    setIsBlockChecked(isBlock)
  }, [isBlock])
  useEffect(() => {
    if (!remark) return
    setRemarkInput(remark)
  }, [remark])
  return (
    <>
      <div className={styles.profileContainer}>
        <div>
          <Avatar src={imageUrl} icon={<Icon name="person" fill size={36} />} size={56}>
            asd
          </Avatar>
        </div>
        <div className={styles.profileContent}>
          <h3>{remark ? remark : name}</h3>
          <div>
            <p className={styles.profileSubTitle}>Name: {name}</p>
            <p className={styles.profileSubTitle}>ID: {id}</p>
          </div>
        </div>
      </div>
      <div className={styles.infoWrapper}>
        <p>Remark</p>
        <Input value={remarkInput} onChange={(e) => setRemarkInput(e.target.value)} />
        <p>Grouping</p>
        <Select />
        <p>What's Up</p>
        <p>{signature}</p>
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
        <Link to={`/chat/${id}`}>
          <Button block type="primary">
            Start Chatting
          </Button>
        </Link>
      </div>
    </>
  )
}
