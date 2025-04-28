"use client"

import { Book, Menu } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { name: 'Kategori', href: '/kategori' },
  { name: 'Bestseller', href: '/bestseller' },
  { name: 'Tentang Kami', href: '/tentang' },
]

const Navbar = () => {
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      'fixed top-0 left-0 w-full bg-white transition-transform duration-300 ease-in-out z-50 rounded-b-2xl shadow-md',
      isSticky ? 'sm:rounded-full sm:max-w-screen-2xl flex-col py-4 sm:px-8 mx-auto sm:left-0 sm:right-0 sm:top-7 2xl:top-8 sm:scale-95' : 'py-6 scale-100'
    )}>
      <div className='container mx-auto flex items-center justify-between px-4 transition-all duration-300'>
        {/* Logo */}
        <Link href='/' className='flex justify-start items-center gap-2 transition-all duration-300 hover:scale-105'>
          {/* <Image src='/logo.png' alt='BookStore Logo' width={40} height={40} /> */}
          <Book />
          <h1 className='xs:block hidden'>SuperstarJumbo Book Store</h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className='hidden md:flex gap-6'>
          {NAV_LINKS.map((nav, i) => (
            <Link key={i} href={nav.href} className={cn('text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-110', pathname === nav.href && 'font-bold')}>{nav.name}</Link>
          ))}
        </nav>
        
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger className='md:hidden'>
            <Menu size={24} />
          </SheetTrigger>
          <SheetContent side='right' className=''>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className='flex flex-col gap-4 mt-4'>
              {NAV_LINKS.map((nav, i) => (
                <SheetClose asChild key={i}>
                  <Link href={nav.href} className='text-lg transition-all duration-300 hover:scale-105'>{nav.name}</Link>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;