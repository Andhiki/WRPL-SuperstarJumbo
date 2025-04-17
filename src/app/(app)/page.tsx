import Hero from '@/modules/home/hero'
import { Metadata } from 'next/types'
import BookList from '@/modules/home/book-list'

export const metadata: Metadata = {
  title: 'SuperstarJumbo - Book Store',
  description: 'Beli buku? Ya di sini!',
  openGraph: {
    title: 'SuperstarJumbo - Book Store',
    description: 'Beli buku? Ya di sini!',
    type: 'website',
    locale: 'en_US',
    siteName: 'SuperstarJumbo Book Store',
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
