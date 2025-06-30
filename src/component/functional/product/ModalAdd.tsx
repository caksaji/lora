import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import toast from 'react-hot-toast'
import { add } from '@/lib/api/product'
import Modal from '@/component/partial/Modal'
import Button from '@/component/partial/Button'
import InputText from '@/component/partial/InputText'

export type ModalAddHandle = {
  open: () => void
  close: () => void
}

const ModalAdd = forwardRef<ModalAddHandle>((_, ref) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [input, setInput] = useState({
    name: { value: '', error: ''},
    stock: { value: '', error: ''},
    minStock: { value: '', error: ''},
    price: { value: '', error: ''}
  })
  const [loading, setLoading] = useState<boolean>(false)

  useImperativeHandle(ref, () => ({
    open: async () => {
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

  const closeModal = () => {
    setIsOpen(false)
    window.history.back()
  }
  const changeInput = ({ field, value, error }: { field: string, value?: string, error?: string }) => {
    setInput(d => ({ ...d, [field]: {
      ...d[field],
      ...(value !== undefined && { value }),
      ...(error !== undefined && { error })
    } }))
  }
  const checkForm = () => {
    if (input.name.value && input.stock.value && input.price.value) submitForm()
    changeInput({ field: 'name', error: !input.name.value ? 'Name is required' : '' })
    changeInput({ field: 'stock', error: !input.stock.value || input.stock.value === '0' ? 'Stock is required' : '' })
    changeInput({ field: 'price', error: !input.price.value ? 'Price is required' : '' })
  }
  const submitForm = async () => {
    setLoading(true)
    await add({
      name: input.name.value,
      stock: input.stock.value,
      min_stock: input.minStock.value,
      price: input.price.value
    }).then(() => {
      changeInput({ field: 'name', value: '' })
      changeInput({ field: 'stock', value: '' })
      changeInput({ field: 'minStock', value: '' })
      changeInput({ field: 'price', value: '' })
      setLoading(false)
      closeModal()
      toast.success('New product is added')
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      title="Add New Product"
      footerContent={
        <>
          <Button color="violet" loading={loading} className="w-full md:w-auto" onClick={() => checkForm()}>
            Add new product
          </Button>
          <Button color="white" border={true} disabled={loading} className="w-full md:w-auto" onClick={() => closeModal()}>
            Cancel
          </Button>
        </>
      }
      onClose={() => {
        setIsOpen(false)
        window.history.back()
      }}
    >
      <div className="space-y-4">
        <InputText
          value={input.name.value}
          label="Name"
          placeholder="e.g. Egg"
          disabled={loading}
          error={input.name.error}
          onInput={v => changeInput({ field: 'name', value: v })}
        />
        <InputText
          value={input.stock.value}
          label="Stock"
          placeholder="e.g. 100"
          inputmode="numeric"
          disabled={loading}
          error={input.stock.error}
          onInput={v => changeInput({ field: 'stock', value: v })}
        />
        <InputText
          value={input.minStock.value}
          label="Minimum stock (optional)"
          placeholder="e.g. 25"
          inputmode="numeric"
          disabled={loading}
          error={input.minStock.error}
          onInput={v => changeInput({ field: 'minStock', value: v })}
        />
        <InputText
          value={input.price.value}
          label="Price (IDR)"
          placeholder="e.g. 5000"
          inputmode="decimal"
          disabled={loading}
          error={input.price.error}
          onInput={v => changeInput({ field: 'price', value: v })}
        />
      </div>
    </Modal>
  )
})
ModalAdd.displayName = 'ModalAdd'
export default ModalAdd
