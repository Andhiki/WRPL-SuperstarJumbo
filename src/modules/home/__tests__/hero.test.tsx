import { render, screen } from '@testing-library/react'
import Hero from '../hero'

describe('Hero Component', () => {
  it('renders the hero section with correct content', () => {
    render(<Hero />)
    
    // Check for main heading
    expect(screen.getByText(/Temukan/i)).toBeInTheDocument()
    expect(screen.getByText(/Buku Favoritmu/i)).toBeInTheDocument()
    expect(screen.getByText(/BookStore/i)).toBeInTheDocument()
    
    // Check for description
    expect(screen.getByText(/Ribuan koleksi buku terbaik/i)).toBeInTheDocument()
    
    // Check for CTA buttons
    expect(screen.getByText(/Belanja Sekarang/i)).toBeInTheDocument()
    expect(screen.getByText(/Pelajari Lebih Lanjut/i)).toBeInTheDocument()
  })

  it('renders the background image', () => {
    render(<Hero />)
    const backgroundImage = screen.getByAltText('Books Illustration')
    expect(backgroundImage).toBeInTheDocument()
  })

  it('has correct styling classes', () => {
    render(<Hero />)
    const section = screen.getByRole('region')
    expect(section).toHaveClass('relative', 'w-full', 'min-h-[80vh]')
  })
}) 