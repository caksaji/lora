'use client'

import { forwardRef, useState, useImperativeHandle, useEffect } from 'react'
import Link from 'next/link'
import Modal from '@/component/partial/Modal'
import Button from '@/component/partial/Button'

export type ModalIntroHandle = {
  open: () => void
  close: () => void
}

const ModalIntro = forwardRef<ModalIntroHandle>((_, ref) => {
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
      title="Hi, I'm Aji 👋"
      footerContent={
        <Button color="white" border={true} className="w-full" onClick={() => {
          setIsOpen(false)
          window.history.back()
        }}>
          Close
        </Button>
      }
      onClose={() => {
        setIsOpen(false)
        window.history.back()
      }}
    >
      This is a product purchase analyzer app, built with next.js by
      <Link href="https://caksaji.netlify.app" target="_blank" rel="noopener noreferrer" className="inline-block">
        me
      </Link>
      &nbsp;with&nbsp;
      <Link href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="inline-block">
        next.js
      </Link>
      &nbsp;as my personal training to use next.js
      <br /><br />It simulate http request in CRUD, pagination, etc. but the responses are generated with js so the displayed data are not accurate.
      <br /><br />More about this project can be viewed in&nbsp;
      <Link href="https://github.com/caksaji/lora.git" target="_blank" rel="noopener noreferrer" className="inline-block">
        github
      </Link>
    </Modal>
  )
})
ModalIntro.displayName = 'ModalIntro'
export default ModalIntro
