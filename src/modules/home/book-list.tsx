import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { getAllBooks } from "@/helpers/fetchBooks";
import { Book } from '@/types/book';

export default async function BookList() {
  const books = await getAllBooks();

  return (
    <section className='container mx-auto py-12 px-4'>
      <h2 className='text-2xl font-bold text-center mb-6'>Koleksi Buku</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {books.map((book) => (
          <Card key={book.id} className='overflow-hidden shadow-lg'>
            <div className='relative w-full h-60'>
              <Image 
                src={`/media/cover-${book.title}.jpg`} 
                alt={book.title} 
                fill
                objectFit='cover' 
                className='rounded-t-lg' 
              />
            </div>
            <CardHeader>
              <CardTitle className='text-lg'>{book.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-gray-600'>By {typeof book.author === 'object' ? book.author.name : book.author}</p>
              <p className='text-lg font-semibold text-custom-blue'>${book.price}</p>
              <p className='text-sm text-gray-500'>
                Category: {typeof book.category === 'object' ? book.category.name : (book.category || "Unknown")}
              </p>
              <p className={`text-sm mt-2 ${book.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                {book.stock > 0 ? "In Stock" : "Out of Stock"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}