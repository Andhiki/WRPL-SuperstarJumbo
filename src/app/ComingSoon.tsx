import { Book, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ComingSoon() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-white to-blue-50">
      <div className="text-center space-y-8">
        <div className="flex justify-center gap-4">
          <Book className="h-16 w-16 text-blue-600" />
          <Clock className="h-16 w-16 text-blue-600 animate-pulse" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900">Segera Hadir!</h1>
        
        <div className="space-y-4">
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Kami sedang menyiapkan koleksi buku terbaik untuk Anda.
            Nantikan kehadiran kami!
          </p>
          
          <p className="text-sm text-gray-500">
            Ingin mendapatkan notifikasi saat kami hadir?
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline">
            <Link href="/">
              Kembali ke Beranda
            </Link>
          </Button>
          <Button>
            Beritahu Saya
          </Button>
        </div>
      </div>
    </main>
  )
}