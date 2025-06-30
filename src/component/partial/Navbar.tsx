'use client'

import { useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import ModalIntro, { ModalIntroHandle } from '@/component/partial/ModalIntro'

export default function Navbar() {
  const router = useRouter()
  const pathName = usePathname()
  const ThemeSwitch = dynamic(() => import('@/component/partial/ThemeSwitch'), { ssr: false })
  const modalIntro = useRef<ModalIntroHandle>(null)
  const menu = [
    { name: 'Report', link: '/' },
    { name: 'Product', link: '/product' }
  ]
  return (
    <div className="h-16">
      <div className="fixed top-0 left-0 z-10 w-dvw border-b border-gray-300 bg-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="container">
          <div className="flex items-center gap-4 justify-between w-full">
            <div className="flex gap-4 font-semibold">
              {menu.map((m, i) => (
                <div key={i} tabIndex={0} className={`flex flex-col gap-y-1 pt-2 cursor-pointer duration-300 click-effect focussable hover:text-violet-600 ${usePathname() === m.link ? 'text-violet-600' : 'text-gray-400'}`} onClick={() => router.push(m.link)} onKeyDown={e => e.key === 'Enter' && router.push(m.link)}>
                  <span>{m.name}</span>
                  <div className={`h-1 bg-violet-600 transform duration-300 ${pathName === m.link ? 'w-full' : 'w-0'}`} />
                </div>
              ))}
              <div tabIndex={0} className="flex flex-col gap-y-1 pt-2 text-gray-400 cursor-pointer duration-300 click-effect focussable hover:text-violet-600" onClick={() => modalIntro.current?.open()} onKeyDown={e => e.key === 'Enter' && modalIntro.current?.open()}>
                <span>Info</span>
              </div>
            </div>
            <ThemeSwitch />
          </div>
        </div>
      </div>
      <ModalIntro ref={modalIntro} />
    </div>
  )
}
