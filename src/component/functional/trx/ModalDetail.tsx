import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import Modal from '@/component/partial/Modal'

export type ModalDetailHandle = {
  open: () => void
  close: () => void
}

const ModalDetail = forwardRef<ModalDetailHandle>((_, ref) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useImperativeHandle(ref, () => ({
    open: () => {
      window.history.pushState({ modalOpen: true }, '')
      setIsOpen(true)
    },
    close: () => {
      setIsOpen(false)
      window.history.back()
    }
  }))

  useEffect(() => {
    const handlePopState = () => {
      if (isOpen) setIsOpen(false)
    }

    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false)
        window.history.back()
      }
    }>
      <h2>Detail Modal</h2>
      <p>This modal is controlled from outside.</p>
    </Modal>
  )
})

export default ModalDetail
