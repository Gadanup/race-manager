import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getResultsByRace, upsertResults } from '@/api/results'
import type { ResultEntry } from '@/types/result.types'

export const RESULT_QUERY_KEYS = {
  byRace: (raceId: string) => ['results', raceId] as const,
}

export const useGetResults = (raceId: string) =>
  useQuery({
    queryKey: RESULT_QUERY_KEYS.byRace(raceId),
    queryFn: () => getResultsByRace(raceId),
    enabled: Boolean(raceId),
  })

export const useUpsertResults = (raceId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (entries: ResultEntry[]) => upsertResults(raceId, entries),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESULT_QUERY_KEYS.byRace(raceId) })
    },
  })
}
