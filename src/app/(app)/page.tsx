import Hero from '@/modules/home/hero'
import { Metadata } from 'next/types'
import BookList from '@/modules/home/book-list'

export const metadata: Metadata = {
  title: 'Renjana Furniture - Redefining Your Space',
  description: 'Transform your living space with our exclusive collection of beautifully crafted furniture.',
  openGraph: {
    title: 'Welcome to Renjana Furniture - Redefining Your Space',
    description: 'Transform your living space with our exclusive collection of beautifully crafted furniture.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Renjana Furniture',
  },
}

export default function Home() {
  return (
    <>
      <Hero />
      <BookList />
      {/* <About />
      <FinestMaterials />
      <Collections />
      <Design />
      <PurchaseOurProducts />
      <ContactUs />
      <GetMore /> */}
    </>
  )
}
