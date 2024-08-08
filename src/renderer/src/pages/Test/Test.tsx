import './Test.scss'
import { useAppSelector, useAppDispatch } from '../../store'
import { increment, decrement, incrementByAmount } from '../../features/counter/counterSlice'
import { Button, Modal } from 'antd'
import { useState } from 'react'
export default function Test(): JSX.Element {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="test-wrapper">
      <h1>Count: {count}</h1>
      <Button type="primary" onClick={showModal}>
        Primary Button
      </Button>

      <Modal className="custom-modal" title="Basic Modal" open={isModalOpen}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
    </div>
  )
}
