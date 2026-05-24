import { motion } from 'framer-motion'
import { Heart, MoonStar, Stars } from 'lucide-react'

export default function Footer() {
  return (
    <footer
      id="gallery"
      className="relative isolate overflow-hidden pt-24 pb-12 bg-gradient-to-b from-cream-50 via-cream-100 to-cream-100 dark:from-nightblue-900 dark:via-nightblue-800 dark:to-nightblue-900"
    >
      {/* Stars twinkling at top */}
      <FooterStars />

      {/* Crescent moon */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 right-[10%] hidden sm:block"
      >
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full bg-cream-50 moon-glow" />
          <div className="absolute inset-0 rounded-full bg-cream-100 dark:bg-nightblue-800 translate-x-3 -translate-y-1" />
        </div>
      </motion.div>

      <div className="container-luxury relative">
        {/* Ornate divider */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className="h-px w-24 bg-gradient-to-r from-transparent to-rosegold-200" />
          <MoonStar className="h-4 w-4 text-rosegold-300" />
          <span className="text-rosegold-300">✦</span>
          <Stars className="h-4 w-4 text-rosegold-300" />
          <span className="h-px w-24 bg-gradient-to-l from-transparent to-rosegold-200" />
        </div>

        {/* Main message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h3 className="font-script text-3xl sm:text-4xl text-shimmer-rosegold pb-2 leading-snug">
            Made with endless love by Abu Sayed
          </h3>
          <p className="font-serif text-xl sm:text-2xl text-warmbrown-400 dark:text-cream-100 mt-2">
            for{' '}
            <span className="text-rosegold-400 dark:text-rosegold-100 font-medium">
              Fariha Tasnim
            </span>
            <Heart
              className="inline-block ml-2 -mt-1 text-rosegold-300 animate-heartbeat"
              fill="currentColor"
              strokeWidth={0}
              size={20}
            />
          </p>
        </motion.div>

        {/* Dua */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-10 mx-auto max-w-xl text-center glass-card p-6 sm:p-8"
        >
          <p
            className="font-arabic text-2xl leading-loose text-warmbrown-400 dark:text-cream-100"
            dir="rtl"
          >
            بَارَكَ اللَّهُ لَكِ وَجَمَعَ بَيْنَنَا فِي الْجَنَّةِ
          </p>
          <p className="font-serif italic text-warmbrown-300 dark:text-cream-200/80 mt-3">
            “May Allah bless you and unite us together in Jannah.”
          </p>
        </motion.div>

        {/* Bottom row */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-warmbrown-300 dark:text-cream-200/70">
          <p>© {new Date().getFullYear()} · A • F · forever, inshaAllah</p>
          <p className="flex items-center gap-2">
            Crafted with{' '}
            <Heart
              className="text-rosegold-300 animate-heartbeat"
              fill="currentColor"
              strokeWidth={0}
              size={12}
            />{' '}
            and a thousand duas
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterStars() {
  const stars = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 25,
    size: 1 + Math.random() * 2,
    delay: Math.random() * 3,
  }))
  return (
    <div className="absolute inset-x-0 top-0 h-32 pointer-events-none">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-rosegold-200 dark:bg-cream-100 animate-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            boxShadow: '0 0 6px rgba(237, 194, 180, 0.7)',
          }}
        />
      ))}
    </div>
  )
}
