import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Heart, Flame } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'

/**
 * Edit the letter freely here — it will keep its typing animation.
 * Each paragraph types sequentially when the section enters view.
 */
const PARAGRAPHS = [
  "Allah knew my heart needed you before I even met you.",
  "You are the calmness after every storm, the smile after every difficult day, and the peace my soul was searching for.",
  "Every time I look at you, I am reminded that Allah answers duas in ways more beautiful than we could ever imagine. You are mine — and I am, fully, peacefully, gratefully, yours.",
  "I promise to protect your laughter, honour your kindness, and pray for your Jannah in every sajdah of mine.",
]

const SIGNATURE_LINES = ['Forever yours,', 'Abu Sayed']

export default function Letter() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <section
      id="letter"
      ref={ref}
      className="section-pad relative isolate overflow-hidden bg-cream-100/60 dark:bg-nightblue-800/60"
    >
      {/* Warm ambient light */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[36rem] w-[36rem] rounded-full bg-rosegold-100/40 blur-[140px] dark:bg-rosegold-100/[0.06]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-softgold-100/50 blur-[120px] dark:bg-softgold-200/[0.05]" />
      </div>

      {/* Floating candles */}
      <CandleGlow position="left-[8%] top-[18%]" />
      <CandleGlow position="right-[10%] bottom-[16%]" delay={1.4} />

      <div className="container-luxury relative">
        <SectionHeading
          eyebrow="A Letter"
          title="To My Beloved Fariha"
          subtitle="Some words I needed to write so they would live forever"
        />

        {/* Paper card */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotate: -0.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-3xl"
        >
          {/* Shadow / glow layer */}
          <div className="absolute -inset-4 bg-gradient-to-br from-rosegold-100/40 to-softgold-100/30 blur-3xl dark:from-rosegold-100/10 dark:to-softgold-100/10" />

          {/* Paper */}
          <div className="relative rounded-3xl bg-ivory dark:bg-cream-50/95 shadow-paper p-8 sm:p-14 lg:p-20 overflow-hidden">
            {/* Faint Arabic verse watermark */}
            <p
              aria-hidden
              className="absolute inset-0 flex items-center justify-center font-arabic text-[10rem] sm:text-[14rem] text-rosegold-200/[0.08] select-none pointer-events-none"
            >
              ﷽
            </p>

            {/* Paper edges decorative corners */}
            <Corner position="top-4 left-4" />
            <Corner position="top-4 right-4" rotate="rotate-90" />
            <Corner position="bottom-4 right-4" rotate="rotate-180" />
            <Corner position="bottom-4 left-4" rotate="-rotate-90" />

            {/* Handwritten title */}
            <p className="font-script text-4xl sm:text-5xl text-rosegold-400 mb-10 text-center">
              My Fariha,
            </p>

            {/* Typed paragraphs */}
            <div className="space-y-6 font-serif text-lg sm:text-xl leading-[1.85] text-warmbrown-400">
              {PARAGRAPHS.map((p, i) => (
                <TypedParagraph
                  key={i}
                  text={p}
                  start={inView}
                  delay={i * 2.8}
                  speed={28}
                />
              ))}
            </div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 13, duration: 1.2 }}
              className="mt-12 flex flex-col items-end gap-1"
            >
              <p className="font-serif italic text-lg text-warmbrown-300">
                {SIGNATURE_LINES[0]}
              </p>
              <p className="font-script text-4xl sm:text-5xl text-shimmer-rosegold pb-2">
                {SIGNATURE_LINES[1]}
              </p>
              <Heart
                className="text-rosegold-300 animate-heartbeat mt-1"
                fill="currentColor"
                strokeWidth={0}
                size={20}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Closing line under paper */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1.4 }}
          className="mt-12 text-center font-script text-2xl text-rosegold-400 dark:text-rosegold-100"
        >
          Read this whenever you forget how loved you are.
        </motion.p>
      </div>
    </section>
  )
}

/* ---------- helpers ---------- */

function TypedParagraph({ text, start, delay = 0, speed = 30 }) {
  const [shown, setShown] = useState('')

  useEffect(() => {
    if (!start) return
    let cancelled = false
    let i = 0
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        if (cancelled) return
        i += 1
        setShown(text.slice(0, i))
        if (i >= text.length) clearInterval(interval)
      }, speed)
    }, delay * 1000)

    return () => {
      cancelled = true
      clearTimeout(startTimer)
    }
  }, [start, text, delay, speed])

  return (
    <p>
      {shown}
      {shown.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] align-[-0.15em] bg-rosegold-300 ml-0.5 animate-pulse" />
      )}
    </p>
  )
}

function CandleGlow({ position, delay = 0 }) {
  return (
    <motion.div
      animate={{
        opacity: [0.6, 1, 0.7, 1],
        scale: [1, 1.05, 0.97, 1.02],
      }}
      transition={{
        duration: 3.2,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`pointer-events-none absolute ${position} hidden sm:flex flex-col items-center`}
    >
      <div className="relative h-10 w-10 rounded-full bg-gradient-to-b from-softgold-100 to-rosegold-200 shadow-glow">
        <Flame
          className="absolute inset-0 m-auto h-5 w-5 text-cream-50"
          fill="currentColor"
          strokeWidth={0}
        />
      </div>
      <div className="w-1 h-12 bg-gradient-to-b from-cream-200 to-warmbrown-100 rounded-b" />
    </motion.div>
  )
}

function Corner({ position, rotate = '' }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      className={`absolute ${position} ${rotate} text-rosegold-300/50`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M2 2 L18 2 M2 2 L2 18 M2 2 L14 14" strokeLinecap="round" />
      <circle cx="2" cy="2" r="1.5" fill="currentColor" />
    </svg>
  )
}
