import type { Tables, TablesInsert } from '@/types/supabase.types'

export type RaceResult = Tables<'race_results'>

export type CreateResultDto = TablesInsert<'race_results'>

export interface ResultEntry {
  position: number
  playerName: string
  points: number
}
