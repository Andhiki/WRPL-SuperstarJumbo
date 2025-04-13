export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-500/50 to-indigo-600/50 text-black">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Temukan Buku Favoritmu di <span className="text-indigo-600">BookStore</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Ribuan koleksi buku terbaik untuk menemani hari-harimu.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <a
            href="#shop"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-400 transition"
          >
            Belanja Sekarang
          </a>
          <a
            href="#about"
            className="px-6 py-3 border border-white font-semibold rounded-lg shadow-md bg-white  hover:text-gray-900 hover:bg-slate-200 transition"
          >
            Pelajari Lebih Lanjut
          </a>
        </div>
      </div>
    </section>
  );
}

// 'use client'

// import Container from '@/components/container'
// import { Button } from '@/components/ui/button'
// import Image from 'next/image'

// const scrollToSection = (id: string) => {
//   document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
// };

// const Hero = () => {
//   return (
//     <main className='relative min-h-screen'>
//       <Container className='relative z-20 flex h-screen max-w-screen-md flex-col items-center justify-center gap-3 *:text-center top-0 bottom-0 my-auto'>
//         <h1 className='font-playfair text-[28px] sm:text-3xl md:text-4xl font-bold text-white xl:text-6xl'>
//           Finest Addition for Your Furniture Collection
//         </h1>
//         <p className='mb-4 text-xs sm:text-sm sm:text-md text-white'>
//           Collections of premium artisan galleries that bring expression and culture to your home
//         </p>
//         <Button
//           variant={`secondary`}
//           className='text-base text-black'
//           onClick={() => scrollToSection("targetSection")}
//         >
//           See Our Collections
//         </Button>
//       </Container>

//       <Image
//         src={`/assets/home/hero-bg.webp`}
//         alt='Renjana Furniture'
//         fill
//         sizes='100%'
//         className='z-0 object-cover'
//       />
//     </main>
//   )
// }

// export default Hero
