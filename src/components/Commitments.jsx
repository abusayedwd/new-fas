import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Hand,
  HeartHandshake,
  ShieldCheck,
  BookOpenText,
  Sparkles,
  Sunrise,
  Moon,
  Scale,
  Check,
  ArrowRight,
} from 'lucide-react'

/**
 * Edit COMMITMENTS to change the vows.
 * Each card has an icon, title (English), Arabic accent, and the vow text.
 */
const COMMITMENTS = [
  {
    icon: Hand,
    title: 'I will love you only for Allah’s sake',
    arabic: 'لِوَجْهِ اللَّهِ',
    text:
      'Every smile I give you, every dua I make for you — purely for His pleasure. Loving you is part of my worship now.',
  },
  {
    icon: ShieldCheck,
    title: 'I will protect your honour and your heart',
    arabic: 'الْحِفْظُ',
    text:
      'My voice will never rise against you. My hands will only know gentleness with you. Your honour is mine to guard.',
  },
  {
    icon: BookOpenText,
    title: 'I will make dua for you in every sajdah',
    arabic: 'فِي كُلِّ سَجْدَةٍ',
    text:
      'Before I lift my forehead from the floor, your name will be on my lips, asking Allah to keep you safe, soft, and smiling.',
  },
  {
    icon: Scale,
    title: 'I will be patient with you in difficulty, grateful with you in ease',
    arabic: 'صَبْرٌ وَشُكْرٌ',
    text:
      'Through storms and through sunlight, my hand will stay in yours. Sabr when life is heavy, shukr when it is sweet.',
  },
  {
    icon: HeartHandshake,
    title: 'I will treat you as Rasulullah ﷺ treated his wives',
    arabic: 'خَيْرُكُمْ خَيْرُكُمْ لِأَهْلِهِ',
    text:
      '“The best of you is the one who is best to his wife.” I will spend my whole life trying to deserve that hadith for you.',
  },
  {
    icon: Sunrise,
    title: 'I will choose you again, every single morning',
    arabic: 'كُلَّ صَبَاحٍ',
    text:
      'Not just on our nikah day. Every Fajr, every sunrise — I will wake up and choose you all over again, inshaAllah.',
  },
  {
    icon: Moon,
    title: 'I will be your peace at the end of every long day',
    arabic: 'سَكِينَةٌ',
    text:
      'When the world is loud, I want to be your quiet. Your safe place. The shoulder you fall asleep on without explaining.',
  },
  {
    icon: Sparkles,
    title: 'And inshaAllah, I will meet you again in Jannah',
    arabic: 'فِي الْجَنَّةِ',
    text:
      'Above every dream we build in this dunya, my biggest dua is this: that Allah unites us again where there are no more goodbyes.',
  },
]

export default function Commitments({ onComplete }) {
  const [revealed, setRevealed] = useState(0)
  const allRevealed = revealed >= COMMITMENTS.length

  // Auto-reveal each card with a soft pause between
  useEffect(() => {
    if (allRevealed) return
    const t = setTimeout(() => setRevealed((r) => r + 1), revealed === 0 ? 700 : 1100)
    return () => clearTimeout(t)
  }, [revealed, allRevealed])

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto scrollbar-pretty bg-romantic-gradient dark:bg-night-sky">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 right-1/4 h-[40rem] w-[40rem] rounded-full bg-rosegold-100/40 blur-[140px] dark:bg-rosegold-100/[0.07]" />
        <div className="absolute bottom-0 left-1/4 h-[40rem] w-[40rem] rounded-full bg-softgold-100/40 blur-[140px] dark:bg-softgold-200/[0.06]" />
      </div>

      {/* Arabesque overlay */}
      <div className="absolute inset-0 arabesque-bg opacity-25 dark:opacity-[0.06]" />

      {/* Skip */}
      <button
        onClick={() => onComplete?.()}
        className="fixed top-8 right-8 text-xs uppercase tracking-[0.3em] text-warmbrown-300/70 dark:text-cream-100/50 hover:text-rosegold-400 dark:hover:text-softgold-200 transition-colors z-20"
      >
        Skip →
      </button>

      {/* Content */}
      <div className="relative z-10 container-luxury py-20 sm:py-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-rosegold-300" />
            <span className="eyebrow">My Promises To You</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-rosegold-300" />
          </div>

          <p className="font-arabic text-2xl text-rosegold-400 dark:text-softgold-200 mb-5">
            بِسْمِ اللَّـهِ
          </p>

          <h1 className="heading-serif text-4xl sm:text-5xl lg:text-6xl text-warmbrown-500 dark:text-cream-100 leading-tight">
            My commitments to you, Fariha
          </h1>

          <p className="mt-6 font-script text-2xl sm:text-3xl text-rosegold-400 dark:text-rosegold-100">
            Sealed before Allah, written on my heart
          </p>

          <div className="divider-ornate">
            <span className="text-rosegold-300 mx-3">✦</span>
          </div>
        </motion.div>

        {/* Commitment cards */}
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 mt-10 max-w-5xl mx-auto">
          {COMMITMENTS.map((c, i) => (
            <CommitmentCard
              key={i}
              commitment={c}
              index={i}
              shown={i < revealed}
            />
          ))}
        </div>

        {/* Final CTA */}
        <AnimatePresence>
          {allRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16 text-center"
            >
              {/* Signature */}
              <p className="font-serif italic text-warmbrown-400 dark:text-cream-100/80 text-lg">
                With every beat of my heart,
              </p>
              <p className="font-script text-5xl sm:text-6xl text-shimmer-rosegold pb-3 mt-2">
                Abu Sayed
              </p>

              <motion.div
                animate={{ scale: [1, 1.18, 1] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="inline-block mt-2 text-rosegold-300"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21s-7-4.5-9.5-9C.8 8.5 3 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 6.2 4.5 4.5 8-2.5 4.5-9.5 9-9.5 9z" />
                </svg>
              </motion.div>

              <div className="mt-12">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onComplete?.()}
                  className="relative inline-flex items-center gap-3 px-10 py-5 rounded-full font-serif text-lg
                             bg-gradient-to-br from-rosegold-200 via-rosegold-300 to-rosegold-400 text-white
                             shadow-glow hover:shadow-[0_0_60px_rgba(245,210,122,0.55)]
                             transition-shadow duration-500"
                >
                  Begin Our Forever
                  <ArrowRight className="h-5 w-5" />
                </motion.button>

                <p className="mt-5 text-xs uppercase tracking-[0.3em] text-warmbrown-300/70 dark:text-cream-100/60">
                  Tap to enter our world
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function CommitmentCard({ commitment, index, shown }) {
  const Icon = commitment.icon
  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4 }}
          className="group relative"
        >
          {/* Soft glow halo */}
          <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-br from-softgold-100/40 to-rosegold-100/30 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700 dark:from-softgold-200/[0.08] dark:to-rosegold-100/[0.05]" />

          <div className="relative glass-card p-6 sm:p-7 h-full overflow-hidden">
            {/* Index badge */}
            <span className="absolute top-5 right-5 font-serif text-xs uppercase tracking-[0.3em] text-rosegold-300/80">
              No. {String(index + 1).padStart(2, '0')}
            </span>

            {/* Icon + Arabic */}
            <div className="flex items-start gap-4 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-softgold-100/40 rounded-2xl blur-xl" />
                <div className="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-cream-50 to-softgold-100 dark:from-cream-50 dark:to-softgold-200 flex items-center justify-center shadow-glow-warm">
                  <Icon
                    className="h-5 w-5 text-rosegold-400"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
              <p
                className="font-arabic text-2xl leading-snug text-warmbrown-400 dark:text-cream-100 mt-1"
                dir="rtl"
              >
                {commitment.arabic}
              </p>
            </div>

            {/* Title */}
            <h3 className="heading-serif text-xl sm:text-2xl text-warmbrown-500 dark:text-cream-100 mb-3">
              {commitment.title}
            </h3>

            {/* Body */}
            <p className="text-sm sm:text-base leading-relaxed text-warmbrown-400/85 dark:text-cream-100/80">
              {commitment.text}
            </p>

            {/* Sealed mark */}
            <div className="mt-5 flex items-center gap-2 text-xs text-rosegold-400 dark:text-rosegold-100">
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              <span className="uppercase tracking-[0.25em]">
                Sealed with my heart
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
