import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CurtainReveal from '../components/CurtainReveal'

/**
 * /curtain — just the curtain reveal, on its own.
 * After the animation completes, navigates to /main.
 */
export default function CurtainPage() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return <CurtainReveal onComplete={() => navigate('/main')} />
}
