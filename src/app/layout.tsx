import './globals.css'
import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"

// Configura la fuente Mulish
const mulish = Mulish({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-mulish',
})

export const metadata: Metadata = {
  title: 'SolarMente.AI - Energía Solar Inteligente',
  description: 'Ahorra hasta un 100% en tu factura eléctrica con energía limpia y renovable.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={mulish.variable}>
      <body className={mulish.className}>{children}</body>
    </html>
  )
}