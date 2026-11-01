import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { Manrope, Inter, JetBrains_Mono } from 'next/font/google'
import '../globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ChatWidget } from '@/components/chat/ChatWidget'
import { RU_BASE_URL } from '@/lib/site'

// Space Grotesk has no Cyrillic glyphs: the Russian tree uses Manrope for --font-display.
const manrope = Manrope({
  subsets: ['cyrillic', 'latin'],
  // variable font: all weights (500-700 used) from one file per subset
  variable: '--font-manrope',
  display: 'swap',
})

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(new URL(RU_BASE_URL).origin),
  title: {
    default: 'Quantum Atlas — ИИ промышленного уровня',
    template: '%s | Quantum Atlas',
  },
  description:
    'Внедрение ИИ для бизнеса: голосовые агенты, обработка документов, RAG-системы и SaaS на заказ. Self-hosted. Проверено в продакшене.',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Quantum Atlas',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RuLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      style={{ '--font-display': 'var(--font-manrope), sans-serif' } as CSSProperties}
    >
      <body className="bg-space-dark text-text-primary font-body antialiased">
        <Navbar locale="ru" />
        <main>{children}</main>
        <Footer locale="ru" />
        <ChatWidget locale="ru" />
      </body>
    </html>
  )
}
