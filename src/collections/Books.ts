import type { CollectionConfig } from 'payload'

export const Books: CollectionConfig = {
  slug: 'books', // Nama koleksi di API
  labels: {
    singular: 'Book',
    plural: 'Books',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'description', 'price', 'stock', 'category'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'author',
      label: 'Author',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'stock',
      label: 'Stock',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'coverImage',
      label: 'Cover Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'createdAt',
      label: 'Created At',
      type: 'date',
      admin: { position: 'sidebar' },
      defaultValue: () => new Date().toISOString(),
    },
  ],
};
