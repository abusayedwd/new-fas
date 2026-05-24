import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Glass card primitive used across sections.
 */
const Card = forwardRef(function Card(
  { className, glow = false, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'glass-card p-7 sm:p-9 transition-all duration-500',
        glow && 'hover:shadow-glow',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

export default Card
