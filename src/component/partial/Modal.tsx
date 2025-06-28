import { useEffect, useRef } from 'react'

export default function Modal({
  isOpen,
  onClose,
  children
}: {
  isOpen: boolean,
  onClose: () => void,
  children: React.ReactNode
}) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscKey)
    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [onClose])
  useEffect(() => {
    if (!isOpen) return
    const focusableElements = modalRef.current?.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])')
    const firstFocusableElement = focusableElements ? focusableElements[0] : null
    const lastFocusableElement = focusableElements ? focusableElements[focusableElements.length - 1] : null
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            e.preventDefault()
            lastFocusableElement?.focus()
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            e.preventDefault()
            firstFocusableElement?.focus()
          }
        }
      }
    }
    document.addEventListener('keydown', handleTabKey)
    firstFocusableElement?.focus()
    return () => {
      document.removeEventListener('keydown', handleTabKey)
    }
  }, [isOpen])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 z-20 flex items-center justify-center bg-black/50" onClick={handleOverlayClick}>
      <div ref={modalRef} role="dialog" aria-labelledby="modal-title" aria-hidden={!isOpen} className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800">
        <div className="flex w-full">
          <button onClick={onClose} aria-label="Close" className="ml-auto">&times;</button>
        </div>
        {children}
      </div>
    </div>
  )
}
