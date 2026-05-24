import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import { pad } from '@/lib/utils'

/**
 * Live Love Counter.
 * Wedding date: 15 May 2026 (Asia/Dhaka local time).
 * Edit START_DATE to change the anchor.
 */
const START_DATE = new Date('2026-05-15T00:00:00')

function diffFromStart() {
  const now = new Date()
  let ms = now.getTime() - START_DATE.getTime()
  const future = ms < 0
  ms = Math.abs(ms)

  const seconds = Math.floor(ms / 1000) % 60
  const minutes = Math.floor(ms / (1000 * 60)) % 60
  const hours = Math.floor(ms / (1000 * 60 * 60)) % 24
  const days = Math.floor(ms / (1000 * 60 * 60 * 24))

  return { days, hours, minutes, seconds, future }
}

export default function LoveCounter() {
  const [time, setTime] = useState(diffFromStart)

  useEffect(() => {
    const id = setInterval(() => setTime(diffFromStart()), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: pad(time.hours) },
    { label: 'Minutes', value: pad(time.minutes) },
    { label: 'Seconds', value: pad(time.seconds) },
  ]

  return (
    <section
      id="counter"
      className="section-pad relative isolate overflow-hidden bg-gradient-to-b from-cream-100/60 via-cream-50 to-cream-100/60 dark:from-nightblue-800/60 dark:via-nightblue-900 dark:to-nightblue-800/60"
    >
      {/* Decorative pattern */}
      <div className="absolute inset-0 arabesque-bg opacity-15 dark:opacity-[0.05]" />

      <div className="container-luxury relative">
        <SectionHeading
          eyebrow="Forever Counter"
          title={
            time.future
              ? 'Counting down to the day my life begins'
              : 'Counting every blessed second with you'
          }
          subtitle="Every second with you is a blessing from Allah"
        />

        {/* Counter cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16 max-w-5xl mx-auto">
          {units.map((u, i) => (
            <motion.div
              key={u.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative"
            >
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-rosegold-100/40 to-softgold-100/40 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700 dark:from-rosegold-100/[0.07] dark:to-softgold-200/[0.05]" />

              <div className="relative glass-card p-6 sm:p-8 text-center overflow-hidden">
                {/* Floating heart */}
                <Heart
                  className="absolute -top-2 -right-2 text-rosegold-200/60 group-hover:text-rosegold-300 transition-colors duration-500"
                  fill="currentColor"
                  strokeWidth={0}
                  size={20}
                />

                <p className="eyebrow mb-3">{u.label}</p>

                <div className="relative font-serif text-5xl sm:text-6xl md:text-7xl leading-none text-shimmer-rosegold tabular-nums h-20 sm:h-24 flex items-center justify-center overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={u.value}
                      initial={{ y: '60%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: '-60%', opacity: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="block"
                    >
                      {u.value}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* Soft animated underline */}
                <motion.div
                  className="mx-auto mt-4 h-px w-12 bg-gradient-to-r from-transparent via-rosegold-300 to-transparent"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Anchor date label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full glass px-6 py-2.5">
            <Heart
              className="h-4 w-4 text-rosegold-300 animate-heartbeat"
              fill="currentColor"
              strokeWidth={0}
            />
            <span className="font-serif text-sm sm:text-base text-warmbrown-400 dark:text-cream-100">
              Since{' '}
              <span className="text-rosegold-400 dark:text-rosegold-100 font-medium">
                15 May 2026
              </span>{' '}
              · the day my forever began
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
