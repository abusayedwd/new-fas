import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Heart, ChevronDown, BookOpen, MoonStar } from 'lucide-react'
import Button from './ui/Button'

/**
 * Hero — fullscreen, parallax, romantic moonlight ambiance.
 * NOTE: replace background imagery with your own halal couple photos
 *       in /public/images/hero-bg.jpg later.
 */
export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const yMoon = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const yTitle = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={ref}
      id="home"
      className="relative isolate min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pt-28"
    >
      {/* Animated gradient backdrop */}
      <motion.div
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 -z-10 bg-romantic-gradient"
        style={{
          backgroundSize: '200% 200%',
        }}
      />

      {/* Arabesque overlay */}
      <div className="absolute inset-0 -z-10 arabesque-bg opacity-30 dark:opacity-[0.07]" />

      {/* Moon (parallax) */}
      <motion.div
        style={{ y: yMoon }}
        className="absolute right-[8%] top-[14%] z-0 hidden sm:block"
      >
        <div className="relative">
          <div className="h-32 w-32 lg:h-44 lg:w-44 rounded-full bg-gradient-to-br from-cream-50 via-cream-100 to-softgold-100 moon-glow" />
          {/* Inner craters for subtle realism */}
          <div className="absolute top-7 left-8 h-3 w-3 rounded-full bg-cream-200/50" />
          <div className="absolute top-16 left-20 h-2 w-2 rounded-full bg-cream-200/40" />
          <div className="absolute top-24 left-10 h-4 w-4 rounded-full bg-cream-200/35" />
        </div>
      </motion.div>

      {/* Decorative orbit ring */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
        <div className="h-[600px] w-[600px] sm:h-[820px] sm:w-[820px] rounded-full border border-rosegold-200/20 dark:border-rosegold-100/10 animate-slow-spin" />
        <div className="absolute inset-12 rounded-full border border-rosegold-200/15 dark:border-rosegold-100/5 animate-slow-spin" style={{ animationDirection: 'reverse' }} />
      </div>

      {/* Center content */}
      <motion.div
        style={{ y: yTitle, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-rosegold-300" />
          <span className="eyebrow flex items-center gap-2">
            <MoonStar className="h-3.5 w-3.5" /> A surprise for my beloved
          </span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-rosegold-300" />
        </motion.div>

        {/* Bismillah */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="font-arabic text-xl sm:text-2xl text-rosegold-400/80 dark:text-softgold-200 mb-6"
        >
          بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ
        </motion.p>

        {/* Main name with decorative flourish */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.8, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Decorative flourish behind name */}
          <span
            aria-hidden
            className="absolute inset-x-0 -top-8 sm:-top-12 mx-auto text-rosegold-200/30 dark:text-rosegold-100/15 font-script text-7xl sm:text-9xl select-none pointer-events-none"
          >
            ✦
          </span>
          <h1 className="relative heading-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[1] text-shimmer-rosegold pb-3">
            Fariha Tasnim
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="font-script text-3xl sm:text-4xl text-rosegold-400 dark:text-rosegold-100 mt-6"
        >
          You became my peace, my dua, and my home.
        </motion.p>

        {/* Small note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-8 text-sm sm:text-base text-warmbrown-300/80 dark:text-cream-200/70 max-w-lg leading-relaxed"
        >
          Since <span className="font-medium text-rosegold-400 dark:text-rosegold-100">15 May</span>,
          every moment feels more meaningful, every prayer feels more whole, and every dream feels closer.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 1 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <Button
            onClick={() =>
              document
                .getElementById('story')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            <Heart className="h-4 w-4" fill="currentColor" strokeWidth={0} />
            Our Story
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              document
                .getElementById('letter')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            <BookOpen className="h-4 w-4" />
            Read My Letter
          </Button>
        </motion.div>

        {/* Soft floating quote chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-3 text-xs"
        >
          {['Sabr', 'Rahma', 'Mawaddah', 'Sakeenah'].map((word, i) => (
            <span
              key={word}
              className="rounded-full glass px-4 py-1.5 text-rosegold-400 dark:text-rosegold-100 animate-floaty"
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              {word}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Elegant scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-[11px] uppercase tracking-[0.3em] text-warmbrown-300/70 dark:text-cream-200/60">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5 text-rosegold-400" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      {/* Soft bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-cream-50/60 to-cream-50 dark:via-nightblue-900/60 dark:to-nightblue-900" />
    </section>
  )
}
