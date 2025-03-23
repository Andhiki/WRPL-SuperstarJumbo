'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { createFilterUrl } from '@/lib/utils'

const OPTIONS = [
  { title: 'In Stock', slug: 'available' },
  { title: 'Out of Stock', slug: 'unavailable' },
]

const AvailableFilter = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || null
  const category = searchParams.get('category') || null
  const availability = searchParams.get('availability') || null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='border-2 flex w-full sm:w-auto font-normal justify-center items-end'>
          Availability <ChevronDown className='ml-1.5 h-4 w-4 self-baseline' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link
          href={createFilterUrl(pathname, searchParams, { availability: null })}
          replace
          className={`${availability === null && 'font-bold'}`}
        >
          <DropdownMenuItem>All</DropdownMenuItem>
        </Link>
        {OPTIONS.map((option, i) => (
          <Link
            href={createFilterUrl(pathname, searchParams, {
              q,
              category,
              availability: option.slug,
            })}
            key={i}
            replace
            className={`${availability === option.slug && 'font-bold'}`}
          >
            <DropdownMenuItem>{option.title}</DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AvailableFilter
