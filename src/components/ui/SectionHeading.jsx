import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Reusable section heading with eyebrow + serif title + ornament.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}) {
  const alignment =
    align === 'center'
      ? 'text-center items-center'
      : 'text-left items-start'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={cn('flex flex-col gap-4 mb-14', alignment, className)}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="heading-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-warmbrown-400 dark:text-cream-100 max-w-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="font-script text-2xl sm:text-3xl text-rosegold-300 dark:text-rosegold-100 max-w-2xl">
          {subtitle}
        </p>
      )}
      {align === 'center' && (
        <div className="flex items-center gap-2 mt-3 opacity-70">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-rosegold-200" />
          <span className="text-rosegold-300">✦</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-rosegold-200" />
        </div>
      )}
    </motion.div>
  )
}
