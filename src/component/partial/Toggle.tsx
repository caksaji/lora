'use client'

import { forwardRef, useState } from 'react'
import Skeleton from '@/component/partial/Skeleton'
import SpinnerCircle from '@/component/partial/SpinnerCircle'

const Toggle = forwardRef(({
  showSkeleton = false,
  value = false,
  error = false,
  disabled = false,
  loading = false,
  label,
  onChange
}: {
  showSkeleton?: boolean,
  value?: boolean,
  error?: boolean,
  disabled?: boolean,
  loading?: boolean,
  label: React.ReactNode,
  onChange?: (val: string | number) => void
}, ref) => {
  const toggleValue = () => {
    if (!disabled && !loading) onChange?.(value)
  }

  if (showSkeleton) {
    return (
      <div className="flex w-fit py-0.5 pr-6 pl-0.5 border border-gray-400 rounded-full dark:border-gray-600">
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
    )
  }
  return (
    <div
      ref={ref}
      tabIndex={!disabled ? 0 : -1}
      className={`
        flex outline-0 group
        ${label && 'space-x-2'}
        ${!disabled && 'click-effect'}
        ${disabled && 'cursor-not-allowed'}
        ${(disabled || loading) && 'opacity-50'}
      `}
      onClick={() => toggleValue()}
      onKeyDown={e => e.key === 'Enter' && toggleValue()}
    >
      {value}
      <div
        className={`
          flex w-12 py-0.5 px-0.5 border rounded-full duration-300 ring-opacity-90 ring-offset-2 overflow-hidden dark:ring-offset-gray-800 toggle
          ${value && !error && 'border-violet-600'}
          ${!value && !error && 'border-gray-500'}
          ${error && 'border-red-500 ring-red-500'}
          ${!value && !error &&'ring-gray-400 dark:ring-gray-600'}
          ${value && !error && 'ring-violet-600'}
          ${!disabled && 'group-focus:ring-3 cursor-pointer'}
        `}
      >
        <div
          className={`
            flex items-center justify-center h-6 w-6 rounded-full transform duration-300
            ${value && !error && 'bg-violet-600'}
            ${!value && !error && 'bg-gray-400 dark:bg-gray-600'}
            ${error && 'bg-red-500'}
          `}
          style={{ translate: value ? 'calc(100% - (2px + .25rem))' : '0' }}
        >
          {loading && <SpinnerCircle className="w-4 h-4" />}
        </div>
      </div>
      {label &&
        <div className="mt-1">
          {label}
        </div>
      }
    </div>
  )
})
Toggle.displayName = 'Toggle'
export default Toggle
