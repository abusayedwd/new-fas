import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * shadcn-style Button with a few luxury variants.
 * Variants: "primary" (rose-gold gradient), "ghost" (glass), "link"
 */
const Button = forwardRef(function Button(
  { className, variant = 'primary', size = 'md', children, ...props },
  ref
) {
  const variants = {
    primary: 'btn-luxury',
    ghost: 'btn-ghost-luxury',
    link:
      'text-rosegold-300 dark:text-rosegold-100 underline-offset-4 hover:underline transition-colors',
  }

  const sizes = {
    sm: 'text-xs px-5 py-2.5',
    md: '',
    lg: 'text-base px-9 py-4',
  }

  return (
    <button
      ref={ref}
      className={cn(variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
})

export default Button
