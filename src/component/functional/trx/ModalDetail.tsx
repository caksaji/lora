import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { dateShownFormat, timeShownFormat, formatNum, formatCurrency } from '@/lib/localUtil'
import { get } from '@/lib/api/trx'
import Modal from '@/component/partial/Modal'
import Button from '@/component/partial/Button'
import Skeleton from '@/component/partial/Skeleton'
import ErrorData404 from '@/component/partial/ErrorData404'

export type ModalDetailHandle = {
  open: () => void
  close: () => void
}

const ModalDetail = forwardRef<ModalDetailHandle>((_, ref) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [showSkeleton, setShowSkeleton] = useState(true)
  const [trxData, setTrxData] = useState('')

  useImperativeHandle(ref, () => ({
    open: async (data) => {
      window.history.pushState({ modalOpen: true }, '')
      setIsOpen(true)
      setShowSkeleton(true)
      await get(data.date).then((res) => {
        setTrxData(res)
        setShowSkeleton(false)
      })
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
      title="Transaction Detail"
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
      {showSkeleton ?
        <>
          <Skeleton className="h-4 w-full max-w-48 my-1 rounded-md" />
          <div className="divide-y divide-gray-400 dark:divide-gray-600">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4 justify-between w-full py-2">
                <Skeleton className="h-4 w-40 my-1 rounded-md" />
                <Skeleton className="h-4 w-20 my-1 rounded-md" />
              </div>
            ))}
            <div className="flex gap-4 justify-between w-full py-2">
              <Skeleton className="h-6 w-20 my-4 rounded-md" />
              <Skeleton className="h-6 w-28 my-4 rounded-md" />
            </div>
          </div>
        </>
        : trxData?.data ?
          <>
            {trxData.data.at && `At ${dateShownFormat(trxData.data.at, 'long')}, ${timeShownFormat(trxData.data.at)}`}
            <div className="divide-y divide-gray-400 dark:divide-gray-600">
              {trxData.data.item.map((d, i) => (
                <div key={i}>
                  <div className="flex gap-4 justify-between w-full py-2 px-3 rounded-md duration-300 hover:bg-violet-200 dark:hover:bg-violet-900">
                    <span>{d.item}</span>
                    <div className="text-right">
                      {formatNum(d.qty)} &times; {formatCurrency(d.value)}
                      <br />{formatCurrency(d.value * d.qty)}
                    </div>
                  </div>
                </div>
              ))}
              {trxData.data.item.map((d, i) => (
                <div key={i}>
                  <div className="flex gap-4 justify-between w-full py-2 px-3 rounded-md duration-300 hover:bg-violet-200 dark:hover:bg-violet-900">
                    <span>{d.item}</span>
                    <div className="text-right">
                      {formatNum(d.qty)} &times; {formatCurrency(d.value)}
                      <br />{formatCurrency(d.value * d.qty)}
                    </div>
                  </div>
                </div>
              ))}
              {trxData.data.item.map((d, i) => (
                <div key={i}>
                  <div className="flex gap-4 justify-between w-full py-2 px-3 rounded-md duration-300 hover:bg-violet-200 dark:hover:bg-violet-900">
                    <span>{d.item}</span>
                    <div className="text-right">
                      {formatNum(d.qty)} &times; {formatCurrency(d.value)}
                      <br />{formatCurrency(d.value * d.qty)}
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex gap-4 justify-between w-full py-2 px-3 rounded-md text-lg font-semibold duration-300 hover:bg-violet-200 dark:hover:bg-violet-900">
                <span>Total</span>
                <span>{formatCurrency(trxData.data.total)}</span>
              </div>
            </div>
          </>
        :
          <ErrorData404>
            There is no detail availabel for this transaction
          </ErrorData404>
      }
    </Modal>
  )
})

export default ModalDetail
