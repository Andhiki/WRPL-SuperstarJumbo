export default function Hero() {
  return (
    <>
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div>
            <h2 className="text-xl font-semibold">BookStore</h2>
            <p className="mt-2 text-gray-400">Tempat terbaik untuk menemukan buku favoritmu.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Navigasi</h3>
            <ul className="mt-2 space-y-2">
              <li><a href="#shop" className="hover:text-yellow-400">Belanja</a></li>
              <li><a href="#about" className="hover:text-yellow-400">Tentang Kami</a></li>
              <li><a href="#contact" className="hover:text-yellow-400">Kontak</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Ikuti Kami</h3>
            <div className="mt-2 flex justify-center md:justify-start space-x-4">
              <a href="#" className="hover:text-yellow-400">Facebook</a>
              <a href="#" className="hover:text-yellow-400">Twitter</a>
              <a href="#" className="hover:text-yellow-400">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} BookStore. All rights reserved.
        </div>
      </footer>
    </>
  );
}
