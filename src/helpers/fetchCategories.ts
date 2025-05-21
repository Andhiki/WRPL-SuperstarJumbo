import { getPayload } from 'payload';
import config from '@payload-config';
import type { Category } from '@/types/category';
import type { Book } from '@/types/book';

// Initialize Payload instance
const payload = await getPayload({ config });

// Get all categories
export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const categories = await payload.find({ 
      collection: 'categories',
      limit: 100
    });
    return categories.docs as unknown as Category[];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Get category by slug (case-insensitive)
export const getCategoryBySlug = async (slug: string) => {
  try {
    const result = await payload.find({
      collection: 'categories',
      where: { 
        slug: { 
          equals: slug.toLowerCase() 
        } 
      },
      limit: 1,
      depth: 1,
    });
    return result.docs[0] ?? null;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
};

// Get books by category slug
export const getBooksByCategory = async (categorySlug: string): Promise<Book[]> => {
  try {
    const result = await payload.find({
      collection: 'books',
      where: {
        'category.slug': {
          equals: categorySlug.toLowerCase()
        }
      },
      depth: 2,
      limit: 100
    });
    return result.docs as Book[];
  } catch (error) {
    console.error(`Error fetching books for category "${categorySlug}":`, error);
    return [];
  }
};