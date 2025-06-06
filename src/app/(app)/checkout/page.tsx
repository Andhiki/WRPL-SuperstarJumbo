'use client'

import { useCart } from '@/hooks/useCart'
import NavbarResolver from '@/components/navbar-resolver'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  if (cart.items.length === 0) {
    return (
      <main className="relative">
        <NavbarResolver />
        <div className="container mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          <div className="text-center py-12">
            <p className="text-xl mb-4">Keranjang belanja Anda kosong</p>
            <Button onClick={() => router.push('/')}>Lanjut Belanja</Button>
          </div>
        </div>
      </main>
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsProcessing(true)

    // const formData = new FormData(e.currentTarget)
    // const orderData = {
    //   customerName: formData.get('name'),
    //   email: formData.get('email'),
    //   phone: formData.get('phone'),
    //   address: formData.get('address'),
    //   city: formData.get('city'),
    //   postalCode: formData.get('postalCode'),
    //   items: cart.items,
    //   totalAmount: cart.totalPrice,
    // }

    try {
      // Di sini nanti akan mengirim data ke backend
      // Untuk sementara kita simulasikan proses order
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Bersihkan cart dan redirect ke halaman sukses
      clearCart()
      router.push('/checkout/success')
    } catch (error) {
      console.error('Error processing order:', error)
      alert('Terjadi kesalahan saat memproses pesanan. Silakan coba lagi.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <main className="relative">
      <NavbarResolver />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Informasi Pengiriman</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input id="phone" name="phone" type="tel" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Alamat Lengkap</Label>
                  <Textarea id="address" name="address" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Kota</Label>
                    <Input id="city" name="city" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Kode Pos</Label>
                    <Input id="postalCode" name="postalCode" required />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Metode Pembayaran</h2>
                <div className="space-y-2">
                  <Label>Pilih Metode Pembayaran</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="bankTransfer"
                        name="paymentMethod"
                        value="bankTransfer"
                        defaultChecked
                        className="h-4 w-4"
                      />
                      <Label htmlFor="bankTransfer">Transfer Bank</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="eWallet"
                        name="paymentMethod"
                        value="eWallet"
                        className="h-4 w-4"
                      />
                      <Label htmlFor="eWallet">E-Wallet</Label>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isProcessing}
              >
                {isProcessing ? 'Memproses...' : 'Buat Pesanan'}
              </Button>
            </form>
          </div>

          <div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
              <div className="space-y-4">
                {cart.items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-20">
                      <Image
                        src={item.coverImage?.url || '/placeholder.jpg'}
                        alt={item.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-gray-600">Jumlah: {item.quantity}</p>
                      <p className="font-semibold">
                        Rp{(item.price * item.quantity).toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rp{cart.totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pengiriman</span>
                    <span>Gratis</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>Rp{cart.totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 