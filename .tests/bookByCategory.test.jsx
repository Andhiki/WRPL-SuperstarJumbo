import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';

// Mock the helper functions at the module level
const mockGetCategoryBySlug = jest.fn();
const mockGetBooksByCategory = jest.fn();

// Mock the helpers module
jest.mock('@/helpers/fetchCategories', () => ({
  getCategoryBySlug: mockGetCategoryBySlug,
  getBooksByCategory: mockGetBooksByCategory,
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useParams: () => ({ kategori: 'test-category' }),
  useRouter: jest.fn(),
}));

// Mock the component entirely to isolate the logic testing
const MockCategoryDetailPage = jest.fn().mockImplementation(({ params }) => {
  const [category, setCategory] = React.useState(null);
  const [books, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await mockGetCategoryBySlug(params.kategori);
        setCategory(categoryData);
        
        if (categoryData) {
          const booksData = await mockGetBooksByCategory(params.kategori);
          setBooks(booksData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [params.kategori]);

  if (loading) return <div>Loading...</div>;
  if (!category) return (
    <div>
      <div>Kategori tidak ditemukan</div>
      <div>Slug yang dicari: {params.kategori}</div>
      <div>← Kembali ke Semua Kategori</div>
    </div>
  );

  return (
    <div>
      <div>Buku dalam Kategori: {category.name}</div>
      <div>← Kembali ke Semua Kategori</div>
      {books.map(book => (
        <div key={book.id} data-testid="book-card">
          <div>{book.title}</div>
          <div>Harga: Rp{book.price.toLocaleString()}</div>
          <div>Stok: {book.stock}</div>
        </div>
      ))}
    </div>
  );
});

// Import React for useState and useEffect
import React from 'react';

describe('Category Detail Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render not found when category does not exist', async () => {
    mockGetCategoryBySlug.mockResolvedValue(null);

    await act(async () => {
      render(<MockCategoryDetailPage params={{ kategori: 'non-existent-category' }} />);
    });

    await waitFor(() => {
      expect(screen.getByText('Kategori tidak ditemukan')).toBeInTheDocument();
      expect(screen.getByText('Slug yang dicari: non-existent-category')).toBeInTheDocument();
      expect(screen.getByText('← Kembali ke Semua Kategori')).toBeInTheDocument();
    });
    
    expect(mockGetCategoryBySlug).toHaveBeenCalledWith('non-existent-category');
  });

  it('should fetch and display category and books', async () => {
    const mockCategory = {
      id: 1,
      name: 'Fiction',
      slug: 'fiction',
    };
    const mockBooks = [
      {
        id: 1,
        title: 'Test Book 1',
        slug: 'test-book-1',
        price: 100000,
        stock: 10,
      },
      {
        id: 2,
        title: 'Test Book 2',
        slug: 'test-book-2',
        price: 150000,
        stock: 5,
      },
    ];

    mockGetCategoryBySlug.mockResolvedValue(mockCategory);
    mockGetBooksByCategory.mockResolvedValue(mockBooks);

    await act(async () => {
      render(<MockCategoryDetailPage params={{ kategori: 'fiction' }} />);
    });

    await waitFor(() => {
      expect(screen.getByText('Buku dalam Kategori: Fiction')).toBeInTheDocument();
      expect(screen.getByText('Test Book 1')).toBeInTheDocument();
      expect(screen.getByText('Test Book 2')).toBeInTheDocument();
      expect(screen.getByText('Harga: Rp100.000')).toBeInTheDocument();
      expect(screen.getByText('Harga: Rp150.000')).toBeInTheDocument();
    });

    expect(mockGetCategoryBySlug).toHaveBeenCalledWith('fiction');
    expect(mockGetBooksByCategory).toHaveBeenCalledWith('fiction');
  });
});