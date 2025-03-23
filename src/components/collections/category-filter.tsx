'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { createFilterUrl } from '@/lib/utils'
import { Category } from '@/payload-types'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Button } from '../ui/button'

type CategoryFilterProps = {
  filterOptions: Category[]
}

const CategoryFilter = (props: CategoryFilterProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || null
  const availability = searchParams.get('availability') || null
  const category = searchParams.get('category') || null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='border-2 flex w-full sm:w-auto font-normal justify-center items-end'>
          Category <ChevronDown className='ml-1.5 h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link
          href={createFilterUrl(pathname, searchParams, {
            category: null,
          })}
          replace
          className={`${category === null && 'font-bold'}`}
        >
          <DropdownMenuItem>All</DropdownMenuItem>
        </Link>
        {props.filterOptions.map((option, i) => (
          <Link
            href={createFilterUrl(pathname, searchParams, {
              q,
              availability,
              category: option.slug,
            })}
            key={i}
            replace
            className={`${category === option.slug && 'font-bold'}`}
          >
            <DropdownMenuItem>{option.title}</DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CategoryFilter
