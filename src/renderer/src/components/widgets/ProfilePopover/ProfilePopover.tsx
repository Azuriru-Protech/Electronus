import { Popover } from 'antd'
import { TooltipPlacement } from 'antd/es/tooltip'
import Profile from '../Profile/Profile'

type Props = {
  children: React.ReactNode
  placement?: TooltipPlacement
  imageUrl: string | null
  name: string
  id: number
  remark: string | null
  isBlock: boolean
  signature: string | null
}

export default function ProfilePopover({ children, placement = 'right', ...props }: Props) {
  return (
    <Popover
      content={<Profile {...props} />}
      trigger="click"
      placement={placement}
      overlayInnerStyle={{ padding: '0 1.5rem', width: '365px' }}
    >
      {children}
    </Popover>
  )
}
