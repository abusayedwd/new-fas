import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Soft golden glow that follows the cursor.
 * Disabled on touch devices to avoid clutter.
 */
export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -200, y: -200 })
  const [enabled, setEnabled] = useState(false)
  const rafRef = useRef(null)

  useEffect(() => {
    // Detect coarse pointer / touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return
    setEnabled(true)

    const handleMove = (e) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY })
      })
    }

    window.addEventListener('pointermove', handleMove)
    return () => {
      window.removeEventListener('pointermove', handleMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[60] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-multiply dark:mix-blend-screen"
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', mass: 0.4, stiffness: 90, damping: 20 }}
        style={{
          background:
            'radial-gradient(circle, rgba(245,210,122,0.22) 0%, rgba(237,194,180,0.08) 35%, transparent 70%)',
        }}
      />
      <motion.div
        className="pointer-events-none fixed z-[61] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rosegold-300/70"
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', mass: 0.1, stiffness: 200, damping: 18 }}
      />
    </>
  )
}
