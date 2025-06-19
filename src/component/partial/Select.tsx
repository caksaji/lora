import { useRef, useState, useEffect, useCallback } from 'react'
import InputText from '@/component/partial/InputText'
import IconSvg from '@/component/partial/IconSvg'

export default function Select({
  className,
  showSkeleton = false,
  skeletonWidth,
  list = [],
  label,
  value,
  placeholder,
  error,
  disabled,
  absoluteOptionPosition,
  labelField = 'text',
  unselectId = 'all',
  unselectLabel,
  preSelect = false,
  icon = false,
  clearable = false,
  onSearch,
  onChange,
  onCancel
} : {
  className?: string,
  showSkeleton?: boolean,
  skeletonWidth?: string,
  list: any[],
  label?: string,
  value?: string | Record<string, any>,
  placeholder?: string,
  error?: string,
  disabled?: boolean,
  absoluteOptionPosition?: boolean,
  labelField?: string,
  unselectId?: string,
  unselectLabel?: string | number,
  preSelect: boolean,
  icon: boolean,
  clearable: boolean,
  onSearch?: (val: string) => void,
  onChange?: (val: any) => void,
  onCancel?: () => void
}) {
  const optRef = useRef<(HTMLDivElement | null)[]>([])
  const [localList, setLocalList] = useState<any[]>([])
  const [searchMode, setSearchMode] = useState<boolean>(false)
  const [inputSearch, setInputSearch] = useState<string>('')
  const [selection, setSelection] = useState<any>(null)
  const [showOption, setShowOption] = useState<boolean>(false)
  const [hoverIndex, setHoverIndex] = useState<number>(0)
  const searchTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (searchTimer.current) clearTimeout(searchTimer.current)
    }
  }, [])
  useEffect(() => updateList(), [list])
  useEffect(() => {
    if (value && (!selection || selection.id !== (value as any)?.id)) {
      const found = localList.find(item => item.id === (value as any)?.id)
      if (found) select(found)
    }
  }, [value, localList])
  useEffect(() => setHoverIndex(0), [inputSearch])
  useEffect(() => {
    if (preSelect && !selection && localList.length > 0) {
      select(localList[0])
    }
  }, [localList])

  const filteredList = () => {
    let tempList = [...localList]
    if (searchMode) {
      tempList = tempList.filter((item) => {
        return item.text
          .toString()
          .toUpperCase()
          .includes(inputSearch.toUpperCase())
      })
    }
    return tempList
  }
  const updateList = () => {
    let newList = list.map(item => ({ ...item, text: item[labelField] }))
    if (unselectLabel) {
      newList = [{ id: unselectId, text: unselectLabel }, ...newList]
    }
    setLocalList(newList)
  }
  const search = useCallback((value) => {
    setInputSearch(value)
    setSearchMode(true)
    if (searchTimer.current) {
      clearTimeout(searchTimer.current)
    }
    searchTimer.current = setTimeout(() => onSearch?.(inputSearch), 1000)
  }, [inputSearch, onSearch])
  const clickInput = () => {
    if (!disabled) {
      setHoverIndex(0)
      setShowOption(true)
    }
  }
  const select = (option: any) => {
    setInputSearch(option ? option[labelField] : '')
    setShowOption(false)
    setSearchMode(false)
    setHoverIndex(0)
    if (selection?.id !== option?.id) {
      setSelection(option)
      onChange?.(option)
    }
  }
  const cancel = () => {
    setShowOption(false)
    setSearchMode(false)
    setInputSearch(selection ? selection.text : '')
    setHoverIndex(0)
    onCancel?.()
  }
  const navigateSelection = (e: string) => {
    if (filteredList().length > 0) {
      if (e === 'ArrowUp' && hoverIndex > 0) {
        setHoverIndex(i => i - 1)
      }
      else if (e === 'ArrowDown' && hoverIndex + 1 < filteredList().length) {
        setHoverIndex(i => i + 1)
      }
      scrollToSelection()
    }
  }
  const scrollToSelection = () => {
    const opt = optRef.current[hoverIndex]
    if (opt) {
      opt.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }
  const keydown = (key) => {
    if (key === 'Escape' || key === 'Tab') {
      cancel()
    } else if (key === 'Enter') {
      select(filteredList()[hoverIndex])
    } else if (key === 'ArrowUp' || key === 'ArrowDown') {
      navigateSelection(key)
    }
  }

  return (
    <div>
      {(!showSkeleton && showOption) && <div className="fixed top-0 left-0 h-screen w-screen" onClick={cancel} />}
      <InputText
        value={inputSearch}
        showSkeleton={showSkeleton}
        skeletonWidth={skeletonWidth}
        label={label}
        placeholder={placeholder}
        iconAt="right"
        disabled={disabled}
        error={error}
        className="relative"
        onClick={clickInput}
        onFocus={() => setShowOption(true)}
        onInput={search}
        onKeydown={key => keydown(key)}
        onBlur={() => setHoverIndex(0)}
        icon={
          !icon && !clearable ? <IconSvg name="nav-arrow-down" className={`h-6 w-6 transform duration-300 ${showOption && '-rotate-180'}`} onClick={() => setShowOption(!showOption)} />
            : !icon && clearable && !selection ? <IconSvg name="nav-arrow-down" className={`h-6 w-6 transform duration-300 ${showOption && '-rotate-180'}`} onClick={() => setShowOption(!showOption)} />
            : !icon && clearable && selection ? <IconSvg name="xmark" tabIndex={0} className="h-6 w-6 rounded-full outline-0 cursor-pointer ring-prime-600 ring-opacity-90 focus:ring click-effect" onClick={() => select('')} />
            : icon
        }
      />
      {(!disabled && !showSkeleton) &&
        <div className="relative">
          <div className={`flex flex-col w-full border-gray-300 rounded-md bg-white overflow-x-hidden duration-300 dark:bg-gray-800 dark:border-gray-800 ${showOption && 'py-1 border overflow-y-auto'} ${!showOption && 'border-0 overflow-y-hidden'} ${absoluteOptionPosition && 'absolute top-0 left-0 z-10'}`} style={{ maxHeight: showOption ? '187px' : 0 }}>
            {filteredList().length > 0 ? (
              filteredList()?.map((d, i) => (
                <div key={i} ref={el => optRef.current[i] = el} className={`w-full py-1 px-4 duration-300 cursor-default hover:bg-gray-200 dark:hover:bg-gray-700 ${hoverIndex === i && 'bg-gray-200 dark:bg-gray-700'} ${selection && selection.text === d.text && 'bg-prime-600 text-white'}`} onMouseOver={() => setHoverIndex(i)} onClick={() => select(d)}>
                  <div>
                    {d.text}
                  </div>
                </div>
              ))
            ) : (
              <span className="py-1 px-4">Oops, data not found</span>
            )}
          </div>
        </div>
      }
    </div>
  )
}
