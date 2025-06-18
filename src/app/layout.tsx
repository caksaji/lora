import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Poppins } from 'next/font/google'
import '@/app/style/global.sass'
import Navbar from '@/component/partial/Navbar'
import Footer from '@/component/partial/Footer'

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
  description: 'Product purchase analyzer, built with next.js by https://caksaji.netlify.app. This project is my personal training to use next.js',
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh">
        <ThemeProvider>
          <Navbar />
          <div className="container">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
