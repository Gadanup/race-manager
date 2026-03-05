import { supabase } from '@/api/supabaseClient'
import type { CreateLeaderboardDto } from '@/types/leaderboard.types'

export const getLeaderboards = async () => {
  const { data, error } = await supabase
    .from('leaderboards')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error

  return data
}

export const getLeaderboardById = async (id: string) => {
  const { data, error } = await supabase.from('leaderboards').select('*').eq('id', id).single()

  if (error) throw error

  return data
}

export const getLeaderboardRaces = async (leaderboardId: string) => {
  const { data, error } = await supabase
    .from('leaderboard_races')
    .select(
      `
      race_id,
      weight,
      races (
        id,
        name,
        date,
        location,
        status
      )
    `,
    )
    .eq('leaderboard_id', leaderboardId)

  if (error) throw error

  return data
}

export const createLeaderboard = async (dto: CreateLeaderboardDto, raceIds: string[]) => {
  const { data, error } = await supabase.from('leaderboards').insert(dto).select().single()

  if (error) throw error

  if (raceIds.length > 0) {
    const leaderboardRaceRows = raceIds.map((raceId) => ({
      leaderboard_id: data.id,
      race_id: raceId,
      weight: 1,
    }))

    const { error: joinError } = await supabase
      .from('leaderboard_races')
      .insert(leaderboardRaceRows)

    if (joinError) throw joinError
  }

  return data
}

export const deleteLeaderboard = async (id: string) => {
  const { error } = await supabase.from('leaderboards').delete().eq('id', id)

  if (error) throw error
}
