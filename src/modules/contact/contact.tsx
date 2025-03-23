import ContactForm from '@/components/contact/contact-form'
import Container from '@/components/container'
import {
  FacebookLogo,
  InstagramLogo,
  WhatsappLogo,
} from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'

const SOCIAL_LINKS = [
  {
    logo: <InstagramLogo size={24} />,
    href: 'https://www.instagram.com/renjana_furniture/',
  },
  {
    logo: <FacebookLogo size={24} />,
    href: 'https://www.facebook.com/renjana_furniture/',
  },
  {
    logo: <WhatsappLogo size={24} />,
    href: 'https://wa.me/6281234567890',
  },
]

const Contact = () => {
  return (
    <Container className='relative z-10 pb-24 2xl:px-14'>
      <main className='flex flex-col gap-6 rounded-2xl bg-white p-6 md:flex-row md:items-center'>
        <ImageCard />
        <ContactForm />
      </main>
    </Container>
  )
}

const ImageCard = () => {
  return (
    <main className='relative flex min-h-96 w-full flex-col justify-end gap-4 overflow-hidden rounded-2xl p-6 *:text-white sm:h-96 md:aspect-[6/5] md:w-auto md:shrink-0'>
      <h1 className='z-10 text-4xl font-bold'>Contact Us</h1>
      <p className='z-10'>
        Bring our all premium artisant gallery to your pocket. Download Our
        Catalogue Now! 
        <span className='font-bold'> Have a question? </span>or Interested to our products{' '}
      </p>

      <section className='z-10 flex items-center gap-2'>
        {SOCIAL_LINKS.map(({ logo, href }, index) => (
          <Link
            key={index}
            href={href}
            className='grid aspect-square h-10 place-items-center rounded-md bg-primary-5'
          >
            {logo}
          </Link>
        ))}
      </section>

      <Image
        src={`/assets/home/hero-bg.webp`}
        alt='Renjana Image'
        fill
        sizes='100%'
        className='z-0 object-cover'
      />
      <div className='absolute inset-0 z-0 bg-gradient-to-t from-black/40 to-transparent' />
    </main>
  )
}

export default Contact
