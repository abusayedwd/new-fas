import { motion } from 'framer-motion'
import { Moon, Star, MoonStar } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'

/**
 * Verses & duas about love, marriage, and mercy.
 * Edit, add, or reorder freely.
 */
const DUAS = [
  {
    arabic: 'وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
    translation: 'And He placed between you affection and mercy.',
    source: 'Qur’an 30:21',
    icon: Moon,
  },
  {
    arabic:
      'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ',
    translation:
      'Our Lord, grant us from our spouses and our children comfort to our eyes.',
    source: 'Qur’an 25:74',
    icon: MoonStar,
  },
  {
    arabic: 'هُنَّ لِبَاسٌ لَّكُمْ وَأَنتُمْ لِبَاسٌ لَّهُنَّ',
    translation: 'They are a garment for you and you are a garment for them.',
    source: 'Qur’an 2:187',
    icon: Star,
  },
  {
    arabic:
      'بَارَكَ اللَّهُ لَكَ، وَبَارَكَ عَلَيْكَ، وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
    translation:
      'May Allah bless you, send blessings upon you, and unite you both in goodness.',
    source: 'Hadith — Sunan Abi Dawud',
    icon: Moon,
  },
  {
    arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
    translation: 'My Lord, expand for me my chest and ease for me my task.',
    source: 'Qur’an 20:25-26',
    icon: MoonStar,
  },
  {
    arabic: 'اللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِنَا',
    translation: 'O Allah, unite our hearts together.',
    source: 'Prophetic dua',
    icon: Star,
  },
]

export default function Duas() {
  return (
    <section
      id="duas"
      className="section-pad relative isolate paper-texture overflow-hidden"
    >
      {/* Night-sky shimmer in dark mode */}
      <div className="absolute inset-0 dark:bg-night-sky/40" />

      {/* Crescent decoration */}
      <div className="pointer-events-none absolute top-20 right-[8%] h-32 w-32 hidden lg:block">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 rounded-full bg-cream-100 dark:bg-cream-50 moon-glow" />
          <div className="absolute -inset-2 rounded-full" />
          <div className="absolute inset-0 rounded-full bg-cream-50 dark:bg-nightblue-900 translate-x-5 -translate-y-1" />
        </div>
      </div>

      <div className="container-luxury relative">
        <SectionHeading
          eyebrow="Duas & Verses"
          title="Words from the One who united us"
          subtitle="May Allah keep our love halal, soft, and lasting"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {DUAS.map((dua, i) => {
            const Icon = dua.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group relative"
              >
                {/* Soft glow halo behind card */}
                <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-br from-softgold-100/40 to-rosegold-100/30 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700 dark:from-softgold-200/[0.07] dark:to-rosegold-100/[0.05]" />

                <div className="relative glass-card p-7 h-full flex flex-col">
                  {/* Crescent icon */}
                  <div className="mb-5 relative">
                    <div className="absolute inset-0 bg-softgold-100/40 rounded-full blur-xl group-hover:bg-softgold-100/70 transition-colors duration-700" />
                    <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-cream-50 to-softgold-100 dark:from-cream-50 dark:to-softgold-200 flex items-center justify-center shadow-glow-warm">
                      <Icon
                        className="h-5 w-5 text-rosegold-400"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  {/* Arabic */}
                  <p
                    className="font-arabic text-2xl leading-[1.9] text-warmbrown-400 dark:text-cream-100 text-right mb-4"
                    dir="rtl"
                  >
                    {dua.arabic}
                  </p>

                  {/* Divider */}
                  <div className="my-3 flex items-center gap-2">
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent to-rosegold-200/60" />
                    <Star
                      className="h-3 w-3 text-rosegold-300"
                      fill="currentColor"
                      strokeWidth={0}
                    />
                    <span className="h-px flex-1 bg-gradient-to-l from-transparent to-rosegold-200/60" />
                  </div>

                  {/* Translation */}
                  <p className="font-serif italic text-base sm:text-lg leading-relaxed text-warmbrown-400 dark:text-cream-100 flex-1">
                    “{dua.translation}”
                  </p>

                  {/* Source */}
                  <p className="mt-5 text-xs uppercase tracking-[0.25em] text-rosegold-300">
                    {dua.source}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
