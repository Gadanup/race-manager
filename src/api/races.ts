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

export const createRace = async (dto: Omit<CreateRaceDto, 'created_by'>) => {
  const { data: sessionData } = await supabase.auth.getSession()
  const userId = sessionData.session?.user.id

  if (!userId) throw new Error('User not authenticated')

  const { data, error } = await supabase
    .from('races')
    .insert({ ...dto, created_by: userId })
    .select()
    .single()

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
