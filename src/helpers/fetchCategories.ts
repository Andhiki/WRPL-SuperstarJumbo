import { Category } from '@/types/category';

export async function getAllCategories(): Promise<Category[]> {
  const response = await fetch(`${process.env.API_URL}/api/category`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  const data = await response.json();
  return data;
}