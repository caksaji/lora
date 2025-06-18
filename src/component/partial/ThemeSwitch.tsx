import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { keydownEnter } from '@/lib/localUtil'
import IconSvg from '@/component/partial/IconSvg'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) {
    return null
  }

  const switchTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <div tabIndex={0} className="flex-shrink-0 rounded-full cursor-pointer focussable click-effect" onClick={switchTheme} onKeyDown={keydownEnter(switchTheme)}>
      <IconSvg name={theme === 'light' ? 'sun-light' : 'half-moon'} className="h-6 w-6" />
    </div>
  )
}
