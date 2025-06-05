// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Stoic Developer | Ancient Wisdom for Modern Code',
  description: 'What Marcus Aurelius taught me about writing code under pressure. A philosophy-driven approach to software engineering excellence.',
  keywords: [
    'software engineering', 
    'stoic philosophy', 
    'programming', 
    'tech leadership', 
    'developer mindset',
    'Marcus Aurelius',
    'coding philosophy'
  ],
  authors: [{ name: 'The Stoic Developer' }],
  openGraph: {
    title: 'The Stoic Developer',
    description: 'Ancient wisdom for modern software engineering',
    type: 'website',
    siteName: 'The Stoic Developer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Stoic Developer',
    description: 'Ancient wisdom for modern software engineering',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}