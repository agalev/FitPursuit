import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FitPursuit',
  description: 'Join teams and compete with others for prizes!',
  image: '/favicon.ico',
  // url: 'https://fitpursuit.com',
  type: 'website',
  keywords: 'fitness, competition, community, prizes',
  siteName: 'FitPursuit',
  locale: 'en_US'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
