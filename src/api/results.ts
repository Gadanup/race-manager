import { supabase } from '@/api/supabaseClient'
import { POINTS_BY_POSITION } from '@/helpers/constants'
import type { ResultEntry } from '@/types/result.types'

export const getResultsByRace = async (raceId: string) => {
  const { data, error } = await supabase
    .from('race_results')
    .select('*')
    .eq('race_id', raceId)
    .order('position', { ascending: true })

  if (error) throw error

  return data
}

export const upsertResults = async (raceId: string, entries: ResultEntry[]) => {
  const filledEntries = entries.filter((entry) => entry.playerName.trim() !== '')

  const rows = filledEntries.map((entry) => ({
    race_id: raceId,
    player_name: entry.playerName.trim(),
    position: entry.position,
    points: POINTS_BY_POSITION[entry.position - 1] ?? 0,
  }))

  // Delete existing results for this race first then re-insert
  const { error: deleteError } = await supabase.from('race_results').delete().eq('race_id', raceId)

  if (deleteError) throw deleteError

  if (rows.length === 0) return []

  const { data, error } = await supabase.from('race_results').insert(rows).select()

  if (error) throw error

  return data
}
