import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Check, Sparkles } from 'lucide-react'

/**
 * Romantic interactive Q&A.
 *
 * - Yes button: always smiles, confirms, advances.
 * - No button: shies away from the cursor (can never quite be clicked).
 *   If she somehow clicks it, a heartfelt "Are you sure?" softens it.
 * - After the final yes, a soft love message → onComplete() runs.
 *
 * Edit QUESTIONS below to change the wording.
 */
const QUESTIONS = [
  {
    q: 'Are you happy with me, Fariha?',
    sub: 'Just need to make sure my world is smiling 🤍',
  },
  {
    q: 'Do you feel the love I have for you?',
    sub: 'Because Allah knows it is more than I can write',
  },
  {
    q: 'Will you walk this whole life beside me, hand in hand?',
    sub: 'Through every sajdah, every storm, every laugh',
  },
  {
    q: 'Will you let me be your peace, the way you are mine?',
    sub: 'My sakeenah, my safe place',
  },
  {
    q: 'And inshaAllah… meet me again in Jannah?',
    sub: 'Where there are no more goodbyes',
  },
]

const FINAL_MESSAGE = {
  title: 'My whole heart just lit up.',
  sub: 'Alhamdulillah for you, Fariha. Now let me show you my promises…',
}

export default function Questions({ onComplete }) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [noNudge, setNoNudge] = useState({ x: 0, y: 0 })
  const [noClicked, setNoClicked] = useState(false)

  const total = QUESTIONS.length
  const current = QUESTIONS[step]

  const handleYes = () => {
    setNoClicked(false)
    setNoNudge({ x: 0, y: 0 })
    if (step + 1 < total) {
      setStep(step + 1)
    } else {
      setDone(true)
      setTimeout(() => onComplete?.(), 3000)
    }
  }

  const handleNoHover = () => {
    // Move the No button to a random nearby spot — playful "escape"
    const dx = (Math.random() - 0.5) * 480
    const dy = (Math.random() - 0.5) * 220
    setNoNudge({ x: dx, y: dy })
  }

  const handleNoClick = () => {
    // If she actually catches it — soften with a tender prompt
    setNoClicked(true)
    setTimeout(() => setNoClicked(false), 2800)
  }

  return (
    <div className="fixed inset-0 z-[80] overflow-hidden bg-romantic-gradient dark:bg-night-sky">
      {/* Soft halo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[40rem] w-[40rem] rounded-full bg-rosegold-100/40 blur-[140px] dark:bg-rosegold-100/[0.08]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-softgold-100/40 blur-[120px] dark:bg-softgold-200/[0.06]" />
      </div>

      {/* Arabesque overlay */}
      <div className="absolute inset-0 arabesque-bg opacity-25 dark:opacity-[0.06]" />

      {/* Floating hearts ambience */}
      <BackgroundHearts />

      {/* Progress dots */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {QUESTIONS.map((_, i) => (
          <motion.span
            key={i}
            animate={{
              scale: i === step ? 1.2 : 1,
              opacity: i <= step ? 1 : 0.35,
            }}
            transition={{ duration: 0.5 }}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i <= step
                ? 'w-8 bg-rosegold-300 dark:bg-softgold-200'
                : 'w-2 bg-rosegold-200/50 dark:bg-cream-100/30'
            }`}
          />
        ))}
      </div>

      {/* Skip button */}
      <button
        onClick={() => onComplete?.()}
        className="absolute top-8 right-8 text-xs uppercase tracking-[0.3em] text-warmbrown-300/70 dark:text-cream-100/50 hover:text-rosegold-400 dark:hover:text-softgold-200 transition-colors z-10"
      >
        Skip →
      </button>

      <div className="relative h-full w-full flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 max-w-2xl w-full text-center"
            >
              {/* Decorative motif */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
                className="mx-auto h-16 w-16 mb-10"
              >
                <div className="relative h-full w-full rounded-full bg-gradient-to-br from-softgold-100 to-rosegold-200 shadow-glow flex items-center justify-center">
                  <Sparkles
                    className="text-white"
                    fill="currentColor"
                    strokeWidth={0}
                    size={20}
                  />
                </div>
              </motion.div>

              <p className="eyebrow mb-4">
                Question {step + 1} of {total}
              </p>

              <h2 className="heading-serif text-4xl sm:text-5xl lg:text-6xl text-warmbrown-500 dark:text-cream-100 leading-tight">
                {current.q}
              </h2>

              <p className="mt-5 font-script text-2xl sm:text-3xl text-rosegold-400 dark:text-rosegold-100">
                {current.sub}
              </p>

              {/* Buttons */}
              <div className="relative mt-14 h-32 flex items-center justify-center">
                {/* Yes button */}
                <motion.button
                  onClick={handleYes}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative z-10 inline-flex items-center justify-center gap-2.5 px-12 py-5 rounded-full font-serif text-lg
                             bg-gradient-to-br from-rosegold-200 via-rosegold-300 to-rosegold-400 text-white
                             shadow-glow hover:shadow-[0_0_60px_rgba(245,210,122,0.55)]
                             transition-shadow duration-500"
                >
                  <Heart
                    className="h-5 w-5"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                  Yes, with all my heart
                </motion.button>

                {/* Playful No button */}
                <motion.button
                  onMouseEnter={handleNoHover}
                  onFocus={handleNoHover}
                  onClick={handleNoClick}
                  animate={{ x: noNudge.x, y: noNudge.y }}
                  transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                             ml-48 inline-flex items-center justify-center gap-2
                             px-6 py-3 rounded-full text-sm font-medium
                             text-warmbrown-400/70 dark:text-cream-200/50
                             border border-rosegold-200/40 dark:border-rosegold-100/20
                             bg-white/30 dark:bg-white/[0.03] backdrop-blur-md"
                >
                  Hmm… no?
                </motion.button>
              </div>

              {/* Tender response if she catches No */}
              <AnimatePresence>
                {noClicked && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 font-script text-xl text-rosegold-400 dark:text-rosegold-100"
                  >
                    Are you sure? My heart only knows one answer with you 🤍
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="final"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 text-center max-w-2xl"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="mx-auto mb-8 h-20 w-20 rounded-full bg-gradient-to-br from-softgold-100 to-rosegold-300 shadow-glow flex items-center justify-center"
              >
                <Check
                  className="text-white"
                  strokeWidth={2.5}
                  size={36}
                />
              </motion.div>

              <h2 className="heading-serif text-4xl sm:text-5xl text-shimmer-rosegold pb-2">
                {FINAL_MESSAGE.title}
              </h2>
              <p className="mt-5 font-script text-2xl sm:text-3xl text-rosegold-400 dark:text-rosegold-100">
                {FINAL_MESSAGE.sub}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function BackgroundHearts() {
  const hearts = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 9 + Math.random() * 5,
    size: 12 + Math.random() * 10,
  }))
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{ y: '-15vh', opacity: [0, 0.6, 0.6, 0] }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          className="absolute"
          style={{ left: `${h.x}vw` }}
        >
          <Heart
            size={h.size}
            className="text-rosegold-200 dark:text-rosegold-100/50"
            fill="currentColor"
            style={{ filter: 'drop-shadow(0 0 6px rgba(237,194,180,0.5))' }}
          />
        </motion.div>
      ))}
    </div>
  )
}
