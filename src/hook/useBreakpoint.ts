'use client'

import { useEffect, useState } from 'react'
import { breakpoints, breakpointOrder, BreakpointKey } from '@/util/breakpoint'

function getCurrentBreakpoint(width: number): BreakpointKey | 'base' {
  let current: BreakpointKey | 'base' = 'base'
  for (const key of breakpointOrder) {
    if (width >= breakpoints[key]) {
      current = key
    }
  }
  return current
}

export function useBreakpoint() {
  const [hasMounted, setHasMounted] = useState(false)
  const [width, setWidth] = useState<number>(0)
  const [current, setCurrent] = useState<BreakpointKey | 'base'>('base')

  useEffect(() => {
    const onResize = () => {
      const newWidth = window.innerWidth
      setWidth(newWidth)
      setCurrent(getCurrentBreakpoint(newWidth))
    }

    setHasMounted(true) // ✅ flag that client mounted
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const greaterThan = (bp: BreakpointKey) => width > breakpoints[bp]
  const smallerThan = (bp: BreakpointKey) => width < breakpoints[bp]
  const between = (min: BreakpointKey, max: BreakpointKey) =>
    width >= breakpoints[min] && width < breakpoints[max]
  const greaterOrEqual = (bp: BreakpointKey) => width >= breakpoints[bp]
  const smallerOrEqual = (bp: BreakpointKey) => width <= breakpoints[bp]

  return {
    hasMounted,
    width,
    current,
    greaterThan,
    smallerThan,
    between,
    greaterOrEqual,
    smallerOrEqual
  }
}
