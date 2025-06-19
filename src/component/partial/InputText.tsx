'use client'

import { useId, useState } from 'react'
import Skeleton from '@/component/partial/Skeleton'
import ErrorText from '@/component/partial/ErrorText'

export default function InputText({
  className,
  showSkeleton = false,
  skeletonWidth,
  imitation = false,
  hasImitationValue = false,
  label,
  type = 'text',
  inputmode,
  placeholder,
  maxlength = 0,
  error,
  disabled = false,
  inputClass,
  rows = 3,
  iconAt,
  iconPlacement = 'inside',
  filled = false,
  value,
  imitationValue,
  icon,
  onClick,
  onFocus,
  onInput,
  onBlur,
  onKeydown
}: {
  className?: string,
  showSkeleton?: boolean,
  skeletonWidth?: string,
  imitation?: boolean,
  hasImitationValue?: boolean,
  label?: string,
  type: 'text' | 'email' | 'password' | 'textarea',
  inputmode: 'text' | 'email' | 'tel',
  placeholder?: string,
  maxlength?: number,
  error?: string,
  disabled?: boolean,
  inputClass?: string,
  rows?: string | number,
  iconAt?: 'right' | 'left',
  iconPlacement?: 'inside' | 'outside',
  filled?: string | boolean,
  value: string,
  imitationValue?: React.ReactNode,
  icon?: React.ReactNode,
  onClick?: () => void,
  onFocus?: () => void,
  onInput?: (val: string) => void,
  onBlur?: () => void,
  onKeydown?: (val: string) => void
}) {
  const id = useId()
  const [focused, setFocused] = useState(false)
  const fragmentedRem = '(1rem / 4)'
  const inputTextKindClass = [
    'outline-0 duration-300 ring-offset-gray-100 dark:ring-offset-gray-800',
    label ? 'mt-1' : '',
    (type === 'text' || type === 'email' || type === 'password' || type === 'textarea') && 'w-full border rounded-md placeholder-gray-400',
    (!error && !focused) && 'border-gray-300 dark:border-gray-700',
    error ? 'border-red-300' : '',
    ((type === 'text' || type === 'email' || type === 'password' || type === 'textarea') && !disabled && !filled) && 'bg-gray-100 dark:bg-gray-800',
    (filled && !disabled) && 'bg-violet-300 dark:bg-violet-900',
    disabled && 'bg-gray-300 cursor-not-allowed select-none dark:bg-gray-700',
    error ? 'placeholder:text-red-400' : 'placeholder:text-gray-400',
    (focused && !error) && 'border-violet-700 ring-3 ring-violet-700 ring-offset-2',
    (focused && error) && 'ring-3 ring-red-400 ring-offset-2'
  ].join(' ')

  const padding = () => {
    const py = `calc((${fragmentedRem} * 3) - 2px)`
    const px = `calc((${fragmentedRem} * 4) - 1px)`
    return {
      paddingTop: py,
      paddingBottom: py,
      paddingRight: iconAt === 'right' && iconPlacement === 'inside' ? `calc((${fragmentedRem} * 14) - 1px)` : px,
      paddingLeft: iconAt === 'left' && iconPlacement === 'inside' ? `calc((${fragmentedRem} * 14) - 1px)` : px
    }
  }
  const click = () => {
    if (!disabled) {
      onClick?.()
      setFocused(true)
    }
  }
  const focus = () => {
    onFocus?.()
    setFocused(true)
  }
  const input = (e) => {
    onInput?.(e)
    setFocused(true)
  }
  const blur = () => {
    onBlur?.()
    setFocused(false)
  }
  const keydown = (e: React.KeyboardEvent) => {
    onKeydown?.(e.key)
    return e.target.value
  }

  if (showSkeleton) {
    return <Skeleton className={`rounded-md ${skeletonWidth ?? 'w-full'} ${type === 'textarea' ? 'h-24' : 'h-10'} ${className}`} />
  }
  return (
    <div className={`w-full ${iconAt ? 'relative' : ''} ${className ?? ''}`}>
      <div className="flex items-end gap-4">
        {(label && !imitation) && <label htmlFor={`inputText${id}`}>{label}</label>}
        {(maxlength >= 1) && <div className="ml-auto text-gray-400">{value?.length ?? 0}/{maxlength}</div>}
      </div>
      {(label && imitation) && <span>{label}</span>}
      {(type === 'text' || type === 'email' || type === 'password') && (
        <>
          {icon && iconAt && iconPlacement === 'inside' && (
            <div
              className={`
                flex items-center absolute h-10 px-4
                ${label ? 'mt-2' : 'mt-px'}
                ${iconAt === 'right' ? 'right-0' : ''}
                ${iconAt === 'left' ? 'left-0' : ''}
              `}
            >
              {icon}
            </div>
          )}
          <div className={iconAt && iconPlacement === 'outside' ? 'flex items-center w-full space-x-2' : ''}>
            {icon && iconAt === 'left' && iconPlacement === 'outside' && icon}
            {imitation &&
              <>
                <div
                  tabIndex={disabled ? -1 : 0}
                  className={`select-none ${inputTextKindClass} ${inputClass} ${!disabled && 'cursor-text'}`}
                  style={{ ...padding(), minHeight: `calc(2px + (${fragmentedRem} * 2) + 1.5rem + 1.59px)` }}
                  onFocus={focus}
                  onClick={click}
                  onKeyDown={keydown}
                  onBlur={blur}
                >
                  {hasImitationValue ?
                    imitationValue
                    :
                    <div className={`whitespace-nowrap overflow-hidden ${error ? 'text-red-400' : 'text-gray-400'}`}>
                      {placeholder}
                    </div>
                  }
                </div>
              </>
            }
            {!imitation &&
              <input
                id={`inputText${id}`}
                value={value}
                name={`inputText${id}`}
                type={type}
                inputMode={inputmode}
                disabled={disabled}
                placeholder={placeholder}
                maxLength={maxlength > 0 ? maxlength : 200}
                autoComplete="off"
                className={`${inputTextKindClass} ${inputClass}`}
                style={{textAlign: 'inherit', ...padding()}}
                onFocus={focus}
                onKeyDown={keydown}
                onInput={e => input(e.target.value)}
                onBlur={blur}
              />
            }
            {(icon && iconAt === 'right' && iconPlacement === 'outside') && icon}
          </div>
        </>
      )}
      {type === 'textarea' &&
        <textarea
          id={`inputText${id}`}
          value={value}
          name={`inputText${id}`}
          disabled={disabled}
          rows={rows}
          placeholder={placeholder}
          autoComplete="off"
          className={`resize-none ${inputTextKindClass} ${inputClass}`}
          style={{ ...padding(), minHeight: `calc((1.357rem * ${rows}) + 4px)` }}
          onFocus={focus}
          onInput={e => input(e.target.value)}
          onBlur={blur}
        />
      }
      {error && <ErrorText text={error} />}
    </div>
  )
}
