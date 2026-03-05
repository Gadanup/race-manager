import type { Session, User } from '@supabase/supabase-js'

export interface AuthUser {
  id: string
  email: string | undefined
}

export interface AuthSession {
  user: AuthUser
  session: Session
}

export type AuthError = {
  message: string
  status?: number
}

export type { User, Session }
