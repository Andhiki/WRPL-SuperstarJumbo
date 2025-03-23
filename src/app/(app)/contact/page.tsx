import NavbarResolver from '@/components/navbar-resolver'
import Contact from '@/modules/contact/contact'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact us for more customizations and inquiries about our products.',
}

const Page = () => {
  return (
    <main className='relative w-full'>
      <NavbarResolver />
      <Contact />

      <Image
        src={`/assets/home/hero-bg.webp`}
        alt='Renjana Furniture'
        fill
        priority
        sizes='100%'
        className='z-0 object-cover'
      />
      <div className='absolute inset-0 z-0 bg-black/60' />
    </main>
  )
}

export default Page
