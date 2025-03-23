import type { Metadata } from 'next'
import Container from '@/components/container'
import { getProduct } from '@/lib/fetch'
import ProductPage from '@/modules/products/product-page'
import YouMightLike from '@/modules/products/you-might-like'
import NotFound from '@/app/404'
import InterestedButton from '@/components/products/interested-button'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

// Define the base URL dynamically based on the environment
const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://renjanafurniture.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> // Plain object
}): Promise<Metadata> {
  try {
    const product = await getProduct((await params).slug)

    if (!product) {
      return {
        title: 'Product Not Found - Renjana Furniture',
        description: 'The requested product could not be found.',
        openGraph: {
          title: 'Product Not Found - Renjana Furniture',
          description: 'The requested product could not be found.',
          url: `${BASE_URL}/product/${(await params).slug}`,
          siteName: 'Renjana Furniture',
          locale: 'en_US',
          type: 'website',
        },
      }
    }

    return {
      title: `${product.title} - Renjana Furniture`,
      description:
        product.description || 'Discover our premium furniture products.',
      openGraph: {
        title: `${product.title} - Renjana Furniture`,
        description:
          product.description ||
          'Explore high-quality furniture for your home.',
        url: `${BASE_URL}/product/${(await params).slug}`,
        siteName: 'Renjana Furniture',
        locale: 'en_US',
        type: 'website',
      },
      alternates: {
        canonical: `${BASE_URL}/product/${(await params).slug}`,
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Error - Renjana Furniture',
      description: 'An error occurred while fetching the product information.',
    }
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  try {
    const resolvedParams = await params
    const product = await getProduct(resolvedParams.slug)

    if (!product) {
      return (
        <>
          <Navbar />
          <NotFound />
          <Footer />
        </>
      )
    }

    return (
      <>
        <ProductPage {...product} />
        <Container>
          <YouMightLike />
        </Container>
        <Container className='fixed bg-white bottom-0 z-40 w-full lg:hidden'>
          <InterestedButton name={product.title} />
        </Container>
      </>
    )
  } catch (error) {
    console.error('Error fetching product:', error)
    return <NotFound />
  }
}
