import { getPayload } from 'payload';
import config from '@payload-config';

export const payload = await getPayload({ config });

/**
 * Fetch all books
 */
export const getAllBooks = async () => {
  try {
    const books = await payload.find({ collection: 'books' });
    return books.docs;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};

/**
 * Fetch a single book by slug
 * @param slug - The book slug
 */
export const getBookBySlug = async (slug: string) => {
  try {
    const book = await payload.find({
      collection: 'books',
      where: { slug: { equals: slug } },
    });
    return book.docs[0] || null;
  } catch (error) {
    console.error(`Error fetching book with slug ${slug}:`, error);
    return null;
  }
};
