import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Commitments from '../components/Commitments'

/**
 * /commitments — just the promises, on their own.
 * Goes to /main when done.
 */
export default function CommitmentsPage() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return <Commitments onComplete={() => navigate('/main')} />
}
