import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { getAllBooks } from "@/helpers/fetchBooks";
import { Book } from '@/types/book';

const getBookImageUrl = (book: Book) => {
  // Check if book has coverImage property and it's an object
  if (!book.coverImage || typeof book.coverImage !== 'object') {
    return '/placeholder.jpg';
  }

  // Check if url exists on coverImage
  if (!('url' in book.coverImage)) {
    return '/placeholder.jpg';
  }

  const imageUrl = book.coverImage.url;
  
  // If the URL is already absolute (starts with http:// or https://), return it as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // For relative URLs, check environment and prepend base URL if needed
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? process.env.NEXT_PUBLIC_API_URL || 'https://superstar-jumbo.vercel.app'
    : '';
    
  return `${baseUrl}${imageUrl}`;
};

export default async function BookList() {
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const books = await getAllBooks();

  return (
    <section className='container mx-auto py-12 px-4'>
      <h2 className='text-2xl font-bold text-center mb-6'>Koleksi Buku</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {books.map((book) => (
          <Card key={book.id} className='overflow-hidden shadow-lg flex flex-col h-full'>
          {/* Image container dengan ukuran tetap */}
          <div className='relative w-full h-60'>
            <Image 
              src={getBookImageUrl(book)}
              alt={book.title || 'Book cover'} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className='rounded-t-lg object-cover' 
            />
          </div>
          <div className='flex flex-col flex-1'>
            {/* Title area dengan height yang dapat menyesuaikan tapi minimal sama tinggi */}
            <div className='min-h-20 flex items-center px-4 pt-4 pb-2'>
              <h3 className='text-lg font-semibold line-clamp-2'>{book.title}</h3>
            </div>
            
            {/* Content area */}
            <div className='px-4 pb-4 flex-1 flex flex-col'>
              <div className='space-y-2'>
                <p className='text-sm text-gray-600'>By {typeof book.author === 'object' ? book.author.name : book.author}</p>
                <p className='text-lg font-semibold text-custom-blue'>Rp{formatPrice(book.price)}</p>
                <p className='text-sm text-gray-500'>
                  Category: {typeof book.category === 'object' ? book.category.name : (book.category || "Unknown")}
                </p>
                <p className={`text-sm ${book.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                  {book.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
              </div>
              
              <div className="mt-auto pt-4">
                <Button 
                  className="w-full gap-2 hover:scale-105 transition-transform"
                  disabled={book.stock <= 0}
                  variant={book.stock > 0 ? "default" : "secondary"}
                >
                  <ShoppingCart className="h-4 w-4" />
                  {book.stock > 0 ? "Beli Sekarang" : "Stok Habis"}
                </Button>
              </div>
            </div>
          </div>
        </Card>
        ))}
      </div>
    </section>
  );
}