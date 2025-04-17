import { getPayload } from 'payload';
import config from '@payload-config';
import { Category } from '@/types/category';

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