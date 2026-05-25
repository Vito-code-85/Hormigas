import type { Metadata, Viewport } from 'next'
import './globals.css'
import ServiceWorkerRegistrar from '@/components/ServiceWorkerRegistrar'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Invasión de Hormigas',
  description: 'Defiende tu comida de la invasión de hormigas. ¡Mata a todas antes de que lleguen!',
  manifest:'/manifest.json',
  icons: {
    icon: '/icon-192.png',
    apple:'/apple-touch-icon.png'
  },
  appleWebApp:{
    capable:true,
    statusBarStyle: 'default',
    title:'Hormiga'
    
  }


 }


export const viewport: Viewport = {
  themeColor: '#92400e',
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
      <Script id="pwa-install-capture" strategy="beforeInteractive">{`
        window.addEventListener('beforeinstallprompt', function(e) {
          e.preventDefault();
          window.__pwaInstallPrompt = e;
        });
      `}</Script>
      <body className="h-full overflow-hidden">
        <ServiceWorkerRegistrar />
        {children}
      </body>
    </html>
  )
}
