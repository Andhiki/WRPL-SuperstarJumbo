// app/layout.tsx
import { Metadata } from 'next/types'
import './globals.css'
import { playfair, plusJakartaSans } from '@/helpers/fonts'
import GSAPProvider from '@/lib/gsap-provider'
import { Toaster } from '@/components/ui/toaster'
import ClientWrapper from '@/components/client-wrapper'

export const metadata: Metadata = {
  title: {
    default: 'SuperstarJumbo Book Store',
    template: '%s | SuperstarJumbo Book Store',
  },
  description: 'Discover beautifully designed furniture for your home.',
  openGraph: {
    title: 'SuperstarJumbo Book Store',
    description: 'Discover beautifully designed furniture for your home.',
    type: 'website',
    locale: 'en_US',
    siteName: 'SuperstarJumbo Book Store',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${plusJakartaSans.className} ${playfair.variable} bg-white text-black antialiased`}>
        <GSAPProvider>
          <ClientWrapper>{children}</ClientWrapper>
          <Toaster />
        </GSAPProvider>
      </body>
    </html>
  )
}