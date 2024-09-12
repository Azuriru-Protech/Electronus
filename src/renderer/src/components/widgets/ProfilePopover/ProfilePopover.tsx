import { Popover } from 'antd'
import { TooltipPlacement } from 'antd/es/tooltip'
import Profile from '../Profile/Profile'

type Props = {
  children: React.ReactNode
  placement?: TooltipPlacement
  user: CometChat.User
}

export default function ProfilePopover({ children, placement = 'right', user }: Props) {
  return (
    <Popover
      content={<Profile user={user} />}
      trigger="click"
      placement={placement}
      overlayInnerStyle={{ padding: '0 1.5rem', width: '365px' }}
    >
      {children}
    </Popover>
  )
}
