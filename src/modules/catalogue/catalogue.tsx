import Image from 'next/image'
import NavbarResolver from '@/components/navbar-resolver'
import Container from '@/components/container'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

const Catalogue = () => {
  const pdfUrl = '/catalogue/Renjana Furniture Catalogue 2025.pdf';
  const pdfFilename = 'Renjana Furniture Catalogue 2025.pdf';
  
  return (
    <main className='relative h-auto'>
      <Image
        src={'/assets/home/hero-bg.webp'}
        alt='Preview Catalogue of Ren jana Furniture'
        fill
        sizes='100%'
        className='object-cover'
      />
      <NavbarResolver />
      <Container className='relative'>
        <div className='mx-auto mb-12 grid w-full grid-cols-1 justify-center gap-8 rounded-xl bg-background p-3 mb:grid-cols-2 sm:h-[60vh] sm:items-end sm:gap-0 sm:pb-3 md:aspect-[823/549] lg:max-w-screen-md'>
          <div className='relative h-auto min-h-[40vh] mb:min-h-[50vh] sm:h-full sm:w-full'>
            <Image
              src={`/assets/catalogue/image.webp`}
              alt='Catalogue'
              fill
              className='h-full rounded-lg object-cover'
              sizes='100%'
              loading='lazy'
            />
          </div>
          <div className='mb-5 shrink space-y-4 self-start mb:self-end sm:mx-7 sm:mb-4 sm:space-y-8 sm:self-end'>
            <h1 className='font-playfair text-2xl font-bold md:text-3xl'>
              All Up Coming Season Catalouge
            </h1>
            <p className='text-sm md:text-base mt-4'>
              Bring our all premium artisant gallery to your pocket. Download
              Our Catalogue Now!
            </p>
            <a href={pdfUrl} download={pdfFilename} className='block mt-4'>
              <Button className='font-normal'>
                <Download />
                Download
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </main>
  )
}

export default Catalogue
