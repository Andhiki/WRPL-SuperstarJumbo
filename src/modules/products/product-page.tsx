import BackButton from '@/components/back-button'
import Container from '@/components/container'
import { Product } from '@/payload-types'
import ProductImageGallery from './product-image-gallery'
import InterestedButton from '@/components/products/interested-button'

const ProductPage = (product: Product) => {
  return (
    <main className='relative grid grid-cols-1 lg:grid-cols-2 z-40'>
      {/* Button */}
      <BackButton />

      <ProductImageGallery
        className='absolute inset-0 z-40 flex w-full items-start justify-start gap-4 bg-background'
        images={
          product.images?.map((img) => ({
            url: typeof img.image === 'object' ? img.image?.url || '' : '',
          })) || []
        }
        selectedImageIndex={0}
      />

      <Description {...product} />
    </main>
  )
}

const Description = (product: Product) => {
  return (
    <Container className='relative z-40 flex h-full w-full flex-col justify-center gap-2 bg-white'>
      <h1 className='text-2xl font-bold md:text-3xl lg:text-4xl'>
        {product.title}
      </h1>
      <div className='space-x-10'>
        <span
          className={`font-light ${product.available ? 'text-green-500' : 'text-red-500'}`}
        >
          {product.available ? 'Available' : 'Out of Stock'}
        </span>
        <span className='font-semibold'>Rp{product.price}</span>
      </div>
      <p className='w-full text-justify text-xs sm:text-sm'>
        {product.description}
      </p>
      <div className='flex w-full justify-between border-b border-custom-gray pb-6 pt-4'>
        <h2 className='text-sm font-bold 2xl:text-base'>Materials</h2>
        <div className='flex flex-col gap-2 text-sm 2xl:text-base'>
          <span>
            {typeof product.material === 'object' ? product.material.title : ''}
          </span>
        </div>
      </div>
      <div className='flex w-full justify-between border-b border-custom-gray pb-6 pt-4'>
        <h2 className='text-sm font-bold 2xl:text-base'>Categories</h2>
        <span className='text-sm 2xl:text-base'>
          {typeof product.category === 'object' ? product.category.title : ''}
        </span>
      </div>
      <div className='flex w-full justify-between border-b border-custom-gray pb-6 pt-4'>
        <h2 className='text-sm font-bold 2xl:text-base'>Dimensions</h2>
        <div className='flex flex-col items-end gap-2 text-sm 2xl:text-base'>
          <span>{product.dimension?.width} cm Width</span>
          <span>{product.dimension?.height} cm Height</span>
          <span>{product.dimension?.depth} cm Depth</span>
        </div>
      </div>
      <InterestedButton className='hidden lg:flex' name={product.title} />
    </Container>
  )
}

export default ProductPage
