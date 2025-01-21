/*
--------------
File: useAuthStore.ts
Description: Global authentication store managing user session and Supabase auth state
--------------
*/

import { create } from 'zustand'
import { createClient } from '@supabase/supabase-js'
import { persist } from 'zustand/middleware'

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

interface User {
  id: string
  email: string
  role: 'customer' | 'agent' | 'admin'
  full_name?: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
  signUp: (email: string, password: string, full_name: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      signUp: async (email: string, password: string, full_name: string) => {
        try {
          set({ isLoading: true, error: null })
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name,
                role: 'customer', // Default role for new signups
              },
            },
          })
          if (error) throw error
          if (data.user) {
            set({
              user: {
                id: data.user.id,
                email: data.user.email!,
                role: data.user.user_metadata.role,
                full_name: data.user.user_metadata.full_name,
              },
            })
          }
        } catch (error) {
          set({ error: (error as Error).message })
        } finally {
          set({ isLoading: false })
        }
      },

      signIn: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null })
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          })
          if (error) throw error
          if (data.user) {
            set({
              user: {
                id: data.user.id,
                email: data.user.email!,
                role: data.user.user_metadata.role,
                full_name: data.user.user_metadata.full_name,
              },
            })
          }
        } catch (error) {
          set({ error: (error as Error).message })
        } finally {
          set({ isLoading: false })
        }
      },

      signOut: async () => {
        try {
          set({ isLoading: true, error: null })
          const { error } = await supabase.auth.signOut()
          if (error) throw error
          set({ user: null })
        } catch (error) {
          set({ error: (error as Error).message })
        } finally {
          set({ isLoading: false })
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-store',
    }
  )
) 