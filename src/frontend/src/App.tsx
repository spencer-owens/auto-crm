import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '../components/ThemeProvider'
import { LoginPage } from '../pages/auth/LoginPage'
import { SignupPage } from '../pages/auth/SignupPage'
import { ProtectedRoute } from '../components/auth/ProtectedRoute'
import { useAuthStore } from '../hooks/useAuthStore'

function App() {
  const { user } = useAuthStore()

  return (
    <ThemeProvider>
      <Router>
        <main className="min-h-screen bg-background">
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/dashboard" replace /> : <SignupPage />}
            />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <div className="container py-8">
                    <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
                    <p className="mt-4 text-muted-foreground">Welcome to your dashboard</p>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <div className="container py-8">
                    <h1 className="text-4xl font-bold text-foreground">Admin Panel</h1>
                    <p className="mt-4 text-muted-foreground">Admin controls and settings</p>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  )
}

export default App
