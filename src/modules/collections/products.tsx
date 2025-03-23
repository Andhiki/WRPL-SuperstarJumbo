import { DEFAULT_PRODUCTS } from '@/lib/fetch'
import { Product } from '@/payload-types'
import { ArrowRight, Frown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'

type ProductsProps = {
  query?: { [key: string]: string | string[] | undefined }
  products?: Product[]
  slug: string
}

// Helper function to safely check if an object has a property
const hasProperty = <T extends object, K extends string>(
  obj: T,
  prop: K
): obj is T & Record<K, unknown> => {
  return obj !== null && typeof obj === 'object' && prop in obj;
};

const Products = (props: ProductsProps) => {
  const category = props.query?.category || ''
  const search =
    (Array.isArray(props.query?.q) ? props.query?.q[0] : props.query?.q) || ''
  const availability = props.query?.availability || ''

  // Memoize the filtering logic to prevent unnecessary recalculations
  const products = useMemo(() => {
    return DEFAULT_PRODUCTS.filter((item) => {
      // Safe access to slug properties with type checking
      const categorySlug = 
        item.category && 
        typeof item.category === 'object' && 
        hasProperty(item.category, 'slug') ? 
        item.category.slug as string : undefined
      
      const materialSlug = 
        item.material && 
        typeof item.material === 'object' && 
        hasProperty(item.material, 'slug') ? 
        item.material.slug as string : undefined
      
      const matchesSlug = 
        (categorySlug === props.slug) || 
        (materialSlug === props.slug)
      
      const matchesSearch = !search || 
        item.title.toLowerCase().includes(search.toLowerCase())
      
      const matchesCategory = !category || 
        categorySlug === category || 
        materialSlug === category
      
      const matchesAvailability = !availability || 
        (availability === 'available' ? item.available === true : item.available !== true)

      return matchesSlug && matchesSearch && matchesCategory && matchesAvailability
    })
  }, [props.slug, category, search, availability])

  return (
    <>
      <div className='flex items-center gap-4'>
        <h1 className='font-bold'>Products</h1>
        <h2 className='text-sm text-neutral-600'>
          {props.query?.q
            ? `Hasil pencarian untuk "${props.query.q}"`
            : 'Semua Produk'}
        </h2>
      </div>

      {products.length === 0 ? (
        <section className='flex min-h-96 flex-col items-center justify-center gap-2'>
          <Frown className='mb-4 h-20 w-20 text-black' />
          <h1 className='text-lg md:text-2xl font-bold text-center'>
          Oops, The product you&apos;re looking for is either unavailable or coming soon!
          </h1>
          <h2 className='text-center text-sm md:text-base'>Try searching for another product</h2>
        </section>
      ) : (
        <section className='grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4'>
          {products.map((product, index) => (
            <ProductCard key={product.id} {...product} index={index} />
          ))}
        </section>
      )}
    </>
  )
}

// Update type to include index prop for prioritizing images
type ProductCardProps = Product & {
  index: number
}

const ProductCard = (props: ProductCardProps) => {
  // Memoize the URL creation to avoid recalculation on re-renders
  const productUrl = useMemo(() => 
    `/product/${props.title.toLowerCase().replace(/ /g, '-')}`, 
    [props.title]
  )

  // Safely extract image URL with proper type checking
  const imageUrl = useMemo(() => {
    // Check if images array exists
    if (!props.images || !Array.isArray(props.images) || props.images.length === 0) {
      return '/placeholder.jpg';
    }
    
    const firstImage = props.images[0];
    
    // Check if image property exists and is an object
    if (!firstImage || !firstImage.image || typeof firstImage.image !== 'object') {
      return '/placeholder.jpg';
    }
    
    // Check if url property exists on the image object
    if (hasProperty(firstImage.image, 'url') && typeof firstImage.image.url === 'string') {
      return firstImage.image.url;
    }
    
    return '/placeholder.jpg';
  }, [props.images]);

  // Safely extract material and category titles
  const materialTitle = useMemo(() => {
    if (props.material && 
        typeof props.material === 'object' && 
        hasProperty(props.material, 'title') && 
        typeof props.material.title === 'string') {
      return props.material.title;
    }
    return '';
  }, [props.material]);

  const categoryTitle = useMemo(() => {
    if (props.category && 
        typeof props.category === 'object' && 
        hasProperty(props.category, 'title') && 
        typeof props.category.title === 'string') {
      return props.category.title;
    }
    return '';
  }, [props.category]);

  return (
    <Link
      href={productUrl}
      className='group relative flex h-full flex-col gap-2 rounded-lg'
    >
      {/* image */}
      <section className='relative aspect-square w-full overflow-hidden rounded-lg lg:aspect-[32/22]'>
        <Image
          src={imageUrl}
          alt={`${props.title} product image`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={props.index < 4} // Prioritize loading for first 4 visible products
          className='object-cover transition-transform group-hover:scale-105 bg-gray-400'
        />
        {/* availability status */}
        <div
          className={`absolute left-2.5 top-2.5 rounded-md px-2 py-1 text-[10px] md:text-sm ${
            props.available
              ? 'bg-custom-yellow text-black'
              : 'bg-black text-white'
          }`}
        >
          {props.available ? 'Available' : 'Out of Stock'}
        </div>
      </section>

      {/* card content */}
      <div className='flex flex-1 flex-col justify-between'>
        <div className='space-y-2'>
          {/* product name */}
          <h1 className='text-sm sm:text-xl font-bold underline-offset-4 group-hover:underline'>
            {props.title}
          </h1>
          {/* categories */}
          <h2 className='text-truncate text-[8px] sm:text-xs md:text-sm'>
            {materialTitle}{' '}
            {'  •  '}{' '}
            {categoryTitle}
          </h2>
        </div>

        {/* button link */}
        <div className='z-10 mt-4 flex items-center justify-end gap-3 overflow-hidden *:text-primary-5'>
          <h3 className='text-sm opacity-0 blur-sm transition-all ease-in-out group-hover:opacity-100 group-hover:blur-none'>
            See Product
          </h3>
          <ArrowRight className='h-5 w-5' />
        </div>
      </div>
    </Link>
  )
}

export default Products