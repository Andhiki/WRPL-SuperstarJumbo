import { getPayload } from 'payload';
import config from '@payload-config';
import { Category } from '@/types/category';
import {Book} from '@/types/book';

export const payload = await getPayload({ config });

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const categories = await payload.find({ collection: 'categories' });
    return categories.docs as unknown as Category[];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getCategoryBySlug = async (slug: string) => {
  try {
    const result = await payload.find({
      collection: 'categories',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1, // Important for relationships
    });
    return result.docs[0] ?? null;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
};

// Get books by category slug
export const getBooksByCategory = async (categorySlug: string) => {
  try {
    const result = await payload.find({
      collection: 'books',
      where: { 
        'category.slug': { equals: categorySlug } 
      },
      depth: 1, // Populates relationships
      limit: 100,
      sort: '-createdAt',
    });
    return result.docs;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};
