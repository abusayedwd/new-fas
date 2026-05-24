import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes safely.
 * Used by all shadcn-style components.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number with a leading zero (for the love counter).
 */
export function pad(num) {
  return String(num).padStart(2, '0')
}
