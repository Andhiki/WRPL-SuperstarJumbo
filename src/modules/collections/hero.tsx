import { Category } from '@/payload-types'
import Image from 'next/image'
import Container from '../../components/container'
import NavbarResolver from '../../components/navbar-resolver'

const Hero = (props: Category) => {
  // const imageUrl = (typeof props.image === 'object' && props.image !== null && props.image.url) || '/placeholder.jpg';
  const imageUrl = `/assets/collections/${props.slug}.webp`;

  return (
    <main className='relative pb-8 md:pb-12'>
      <NavbarResolver />
      <Container className='relative z-10 flex flex-col gap-2 md:gap-4 py-2 *:text-white mt-0'>
        <h1 className='font-playfair text-[28px] mb:text-[34px] md:text-[40px] font-bold lg:text-5xl leading-tight'>
          {props.title} Collection
        </h1>
        <p className='max-w-screen-md text-xs sm:text-sm'>{props.description}</p>
      </Container>
      <Image
        src={imageUrl}
        alt={`${props.title} Collection`}
        fill
        sizes="10%"
        className="z-0 object-cover"
      />
      <div className="absolute inset-0 z-0 bg-black opacity-50" />
    </main>
  )
}

export default Hero;
