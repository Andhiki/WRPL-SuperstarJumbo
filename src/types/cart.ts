export interface CartItem {
  id: string
  bookId: number
  title: string
  price: number
  quantity: number
  coverImage?: {
    url: string
  }
}

export interface Cart {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

export interface CartContextType {
  cart: Cart
  addToCart: (book: {
    id: number
    title: string
    price: number
    coverImage?: {
      url: string
    }
  }) => void
  removeFromCart: (bookId: number) => void
  updateQuantity: (bookId: number, quantity: number) => void
  clearCart: () => void
} 