// import { Avatar, Button, Drawer, Modal, Popover, Switch } from 'antd'
// import styles from './ChatSettingsDrawer.module.scss'
// import Icon from '../Icon/Icon'
// import Separator from '../Separator/Separator'
// import ProfilePopover from '../ProfilePopover/ProfilePopover'
// import { useState } from 'react'

// type Props = {
//   isOpen: boolean
//   setIsOpen: (isOpen: boolean) => void
// }

// const sampleUser = {
//   name: 'abc',
//   id: 1,
//   remark: 'remark',
//   isBlock: false,
//   signature: 'signature',
//   imageUrl: 'https://i.pravatar.cc/300'
// }

// export default function ChatSettingsDrawer({ isOpen, setIsOpen }: Props) {
//   const [clearChatHistoryModal, clearChatHistoryContextHolder] = Modal.useModal()
//   const [user, setUser] = useState(sampleUser)

//   const clearChatHistory = async () => {
//     const confirm = await clearChatHistoryModal.confirm({
//       title: '清空聊天记录',
//       content: '确定要清空聊天记录吗？',
//       centered: true,
//       okText: '清空'
//     })
//   }
//   return (
//     <>
//       <Drawer
//         title="聊天设置"
//         placement="right"
//         onClose={() => setIsOpen(false)}
//         open={isOpen}
//         styles={{ body: { padding: 0, width: '100%' } }}
//       >
//         <ProfilePopover placement="left" {...user}>
//           <div className={styles.profileCard}>
//             <div>
//               <Avatar src={undefined} icon={<Icon name="person" fill />} size={36} />
//             </div>
//             <div className={styles.profileCardInfo}>
//               <p>{user.remark ? user.remark : user.name}</p>
//               <p>ID: {user.id}</p>
//             </div>
//             <div>
//               <Icon name="chevron_right" />
//             </div>
//           </div>
//         </ProfilePopover>
//         <Separator />
//         <div className={styles.profileSearch}>
//           <p>搜索聊天内容</p>
//           <Icon name="chevron_right"></Icon>
//         </div>
//         <Separator />
//         <div className={styles.profileActionContainer}>
//           <div className={styles.profileAction}>
//             <p>Mute</p>
//             <Switch size="small" />
//           </div>
//           <div className={styles.profileAction}>
//             <p>Sticky on Top</p>
//             <Switch size="small" />
//           </div>
//         </div>
//         <Separator />
//         <Button type="text" className={styles.clearChatHistory} onClick={clearChatHistory}>
//           Clear Chat History
//         </Button>
//       </Drawer>
//       <div>{clearChatHistoryContextHolder}</div>
//     </>
//   )
// }
