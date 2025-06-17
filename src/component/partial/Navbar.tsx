'use client'

import { usePathname, useRouter } from 'next/navigation'

const menu = [
  { name: 'Report', link: '/' },
  { name: 'Product', link: '/product' }
]

export default function Navbar() {
  const router = useRouter()
  const pathName = usePathname()

  const openMenu = (link) => {
    if (pathName === menu[0].link) {
      router.push(link)
    } else {
      router.replace(link)
    }
  }
  return (
    <div className="h-16">
      <div className="fixed top-0 left-0 w-dvw">
        <div className="container">
          <div className="flex gap-4 font-semibold">
            {menu.map((m, i) => (
              <div key={i} tabIndex="0" className={`flex flex-col gap-y-1 pt-2 cursor-pointer duration-300 click-effect hover:text-violet-600 ${usePathname() === m.link ? 'text-violet-600' : 'text-gray-400'}`} onClick={() => openMenu(m.link)}>
                <span>{m.name}</span>
                <div className={`h-1 bg-violet-600 transform duration-300 ${pathName === m.link ? 'w-full' : 'w-0'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
