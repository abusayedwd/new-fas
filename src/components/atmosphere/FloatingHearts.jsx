import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'

/**
 * Occasional floating hearts that drift up from the bottom of the page.
 */
export default function FloatingHearts() {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    let id = 0
    const interval = setInterval(() => {
      const newHeart = {
        id: id++,
        x: Math.random() * 100,
        scale: 0.6 + Math.random() * 0.9,
        duration: 8 + Math.random() * 6,
        delay: Math.random() * 1.5,
      }
      setHearts((curr) => [...curr.slice(-7), newHeart])
    }, 5200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ y: '100vh', x: `${h.x}vw`, opacity: 0, scale: h.scale }}
            animate={{
              y: '-15vh',
              opacity: [0, 0.9, 0.9, 0],
              x: [
                `${h.x}vw`,
                `${h.x + 4}vw`,
                `${h.x - 3}vw`,
                `${h.x + 2}vw`,
              ],
            }}
            transition={{
              duration: h.duration,
              delay: h.delay,
              ease: 'easeOut',
              times: [0, 0.1, 0.85, 1],
            }}
            className="absolute"
            onAnimationComplete={() =>
              setHearts((curr) => curr.filter((x) => x.id !== h.id))
            }
          >
            <Heart
              className="text-rosegold-200 dark:text-rosegold-100"
              fill="currentColor"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(237,194,180,0.6))',
                opacity: 0.7,
              }}
              size={18}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
