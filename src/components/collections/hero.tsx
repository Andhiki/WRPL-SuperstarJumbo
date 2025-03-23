import Image from 'next/image'
import Container from '../container'
import NavbarResolver from '../navbar-resolver'

type HeroType = {
  title: string
}

const Hero = ({ title }: HeroType) => {
  return (
    <main className='relative pb-12'>
      <NavbarResolver />
      <Container className='*:text-primary-8 relative z-10 gap-4 py-2'>
        <h1 className='font-playfair text-5xl font-bold'>{title}</h1>
        <p className=''>Lorem ipsum is dummy text lol bla blabla roblox bluel ock</p>
      </Container>
      <Image
        src={`/assets/home/hero.jpg`}
        alt={`${title} collection`}
        fill
        sizes='100%'
        className='z-0 object-cover'
      />
    </main>
  )
}

export default Hero
