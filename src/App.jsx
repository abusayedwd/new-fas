import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import WelcomePage from './pages/WelcomePage'
import MainPage from './pages/MainPage'
import CurtainPage from './pages/CurtainPage'
import QuestionsPage from './pages/QuestionsPage'
import CommitmentsPage from './pages/CommitmentsPage'

/**
 * Routes:
 *   /             → full cinematic welcome (default; shown first)
 *   /welcome      → same as /
 *   /main         → main page only (Hero, Timeline, Letter, etc.)
 *   /curtain      → replay just the curtain reveal
 *   /questions    → replay just the Yes/No questions
 *   /commitments  → replay just the commitments
 *   *             → fallback to /
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/curtain" element={<CurtainPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/commitments" element={<CommitmentsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
