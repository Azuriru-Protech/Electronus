import { Button, Modal } from 'antd'
import styles from './ChangeProfilePictureModal.module.scss'
import { CircleStencil, Coordinates, Cropper, CropperRef } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'
import { useState } from 'react'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  imageUrl: string
}

export default function ChangeProfilePictureModal({ isOpen, setIsOpen, imageUrl }: Props) {
  const [image, setImage] = useState<string | null>(null)
  const onChange = (cropper: CropperRef) => {
    const canvas = cropper.getCanvas()
    if (!canvas) return
    setImage(canvas.toDataURL())
  }
  return (
    <Modal
      classNames={{
        content: styles.profilePictureModalContent,
        header: styles.profilePictureModalHeader
      }}
      title={'Change Profile Picture'}
      open={isOpen}
      onOk={() => {
        setIsOpen(false)
      }}
      onCancel={() => {
        setIsOpen(false)
      }}
      maskClosable={false}
      footer={
        <div className={styles.profilePictureModalFooterWrapper}>
          <div className={styles.profilePictureModalFooter}>
            <Button
              onClick={() => {
                setIsOpen(false)
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setIsOpen(false)
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      }
      width={400}
      centered
    >
      <Cropper
        src={imageUrl}
        className={styles.cropper}
        stencilComponent={CircleStencil}
        onChange={onChange}
      />
    </Modal>
  )
}
