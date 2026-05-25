import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { AuthProvider } from './hooks/useAuth'
import ProtectedRoute from './components/ProtectedRoute'

import LoginPage from './pages/LoginPage'
import WelcomePage from './pages/WelcomePage'
import MainPage from './pages/MainPage'
import CurtainPage from './pages/CurtainPage'
import QuestionsPage from './pages/QuestionsPage'
import CommitmentsPage from './pages/CommitmentsPage'

/**
 * Routes:
 *   /login        → public login page (shown first, default)
 *   /             → redirects to /welcome (or /login if not signed in)
 *   /welcome      → full cinematic welcome (auth required)
 *   /main         → main page only (auth required)
 *   /curtain      → replay just the curtain reveal (auth required)
 *   /questions    → replay just the Yes/No questions (auth required)
 *   /commitments  → replay just the commitments (auth required)
 *   *             → fallback to /
 *
 * Demo credentials are visible on /login under the "Need a hint?" toggle.
 */
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />

          {/* Default → welcome (auth gate redirects to /login if needed) */}
          <Route path="/" element={<Navigate to="/welcome" replace />} />

          {/* Protected */}
          <Route
            path="/welcome"
            element={
              <ProtectedRoute>
                <WelcomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/main"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/curtain"
            element={
              <ProtectedRoute>
                <CurtainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/questions"
            element={
              <ProtectedRoute>
                <QuestionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/commitments"
            element={
              <ProtectedRoute>
                <CommitmentsPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
