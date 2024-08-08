import { Button, Modal } from 'antd'
import { useState } from 'react'

export default function ConfirmDialog() {
  const [open, setOpen] = useState(false)

  const showModal = () => {
    setOpen(true)
  }

  const hideModal = () => {
    setOpen(false)
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Modal
      </Button>
      <Modal
        title="Modal"
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        okText="确认"
        cancelText="取消"
      ></Modal>
    </>
  )
}
