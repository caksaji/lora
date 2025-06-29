import { useEffect, useRef } from 'react'
import { useBreakpoint } from '@/hook/useBreakpoint'
import IconSvg from '@/component/partial/IconSvg'

export default function Modal({
  title,
  footerAlign = 'right',
  x = false,
  closable = true,
  size = 'md',
  keepOnPhoneSize = false,
  pxBody = true,
  noXSpace = false,
  isOpen,
  onClose,
  children,
  footerContent
}: {
  title: string,
  footerAlign?: string,
  x?: boolean,
  closable?: boolean,
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full',
  keepOnPhoneSize?: boolean,
  pxBody?: boolean,
  noXSpace?: boolean,
  isOpen: boolean,
  onClose: () => void,
  children: React.ReactNode,
  footerContent: React.ReactNode
}) {
  const modalRef = useRef<HTMLDivElement>(null)
  const bp = useBreakpoint()
  const screenMaxWidth = bp.smallerThan('md')

  // useEffect(() => {
  //   const handleEscKey = (e: KeyboardEvent) => {
  //     if (e.key === 'Escape' && closable) onClose()
  //   }
  //   document.addEventListener('keydown', handleEscKey)
  //   return () => {
  //     document.removeEventListener('keydown', handleEscKey)
  //   }
  // }, [onClose])
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
    if (e.target === e.currentTarget && closable) onClose()
  }

  if (!isOpen) return null

  return (
    <div>
      <div className="fixed top-0 bottom-0 right-0 left-0 z-20 flex items-center justify-center bg-black/50 backdrop-filter backdrop-blur-sm" onClick={handleOverlayClick} />
      <div ref={modalRef} role="dialog" aria-labelledby="modal-title" aria-hidden={!isOpen} className={`flex flex-col fixed bottom-0 left-0 z-20 w-dvw max-h-full py-6 rounded-t-xl bg-gray-100 transform duration-300 dark:bg-gray-800 ${!keepOnPhoneSize && 'md:bottom-auto md:top-1/2 md:left-1/2 md:transform md:-translate-y-1/2 md:-translate-x-1/2 md:w-full md:rounded-lg md:m-auto'} ${pxBody && keepOnPhoneSize && 'px-2'} ${pxBody && !keepOnPhoneSize && 'px-4 md:px-6'} ${size && !keepOnPhoneSize && 'md:max-w-[' + (size === 'sm' ? '24rem' : size === 'md' ? '30rem' : size === 'lg' ? '40rem' : size === 'xl' ? '50rem' : size === 'full' ? '70rem' : '0') + ']'}`} style={{ maxHeight: 'calc(100vh - 66px)', maxWidth: size && !keepOnPhoneSize && bp.greaterOrEqual('md') && (size === 'sm' ? '24rem' : size === 'md' ? '30rem' : size === 'lg' ? '40rem' : size === 'xl' ? '50rem' : size === 'full' ? '70rem' : 'unset') }}>
        {(title || x) &&
          <div className={`pb-3 ${!pxBody && keepOnPhoneSize && 'px-2'} ${!pxBody && !keepOnPhoneSize && 'px-4 md:px-6'} ${x && 'flex items-start justify-between w-full'}`}>
            {title &&
              <div className="text-lg font-semibold">
                {title}
              </div>
            }
            {x &&
              <div className={keepOnPhoneSize || screenMaxWidth && 'absolute -top-16 right-4'}>
                <div tabIndex={0} aria-label="Close" className={`relative rounded-full outline-0 mt-1.5 ring-gray-300 ring-opacity-90 cursor-pointer click-effect focus:ring ${keepOnPhoneSize || screenMaxWidth && 'p-2 bg-gray-100 dark:bg-gray-800'} ${!keepOnPhoneSize && !screenMaxWidth && 'p-1'}`} onClick={onClose} onKeyDown={e => e.key === 'Enter' && onClose}>
                  <IconSvg name="xmark" className="h-6 w-6" />
                </div>
              </div>
            }
          </div>
        }
        <div className={`flex-grow overflow-y-auto ${noXSpace && '-mx-6'}`}>
          {children}
        </div>
        <div className={`pt-4 flex-shrink-0 flex flex-col items-center gap-2 md:flex-row ${footerAlign === 'left' ? 'justify-start' : footerAlign === 'center' ? 'justify-center' :footerAlign === 'right' ? 'justify-end' : 'justify-center'} ${!pxBody && keepOnPhoneSize && 'px-2'} ${!pxBody && !keepOnPhoneSize && 'px-4 md:px-6'}`}>
          {!closable && <div className="absolute top-0 left-0 h-full w-full" style={{ zIndex: '1' }} />}
          {footerContent}
        </div>
      </div>
    </div>
  )
}
