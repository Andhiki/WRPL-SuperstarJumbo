import { getPayload } from 'payload';
import config from '@payload-config';

export const payload = await getPayload({ config });

export const reduceBookStock = async (bookId: string, quantity: number) => {
  try {
    // Fetch the current stock
    const book = await payload.findByID({
      collection: 'books',
      id: bookId,
    });

    if (!book) {
      throw new Error('Book not found');
    }

    if (book.stock < quantity) {
      throw new Error('Not enough stock available');
    }

    // Update the stock
    const updatedBook = await payload.update({
      collection: 'books',
      id: bookId,
      data: {
        stock: book.stock - quantity,
      },
    });

    return updatedBook;
  } catch (error) {
    console.error(`Error reducing stock for book ${bookId}:`, error);
    throw error;
  }
};
