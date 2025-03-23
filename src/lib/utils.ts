import { clsx, type ClassValue } from 'clsx'
import { ReadonlyURLSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createFilterUrl = (
  pathname: string,
  currentParams: URLSearchParams | ReadonlyURLSearchParams,
  updates: { q?: string | null; availability?: string | null; category?: string | null }
) => {
  const searchParams = new URLSearchParams(currentParams.toString());
  
  Object.entries(updates).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
  });

  const queryString = searchParams.toString();
  return `${pathname}${queryString ? '?' : ''}${queryString}`;
};