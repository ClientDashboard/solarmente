import './globals.css'
import type { Metadata } from 'next'

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
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}