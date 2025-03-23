'use client'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isProductPage = pathname?.startsWith('/product/') ?? false
  const isAboutUsPage = pathname?.startsWith('/about-us') ?? false

  return (
    <>
      {!(isProductPage || isAboutUsPage) && <Navbar />}
      {children}
      {!(isProductPage || isAboutUsPage) && <Footer />}
    </>
  )
}
