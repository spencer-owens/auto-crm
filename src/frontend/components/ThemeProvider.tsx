/*
--------------
File: ThemeProvider.tsx
Description: Theme provider component that manages light/dark mode
--------------
*/

import React, { useEffect } from 'react'
import { useAppStore } from '../hooks/useAppStore'

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useAppStore((state) => state.theme)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  return <>{children}</>
} 