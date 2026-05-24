import { motion } from 'framer-motion'
import {
  MessageCircleHeart,
  Smile,
  Gem,
  Sparkles,
  HeartHandshake,
  Infinity as InfinityIcon,
} from 'lucide-react'
import SectionHeading from './ui/SectionHeading'

/**
 * Edit timeline entries here. Dates are optional.
 * Replace icons / descriptions any time.
 */
const EVENTS = [
  {
    title: 'First Conversation',
    when: 'The very beginning',
    description:
      'A simple Salam — and somehow my heart already knew you were different. Allah was preparing me without my realising it.',
    icon: MessageCircleHeart,
  },
  {
    title: 'First Smile',
    when: 'A moment frozen in time',
    description:
      'Your smile rearranged my world. It was soft, real, and it carried a kind of light I had only read about in poetry.',
    icon: Smile,
  },
  {
    title: 'Engagement',
    when: 'A promise to Allah & to you',
    description:
      'Two families, one dua. I promised to protect your heart, honour your soul, and walk this path beside you forever.',
    icon: Gem,
  },
  {
    title: 'Nikah',
    when: 'Ijab & Qabul',
    description:
      'Three sacred words turned my world halal — turned you into my forever, my sakeenah, my mercy from Ar-Rahman.',
    icon: Sparkles,
  },
  {
    title: 'Wedding Day',
    when: '15 May 2026',
    description:
      'The day every Bismillah of mine echoed your name. I will remember you in that moment for as long as I live, inshaAllah.',
    icon: HeartHandshake,
    highlight: true,
  },
  {
    title: 'Beginning Forever Together',
    when: 'From that day onwards',
    description:
      'Every morning with you, every coffee, every prayer side by side — the start of a forever we will keep building together.',
    icon: InfinityIcon,
  },
]

export default function Timeline() {
  return (
    <section
      id="story"
      className="section-pad relative isolate paper-texture"
    >
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Our Story"
          title="A timeline written by Allah's mercy"
          subtitle="Every chapter began the day He chose us for each other"
        />

        <div className="relative mt-20">
          {/* Center spine */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-6 sm:left-1/2 top-0 bottom-0 -translate-x-1/2 sm:-translate-x-px w-[2px] bg-gradient-to-b from-transparent via-rosegold-200/60 to-transparent"
          />

          <div className="flex flex-col gap-16 sm:gap-24">
            {EVENTS.map((event, i) => (
              <TimelineRow key={event.title} event={event} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineRow({ event, index }) {
  const isLeft = index % 2 === 0
  const Icon = event.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      className="relative grid grid-cols-[3rem_1fr] sm:grid-cols-2 gap-6 sm:gap-16 items-center"
    >
      {/* Node icon */}
      <div className={`col-start-1 sm:col-start-1 sm:col-end-3 sm:row-start-1 absolute sm:relative left-0 sm:left-auto sm:mx-auto z-20 ${isLeft ? 'sm:order-2' : ''}`}>
        <div className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 5 }}
            className={`relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full ${
              event.highlight
                ? 'bg-gradient-to-br from-softgold-200 via-rosegold-200 to-rosegold-300 shadow-glow'
                : 'bg-cream-50 dark:bg-nightblue-800 border border-rosegold-200/50 shadow-glow-warm'
            }`}
          >
            <Icon
              className={`h-5 w-5 sm:h-6 sm:w-6 ${
                event.highlight ? 'text-white' : 'text-rosegold-400'
              }`}
              strokeWidth={1.5}
            />
            {event.highlight && (
              <span className="absolute inset-0 rounded-full bg-rosegold-200/40 blur-xl animate-glow-pulse" />
            )}
          </motion.div>
        </div>
      </div>

      {/* Card */}
      <div
        className={`col-start-2 sm:col-start-1 sm:col-end-2 ${
          isLeft ? 'sm:text-right sm:pr-16' : 'sm:order-2 sm:pl-16'
        }`}
      >
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.4 }}
          className="glass-card relative overflow-hidden p-6 sm:p-8 hover:shadow-glow"
        >
          {/* Inner shimmer accent */}
          <div className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-32 bg-gradient-to-r from-transparent via-softgold-200 to-transparent" />

          <p className="eyebrow mb-2">{event.when}</p>
          <h3 className="heading-serif text-2xl sm:text-3xl text-warmbrown-400 dark:text-cream-100">
            {event.title}
          </h3>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-warmbrown-300/85 dark:text-cream-200/75">
            {event.description}
          </p>

          {event.highlight && (
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-rosegold-100/40 dark:bg-rosegold-100/10 px-3 py-1 text-xs font-medium text-rosegold-500 dark:text-rosegold-100">
              <Sparkles className="h-3 w-3" />
              The day my dua came true
            </div>
          )}
        </motion.div>
      </div>

      {/* Spacer for opposite column */}
      <div className={`hidden sm:block ${isLeft ? 'sm:order-3' : ''}`} />
    </motion.div>
  )
}
