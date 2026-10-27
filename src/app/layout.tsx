import type { Metadata } from 'next'
import { Inter, Vazirmatn } from 'next/font/google'

import { Providers } from '@/components/layout/providers'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  variable: '--font-vazirmatn',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'ورق | Varaq',
  description:
    'رزومه حرفه‌ای بسازید، پیش‌نمایش زنده ببینید و متن را با هوش مصنوعی بهبود دهید. Build a professional resume with live preview and AI writing help, entirely in your browser.',
  keywords: ['resume', 'CV', 'builder', 'AI', 'ATS', 'رزومه', 'فارسی']
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='fa-IR' dir='rtl' className={`${vazirmatn.variable} ${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Lora:wght@400;700&family=Merriweather:wght@400;700&family=Montserrat:wght@400;600;700&family=Nunito:wght@400;700&family=Open+Sans:wght@400;600;700&family=PT+Sans:wght@400;700&family=Playfair+Display:wght@400;700&family=Poppins:wght@400;600;700&family=Raleway:wght@400;600;700&family=Roboto:wght@400;500;700&family=Source+Sans+3:wght@400;600;700&display=swap'
        />
      </head>
      <body className='min-h-screen bg-background font-sans antialiased' suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
