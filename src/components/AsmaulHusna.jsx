import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play, MoonStar } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'

/**
 * The 99 Names of Allah (Asma-ul-Husna).
 * Source: Arabic + transliteration + meaning per the widely-used
 * AlAdhan "asmaAlHusna" reference list. Edit freely below.
 */
const NAMES = [
  { ar: 'الرَّحْمَٰن', translit: 'Ar-Rahman', meaning: 'The Most Compassionate' },
  { ar: 'الرَّحِيم', translit: 'Ar-Raheem', meaning: 'The Most Merciful' },
  { ar: 'الْمَلِك', translit: 'Al-Malik', meaning: 'The King, the Eternal Lord' },
  { ar: 'الْقُدُّوس', translit: 'Al-Quddus', meaning: 'The Purest, the Most Sacred' },
  { ar: 'السَّلَام', translit: 'As-Salam', meaning: 'The Source of Peace' },
  { ar: 'الْمُؤْمِن', translit: "Al-Mu'min", meaning: 'The Inspirer of Faith' },
  { ar: 'الْمُهَيْمِن', translit: 'Al-Muhaymin', meaning: 'The Guardian' },
  { ar: 'الْعَزِيز', translit: "Al-'Azeez", meaning: 'The Almighty' },
  { ar: 'الْجَبَّار', translit: 'Al-Jabbaar', meaning: 'The Compeller' },
  { ar: 'الْمُتَكَبِّر', translit: 'Al-Mutakabbir', meaning: 'The Greatest' },
  { ar: 'الْخَالِق', translit: 'Al-Khaaliq', meaning: 'The Creator' },
  { ar: 'الْبَارِئ', translit: 'Al-Baari', meaning: 'The Maker of Order' },
  { ar: 'الْمُصَوِّر', translit: 'Al-Musawwir', meaning: 'The Shaper of Beauty' },
  { ar: 'الْغَفَّار', translit: 'Al-Ghaffaar', meaning: 'The Ever Forgiving' },
  { ar: 'الْقَهَّار', translit: 'Al-Qahhaar', meaning: 'The Subduer' },
  { ar: 'الْوَهَّاب', translit: 'Al-Wahhaab', meaning: 'The Giver of All' },
  { ar: 'الرَّزَّاق', translit: 'Ar-Razzaaq', meaning: 'The Sustainer & Provider' },
  { ar: 'الْفَتَّاح', translit: 'Al-Fattaah', meaning: 'The Opener' },
  { ar: 'اَلْعَلِيم', translit: "Al-'Aleem", meaning: 'The Knower of All' },
  { ar: 'الْقَابِض', translit: 'Al-Qaabid', meaning: 'The Constrictor' },
  { ar: 'الْبَاسِط', translit: 'Al-Baasit', meaning: 'The Reliever' },
  { ar: 'الْخَافِض', translit: 'Al-Khaafid', meaning: 'The Abaser' },
  { ar: 'الرَّافِع', translit: "Ar-Raafi'", meaning: 'The Exalter' },
  { ar: 'الْمُعِزّ', translit: "Al-Mu'izz", meaning: 'The Bestower of Honour' },
  { ar: 'الْمُذِل', translit: 'Al-Mudhill', meaning: 'The Humiliator (of the arrogant)' },
  { ar: 'السَّمِيع', translit: "As-Samee'", meaning: 'The All Hearing' },
  { ar: 'الْبَصِير', translit: 'Al-Baseer', meaning: 'The All Seeing' },
  { ar: 'الْحَكَم', translit: 'Al-Hakam', meaning: 'The Judge' },
  { ar: 'الْعَدْل', translit: "Al-'Adl", meaning: 'The Utterly Just' },
  { ar: 'اللَّطِيف', translit: 'Al-Lateef', meaning: 'The Subtle One' },
  { ar: 'الْخَبِير', translit: 'Al-Khabeer', meaning: 'The All Aware' },
  { ar: 'الْحَلِيم', translit: 'Al-Haleem', meaning: 'The Forbearing' },
  { ar: 'الْعَظِيم', translit: "Al-'Azeem", meaning: 'The Magnificent' },
  { ar: 'الْغَفُور', translit: 'Al-Ghafoor', meaning: 'The Great Forgiver' },
  { ar: 'الشَّكُور', translit: 'Ash-Shakoor', meaning: 'The Most Appreciative' },
  { ar: 'الْعَلِيّ', translit: "Al-'Aliyy", meaning: 'The Most High' },
  { ar: 'الْكَبِير', translit: 'Al-Kabeer', meaning: 'The Most Great' },
  { ar: 'الْحَفِيظ', translit: 'Al-Hafeez', meaning: 'The Preserver' },
  { ar: 'الْمُقِيت', translit: 'Al-Muqeet', meaning: 'The Nourisher' },
  { ar: 'الْحَسِيب', translit: 'Al-Haseeb', meaning: 'The Reckoner' },
  { ar: 'الْجَلِيل', translit: 'Al-Jaleel', meaning: 'The Majestic' },
  { ar: 'الْكَرِيم', translit: 'Al-Kareem', meaning: 'The Most Generous' },
  { ar: 'الرَّقِيب', translit: 'Ar-Raqeeb', meaning: 'The Watchful One' },
  { ar: 'الْمُجِيب', translit: 'Al-Mujeeb', meaning: 'The Responder to Prayer' },
  { ar: 'الْوَاسِع', translit: "Al-Waasi'", meaning: 'The All Encompassing' },
  { ar: 'الْحَكِيم', translit: 'Al-Hakeem', meaning: 'The Perfectly Wise' },
  { ar: 'الْوَدُود', translit: 'Al-Wadood', meaning: 'The Most Loving' },
  { ar: 'الْمَجِيد', translit: 'Al-Majeed', meaning: 'The Most Glorious' },
  { ar: 'الْبَاعِث', translit: "Al-Baa'ith", meaning: 'The Resurrector' },
  { ar: 'الشَّهِيد', translit: 'Ash-Shaheed', meaning: 'The Witness' },
  { ar: 'الْحَقّ', translit: 'Al-Haqq', meaning: 'The Absolute Truth' },
  { ar: 'الْوَكِيل', translit: 'Al-Wakeel', meaning: 'The Trustee' },
  { ar: 'الْقَوِيّ', translit: 'Al-Qawiyy', meaning: 'The All Strong' },
  { ar: 'الْمَتِين', translit: 'Al-Mateen', meaning: 'The Firm One' },
  { ar: 'الْوَلِيّ', translit: 'Al-Waliyy', meaning: 'The Protecting Friend' },
  { ar: 'الْحَمِيد', translit: 'Al-Hameed', meaning: 'The Praiseworthy' },
  { ar: 'الْمُحْصِي', translit: 'Al-Muhsi', meaning: 'The All Enumerating' },
  { ar: 'الْمُبْدِئ', translit: 'Al-Mubdi', meaning: 'The Originator' },
  { ar: 'الْمُعِيد', translit: "Al-Mu'eed", meaning: 'The Restorer' },
  { ar: 'الْمُحْيِي', translit: 'Al-Muhyi', meaning: 'The Giver of Life' },
  { ar: 'اَلْمُمِيت', translit: 'Al-Mumeet', meaning: 'The Taker of Life' },
  { ar: 'الْحَيّ', translit: 'Al-Hayy', meaning: 'The Ever Living' },
  { ar: 'الْقَيُّوم', translit: 'Al-Qayyoom', meaning: 'The Self Existing, Sustainer of All' },
  { ar: 'الْوَاجِد', translit: 'Al-Waajid', meaning: 'The Finder' },
  { ar: 'الْمَاجِد', translit: 'Al-Maajid', meaning: 'The Glorious' },
  { ar: 'الْوَاحِد', translit: 'Al-Waahid', meaning: 'The Only One' },
  { ar: 'اَلاَحَد', translit: 'Al-Ahad', meaning: 'The One' },
  { ar: 'الصَّمَد', translit: 'As-Samad', meaning: 'The Supreme Provider' },
  { ar: 'الْقَادِر', translit: 'Al-Qaadir', meaning: 'The All Powerful' },
  { ar: 'الْمُقْتَدِر', translit: 'Al-Muqtadir', meaning: 'The Creator of All Power' },
  { ar: 'الْمُقَدِّم', translit: 'Al-Muqaddim', meaning: 'The Expediter' },
  { ar: 'الْمُؤَخِّر', translit: "Al-Mu'akhkhir", meaning: 'The Delayer' },
  { ar: 'الْأَوَّل', translit: 'Al-Awwal', meaning: 'The First' },
  { ar: 'الْآخِر', translit: 'Al-Aakhir', meaning: 'The Last' },
  { ar: 'الظَّاهِر', translit: 'Az-Zaahir', meaning: 'The Manifest' },
  { ar: 'الْبَاطِن', translit: 'Al-Baatin', meaning: 'The Hidden' },
  { ar: 'الْوَالِي', translit: 'Al-Waali', meaning: 'The Governor' },
  { ar: 'الْمُتَعَالِي', translit: "Al-Muta'ali", meaning: 'The Supreme One' },
  { ar: 'الْبَرّ', translit: 'Al-Barr', meaning: 'The Doer of Good' },
  { ar: 'التَّوَّاب', translit: 'At-Tawwaab', meaning: 'The Guide to Repentance' },
  { ar: 'الْمُنْتَقِم', translit: 'Al-Muntaqim', meaning: 'The Avenger of the wronged' },
  { ar: 'الْعَفُوّ', translit: "Al-'Afuww", meaning: 'The Forgiver' },
  { ar: 'الرَّؤُوف', translit: "Ar-Ra'oof", meaning: 'The Most Kind' },
  { ar: 'مَالِك الْمُلْك', translit: 'Maalik-ul-Mulk', meaning: 'Owner & Sovereign of All' },
  { ar: 'ذُوالْجَلَالِ وَالإِكْرَام', translit: 'Dhul-Jalaali-wal-Ikraam', meaning: 'Possessor of Majesty and Bounty' },
  { ar: 'الْمُقْسِط', translit: 'Al-Muqsit', meaning: 'The Equitable One' },
  { ar: 'الْجَامِع', translit: "Al-Jaami'", meaning: 'The Gatherer' },
  { ar: 'الْغَنِيّ', translit: 'Al-Ghaniyy', meaning: 'The Rich One' },
  { ar: 'الْمُغْنِي', translit: 'Al-Mughni', meaning: 'The Enricher' },
  { ar: 'اَلْمَانِع', translit: "Al-Maani'", meaning: 'The Preventer of Harm' },
  { ar: 'الضَّارّ', translit: 'Ad-Daarr', meaning: 'The Creator of the Harmful' },
  { ar: 'النَّافِع', translit: "An-Naafi'", meaning: 'The Bestower of Benefits' },
  { ar: 'النُّور', translit: 'An-Noor', meaning: 'The Light' },
  { ar: 'الْهَادِي', translit: 'Al-Haadi', meaning: 'The Guide' },
  { ar: 'الْبَدِيع', translit: "Al-Badee'", meaning: 'The Originator, Peerless' },
  { ar: 'اَلْبَاقِي', translit: 'Al-Baaqi', meaning: 'The Everlasting One' },
  { ar: 'الْوَارِث', translit: 'Al-Waarith', meaning: 'The Inheritor of All' },
  { ar: 'الرَّشِيد', translit: 'Ar-Rasheed', meaning: 'The Righteous Guide' },
  { ar: 'الصَّبُور', translit: 'As-Saboor', meaning: 'The Patient One' },
]

export default function AsmaulHusna() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % NAMES.length)
    }, 4200)
    return () => clearInterval(id)
  }, [playing])

  const current = NAMES[index]
  const goTo = (dir) => {
    setPlaying(false)
    setIndex((i) => (i + dir + NAMES.length) % NAMES.length)
  }

  const mid = Math.ceil(NAMES.length / 2)
  const rowA = NAMES.slice(0, mid)
  const rowB = NAMES.slice(mid)

  return (
    <section
      id="names"
      className="section-pad relative isolate overflow-hidden bg-cream-50 dark:bg-nightblue-900"
    >
      <div className="pointer-events-none absolute inset-0 arabesque-bg opacity-20 dark:opacity-[0.06]" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[30rem] w-[30rem] rounded-full bg-softgold-100/30 blur-[140px] dark:bg-softgold-200/[0.05]" />

      <div className="container-luxury relative">
        <SectionHeading
          eyebrow="Asma-ul-Husna"
          title="His 99 Beautiful Names"
          subtitle="Call upon Him by them — that is how He said He wants to be loved"
        />

        {/* Spotlight card */}
        <div className="relative max-w-xl mx-auto mb-16">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-softgold-100/40 to-rosegold-100/30 blur-3xl dark:from-softgold-200/[0.08] dark:to-rosegold-100/[0.06]" />

          <div className="relative glass-card p-8 sm:p-12 text-center overflow-hidden">
            <MoonStar className="mx-auto h-6 w-6 text-rosegold-300 mb-6" strokeWidth={1.5} />

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-arabic text-5xl sm:text-6xl text-shimmer-gold pb-2">
                  {current.ar}
                </p>
                <p className="mt-5 font-script text-3xl sm:text-4xl text-rosegold-400 dark:text-rosegold-100">
                  {current.translit}
                </p>
                <p className="mt-3 font-serif italic text-base sm:text-lg text-warmbrown-300 dark:text-cream-200/80">
                  {current.meaning}
                </p>
              </motion.div>
            </AnimatePresence>

            <p className="mt-8 text-xs uppercase tracking-[0.3em] text-rosegold-300">
              {index + 1} / {NAMES.length}
            </p>

            {/* Controls */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <SpotlightButton label="Previous name" onClick={() => goTo(-1)}>
                <ChevronLeft className="h-4 w-4" />
              </SpotlightButton>
              <SpotlightButton
                label={playing ? 'Pause' : 'Play'}
                onClick={() => setPlaying((p) => !p)}
              >
                {playing ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </SpotlightButton>
              <SpotlightButton label="Next name" onClick={() => goTo(1)}>
                <ChevronRight className="h-4 w-4" />
              </SpotlightButton>
            </div>
          </div>
        </div>

        {/* Marquee rows of all 99 names */}
        <div className="space-y-4">
          <MarqueeRow names={rowA} reverse={false} />
          <MarqueeRow names={rowB} reverse />
        </div>
      </div>
    </section>
  )
}

function SpotlightButton({ children, label, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="h-10 w-10 rounded-full glass flex items-center justify-center text-rosegold-400 dark:text-rosegold-100 hover:-translate-y-0.5 hover:shadow-glow-soft transition-all duration-300"
    >
      {children}
    </button>
  )
}

function MarqueeRow({ names, reverse }) {
  const doubled = [...names, ...names]
  return (
    <div className="marquee-row -mx-5 sm:-mx-8 lg:-mx-12 overflow-hidden">
      <div
        className={`flex w-max gap-3 px-5 ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
      >
        {doubled.map((n, i) => (
          <span
            key={i}
            className="shrink-0 glass rounded-full px-5 py-2 flex items-center gap-2.5 whitespace-nowrap"
          >
            <span className="font-arabic text-lg text-rosegold-400 dark:text-softgold-200">
              {n.ar}
            </span>
            <span className="text-xs text-warmbrown-300 dark:text-cream-200/70">
              {n.translit}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
