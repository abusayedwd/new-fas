import { useMemo } from 'react'
import { motion } from 'framer-motion'

/**
 * Lightweight floating particle field — tiny stars + dust motes.
 * Pure CSS/SVG, no canvas — keeps page airy and lightweight.
 */
export default function ParticleBackground({ density = 40 }) {
  const particles = useMemo(
    () =>
      Array.from({ length: density }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 10,
        opacity: 0.25 + Math.random() * 0.55,
      })),
    [density]
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Soft ambient glow blobs */}
      <div className="absolute -top-32 -left-32 h-[40rem] w-[40rem] rounded-full bg-rosegold-100/25 blur-[120px] dark:bg-rosegold-100/[0.05]" />
      <div className="absolute -bottom-32 -right-32 h-[40rem] w-[40rem] rounded-full bg-softgold-100/25 blur-[120px] dark:bg-softgold-200/[0.04]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[28rem] w-[28rem] rounded-full bg-cream-100/40 blur-[140px] dark:bg-rosegold-200/[0.04]" />

      {/* Twinkling dust */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-rosegold-200 dark:bg-cream-100"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            filter: 'blur(0.4px)',
          }}
          animate={{
            opacity: [p.opacity * 0.2, p.opacity, p.opacity * 0.2],
            y: [0, -20, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
