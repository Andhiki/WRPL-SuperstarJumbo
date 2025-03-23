import Image from 'next/image'

type ProductsProps = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  query?: any
  products?: any
}

const Products = (props: ProductsProps) => {
  return (
    <>
      <div className='flex gap-4 items-center'>
        <h1 className='font-bold'>Products</h1>
        <h2 className='text-sm text-neutral-600'>{props.query.q ? `Hasil pencarian untuk "${props.query.q}"` : 'Semua Produk'}</h2>
      </div>

      <section className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4'>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </section>
    </>
  )
}

const ProductCard = () => {
  const available = true

  return (
    <main className='group relative flex flex-col gap-4'>
      {/* image */}
      <section className='relative aspect-square w-full overflow-hidden rounded-lg md:aspect-[32/22]'>
        <Image
          src={`/assets/home/hero.jpg`}
          alt='Product Image'
          fill
          sizes='100%'
          className='object-cover'
        />
      </section>

      {/* availability status */}
      <div
        className={`absolute left-2.5 top-2.5 rounded-md px-2 py-1 text-sm ${available ? 'bg-custom-yellow text-black' : 'bg-black text-white'}`}
      >
        Available
      </div>

      {/* product name */}
      <h1 className='text-xl font-bold'>Name of Something Fancy</h1>
    </main>
  )
}

export default Products
