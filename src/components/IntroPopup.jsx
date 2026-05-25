import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Volume2, VolumeX, Sparkles, MoonStar } from 'lucide-react'
import Button from './ui/Button'
import { useAuth } from '../hooks/useAuth'

/**
 * Fullscreen luxury intro popup.
 * Sequential message reveal → CTA → fades out, lifting the page.
 *
 * If Sayed (the husband) is signed in, he sees a gentle "preview mode"
 * greeting. Fariha sees the original heartfelt sequence.
 */
function buildMessages(user) {
  const isSayed = user?.username === 'sayed'

  return [
    {
      type: 'salam',
      main: isSayed
        ? 'Assalamu Alaikum, Abu Sayed'
        : `Assalamu Alaikum, ${user?.name || 'Fariha'}`,
      accent: '❤',
    },
    {
      type: 'verse',
      main: isSayed
        ? 'A preview of the surprise you built…'
        : 'From the day you entered my life…',
      sub: isSayed
        ? 'May Allah keep your love soft, halal, and lasting.'
        : 'My world became softer, calmer, and more beautiful.',
    },
    {
      type: 'signature',
      main: isSayed
        ? 'Crafted with love by'
        : 'A small surprise from your husband,',
      sub: 'Abu Sayed',
    },
  ]
}

export default function IntroPopup({ onOpen, audioEnabled, onToggleAudio }) {
  const { user } = useAuth()
  const MESSAGES = useMemo(() => buildMessages(user), [user])

  const [step, setStep] = useState(0)
  const [visible, setVisible] = useState(true)

  // Auto-advance through messages
  useEffect(() => {
    if (step >= MESSAGES.length) return
    const timer = setTimeout(() => setStep((s) => s + 1), 3400)
    return () => clearTimeout(timer)
  }, [step])

  const handleOpen = () => {
    setVisible(false)
    setTimeout(() => onOpen?.(), 900)
  }

  const message = MESSAGES[Math.min(step, MESSAGES.length - 1)]
  const showButton = step >= MESSAGES.length

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden"
        >
          {/* Night sky background */}
          <div className="absolute inset-0 bg-night-sky" />

          {/* Star particles */}
          <Starfield />

          {/* Moon glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="absolute right-[12%] top-[14%] h-28 w-28 sm:h-36 sm:w-36 rounded-full bg-cream-50/95 moon-glow"
          />

          {/* Floating lanterns */}
          <FloatingLanterns />

          {/* Subtle arabesque overlay */}
          <div className="absolute inset-0 arabesque-bg opacity-[0.07]" />

          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.55)_100%)]" />

          {/* Audio toggle */}
          <button
            onClick={onToggleAudio}
            aria-label={audioEnabled ? 'Mute music' : 'Play music'}
            className="absolute top-6 right-6 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md px-4 py-2 text-cream-100 text-xs font-medium hover:bg-white/[0.12] transition-all"
          >
            {audioEnabled ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">
              {audioEnabled ? 'Music on' : 'Music off'}
            </span>
          </button>

          {/* Floating hearts on top */}
          <PopupHearts />

          {/* Content */}
          <div className="relative z-10 w-full max-w-3xl px-6 text-center">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-10"
            >
              {/* Decorative motif */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                className="opacity-80"
              >
                <div className="flex items-center justify-center gap-3 text-softgold-200">
                  <MoonStar className="h-5 w-5" strokeWidth={1.4} />
                  <Sparkles className="h-4 w-4" strokeWidth={1.4} />
                  <MoonStar className="h-5 w-5" strokeWidth={1.4} />
                </div>
              </motion.div>

              {/* Animated message */}
              <div className="min-h-[180px] sm:min-h-[220px] flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center gap-4"
                  >
                    {message.type === 'salam' && (
                      <>
                        <p className="font-arabic text-xl text-softgold-200/90 tracking-wide">
                          السلام عليكم
                        </p>
                        <h1 className="heading-serif text-4xl sm:text-5xl lg:text-6xl text-cream-50">
                          {message.main}{' '}
                          <span className="inline-block text-rosegold-100 animate-heartbeat origin-center">
                            {message.accent}
                          </span>
                        </h1>
                      </>
                    )}

                    {message.type === 'verse' && (
                      <>
                        <p className="font-serif text-3xl sm:text-4xl text-cream-50 leading-snug">
                          {message.main}
                        </p>
                        <p className="font-script text-2xl sm:text-3xl text-rosegold-100 mt-2">
                          {message.sub}
                        </p>
                      </>
                    )}

                    {message.type === 'signature' && (
                      <>
                        <p className="font-serif text-2xl sm:text-3xl text-cream-50 italic">
                          {message.main}
                        </p>
                        <p className="font-script text-5xl sm:text-6xl text-shimmer-rosegold pb-2">
                          {message.sub}
                        </p>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* CTA */}
              <AnimatePresence>
                {showButton && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="flex flex-col items-center gap-5"
                  >
                    {/* Soft pulsating glow behind button */}
                    <div className="relative">
                      <div className="absolute inset-0 -m-4 rounded-full bg-rosegold-200/30 blur-2xl animate-glow-pulse" />
                      <Button
                        onClick={handleOpen}
                        size="lg"
                        className="relative font-serif text-base tracking-wide"
                      >
                        <Heart
                          className="h-4 w-4"
                          fill="currentColor"
                          strokeWidth={0}
                        />
                        Open Our Journey
                      </Button>
                    </div>
                    <p className="text-cream-100/55 text-xs tracking-widest uppercase">
                      Just for you, Fariha
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Audio element (silent unless source added) */}
          {/* NOTE: drop a soft nasheed mp3 at /public/audio/nasheed.mp3 to enable */}
          {audioEnabled && (
            <audio autoPlay loop>
              <source src="/audio/nasheed.mp3" type="audio/mpeg" />
            </audio>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------- Decorations ---------- */

function Starfield() {
  const stars = Array.from({ length: 90 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    delay: Math.random() * 4,
  }))
  return (
    <div className="absolute inset-0">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-cream-50 animate-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            boxShadow: '0 0 6px rgba(255, 253, 247, 0.7)',
          }}
        />
      ))}
    </div>
  )
}

function FloatingLanterns() {
  const lanterns = [
    { x: '12%', y: '70%', size: 32, delay: 0 },
    { x: '85%', y: '60%', size: 28, delay: 1.2 },
    { x: '25%', y: '40%', size: 22, delay: 2.4 },
    { x: '70%', y: '78%', size: 26, delay: 0.8 },
    { x: '55%', y: '30%', size: 18, delay: 3 },
  ]
  return (
    <>
      {lanterns.map((l, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{
            opacity: [0, 0.85, 0.7, 0.85],
            y: [40, -10, 10, 0],
          }}
          transition={{
            duration: 8 + i,
            delay: l.delay,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="absolute"
          style={{ left: l.x, top: l.y }}
        >
          <div
            className="rounded-full bg-gradient-to-b from-softgold-100 to-rosegold-300"
            style={{
              width: l.size,
              height: l.size * 1.2,
              boxShadow:
                '0 0 28px rgba(245,210,122,0.9), 0 0 60px rgba(237,194,180,0.4)',
            }}
          />
          <div
            className="mx-auto w-px bg-warmbrown-300/40"
            style={{ height: 30 }}
          />
        </motion.div>
      ))}
    </>
  )
}

function PopupHearts() {
  const hearts = Array.from({ length: 14 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 7 + Math.random() * 4,
    size: 12 + Math.random() * 10,
  }))
  return (
    <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{
            y: '-20vh',
            opacity: [0, 0.6, 0.6, 0],
            x: [0, 20, -10, 15],
          }}
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
            className="text-rosegold-100"
            fill="currentColor"
            style={{ filter: 'drop-shadow(0 0 6px rgba(237,194,180,0.7))' }}
          />
        </motion.div>
      ))}
    </div>
  )
}
