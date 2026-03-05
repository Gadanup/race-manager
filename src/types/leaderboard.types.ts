import type { Tables, TablesInsert } from '@/types/supabase.types'

import type { RaceResult } from './result.types'

export type Leaderboard = Tables<'leaderboards'>

export type LeaderboardRace = Tables<'leaderboard_races'>

export type CreateLeaderboardDto = TablesInsert<'leaderboards'>

export interface LeaderboardRaceWithResults {
  raceId: string
  raceName: string
  raceDate: string | null
  results: RaceResult[]
}

export interface LeaderboardStandingEntry {
  playerName: string
  totalPoints: number
  racePts: Record<string, number>
  finishCounts: number[]
  bestFinish: number
  rank: number
}

export interface LeaderboardWithRaces extends Leaderboard {
  races: LeaderboardRaceWithResults[]
}
