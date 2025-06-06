import React from 'react'
import { render, screen } from '@testing-library/react'
import CategoryDetailPage from './page'
import * as fetchCategories from '@/helpers/fetchCategories'


jest.mock('next/link', () => ({ children, href }: any) => <a href={href}>{children}</a>)

describe('CategoryDetailPage', () => {
  const mockCategory = { name: 'Fiksi', slug: 'fiksi' }
  const mockBooks = [
    { id: 1, title: 'Book 1', slug: 'book-1', price: 10000, stock: 5 },
    { id: 2, title: 'Book 2', slug: 'book-2', price: 20000, stock: 2 },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders category and books when category exists', async () => {
    jest.spyOn(fetchCategories, 'getCategoryBySlug').mockResolvedValueOnce(mockCategory)
    jest.spyOn(fetchCategories, 'getBooksByCategory').mockResolvedValueOnce(mockBooks)

    // params is a Promise<{ kategori: string }>
    const params = Promise.resolve({ kategori: 'fiksi' })

    render(<CategoryDetailPage params={params} />)

    // Wait for category name and book titles to appear
    expect(await screen.findByText(/Buku dalam Kategori: Fiksi/i)).toBeInTheDocument()
    expect(await screen.findByText('Book 1')).toBeInTheDocument()
    expect(await screen.findByText('Book 2')).toBeInTheDocument()
    expect(fetchCategories.getBooksByCategory).toHaveBeenCalledWith('fiksi')
  })

  it('renders not found message when category does not exist', async () => {
    jest.spyOn(fetchCategories, 'getCategoryBySlug').mockResolvedValueOnce(null)
    const getBooksSpy = jest.spyOn(fetchCategories, 'getBooksByCategory')

    const params = Promise.resolve({ kategori: 'nonexistent' })

    render(<CategoryDetailPage params={params} />)

    expect(await screen.findByText(/Kategori tidak ditemukan/i)).toBeInTheDocument()
    expect(await screen.findByText(/Slug yang dicari: nonexistent/i)).toBeInTheDocument()
    expect(getBooksSpy).not.toHaveBeenCalled()
  })
})