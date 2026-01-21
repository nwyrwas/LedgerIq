import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LedgerIQ - Your AI-Powered Financial Command Center',
  description: 'Take control of your finances with AI-powered insights, smart budgeting, and beautiful visualizations.',
  keywords: ['finance', 'budgeting', 'AI', 'money management', 'personal finance'],
  authors: [{ name: 'LedgerIQ Team' }],
  openGraph: {
    title: 'LedgerIQ - AI-Powered Financial Command Center',
    description: 'Take control of your finances with AI-powered insights',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
