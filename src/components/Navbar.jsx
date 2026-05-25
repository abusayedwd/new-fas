import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Heart, Moon, Sun, Sparkles, Menu, X, Stars, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '../hooks/useAuth'

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Our Story', href: '#story' },
  { label: 'Memories', href: '#memories' },
  { label: 'Letter', href: '#letter' },
  { label: 'Duas', href: '#duas' },
  { label: 'Future', href: '#future' },
  { label: 'Gallery', href: '#gallery' },
]

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed top-0 inset-x-0 z-[70] transition-all duration-700',
        scrolled
          ? 'py-3'
          : 'py-5'
      )}
    >
      <div
        className={cn(
          'container-luxury flex items-center justify-between rounded-full transition-all duration-700 glass-nav',
          scrolled
            ? 'px-5 sm:px-7 py-2.5 shadow-luxury'
            : 'px-5 sm:px-7 py-2.5'
        )}
      >
        {/* Logo */}
        <a
          href="#home"
          className="group relative flex items-center gap-2.5 font-serif text-2xl"
          aria-label="Home"
        >
          <span className="absolute -inset-2 rounded-full bg-rosegold-100/0 group-hover:bg-rosegold-100/30 dark:group-hover:bg-softgold-200/10 blur-md transition-all duration-500" />
          <span className="relative font-bold tracking-wide text-rosegold-500 dark:text-softgold-200">
            A
          </span>
          <motion.span
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative text-rosegold-400 dark:text-rosegold-100 drop-shadow"
          >
            <Heart className="h-4 w-4" fill="currentColor" strokeWidth={0} />
          </motion.span>
          <span className="relative font-bold tracking-wide text-rosegold-500 dark:text-softgold-200">
            F
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative px-4 py-2 text-sm font-semibold tracking-wide text-warmbrown-500 dark:text-cream-100 hover:text-rosegold-500 dark:hover:text-softgold-200 transition-colors"
            >
              {item.label}
              <span className="absolute left-1/2 -translate-x-1/2 bottom-1 h-px w-0 group-hover:w-6 bg-gradient-to-r from-rosegold-300 to-softgold-200 transition-all duration-500" />
            </a>
          ))}
        </nav>

        {/* Right icons */}
        <div className="hidden lg:flex items-center gap-2">
          <IconButton
            label="Heart"
            onClick={() =>
              document
                .getElementById('letter')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            <Heart className="h-4 w-4" />
          </IconButton>
          <IconButton label="Moon" onClick={onToggleTheme}>
            <AnimatePresence mode="wait" initial={false}>
              {theme === 'dark' ? (
                <motion.span
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Sun className="h-4 w-4" />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Moon className="h-4 w-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </IconButton>
          <IconButton
            label="Stars"
            onClick={() =>
              document
                .getElementById('duas')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            <Stars className="h-4 w-4" />
          </IconButton>

          {user && (
            <>
              <span className="h-5 w-px bg-rosegold-200/40 dark:bg-rosegold-100/15 mx-1" />
              <div className="hidden xl:flex items-center gap-2 pl-1 pr-2 text-xs">
                <span className="text-warmbrown-300 dark:text-cream-100/70">
                  Hi,
                </span>
                <span className="font-medium text-rosegold-500 dark:text-softgold-200">
                  {user.name.split(' ')[0]}
                </span>
              </div>
              <IconButton label="Sign out" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </IconButton>
            </>
          )}
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden flex items-center justify-center h-10 w-10 rounded-full glass-nav text-warmbrown-400 dark:text-cream-100"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[95] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-cream-50/95 dark:bg-nightblue-900/95 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative h-full flex flex-col items-center justify-center gap-8"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-6 right-6 h-10 w-10 rounded-full glass-nav flex items-center justify-center text-warmbrown-400 dark:text-cream-100"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>

              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, duration: 0.5 }}
                  className="font-serif text-3xl text-warmbrown-400 dark:text-cream-100 hover:text-rosegold-400 transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}

              <div className="flex gap-4 mt-6">
                <IconButton label="Theme" onClick={onToggleTheme}>
                  {theme === 'dark' ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </IconButton>
                <IconButton label="Sparkles">
                  <Sparkles className="h-4 w-4" />
                </IconButton>
                {user && (
                  <IconButton label="Sign out" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                  </IconButton>
                )}
              </div>
              {user && (
                <p className="text-xs text-warmbrown-300 dark:text-cream-100/60 mt-3">
                  Signed in as{' '}
                  <span className="text-rosegold-400 dark:text-softgold-200 font-medium">
                    {user.name}
                  </span>
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function IconButton({ children, label, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="group relative h-10 w-10 rounded-full flex items-center justify-center text-warmbrown-500 dark:text-cream-100 hover:text-rosegold-500 dark:hover:text-softgold-200 hover:bg-rosegold-100/40 dark:hover:bg-softgold-200/[0.12] transition-all duration-300"
      style={{ strokeWidth: 2 }}
    >
      <span className="absolute inset-0 rounded-full bg-rosegold-100/0 group-hover:bg-rosegold-100/30 dark:group-hover:bg-softgold-200/[0.08] blur-md transition-all duration-500" />
      <span className="relative">{children}</span>
    </button>
  )
}
