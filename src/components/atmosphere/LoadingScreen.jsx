import { motion } from 'framer-motion'
import { Moon } from 'lucide-react'

/**
 * Romantic full-screen loader shown before the intro popup.
 */
export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream-50 dark:bg-nightblue-900"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        className="absolute h-64 w-64 rounded-full border border-rosegold-200/30"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute h-80 w-80 rounded-full border border-softgold-200/20"
      />

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative flex h-20 w-20 items-center justify-center rounded-full bg-softgold-100 moon-glow"
      >
        <Moon className="h-9 w-9 text-warmbrown-400" strokeWidth={1.2} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="mt-10 font-script text-2xl text-rosegold-300"
      >
        Preparing your surprise…
      </motion.p>
    </motion.div>
  )
}
