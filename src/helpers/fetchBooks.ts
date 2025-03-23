import { getPayload } from 'payload';
import config from '@payload-config';
import { Book } from '@/types/book';

export const payload = await getPayload({ config });

export const getAllBooks = async (): Promise<Book[]> => {
  try {
    const books = await payload.find({ collection: 'books' });
    return books.docs as unknown as Book[];
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};

export const getBookBySlug = async (slug: string): Promise<Book | null> => {
  try {
    const book = await payload.find({
      collection: 'books',
      where: { slug: { equals: slug } },
    });
    return (book.docs[0] as unknown as Book) || null;
  } catch (error) {
    console.error(`Error fetching book with slug ${slug}:`, error);
    return null;
  }
};
