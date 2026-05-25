import { createContext, useContext, useState } from 'react'

/**
 * Pseudo-authentication for this personal surprise site.
 *
 * Two demo accounts share the same wedding-date password.
 * Anyone with the link can see the credential hint on the login screen,
 * since this is a sentimental site — not real security.
 */
const ACCOUNTS = [
  {
    username: 'fariha',
    password: '15052026',
    name: 'Fariha',
    role: 'beloved',
  },
  {
    username: 'sayed',
    password: '15052026',
    name: 'Abu Sayed',
    role: 'husband',
  },
]

const STORAGE_KEY = 'srp-user'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const login = (username, password) => {
    const account = ACCOUNTS.find(
      (a) =>
        a.username === username.trim().toLowerCase() &&
        a.password === password.trim()
    )
    if (!account) return { ok: false, error: 'Invalid username or password.' }

    const safe = {
      username: account.username,
      name: account.name,
      role: account.role,
    }
    setUser(safe)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safe))
    return { ok: true, user: safe }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}

/** Exposed only so the LoginPage can render a small hint card. */
export const DEMO_ACCOUNTS = ACCOUNTS.map(({ username, password, name }) => ({
  username,
  password,
  name,
}))
