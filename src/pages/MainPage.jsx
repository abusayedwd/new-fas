import ScrollProgress from '../components/atmosphere/ScrollProgress'
import ParticleBackground from '../components/atmosphere/ParticleBackground'
import CursorGlow from '../components/atmosphere/CursorGlow'
import FloatingHearts from '../components/atmosphere/FloatingHearts'

import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Timeline from '../components/Timeline'
import Gallery from '../components/Gallery'
import Letter from '../components/Letter'
import Duas from '../components/Duas'
import Future from '../components/Future'
import LoveCounter from '../components/LoveCounter'
import Footer from '../components/Footer'

import { useTheme } from '../hooks/useTheme'

/**
 * /main — the main page with all sections.
 * Reached after /welcome completes, or visited directly to skip the intro.
 */
export default function MainPage() {
  const { theme, toggle } = useTheme()

  return (
    <>
      <ScrollProgress />
      <ParticleBackground density={45} />
      <CursorGlow />
      <FloatingHearts />

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
