'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Cart, CartContextType, CartItem } from '@/types/cart'

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'bookstore_cart'

const initialCart: Cart = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
}

interface Book {
  id: number
  title: string
  price: number
  coverImage?: {
    url: string
  }
}

// Fungsi untuk generate ID yang stabil
const generateId = (bookId: number) => `book-${bookId}`

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(initialCart)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    setIsInitialized(true)
  }, [])

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    }
  }, [cart, isInitialized])

  const addToCart = (book: Book) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => Number(item.bookId) === Number(book.id))

      if (existingItem) {
        const updatedItems = prevCart.items.map(item =>
          Number(item.bookId) === Number(book.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        return calculateCartTotals(updatedItems)
      }

      const newItem: CartItem = {
        id: generateId(book.id),
        bookId: book.id,
        title: book.title,
        price: book.price,
        quantity: 1,
        coverImage: book.coverImage,
      }

      return calculateCartTotals([...prevCart.items, newItem])
    })
  }

  const removeFromCart = (bookId: number) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(item => Number(item.bookId) !== Number(bookId))
      return calculateCartTotals(updatedItems)
    })
  }

  const updateQuantity = (bookId: number, quantity: number) => {
    if (quantity < 1) return

    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item =>
        Number(item.bookId) === Number(bookId)
          ? { ...item, quantity }
          : item
      )
      return calculateCartTotals(updatedItems)
    })
  }

  const clearCart = () => {
    setCart(initialCart)
  }

  const calculateCartTotals = (items: CartItem[]): Cart => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    return {
      items,
      totalItems,
      totalPrice,
    }
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 