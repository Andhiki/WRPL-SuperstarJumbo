'use client'

import NavbarResolver from '@/components/navbar-resolver'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutSuccessPage() {
  return (
    <main className="relative">
      <NavbarResolver />
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Pesanan Berhasil!</h1>
          <p className="text-gray-600 mb-8">
            Terima kasih telah berbelanja. Kami telah mengirimkan email konfirmasi
            dengan detail pesanan dan instruksi pembayaran Anda.
          </p>
          <div className="space-x-4">
            <Link href="/">
              <Button>Lanjut Belanja</Button>
            </Link>
            <Link href="/orders">
              <Button variant="outline">Lihat Pesanan</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
} 