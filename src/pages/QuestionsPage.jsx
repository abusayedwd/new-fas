import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Questions from '../components/Questions'

/**
 * /questions — just the Yes/No experience, on its own.
 * Continues to /commitments when done.
 */
export default function QuestionsPage() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return <Questions onComplete={() => navigate('/commitments')} />
}
