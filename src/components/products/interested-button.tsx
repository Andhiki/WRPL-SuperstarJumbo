import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Image from 'next/image'
import { X } from 'lucide-react'
import Link from 'next/link'

const InterestedButton = ({ className, name }: { className?: string, name: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CTAButton className={className} />
      </DialogTrigger>
      <DialogContent className='fixed z-[999] w-screen h-fit translate-1/2 flex flex-row overflow-hidden rounded-2xl border-none p-0 sm:rounded-2xl scale-[68%] xs:scale-[70%] mb:scale-75 sm:scale-100'>
        <section className='relative min-h-40 w-1/3 shrink-0 bg-neutral-200'>
          <Image
            src={'/assets/home/hero-bg.webp'}
            alt='Get in Touch with us'
            fill
            sizes='50%'
            className='object-cover'
          />
        </section>
        <DialogHeader className='m-4 ml-0 sm:ml-4'>
          <DialogTitle className='mb-2 flex items-center justify-between border-b pb-2 text-base'>
            Contact Us
            <DialogClose className='border-none'>
              <X className='h-4 w-4 text-neutral-400' />
            </DialogClose>
          </DialogTitle>
          <DialogDescription className='text-black text-left'>
            Interested in our products? You will be directed to a{' '}
            <span className='font-bold'>chat message.</span>
            Our friendly contact person is here to answer your questions!{' '}
            <span className='font-bold'> Ask Anything</span>
          </DialogDescription>
          <Link
            href={`https://wa.me/6282228742718?text=Halo%20Renjana%20Furniture%2C%20saya%20tertarik%20dengan%20produk%20yang%20ada%20di%20https://renjanafurniture.com/product/${encodeURIComponent(name)}`}
            rel='noopener norefferer'
            target='_blank'
            className='ml-auto mt-4 w-fit'
          >
            <Button className='w-fit ml-auto flex px-6 text-sm'>Lets Go!</Button>
          </Link>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

const CTAButton = ({ className }: { className?: string }) => {
  return (
    <Button
      variant={'product'}
      className={cn('self-end lg:px-20 w-full lg:w-auto text-center py-6 text-white lg:mt-4', className)}
    >
      Interested? Contact Us Now
    </Button>
  )
}

export default InterestedButton
