import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase.types'

export type RaceStatus = Enums<'race_status'>

export type Race = Tables<'races'>

export type CreateRaceDto = TablesInsert<'races'>

export type UpdateRaceDto = TablesUpdate<'races'>
