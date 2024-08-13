import { Popover } from 'antd'
import { TooltipPlacement } from 'antd/es/tooltip'

type Props = {
  children: React.ReactNode
  placement?: TooltipPlacement
}

export default function ProfilePopover({ children, placement = 'right' }: Props) {
  const content = <></>
  return (
    <Popover content={content} trigger="click" placement={placement}>
      {children}
    </Popover>
  )
}
