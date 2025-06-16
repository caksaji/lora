import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import '@/app/style/global.sass'
import Navbar from '@/component/partial/Navbar'

const fontSans = Poppins({
  subsets: ['latin'],
  weight: ['400', '600']
})
const menu = [
  { name: 'Report', link: '/' },
  { name: 'Product', link: '/product' }
]

export const metadata: Metadata = {
  title: 'Lora',
  description: 'Product purchase analyzer, built with next.js by https://linkedin.com/in/caksaji',
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
