import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ 
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'AI Supports Bots - Smart Support. Stronger Business.',
  description: 'AI-powered payment reminder and business management platform. Register your business, manage clients, upload payments and let our AI bot remind you accurately and on time.',
  keywords: ['AI', 'payment reminders', 'business management', 'client management', 'invoicing', 'automation'],
  authors: [{ name: 'Norman Dan Baka' }],
  openGraph: {
    title: 'AI Supports Bots - Smart Support. Stronger Business.',
    description: 'AI-powered payment reminder and business management platform.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
