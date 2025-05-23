import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { getAllBooks } from "@/helpers/fetchBooks";
import { Book } from '@/types/book';
import Link from 'next/link'
import AddToCartButton from '@/components/add-to-cart-button';

const getBookImageUrl = (book: Book) => {
  // Check if book has coverImage property and it's an object
  if (!book.coverImage || typeof book.coverImage !== 'object') {
    return '/placeholder.jpg';
  }

  // Check if url exists on coverImage
  if (!('url' in book.coverImage)) {
    return '/placeholder.jpg';
  }

  return book.coverImage.url;
};

export default async function BookList() {
  const books = await getAllBooks();

  const formatPrice = (price: number) => {
    return price.toLocaleString('id-ID');
  };

  return (
    <section className="container mx-auto py-12">
      <h1 className="text-2xl font-bold text-center mb-6">Koleksi Buku</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <Card key={book.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={getBookImageUrl(book)}
                alt={book.title}
                fill
                className="object-cover rounded-t-lg"
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
                  <p className='text-lg font-semibold text-custom-blue'>Rp{formatPrice(book.price)}</p>
                  
                  <p className={`text-sm ${book.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                    {book.stock > 0 ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
                
                <div className="mt-auto pt-4 space-y-2">
                  <Link href={`/buku/${book.slug}`} className="block">
                    <Button 
                      className="w-full gap-2 hover:scale-105 transition-transform"
                      variant="outline"
                    >
                      View Details
                    </Button>
                  </Link>
                  {book.stock > 0 && (
                    <AddToCartButton book={book} />
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}