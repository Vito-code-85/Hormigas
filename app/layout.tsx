import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Invasión de Hormigas',
  description: 'Defiende tu comida de la invasión de hormigas. ¡Mata a todas antes de que lleguen!',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="h-full overflow-hidden">
        {children}
      </body>
    </html>
  )
}
