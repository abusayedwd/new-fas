import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'

/**
 * Cinematic curtain reveal.
 *
 * A pair of silken photo panels descend from the top of the viewport,
 * meet in the middle to display the couple's photos + names,
 * then continue downward — revealing the main page like a stage curtain.
 *
 * NOTE: Replace the two image src paths below with real photos:
 *   /public/couple/abu-sayed.jpg
 *   /public/couple/fariha.jpg
 * If the files are not present, beautiful gradient placeholders are shown.
 */

const TIMINGS = {
  drop: 1.6,   // curtain drops from above to fill screen
  hold: 2.6,   // curtain sits to show photos + names
  exit: 1.8,   // curtain continues down off the bottom
}
const TOTAL = TIMINGS.drop + TIMINGS.hold + TIMINGS.exit

export default function CurtainReveal({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(() => onComplete?.(), TOTAL * 1000 + 200)
    return () => clearTimeout(t)
  }, [onComplete])

  // Variants: start above viewport → settle covering screen → slide down off-screen
  const curtainVariants = {
    initial: { y: '-110%' },
    animate: {
      y: ['-110%', '0%', '0%', '110%'],
      transition: {
        duration: TOTAL,
        times: [
          0,
          TIMINGS.drop / TOTAL,
          (TIMINGS.drop + TIMINGS.hold) / TOTAL,
          1,
        ],
        ease: [0.65, 0.04, 0.35, 1],
      },
    },
  }

  return (
    <AnimatePresence>
      <motion.div
        key="curtain-reveal"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[88] overflow-hidden pointer-events-none"
      >
        {/* Backstage — soft dim that fades as curtain exits */}
        <motion.div
          className="absolute inset-0 bg-warmbrown-500/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0.4, 0] }}
          transition={{
            duration: TOTAL,
            times: [
              0,
              TIMINGS.drop / TOTAL,
              (TIMINGS.drop + TIMINGS.hold) / TOTAL,
              1,
            ],
            ease: 'easeInOut',
          }}
        />

        {/* Left curtain panel — Abu Sayed */}
        <motion.div
          variants={curtainVariants}
          initial="initial"
          animate="animate"
          className="absolute top-0 left-0 h-full w-1/2"
        >
          <CurtainPanel
            side="left"
            name="Abu Sayed"
            role="Your Husband"
            // Replace with: /couple/abu-sayed.jpg
            imageSrc="/couple/abu-sayed.jpg"
            paletteFrom="#75593F"
            paletteTo="#A86C53"
          />
        </motion.div>

        {/* Right curtain panel — Fariha Tasnim */}
        <motion.div
          variants={curtainVariants}
          initial="initial"
          animate="animate"
          className="absolute top-0 right-0 h-full w-1/2"
        >
          <CurtainPanel
            side="right"
            name="Fariha Tasnim"
            role="My Beloved"
            // Replace with: /couple/fariha.jpg
            imageSrc="/couple/fariha.jpg"
            paletteFrom="#C08A6E"
            paletteTo="#EDC2B4"
          />
        </motion.div>

        {/* Center seam — gold ornament that travels with the curtain */}
        <motion.div
          variants={curtainVariants}
          initial="initial"
          animate="animate"
          className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-px"
        >
          <div className="relative h-full w-px bg-gradient-to-b from-transparent via-softgold-200/70 to-transparent">
            {/* Center medallion */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <CenterMedallion />
            </div>
            {/* Hanging tassels */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2">
              <Tassel />
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rotate-180">
              <Tassel />
            </div>
          </div>
        </motion.div>

        {/* Decorative falling petals while curtain is drawn */}
        <Petals />
      </motion.div>
    </AnimatePresence>
  )
}

/* ---------- Sub-components ---------- */

function CurtainPanel({ side, name, role, imageSrc, paletteFrom, paletteTo }) {
  const align = side === 'left' ? 'items-end pr-8 sm:pr-14' : 'items-start pl-8 sm:pl-14'
  const text = side === 'left' ? 'text-right' : 'text-left'

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(${side === 'left' ? '135deg' : '-135deg'},
            rgba(255,253,247,0.04) 0%,
            rgba(255,253,247,0) 60%),
          linear-gradient(180deg, ${paletteFrom} 0%, ${paletteTo} 100%)
        `,
      }}
    >
      {/* Silk vertical pleats — luxury curtain texture */}
      <SilkPleats side={side} />

      {/* Arabesque overlay */}
      <div className="absolute inset-0 arabesque-bg opacity-25" />

      {/* Soft inner vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgba(11,10,26,0.45) 100%)',
        }}
      />

      {/* Photo + label content */}
      <div
        className={`relative h-full w-full flex flex-col justify-center ${align}`}
      >
        <div className={`flex flex-col gap-5 ${text} max-w-sm`}>
          <PortraitFrame imageSrc={imageSrc} name={name} side={side} />

          <div className={`flex flex-col gap-1 ${text}`}>
            <span className="font-arabic text-softgold-100/80 text-base tracking-wide">
              {side === 'left' ? 'الزوج' : 'الزوجة'}
            </span>
            <h3 className="heading-serif text-3xl sm:text-4xl lg:text-5xl text-cream-50">
              {name}
            </h3>
            <p className="font-script text-xl sm:text-2xl text-rosegold-100">
              {role}
            </p>
          </div>
        </div>
      </div>

      {/* Gold edge accent */}
      <div
        className={`absolute top-0 bottom-0 ${
          side === 'left' ? 'right-0' : 'left-0'
        } w-[2px] bg-gradient-to-b from-transparent via-softgold-200/60 to-transparent`}
      />
    </div>
  )
}

function PortraitFrame({ imageSrc, name, side }) {
  return (
    <div
      className={`relative ${
        side === 'left' ? 'ml-auto' : 'mr-auto'
      }`}
    >
      {/* Outer gold ring */}
      <div className="relative h-44 w-44 sm:h-56 sm:w-56 rounded-full p-[3px] bg-gradient-to-br from-softgold-200 via-rosegold-100 to-softgold-200 shadow-glow">
        {/* Inner frame */}
        <div className="relative h-full w-full rounded-full overflow-hidden bg-gradient-to-br from-warmbrown-300 to-warmbrown-500">
          {/* Try to load the photo; fallback gradient + initial remains visible */}
          <img
            src={imageSrc}
            alt={name}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Placeholder initial (visible when image missing or as overlay accent) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-serif text-7xl sm:text-8xl text-cream-50/40 select-none">
              {name.charAt(0)}
            </span>
          </div>

          {/* Subtle inner ring */}
          <div className="absolute inset-2 rounded-full border border-cream-50/15" />
        </div>
      </div>

      {/* Rotating arabesque halo */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 -m-3 rounded-full border border-dashed border-softgold-200/35"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 -m-6 rounded-full border border-softgold-200/20"
      />
    </div>
  )
}

function SilkPleats({ side }) {
  // Vertical pleats — soft alternating dark/light bands
  const pleats = Array.from({ length: 8 })
  return (
    <div className="absolute inset-0 pointer-events-none">
      {pleats.map((_, i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 w-[12.5%]"
          style={{
            left: `${i * 12.5}%`,
            background: `linear-gradient(${
              side === 'left' ? '90deg' : '-90deg'
            }, rgba(255, 253, 247, ${i % 2 === 0 ? 0.04 : 0.0}) 0%, transparent 100%)`,
            boxShadow:
              i % 2 === 0
                ? 'inset 6px 0 14px rgba(0,0,0,0.18), inset -6px 0 14px rgba(0,0,0,0.18)'
                : 'none',
          }}
        />
      ))}
    </div>
  )
}

function CenterMedallion() {
  return (
    <div className="relative">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gradient-to-br from-softgold-100 via-rosegold-200 to-softgold-200 shadow-glow flex items-center justify-center"
      >
        <div className="absolute inset-1.5 rounded-full border border-cream-50/50" />
        <Heart
          className="text-cream-50 relative"
          fill="currentColor"
          strokeWidth={0}
          size={22}
        />
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.2, 0.5] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full bg-softgold-200/40 blur-xl -z-10"
      />
      {/* Decorative sparkles */}
      <Sparkles className="absolute -top-3 -right-3 text-softgold-100 animate-twinkle" size={14} />
      <Sparkles className="absolute -bottom-3 -left-3 text-softgold-100 animate-twinkle" size={14} style={{ animationDelay: '1s' }} />
    </div>
  )
}

function Tassel() {
  return (
    <div className="flex flex-col items-center">
      <div className="h-3 w-3 rounded-full bg-softgold-200 shadow-glow" />
      <div className="w-px h-6 bg-softgold-200/70" />
      <div className="h-2 w-2 rounded-full bg-softgold-200/70" />
    </div>
  )
}

function Petals() {
  const petals = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 3,
    size: 8 + Math.random() * 8,
    rotate: Math.random() * 360,
  }))
  return (
    <div className="absolute inset-0 pointer-events-none">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: '-10vh', x: `${p.x}vw`, opacity: 0, rotate: p.rotate }}
          animate={{
            y: '110vh',
            opacity: [0, 0.85, 0.85, 0],
            rotate: p.rotate + 180,
            x: [`${p.x}vw`, `${p.x + 6}vw`, `${p.x - 4}vw`],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeIn',
            times: [0, 0.1, 0.9, 1],
          }}
          className="absolute"
        >
          <div
            className="rounded-full bg-gradient-to-br from-rosegold-100 to-rosegold-300"
            style={{
              width: p.size,
              height: p.size * 0.6,
              filter: 'blur(0.5px) drop-shadow(0 0 6px rgba(237,194,180,0.5))',
              transform: 'rotate(35deg)',
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}
