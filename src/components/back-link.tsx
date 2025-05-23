"use client";

import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BackLinkProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
}

const BackLink = ({ children, className, href = '#', onClick }: BackLinkProps) => {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onClick) {
      onClick()
    } else if (href === '#') {
      router.back()
    } else {
      router.push(href)
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        'flex items-center gap-2',
        className
      )}
      role="link"
      aria-label="Go back"
    >
      {children}
    </a>
  )
}

export default BackLink
