import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { signIn, signOut } from '@/api/auth'
import { supabase } from '@/api/supabaseClient'
import type { Session } from '@/types/auth.types'

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setIsLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, updatedSession) => {
      setSession(updatedSession)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  return { session, isLoading }
}

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      await signIn(email, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
    } finally {
      setIsLoading(false)
    }
  }

  return { handleSignIn, isLoading, error }
}

export const useSignOut = () => {
  const queryClient = useQueryClient()

  const handleSignOut = async () => {
    await signOut()
    queryClient.clear()
  }

  return { handleSignOut }
}
