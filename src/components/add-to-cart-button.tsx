'use client'

import { useCart } from '@/hooks/useCart'
import { Button } from './ui/button'
import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Book {
  id: number
  title: string
  price: number
  coverImage?: {
    url: string
  }
}

export default function AddToCartButton({ book, className }: { book: Book, className?: string }) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    // Memastikan data buku yang dikirim lengkap
    const bookData = {
      id: book.id,
      title: book.title,
      price: book.price,
      coverImage: book.coverImage
    }
    addToCart(bookData)
    setTimeout(() => setIsAdding(false), 1000)
  }

  return (
    <Button
      onClick={handleAddToCart}
      className={cn("w-full", className)}
      disabled={isAdding}
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      {isAdding ? 'Added!' : 'Add to Cart'}
    </Button>
  )
} 