/*
--------------
File: ProtectedRoute.tsx
Description: Component that handles role-based access control for protected routes
--------------
*/

import React from 'react'
import { useAuthStore } from '../../hooks/useAuthStore'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: Array<'customer' | 'agent' | 'admin'>
}

export function ProtectedRoute({ children, allowedRoles = [] }: ProtectedRouteProps) {
  const { user } = useAuthStore()

  // If there's no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // If roles are specified and user's role isn't included, redirect to dashboard
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }

  // Render children if all checks pass
  return <>{children}</>
} 