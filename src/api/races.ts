import { supabase } from '@/api/supabaseClient'
import type { CreateRaceDto, UpdateRaceDto } from '@/types/race.types'

export const getRaces = async () => {
  const { data, error } = await supabase
    .from('races')
    .select('*')
    .order('date', { ascending: false })

  if (error) throw error

  return data
}

export const getRaceById = async (id: string) => {
  const { data, error } = await supabase.from('races').select('*').eq('id', id).single()

  if (error) throw error

  return data
}

export const createRace = async (dto: CreateRaceDto) => {
  const { data, error } = await supabase.from('races').insert(dto).select().single()

  if (error) throw error

  return data
}

export const updateRace = async (id: string, dto: UpdateRaceDto) => {
  const { data, error } = await supabase.from('races').update(dto).eq('id', id).select().single()

  if (error) throw error

  return data
}

export const deleteRace = async (id: string) => {
  const { error } = await supabase.from('races').delete().eq('id', id)

  if (error) throw error
}
