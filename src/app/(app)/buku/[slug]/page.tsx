import { getBookBySlug } from '@/helpers/fetchBooks'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import NavbarResolver from '@/components/navbar-resolver'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import AddToCartButton from '@/components/add-to-cart-button'


export default async function BookDetailPage({ params }: { params: { slug: string } }) {
  const book = await getBookBySlug(params.slug)
  if (!book) return notFound()

  return (
    <main className='relative'>
      <NavbarResolver />
      <div className="container mx-auto py-12 px-4 relative min-h-screen">
        <Link href='/' className='-top-10 flex gap-2'>
          <ArrowLeftIcon className='w-6 h-6' />{' '}Back
        </Link>
        <div className="flex flex-col md:flex-row gap-8">
          <div className='flex-1 flex gap-4 mt-10'>
            <div className="relative w-full md:w-1/3 h-full min-h-[500px] border border-black">
              <Image
                src={book.coverImage?.url || '/placeholder.jpg'}
                alt={book.title || 'Book cover'}
                fill
                priority
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <h1 className="text-3xl font-bold">{book.title}</h1>
              <p className="text-lg text-gray-700">By {typeof book.author === 'object' ? book.author.name : book.author}</p>
              <p className="text-xl font-semibold text-custom-blue">Rp{book.price.toLocaleString('id-ID')}</p>
              <p className="text-gray-600">{book.description}</p>
              <p className={`text-sm ${book.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {book.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </p>
              <p className="text-sm text-gray-500">
                Category: {typeof book.category === 'object' ? book.category.name : (book.category || 'Unknown')}
              </p>
              {book.stock > 0 && <AddToCartButton book={book} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 