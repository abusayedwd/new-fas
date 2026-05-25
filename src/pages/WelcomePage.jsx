import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import LoadingScreen from '../components/atmosphere/LoadingScreen'
import IntroPopup from '../components/IntroPopup'
import CurtainReveal from '../components/CurtainReveal'
import Questions from '../components/Questions'
import Commitments from '../components/Commitments'

/**
 * /welcome — full cinematic intro sequence:
 *   loading → intro popup → curtain reveal → questions → commitments → /main
 *
 * This is the surprise-experience route. Share this link with Fariha
 * if you want her to see the full journey from scratch.
 */
const STAGES = ['intro', 'curtain', 'questions', 'commitments']

export default function WelcomePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [stage, setStage] = useState('intro')
  const [audioEnabled, setAudioEnabled] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(t)
  }, [])

  // Lock scrolling — everything fits inside overlays
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const advance = () => {
    const i = STAGES.indexOf(stage)
    if (i < STAGES.length - 1) {
      setStage(STAGES[i + 1])
    } else {
      navigate('/main')
    }
  }

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      {!loading && stage === 'intro' && (
        <IntroPopup
          onOpen={advance}
          audioEnabled={audioEnabled}
          onToggleAudio={() => setAudioEnabled((v) => !v)}
        />
      )}

      {!loading && stage === 'curtain' && (
        <CurtainReveal onComplete={advance} />
      )}

      {!loading && stage === 'questions' && (
        <Questions onComplete={advance} />
      )}

      {!loading && stage === 'commitments' && (
        <Commitments onComplete={advance} />
      )}
    </>
  )
}
