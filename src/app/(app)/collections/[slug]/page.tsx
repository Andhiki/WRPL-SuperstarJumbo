import Hero from '@/modules/collections/hero'
import Products from '@/modules/collections/products'
import Search from '@/components/collections/search-filter'
import Container from '@/components/container'
import { getCollection } from '@/lib/fetch'
import { Category } from '@/payload-types'
import { Suspense } from 'react'
import ProductsLoading from '@/components/collections/products-loading'
import DraggableMaterialCard from '@/modules/collections/material'
import Navbar from '@/components/navbar'
import NotFound from '@/app/404'
import Footer from '@/components/footer'

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

const Page = async (props: PageProps) => {
  const slug = (await props.params).slug
  const collection: Category = await getCollection(slug)
  if (!collection) {
    return (
      <>
        <Navbar />
        <NotFound />
        <Footer />
      </>
    )
  }
  const searchParams = await props.searchParams

  return (
    <>
      <Hero {...collection} />
      <Container className='gap-4 pt-[17px] sm:py-8'>
        <Search
          query={
            Array.isArray(searchParams?.q) ? searchParams.q[0] : searchParams?.q
          }
          slug={slug}
        />
        <Suspense fallback={<ProductsLoading />}>
          <Products slug={slug} query={searchParams} />
        </Suspense>
      </Container>
      {collection.type === 'material' && (
        <DraggableMaterialCard {...collection} />
      )}
    </>
  )
}

export default Page
