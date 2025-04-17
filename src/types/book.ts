export interface CoverImage {
  id: number;
  url: string;
  alt?: string;
  filename: string;
}

export interface Book {
  id: number;
  title: string;
  slug: string;
  author: string | { name: string };
  description: string;
  price: number;
  stock: number;
  coverImage?: CoverImage;
  category: { name: string } | string;
  createdAt: string;
  updatedAt: string;
}
