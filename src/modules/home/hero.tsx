'use client'

import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-blue-500/60 to-indigo-700/80 overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-lg">
          Temukan <span className="text-yellow-300">Buku Favoritmu</span> di <span className="text-indigo-200">BookStore</span>
        </h1>
        <p className="mt-6 text-lg md:text-2xl text-white/90 font-medium drop-shadow">
          Ribuan koleksi buku terbaik, siap menemani hari-harimu. Diskon spesial & pengiriman cepat!
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold shadow-lg px-8 py-4 text-lg">
            Belanja Sekarang
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-black hover:bg-white hover:text-indigo-700 font-bold px-8 py-4 text-lg"
          >
            Pelajari Lebih Lanjut
          </Button>
        </div>
      </div>
    </section>
  )
}