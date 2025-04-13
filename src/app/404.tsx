import Link from 'next/link'
import { Book } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center space-y-6">
        <Book className="mx-auto h-24 w-24 text-blue-600 animate-bounce" />
        <h1 className="text-4xl font-bold text-gray-900">Halaman Tidak Ditemukan</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin buku yang Anda cari sudah dipinjam?
        </p>
        <Button asChild className="mt-8">
          <Link href="/">
            Kembali ke Beranda
          </Link>
        </Button>
      </div>
    </main>
  )
}