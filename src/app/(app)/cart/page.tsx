'use client'

import { useCart } from '@/hooks/useCart'
import NavbarResolver from '@/components/navbar-resolver'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Trash2 } from 'lucide-react'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart()

  if (cart.items.length === 0) {
    return (
      <main className="relative">
        <NavbarResolver />
        <div className="container mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
          <div className="text-center py-12">
            <p className="text-xl mb-4">Your cart is empty</p>
            <Link href="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative">
      <NavbarResolver />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cart.items.map(item => (
              <div
                key={item.id}
                className="flex gap-4 border-b py-4 last:border-b-0"
              >
                <div className="relative w-24 h-32">
                  <Image
                    src={item.coverImage?.url || '/placeholder.jpg'}
                    alt={item.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <Link
                    href={`/buku/${item.id}`}
                    className="text-lg font-semibold hover:underline"
                  >
                    {item.title}
                  </Link>
                  <p className="text-gray-600">
                    Rp{item.price.toLocaleString('id-ID')}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.bookId, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.bookId, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.bookId)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    Rp{(item.price * item.quantity).toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rp{cart.totalPrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>Rp{cart.totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
              <Link href="/checkout">
                <Button className="w-full">Proceed to Checkout</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 