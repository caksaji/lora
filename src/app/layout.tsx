import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import '@/app/style/global.sass'
import Navbar from '@/component/partial/Navbar'
import Footer from '@/component/partial/Footer'

const fontSans = Poppins({
  subsets: ['latin'],
  weight: ['400', '600']
})

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
          <Toaster
            reverseOrder={true}
            containerClassName="toast-container"
            toastOptions={{
              duration: 3000,
              className: 'toast'
            }}
          />
          <Navbar />
          <div className="container" style={{ minHeight: 'calc(100dvh - (4rem + (1.5rem + 1.5rem + .5rem)))' }}>
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
