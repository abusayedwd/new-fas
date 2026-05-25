import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  Lock,
  User,
  Eye,
  EyeOff,
  Key,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { useAuth, DEMO_ACCOUNTS } from '../hooks/useAuth'

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Where to send them after a successful login
  const from = location.state?.from?.pathname || '/welcome'

  // If already logged in, skip straight in
  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true })
  }, [isAuthenticated, from, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username || !password) {
      setError('Please enter both fields.')
      return
    }
    setLoading(true)
    setError('')
    // Tiny artificial delay so the loading state feels real
    setTimeout(() => {
      const result = login(username, password)
      setLoading(false)
      if (!result.ok) {
        setError(result.error)
      } else {
        navigate(from, { replace: true })
      }
    }, 700)
  }

  const fillCredential = (acc) => {
    setUsername(acc.username)
    setPassword(acc.password)
    setError('')
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-romantic-gradient dark:bg-night-sky px-5 py-12">
      {/* Soft halos */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[40rem] w-[40rem] rounded-full bg-rosegold-100/45 blur-[140px] dark:bg-rosegold-100/[0.08]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-softgold-100/45 blur-[120px] dark:bg-softgold-200/[0.06]" />
        <div className="absolute top-1/3 left-0 h-96 w-96 rounded-full bg-rosegold-200/30 blur-[140px] dark:bg-rosegold-200/[0.05]" />
      </div>

      {/* Arabesque overlay */}
      <div className="absolute inset-0 arabesque-bg opacity-25 dark:opacity-[0.06]" />

      {/* Floating sparkles */}
      <FloatingSparkles />

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Soft glow behind the card */}
        <div className="absolute -inset-6 bg-gradient-to-br from-rosegold-100/40 to-softgold-100/30 blur-3xl rounded-[3rem] dark:from-rosegold-100/[0.08] dark:to-softgold-100/[0.05]" />

        <div className="relative glass-card p-8 sm:p-10 overflow-hidden">
          {/* Decorative top ribbon */}
          <div className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-40 bg-gradient-to-r from-transparent via-softgold-200 to-transparent" />

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-softgold-100 via-rosegold-200 to-rosegold-300 shadow-glow">
              <Heart
                className="h-7 w-7 text-white"
                fill="currentColor"
                strokeWidth={0}
              />
            </div>

            <p className="font-arabic text-lg text-rosegold-400 dark:text-softgold-200 mb-2">
              بِسْمِ اللَّـهِ
            </p>

            <h1 className="heading-serif text-3xl sm:text-4xl text-warmbrown-500 dark:text-cream-100 mb-2">
              Welcome, my love
            </h1>
            <p className="font-script text-xl text-rosegold-400 dark:text-rosegold-100">
              A small surprise is waiting for you
            </p>
          </motion.div>

          {/* Ornate divider */}
          <div className="flex items-center justify-center gap-2 my-7 opacity-80">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-rosegold-300" />
            <span className="text-rosegold-300">✦</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-rosegold-300" />
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Username */}
            <Field
              icon={User}
              label="Your name"
              value={username}
              onChange={setUsername}
              placeholder="fariha"
              autoComplete="username"
              autoFocus
            />

            {/* Password */}
            <Field
              icon={Lock}
              label="Secret key"
              value={password}
              onChange={setPassword}
              placeholder="our special date"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              endAdornment={
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="text-warmbrown-300 dark:text-cream-100/60 hover:text-rosegold-400 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
            />

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-sm text-rosegold-500 dark:text-rosegold-100 text-center pt-1"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="relative w-full inline-flex items-center justify-center gap-2 mt-2 px-7 py-4 rounded-full font-serif text-base tracking-wide
                         bg-gradient-to-br from-rosegold-200 via-rosegold-300 to-rosegold-400 text-white
                         shadow-glow-warm hover:shadow-glow disabled:opacity-70
                         transition-shadow duration-500"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  Opening your surprise…
                </>
              ) : (
                <>
                  Enter Our World
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Hint section */}
          <div className="mt-7 pt-5 border-t border-rosegold-200/40 dark:border-rosegold-100/15">
            <button
              type="button"
              onClick={() => setShowHint((s) => !s)}
              className="w-full flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-rosegold-400 dark:text-rosegold-100 hover:text-rosegold-500 transition-colors"
            >
              <Key className="h-3.5 w-3.5" />
              {showHint ? 'Hide hint' : 'Need a hint?'}
            </button>

            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2">
                    {DEMO_ACCOUNTS.map((acc) => (
                      <button
                        key={acc.username}
                        type="button"
                        onClick={() => fillCredential(acc)}
                        className="group w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-white/40 dark:bg-white/[0.04] border border-rosegold-200/30 dark:border-rosegold-100/10 hover:bg-white/70 dark:hover:bg-white/[0.07] hover:border-rosegold-200/60 transition-all"
                      >
                        <div className="flex items-center gap-3 text-left">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-softgold-100 to-rosegold-200 flex items-center justify-center text-white font-serif text-sm">
                            {acc.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-warmbrown-500 dark:text-cream-100">
                              {acc.name}
                            </p>
                            <p className="text-xs text-warmbrown-300 dark:text-cream-100/60">
                              {acc.username} · {acc.password}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs uppercase tracking-widest text-rosegold-400 dark:text-rosegold-100 opacity-0 group-hover:opacity-100 transition-opacity">
                          Tap to fill
                        </span>
                      </button>
                    ))}
                    <p className="mt-2 text-center text-[11px] text-warmbrown-300/80 dark:text-cream-100/50 italic">
                      Hint: our nikah date 💍
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <p className="mt-7 text-center text-xs text-warmbrown-300/80 dark:text-cream-100/50">
            A surprise made by Abu Sayed · for Fariha Tasnim
          </p>

          {/* Decorative bottom ribbon */}
          <div className="absolute -bottom-px left-1/2 -translate-x-1/2 h-px w-40 bg-gradient-to-r from-transparent via-softgold-200 to-transparent" />
        </div>
      </motion.div>
    </div>
  )
}

function Field({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  endAdornment,
  ...rest
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.25em] text-rosegold-400 dark:text-softgold-200 mb-2">
        {label}
      </span>
      <div className="relative flex items-center rounded-2xl bg-white/55 dark:bg-white/[0.04] border border-rosegold-200/40 dark:border-rosegold-100/15 focus-within:border-rosegold-300 dark:focus-within:border-softgold-200 focus-within:shadow-glow-soft transition-all">
        <Icon className="absolute left-4 h-4 w-4 text-rosegold-300 dark:text-rosegold-100" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent px-12 py-3.5 text-base text-warmbrown-500 dark:text-cream-100 placeholder:text-warmbrown-300/50 dark:placeholder:text-cream-100/40 focus:outline-none"
          {...rest}
        />
        {endAdornment && (
          <div className="absolute right-4">{endAdornment}</div>
        )}
      </div>
    </label>
  )
}

function FloatingSparkles() {
  const sparkles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 4 + Math.random() * 4,
  }))
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Sparkles
            className="text-softgold-200 dark:text-softgold-100"
            size={12}
          />
        </motion.div>
      ))}
    </div>
  )
}
