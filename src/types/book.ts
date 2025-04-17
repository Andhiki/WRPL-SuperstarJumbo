export interface BookCoverImage {
  id: number;
  url: string;
  alt?: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
}

export interface Book {
  id: number;
  title: string;
  author: string | { name: string };
  description: string;
  price: number;
  stock: number;
  coverImage: BookCoverImage;
  category: { name: string } | string;
  createdAt: string;
  updatedAt: string;
}
