// 'use client'

import { useEffect, useState, forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { dateShownFormat } from '@/lib/localUtil'
import InputText from '@/component/partial/InputText'
import IconSvg from '@/component/partial/IconSvg'

export default function InputDateRange({
  showSkeleton = false,
  skeletonWidth,
  value,
  minYear = 1970,
  onChange
}: {
  showSkeleton?: boolean,
  skeletonWidth?: string,
  value?: [],
  minYear?: number,
  onChange?: (val: any) => void
}) {
  const [yearList, setYearList] = useState<number>([])
  const [selection, setSelection] = useState([] as [Date, Date] | [])
  const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  useEffect(() => {
    setYearList(Array.from(
      { length: (new Date().getFullYear() - (minYear)) + 1 },
      (value, index) => minYear + index
    ))
  }, [minYear])
  useEffect(() => setSelection(value), [value])

  const changeSelection = (v) => {
    setSelection(v)
    if (v[0] && v[1]) onChange?.(v)
  }
  const InputComponent = forwardRef(({ value, onClick }, ref) => {
    const displayValue = selection.length === 2 ? `${dateShownFormat(new Date(selection[0]), 'medium') || ''} - ${dateShownFormat(new Date(selection[1]), 'medium') || ''}` : ''
    return (
      <InputText
        ref={ref}
        value=""
        showSkeleton={showSkeleton}
        placeholder="Select date range"
        imitation={true}
        hasImitationValue={displayValue ? true : false}
        iconAt="right"
        imitationValue={displayValue}
        icon={<IconSvg name="calendar" className="h-6 w-6" />}
        onClick={onClick}
      />
    )
  })

  return (
    <div>
      <DatePicker
        dateFormat="yyyy-MM-dd"
        startDate={selection[0]}
        endDate={selection[1]}
        selectsRange
        popperPlacement="bottom-start"
        showPopperArrow={false}
        onChange={selection => changeSelection(selection)}
        customInput={<InputComponent value={selection} />}
        renderCustomHeader={
          ({
            date,
            changeMonth,
            changeYear,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled
          }) => (
            <div className="flex items-center justify-between gap-4 w-full">
              <div tabIndex={0} className={`h-6 w-6 rounded-full ${!prevMonthButtonDisabled && 'focussable click-effect cursor-pointer'}`} onClick={decreaseMonth} onKeyDown={e => e.key === 'Enter' && decreaseMonth()}>
                <IconSvg name="nav-arrow-left" className="h-6 w-6" />
              </div>
              <div className="flex items-center gap-4">
                <select value={monthList[new Date(date).getMonth()]} className="flex-shrink-0 rounded-md click-effect focussable" onChange={({ target: { value } }) => changeMonth(monthList.indexOf(value))}>
                  {monthList.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <select value={new Date(date).getFullYear()} className="flex-shrink-0 rounded-md click-effect focussable" onChange={({ target: { value } }) => changeYear(value)}>
                  {yearList.map((d, i) => (
                    <option key={i} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div tabIndex={0} className={`h-6 w-6 rounded-full ${!nextMonthButtonDisabled && 'focussable click-effect cursor-pointer'}`} onClick={increaseMonth} onKeyDown={e => e.key === 'Enter' && increaseMonth()}>
                <IconSvg name="nav-arrow-right" className="h-6 w-6" />
              </div>
            </div>
          )
        }
      />
    </div>
  )
}
