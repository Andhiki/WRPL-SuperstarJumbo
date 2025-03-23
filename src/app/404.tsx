import Image from 'next/image'
import NavbarResolver from '@/components/navbar-resolver'
import Container from '@/components/container'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
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
        <div className='mx-auto mb-12 grid w-full grid-cols-1 justify-center rounded-xl bg-background p-3 sm:grid-cols-2 sm:h-[45vh] sm:items-end sm:gap-0 sm:pb-3 md:aspect-[823/549] sm:space-x-8'>
          <div className='flex items-center justify-center sm:justify-end h-auto min-h-72 w-auto sm:h-full sm:w-auto sm:pr-8'>
            <Image
              src={`/assets/404/404 - Chair.webp`}
              alt='Catalogue'
              width={496}
              height={517}
              className='rounded-lg object-contain w-60 h-auto'
              priority
            />
          </div>
          <div className='gap-2 flex flex-col justify-center items-center sm:items-start sm:gap-3 sm:self-center pb-4 sm:pb-0'>
            <h1 className='justify-self-center text-7xl font-bold sm:text-6xl'>
              404
            </h1>
            <h3 className='justify-self-center text-lg font-bold md:text-2xl'>
              Oops, page not found
            </h3>
            <p className='mb-4 sm:mb-2 text-center sm:text-left text-sm md:text-base'>
              We can’t seem to find the page<br />you’re looking for
            </p>
            <Link href='/' className='justify-self-center'>
              <Button className='font-normal' variant={'notFound'}>
                <Home />
                Go Back Home
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  )
}
