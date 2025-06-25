'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { keydownEnter } from '@/lib/localUtil'

export default function NotFound() {
  const router = useRouter()
  const resolveStep404 = ['Keep calm', 'Take deep breath', 'Drink water', 'Take a quick rest', 'And then']

  return (
    <div className="flex flex-col items-center justify-center w-full" style={{ height: 'calc(100dvh - (4rem + (1.5rem + 1.5rem + .5rem)))' }}>
      <div className="max-w-sm space-y-4 px-4">
        <div className="relative h-full bg-[url(/img/illu/error-page404.png)] bg-contain bg-center bg-no-repeat">
          <Image src="/img/illu/error-page404.png" alt="Page 404" fill className="invisible" />
        </div>
        <div>
          Oops, looks like you enjoying so much till you lost.
          <div className="space-y-1 pt-2">
            {resolveStep404.map((s, i) => (
              <div key={i} className="flex space-x-2">
                <div className="flex-shrink-0 h-2 w-2 rounded-full mt-2.5 bg-gray-800 dark:bg-white" />
                <div className={ i === resolveStep404.length - 1 ? 'flex space-x-1' : '' }>
                  <div className="flex-shrink-0 pt-0.5">
                    {s}
                  </div>
                  {i === resolveStep404.length - 1 &&
                    <span tabIndex={0} className="link" onClick={() => router.replace('/')} onKeyDown={() => keydownEnter(router.replace('/'))}>Back to home</span>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
