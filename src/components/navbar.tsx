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
  { name: 'Beranda', href: '/' },
  { name: 'Kategori', href: '/categories' },
  { name: 'Bestseller', href: '/bestseller' },
  { name: 'Tentang Kami', href: '/about' },
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
      'fixed top-0 left-0 w-full bg-white transition-all duration-300 ease-in-out z-50 rounded-b-2xl shadow-md',
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
          <SheetContent side='right'>
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
            <SheetFooter className='mt-6'>
              <Button variant='outline' className='w-full transition-all duration-300 hover:scale-105'>Login</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;


// 'use client'

// import { ChevronRight, Menu } from 'lucide-react'
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from '@/components/ui/sheet'
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '@/components/ui/accordion'
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from '@/components/ui/navigation-menu'
// import Link from 'next/link'
// import { cn } from '@/lib/utils'
// import Container from './container'
// import Image from 'next/image'
// import { usePathname } from 'next/navigation'
// import { Button } from './ui/button'

// const NAV_LINKS = [
//   {
//     name: 'Products',
//     subLinks: [
//       {
//         name: 'Marble',
//         bold: true,
//         href: '/collections/marble',
//       },
//       {
//         name: 'River Stone',
//         bold: true,
//         href: '/collections/river-stone',
//       },
//       {
//         name: 'Wood',
//         bold: true,
//         href: '/collections/wood',
//       },
//       {
//         name: 'Bathroom Set',
//         bold: false,
//         href: '/collections/bathroom-set',
//       },
//       {
//         name: 'Kitchen Set',
//         bold: false,
//         href: '/collections/kitchen-set',
//       },
//       {
//         name: 'Decoration and Accessories',
//         bold: false,
//         href: '/collections/decoration-and-accessories',
//       },
//       {
//         name: 'Exterior',
//         bold: false,
//         href: '/collections/exterior',
//       },
//     ],
//   },
//   {
//     name: 'Our Warehouse',
//     href: '/warehouse',
//   },
//   {
//     name: 'Catalogue',
//     href: '/catalogue',
//   },
// ]

// const Navbar = () => {
//   const pathname = usePathname();

//   return (
//     <Container className='fixed left-1/2 top-1 z-50 -translate-x-1/2 sm:top-3 2xl:top-4'>
//       <nav className='flex h-14 w-full items-center justify-between rounded-2xl bg-background px-4 py-2 shadow-xl sm:rounded-full'>
//         {/* logo + title */}
//         <section className='flex items-center gap-2'>
//           <Image
//             src={`/logo/logo.webp`}
//             alt='Renjana Furniture Logo'
//             width={32}
//             height={32}
//             className='aspect-[147/223] h-8 w-auto object-contain'
//           />
//           <Link href={`/`} className='font-playfair font-bold text-black'>
//             Renjana Furniture
//           </Link>
//         </section>

//         {/* navigation links */}
//         <DesktopNavigation pathname={pathname} />
//         <MobileNavigation />
//       </nav>
//     </Container>
//   )
// }

// const DesktopNavigation = ({ pathname }: { pathname: string | null }) => (
//   <nav className='hidden items-center gap-4 md:flex'>
//     <NavigationMenu>
//       <NavigationMenuList className='flex gap-4'>
//         {NAV_LINKS.map((nav, i) =>
//           nav.subLinks ? (
//             <NavigationMenuItem key={i}>
//               <NavigationMenuTrigger
//                 className={cn(
//                   'rounded-md px-1 text-base transition duration-300',
//                   pathname?.includes('collections')
//                     ? 'actived-navbar text-[#D66A39]'
//                     : 'hover:text-[#D66A39] transition duration-1200 ease-in-out highlighted-navbar'
//                 )}
//               >
//                 {nav.name}
//               </NavigationMenuTrigger>
//               <NavigationMenuContent className='bg-gradient-to-r from-custom-brown-dark to-custom-brown-light p-8 text-white'>
//                 <section className='flex w-[85vw] items-center justify-between gap-24 2xl:w-[1350px]'>
//                   <h1 className='w-full font-bold'>
//                     Renjana Product Collection
//                   </h1>
//                   <ul className='grid grid-flow-col grid-rows-3 gap-4 *:ml-8'>
//                     {nav.subLinks.map((link, j) => (
//                       <NavigationMenuLink key={j} asChild>
//                         <Link
//                           href={link.href}
//                           className={`${link.bold && 'font-semibold'} shrink-0 text-nowrap underline-offset-4 hover:underline`}
//                         >
//                           {link.name}
//                         </Link>
//                       </NavigationMenuLink>
//                     ))}
//                   </ul>
//                 </section>
//               </NavigationMenuContent>
//             </NavigationMenuItem>
//           ) : (
//             <NavigationMenuItem key={i} className='group relative'>
//               <Link href={nav.href} legacyBehavior passHref>
//                 <NavigationMenuLink
//                   className={cn(
//                     navigationMenuTriggerStyle(),
//                     `relative px-1 text-base transition duration-300 highlighted-navbar ${
//                       pathname === nav.href
//                         ? 'actived-navbar text-[#D66A39]'
//                         : 'hover:text-[#D66A39] transition duration-500 ease-in-out'
//                     }`
//                   )}
//                 >
//                   {nav.name}
//                 </NavigationMenuLink>
//               </Link>
//             </NavigationMenuItem>
//           )
//         )}
//         <Link href={`/contact`} passHref>
//           <Button className='text-base'>Contact Us</Button>
//         </Link>
//       </NavigationMenuList>
//     </NavigationMenu>
//   </nav>
// )

// const MobileNavigation = () => (
//   <nav className='flex items-center gap-4 md:hidden'>
//     <Sheet>
//       <SheetTrigger>
//         <Menu size={24} className='text-black' />
//       </SheetTrigger>

//       <SheetContent className='flex h-full flex-col justify-center p-0 *:text-start'>
//         <Image
//           src={`/logo/logo.webp`}
//           alt='Renjana Furniture Logo'
//           width={32}
//           height={32}
//           sizes='100%'
//           className='absolute right-16 top-5 aspect-auto h-7 w-auto'
//         />

//         <SheetHeader className='mx-4 mb-4 space-y-0'>
//           <SheetTitle>Renjana Furniture</SheetTitle>
//           <SheetDescription></SheetDescription>
//         </SheetHeader>

//         {/* main nav links */}
//         <section className='flex flex-col gap-6'>
//           {NAV_LINKS.map((nav, i) =>
//             nav.subLinks ? (
//               <Accordion
//                 key={i}
//                 type='single'
//                 collapsible
//                 className='w-full text-black'
//               >
//                 <AccordionItem value='item-1' className='w-full'>
//                   <AccordionTrigger className='ml-10 mr-4 py-0 text-base'>
//                     {nav.name}
//                   </AccordionTrigger>
//                   <AccordionContent className='to mt-3 flex flex-col gap-2 bg-gradient-to-r from-custom-brown-dark to-custom-brown-light p-3 text-white'>
//                     {nav.subLinks.map((link, i) => (
//                       <SheetClose asChild key={i}>
//                         <Link
//                           href={link.href}
//                           className={`${link.bold && 'font-semibold'}`}
//                         >
//                           {link.name}
//                           {(i + 1) % 3 === 0 && i !== 0 && (
//                             <div className='h-8' />
//                           )}
//                         </Link>
//                       </SheetClose>
//                     ))}
//                   </AccordionContent>
//                 </AccordionItem>
//               </Accordion>
//             ) : (
//               <SheetClose asChild key={i}>
//                 <Link
//                   href={nav.href}
//                   className='ml-10 mr-4 flex justify-between text-black'
//                 >
//                   {nav.name}
//                   <ChevronRight className='h-6 w-6 shrink-0 text-black' />
//                 </Link>
//               </SheetClose>
//             )
//           )}
//         </section>

//         {/* footer */}
//         <SheetFooter className='absolute bottom-10 left-6 right-6'>
//           <SheetClose asChild>
//             <Button size={`lg`}>Contact Us</Button>
//           </SheetClose>
//         </SheetFooter>
//       </SheetContent>
//     </Sheet>
//   </nav>
// )

// export default Navbar
