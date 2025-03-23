export interface Book {
  id: number;
  title: string;
  slug: string;
  description?: string;
  author: string;
  price: number;
  stock: number;
  publishedDate?: string; // ISO date format (YYYY-MM-DD)
  category?: string;
  coverImage?: string; // URL of the book cover
  createdAt: string;
  updatedAt: string;
}
