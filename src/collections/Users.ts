import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    // Mencegah pembuatan user baru dari mana saja
    create: () => false,
  },
  fields: [
    // Field email sudah ada secara default
  ],
}
