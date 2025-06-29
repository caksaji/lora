import { useEffect, useRef } from 'react'
import Skeleton from '@/component/partial/Skeleton'
import SpinnerCircle from '@/component/partial/SpinnerCircle'

export default function Modal({
  className,
  showSkeleton = false,
  skeletonWidth,
  disabled = false,
  loading = false,
  noStyle = false,
  size,
  round = false,
  block = false,
  color,
  textPrimeteal = false,
  border = false,
  iconOnly = false,
  fab = false,
  children,
  icon,
  onClick
}: {
  className?: string,
  showSkeleton?: boolean,
  skeletonWidth?: string,
  disabled?: boolean,
  loading?: boolean,
  noStyle?: boolean,
  size?: null | 'sm',
  round?: boolean,
  block?: boolean,
  color: 'violet' | 'red' | 'blue' | 'white',
  textPrimeteal: boolean,
  border: boolean,
  iconOnly: boolean,
  fab: boolean,
  children: React.ReactNode,
  icon: React.ReactNode,
  onClick?: () => void
}) {
  const fragmentedRem = '(1rem / 4)'

  const formatedStyle = () => {
    let padding = null
    if (size === 'sm') {
      if ((border || color === 'white') && !iconOnly) {
        padding = `calc((${fragmentedRem} * 1) - 1px) calc((${fragmentedRem} * 3) - 1px)`
      }
      else if ((border || color === 'white') && iconOnly) {
        padding = `calc((${fragmentedRem} * 1) - 1px)`
      }
      else if (!border && color !== 'white' && iconOnly) {
        padding = `calc(${fragmentedRem})`
      }
      else {
        padding = `calc(${fragmentedRem} * 1) calc(${fragmentedRem} * 3)`
      }
    }
    else if (!size) {
      if (border || color === 'white') {
        padding = `calc((${fragmentedRem} * 2) - 1px) calc((${fragmentedRem} * 4) - 1px)`
      }
      else {
        padding = `calc(${fragmentedRem} * 2) calc(${fragmentedRem} * 4)`
      }
    }
    return {
      padding: !noStyle ? padding : 0,
      zIndex: fab ? 1 : 'unset'
    }
  }

  const click = () => {
    if (!disabled) onClick?.()
  }

  if (showSkeleton) {
    return <Skeleton className={`${!fab && 'h-9 rounded-md'} ${fab && 'fixed bottom-4 right-4 h-12 w-12 rounded-full md:hidden'} ${skeletonWidth}`} style={{ zIndex: fab ? 1 : 'unset' }} />
  }
  return (
    <button
      disabled={disabled || loading}
      className={`
        no-underline outline-none
        ${className}
        ${!disabled && 'duration-300 transform focus:ring-3 focus:ring-opacity-90 active:scale-90'}
        ${!noStyle && 'inline-block text-center align-middle whitespace-nowrap space-x-2 focus:ring-offset-2 dark:ring-offset-gray-800'}
        ${fab && 'fixed bottom-4 right-4 md:hidden'}
        ${noStyle && 'focus:ring-gray-800'}
        ${!disabled && !loading &&'cursor-pointer'}
        ${disabled && 'cursor-not-allowed'}
        ${loading && 'cursor-wait'}
        ${disabled && 'opacity-75'}
        ${!round && !fab && 'rounded-md'}
        ${(round || fab) && 'rounded-full'}
        ${block && 'w-full'}
        ${color === 'violet' && 'focus:ring-violet-700'}
        ${color === 'violet' && !border && 'text-white bg-violet-600'}
        ${color === 'violet' && !border && !disabled && 'hover:bg-violet-700'}
        ${color === 'red' && 'focus:ring-red-600'}
        ${color === 'red' && !border && 'text-white bg-red-500'}
        ${color === 'red' && !border && !disabled && 'hover:bg-red-600'}
        ${color === 'blue' && 'focus:ring-blue-600'}
        ${color === 'blue' && !border && 'text-white bg-blue-500'}
        ${color === 'blue' && !border && !disabled && 'hover:bg-blue-600'}
        ${color === 'white' && 'border border-gray-300 text-gray-800 bg-white focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:ring-gray-600'}
        ${color === 'white' && !disabled && 'hover:bg-gray-300 dark:hover:bg-gray-600'}
        ${color === 'white' && textPrimeteal && 'text-violet-500'}
        ${border && 'border focus:bg-opacity-20'}
        ${border && !disabled && 'hover:bg-opacity-20'}
        ${color === 'violet' && border && 'text-violet-500 border-violet-500 focus:bg-violet-600'}
        ${color === 'violet' && border && !disabled && 'hover:bg-violet-600'}
        ${color === 'red' && border && 'text-red-500 border-red-500 focus:bg-red-600'}
        ${color === 'red' && border && !disabled && 'hover:bg-red-600'}
      `}
      style={{ lineHeight: '1.5', fontSize: 'calc(1rem - 2px)', ...formatedStyle() }}
      onClick={click}
    >
      {noStyle
        ? <span>{children}</span>
        : <div className={`flex items-center justify-center ${fab && 'h-12 w-12'} ${!fab && 'w-full'}`}>
          {loading && <SpinnerCircle className={`w-4 h-4 ${(icon || !iconOnly) && 'mr-2'}`} />}
          {!loading && icon}
          {!iconOnly && children}
        </div>
      }
    </button>
  )
}
