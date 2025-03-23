"use server"
import { LoaderCircle } from 'lucide-react'

const ProductsLoading = () => {
  return (
    <main className='grid min-h-96 place-items-center'>
      <LoaderCircle className='h-20 w-20 animate-spin text-custom-brown' />
    </main>
  )
}

export default ProductsLoading
