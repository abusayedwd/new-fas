import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Thin rose-gold progress bar at the top of the page.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  })

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-0 left-0 right-0 z-[80] h-[2px] bg-gradient-to-r from-rosegold-200 via-softgold-200 to-rosegold-300 shadow-[0_0_18px_rgba(245,210,122,0.6)]"
    />
  )
}
