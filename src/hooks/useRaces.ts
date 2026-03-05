import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createRace, deleteRace, getRaceById, getRaces, updateRace } from '@/api/races'
import type { CreateRaceDto, UpdateRaceDto } from '@/types/race.types'

export const RACE_QUERY_KEYS = {
  all: ['races'] as const,
  detail: (id: string) => ['races', id] as const,
}

export const useGetRaces = () =>
  useQuery({
    queryKey: RACE_QUERY_KEYS.all,
    queryFn: getRaces,
  })

export const useGetRace = (id: string) =>
  useQuery({
    queryKey: RACE_QUERY_KEYS.detail(id),
    queryFn: () => getRaceById(id),
    enabled: Boolean(id),
  })

export const useCreateRace = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: CreateRaceDto) => createRace(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RACE_QUERY_KEYS.all })
    },
  })
}

export const useUpdateRace = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: UpdateRaceDto) => updateRace(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RACE_QUERY_KEYS.all })
      queryClient.invalidateQueries({ queryKey: RACE_QUERY_KEYS.detail(id) })
    },
  })
}

export const useDeleteRace = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteRace(id),
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: RACE_QUERY_KEYS.all })
      const previousRaces = queryClient.getQueryData(RACE_QUERY_KEYS.all)
      queryClient.setQueryData(RACE_QUERY_KEYS.all, (old: unknown) => {
        if (!Array.isArray(old)) return old
        return old.filter((race: { id: string }) => race.id !== deletedId)
      })
      return { previousRaces }
    },
    onError: (_err, _id, context) => {
      if (context?.previousRaces) {
        queryClient.setQueryData(RACE_QUERY_KEYS.all, context.previousRaces)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: RACE_QUERY_KEYS.all })
    },
  })
}
