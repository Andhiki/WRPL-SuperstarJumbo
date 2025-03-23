import Container from '@/components/container'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Compass } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const AboutUs = () => {
  return (
    <main>
      {/* Button */}
      <Link href={'/'}>
        <Button
          className='absolute z-50 ml-4 mt-8 underline-offset-8 hover:underline sm:ml-8'
          variant={'back'}
          size={'back'}
        >
          <ArrowLeft className='scale-125' />
          Back
        </Button>
      </Link>

      <section className='relative h-auto pt-[5.5rem] text-white'>
        <div className='absolute inset-0 z-0 bg-black opacity-50' />
        <Image
          src={`/assets/about/about-hero.webp`}
          alt='Renjana Furniture'
          fill
          sizes='100%'
          className='z-[-1] object-cover'
        />
        <Container className='relative z-10'>
          <h1 className='text-xl font-bold md:mb-3 md:text-[28px]'>
            Behind The Beauty Of
          </h1>
          <h2 className='text-wrap font-playfair text-[2.125rem] font-bold md:text-5xl'>
            Renjana Furniture
          </h2>
          <p className='mb-28 mt-2 text-base md:mt-4 md:text-xl'>
            See what happen with the process of creation before it gets in your
            hand
          </p>
        </Container>
      </section>

      <section>
        <Container className='space-y-6 pb-16 pt-12 xl:flex-row xl:space-y-0'>
          <div
            className='relative aspect-video rounded-2xl bg-gray-800 md:max-h-[271px] xl:mr-[4vw] xl:w-[33vw]'
            data-gsap='right'
          >
            <Image
              src={`/assets/about/about-story.webp`}
              alt='About Renjana Furniture'
              fill
              className='rounded-2xl object-cover'
              loading='lazy'
              sizes='100%'
            />
          </div>
          <div className='space-y-6 xl:w-[62vw]'>
            <h2 className='text-center font-playfair text-xl font-bold md:text-[2.125rem] xl:text-left'>
              The Story Of Renjana
            </h2>
            <p className='text-justify text-xs mb:text-sm md:text-base'>
              Lorem ipsum dolor sit amet consectetur. Duis diam nisl elit tortor
              pharetra egestas vel porta nisl. Quam porta praesent amet nunc
              tristique sollicitudin velit. Ut nullam volutpat amet non habitant
              dolor aliquam. Nisl praesent Duis diam nisl elit tortor pharetra
              egestas vel porta nisl. Quam porta praesent amet nunc tristique
              sollicitudin velit. Ut nullam volutpat amet non habitant dolor
              aliquam. Nisl praesent quam eu arcu. Lorem ipsum dolor sit amet
              consectetur. Duis diam nisl elit tortor pharetra egestas vel porta
              nisl. Quam porta praesent amet nunc tristique sollicitudin velit.
              Ut nullam volutpat amet non habitant dolor aliquam. Nisl praesent
              quam eu arcu
            </p>
          </div>
        </Container>
      </section>

      <section className='relative h-auto pb-[4.5rem] pt-3 text-white md:pt-14'>
        <div className='absolute inset-0 z-0 bg-black opacity-50' />
        <Image
          src={`/assets/about/about-creation.webp`}
          alt='Renjana Furniture'
          fill
          sizes='100%'
          className='z-[-1] object-cover'
        />
        <Container className='relative z-10'>
          <h2 className='text-center font-playfair text-xl font-bold md:text-[2.125rem]'>
            Creation Process
          </h2>
          <p className='mb-5 mt-2 text-center text-sm md:mb-11 md:mt-4 md:text-xl'>
            How Renjana Create Products to fullfill Customer’s needs
          </p>
          <CardCreationProcess />
        </Container>
      </section>

      <section>
        <Container className='space-y-6 pb-16 md:pt-[71px] xl:flex-row-reverse xl:space-y-0'>
          <div
            className='relative aspect-video rounded-2xl bg-gray-800 md:max-h-[271px] xl:ml-[4vw] xl:w-[33vw]'
            data-gsap='right'
          >
            <Image
              src={`/assets/about/about-materials.webp`}
              alt='About Renjana Furniture'
              fill
              className='rounded-2xl object-cover'
              loading='lazy'
              sizes='100%'
            />
          </div>
          <div className='space-y-6 xl:w-[62vw]'>
            <h2 className='text-center font-playfair text-xl font-bold md:text-[2.125rem] xl:text-right'>
              How We Choose Our Materials?
            </h2>
            <p className='text-justify text-xs mb:text-sm md:text-base'>
              Lorem ipsum dolor sit amet consectetur. Duis diam nisl elit tortor
              pharetra egestas vel porta nisl. Quam porta praesent amet nunc
              tristique sollicitudin velit. Ut nullam volutpat amet non habitant
              dolor aliquam. Nisl praesent Duis diam nisl elit tortor pharetra
              egestas vel porta nisl. Quam porta praesent amet nunc tristique
              sollicitudin velit. Ut nullam volutpat amet non habitant dolor
              aliquam. Nisl praesent quam eu arcu. Lorem ipsum dolor sit amet
              consectetur. Duis diam nisl elit tortor pharetra egestas vel porta
              nisl. Quam porta praesent amet nunc tristique sollicitudin velit.
              Ut nullam volutpat amet non habitant dolor aliquam. Nisl praesent
              quam eu arcu
            </p>
          </div>
        </Container>
      </section>
      <section>
        <Container className='pb-[4.5rem] pt-3'>
          <h2 className='text-center font-playfair text-xl font-bold md:text-[2.125rem]'>
            Our Family
          </h2>
          <p className='mb-5 mt-2 text-center text-sm md:mb-[42px] md:mt-4 md:text-xl'>
            People Behind Renjana Furniture
          </p>
          {/* <div className='aspect-video rounded-2xl bg-gray-800 xl:max-h-[400px]' /> */}
          <div
            className='relative aspect-video rounded-2xl bg-gray-800 xl:max-h-[400px]'
            data-gsap='right'
          >
            <Image
              src={`/assets/about/about-family.webp`}
              alt='About Renjana Furniture'
              fill
              className='rounded-2xl object-cover'
              loading='lazy'
              sizes='100%'
            />
          </div>
        </Container>
      </section>
    </main>
  )
}

const CardCreationProcess = () => {
  return (
    <main className='mx-auto grid grid-cols-1 gap-4 text-black lg:grid-cols-3 lg:space-y-0 xl:max-w-screen-lg'>
      {CREATION_PROCESS.map((item, index) => (
        <div key={index} className='w-full rounded-[10px] bg-white px-4 py-5'>
          <div className='flex items-center justify-start gap-x-3 gap-y-[10px]'>
            <div className='items-center justify-center text-primary-5'>
              {item.logo}
            </div>
            <h3 className='flex items-center justify-center font-bold'>
              {item.title}
            </h3>
          </div>
          <p className='mt-2 text-sm md:text-base'>{item.desc}</p>
        </div>
      ))}
    </main>
  )
}

const CREATION_PROCESS = [
  {
    logo: <Compass />,
    title: 'Design',
    desc: 'Lorem ipsum dolor sit amet consectetur. Id nec senectus eleifend proin aenean. Ac vitae tellus augue fringilla.',
  },
  {
    logo: <Compass />,
    title: 'Creation',
    desc: 'Lorem ipsum dolor sit amet consectetur. Id nec senectus eleifend proin aenean. Ac vitae tellus augue fringilla.',
  },
  {
    logo: <Compass />,
    title: 'Shipment',
    desc: 'Lorem ipsum dolor sit amet consectetur. Id nec senectus eleifend proin aenean. Ac vitae tellus augue fringilla.',
  },
]

export default AboutUs
