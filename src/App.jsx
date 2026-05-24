import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import LoadingScreen from './components/atmosphere/LoadingScreen'
import IntroPopup from './components/IntroPopup'
import CurtainReveal from './components/CurtainReveal'
import ScrollProgress from './components/atmosphere/ScrollProgress'
import ParticleBackground from './components/atmosphere/ParticleBackground'
import CursorGlow from './components/atmosphere/CursorGlow'
import FloatingHearts from './components/atmosphere/FloatingHearts'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import Gallery from './components/Gallery'
import Letter from './components/Letter'
import Duas from './components/Duas'
import Future from './components/Future'
import LoveCounter from './components/LoveCounter'
import Footer from './components/Footer'

import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggle } = useTheme()
  const [loading, setLoading] = useState(true)
  const [introOpen, setIntroOpen] = useState(true)
  const [curtainOpen, setCurtainOpen] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  // Lock body scroll during any overlay
  useEffect(() => {
    const lock = introOpen || loading || curtainOpen
    document.body.style.overflow = lock ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [introOpen, loading, curtainOpen])

  const handleIntroClose = () => {
    setIntroOpen(false)
    // Begin the cinematic curtain reveal immediately after intro fades
    setCurtainOpen(true)
  }

  return (
    <>
      {/* Loading */}
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      {/* Intro popup */}
      {!loading && introOpen && (
        <IntroPopup
          onOpen={handleIntroClose}
          audioEnabled={audioEnabled}
          onToggleAudio={() => setAudioEnabled((v) => !v)}
        />
      )}

      {/* Cinematic curtain that descends like a stage curtain to reveal the page */}
      {curtainOpen && (
        <CurtainReveal onComplete={() => setCurtainOpen(false)} />
      )}

      {/* Ambient effects */}
      <ScrollProgress />
      <ParticleBackground density={45} />
      <CursorGlow />
      <FloatingHearts />

      {/* Page */}
      <div className="relative z-10">
        <Navbar theme={theme} onToggleTheme={toggle} />
        <main>
          <Hero />
          <Timeline />
          <Gallery />
          <Letter />
          <Duas />
          <Future />
          <LoveCounter />
        </main>
        <Footer />
      </div>
    </>
  )
}
