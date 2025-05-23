import { renderHook, act } from '@testing-library/react'
import { useCart, CartProvider } from '@/hooks/useCart'
import { ReactNode } from 'react'

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Wrapper component untuk testing
const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
)

describe('useCart Hook', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should initialize with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    expect(result.current.cart.items).toHaveLength(0)
    expect(result.current.cart.totalItems).toBe(0)
    expect(result.current.cart.totalPrice).toBe(0)
  })

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    const book = {
      id: 1,
      title: 'Test Book',
      price: 100000,
      coverImage: { url: '/test.jpg' }
    }

    act(() => {
      result.current.addToCart(book)
    })

    expect(result.current.cart.items).toHaveLength(1)
    expect(result.current.cart.totalItems).toBe(1)
    expect(result.current.cart.totalPrice).toBe(100000)
    expect(result.current.cart.items[0]).toMatchObject({
      bookId: 1,
      title: 'Test Book',
      price: 100000,
      quantity: 1
    })
  })

  it('should increase quantity when adding same item', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    const book = {
      id: 1,
      title: 'Test Book',
      price: 100000,
      coverImage: { url: '/test.jpg' }
    }

    act(() => {
      result.current.addToCart(book)
      result.current.addToCart(book)
    })

    expect(result.current.cart.items).toHaveLength(1)
    expect(result.current.cart.totalItems).toBe(2)
    expect(result.current.cart.totalPrice).toBe(200000)
    expect(result.current.cart.items[0].quantity).toBe(2)
  })

  it('should remove item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    const book = {
      id: 1,
      title: 'Test Book',
      price: 100000,
      coverImage: { url: '/test.jpg' }
    }

    act(() => {
      result.current.addToCart(book)
      result.current.removeFromCart(1)
    })

    expect(result.current.cart.items).toHaveLength(0)
    expect(result.current.cart.totalItems).toBe(0)
    expect(result.current.cart.totalPrice).toBe(0)
  })

  it('should update item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    const book = {
      id: 1,
      title: 'Test Book',
      price: 100000,
      coverImage: { url: '/test.jpg' }
    }

    act(() => {
      result.current.addToCart(book)
      result.current.updateQuantity(1, 3)
    })

    expect(result.current.cart.items[0].quantity).toBe(3)
    expect(result.current.cart.totalItems).toBe(3)
    expect(result.current.cart.totalPrice).toBe(300000)
  })

  it('should clear cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    const book = {
      id: 1,
      title: 'Test Book',
      price: 100000,
      coverImage: { url: '/test.jpg' }
    }

    act(() => {
      result.current.addToCart(book)
      result.current.clearCart()
    })

    expect(result.current.cart.items).toHaveLength(0)
    expect(result.current.cart.totalItems).toBe(0)
    expect(result.current.cart.totalPrice).toBe(0)
  })

  it('should persist cart in localStorage', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    const book = {
      id: 1,
      title: 'Test Book',
      price: 100000,
      coverImage: { url: '/test.jpg' }
    }

    act(() => {
      result.current.addToCart(book)
    })

    // Simulate page reload by creating new hook instance
    const { result: newResult } = renderHook(() => useCart(), { wrapper })

    expect(newResult.current.cart.items).toHaveLength(1)
    expect(newResult.current.cart.totalItems).toBe(1)
    expect(newResult.current.cart.totalPrice).toBe(100000)
  })
}) 