import './Test.scss'
// import { useAppSelector, useAppDispatch } from '@renderer/lib/hooks'

import { Button, Modal } from 'antd'
import { useState } from 'react'
export default function Test(): JSX.Element {
  // const count = useAppSelector((state) => state.counter.value)
  // const dispatch = useAppDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  // const handleOk = () => {
  //   setIsModalOpen(false)
  // }

  // const handleCancel = () => {
  //   setIsModalOpen(false)
  // }

  return (
    <div className="test-wrapper">
      {/* <h1>Count: {count}</h1> */}
      <Button type="primary" onClick={showModal}>
        Primary Button
      </Button>

      <Modal className="custom-modal" title="Basic Modal" open={isModalOpen}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  )
}
