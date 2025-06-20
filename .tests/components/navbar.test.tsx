import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '@/components/navbar';
import { usePathname } from 'next/navigation';

// Mock hook dan komponen eksternal
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('@/components/cart-sheet', () => () => (
  <div data-testid="cart-sheet" />
));

describe('Navbar', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders logo and navigation links', () => {
    render(<Navbar />);

    expect(screen.getByText('SuperstarJumbo Book Store')).toBeInTheDocument();
    expect(screen.getByText('Kategori')).toBeInTheDocument();
    expect(screen.getByText('Bestseller')).toBeInTheDocument();
    expect(screen.getByText('Tentang Kami')).toBeInTheDocument();
    expect(screen.getAllByTestId('cart-sheet').length).toBeGreaterThanOrEqual(1);
  });

  it('applies sticky class when scrolled', () => {
    Object.defineProperty(window, 'scrollY', { value: 150, writable: true });
    render(<Navbar />);
    fireEvent.scroll(window);

    const header = screen.getByRole('banner'); // <header> has implicit role="banner"
    expect(header.className).toMatch(/scale-95/); // sticky class
  });

  it('highlights active link when pathname matches', () => {
    (usePathname as jest.Mock).mockReturnValue('/bestseller');
    render(<Navbar />);
    const activeLink = screen.getByText('Bestseller');
    expect(activeLink).toHaveClass('font-bold');
  });

  it('renders correct hrefs on nav links', () => {
    render(<Navbar />);
    expect(screen.getByText('Kategori')).toHaveAttribute('href', '/kategori');
    expect(screen.getByText('Bestseller')).toHaveAttribute('href', '/bestseller');
    expect(screen.getByText('Tentang Kami')).toHaveAttribute('href', '/tentang');
  });

  it('simulates navigation click (no route change)', async () => {
    render(<Navbar />);
    const user = userEvent.setup();
    const navLink = screen.getByText('Kategori');
    await user.click(navLink);
    expect(navLink).toHaveAttribute('href', '/kategori');
  });

  it('has navigation and cart button elements', () => {
    render(<Navbar />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getAllByTestId('cart-sheet').length).toBeGreaterThan(0);
  });
});
