import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createLeaderboard,
  deleteLeaderboard,
  getLeaderboardById,
  getLeaderboardRaces,
  getLeaderboards,
} from '@/api/leaderboards'
import { getResultsByRace } from '@/api/results'
import { POINTS_BY_POSITION } from '@/helpers/constants'
import type { CreateLeaderboardDto, LeaderboardStandingEntry } from '@/types/leaderboard.types'

export const LEADERBOARD_QUERY_KEYS = {
  all: ['leaderboards'] as const,
  detail: (id: string) => ['leaderboards', id] as const,
  standings: (id: string) => ['leaderboards', id, 'standings'] as const,
}

export const useGetLeaderboards = () =>
  useQuery({
    queryKey: LEADERBOARD_QUERY_KEYS.all,
    queryFn: getLeaderboards,
  })

export const useGetLeaderboard = (id: string) =>
  useQuery({
    queryKey: LEADERBOARD_QUERY_KEYS.detail(id),
    queryFn: () => getLeaderboardById(id),
    enabled: Boolean(id),
  })

export const useGetLeaderboardStandings = (leaderboardId: string) =>
  useQuery({
    queryKey: LEADERBOARD_QUERY_KEYS.standings(leaderboardId),
    queryFn: async () => {
      const leaderboardRaces = await getLeaderboardRaces(leaderboardId)

      const raceResultsPerRace = await Promise.all(
        leaderboardRaces.map((leaderboardRace) => getResultsByRace(leaderboardRace.race_id)),
      )

      const playerMap: Record<string, LeaderboardStandingEntry> = {}

      leaderboardRaces.forEach((leaderboardRace, raceIndex) => {
        const results = raceResultsPerRace[raceIndex]

        results.forEach((result) => {
          if (!playerMap[result.player_name]) {
            playerMap[result.player_name] = {
              playerName: result.player_name,
              totalPoints: 0,
              racePts: {},
              finishCounts: Array(POINTS_BY_POSITION.length).fill(0),
              bestFinish: 999,
              rank: 0,
            }
          }

          const playerEntry = playerMap[result.player_name]
          playerEntry.totalPoints += result.points
          playerEntry.racePts[leaderboardRace.race_id] = result.points
          playerEntry.finishCounts[result.position - 1]++

          if (result.position < playerEntry.bestFinish) {
            playerEntry.bestFinish = result.position
          }
        })
      })

      const standings = Object.values(playerMap).sort((playerA, playerB) => {
        if (playerB.totalPoints !== playerA.totalPoints) {
          return playerB.totalPoints - playerA.totalPoints
        }

        for (let positionIndex = 0; positionIndex < 3; positionIndex++) {
          const countDiff =
            playerB.finishCounts[positionIndex] - playerA.finishCounts[positionIndex]
          if (countDiff !== 0) return countDiff
        }

        return playerA.bestFinish - playerB.bestFinish
      })

      return standings.map((playerEntry, index) => ({
        ...playerEntry,
        rank: index + 1,
      }))
    },
    enabled: Boolean(leaderboardId),
  })

export const useCreateLeaderboard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ dto, raceIds }: { dto: CreateLeaderboardDto; raceIds: string[] }) =>
      createLeaderboard(dto, raceIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LEADERBOARD_QUERY_KEYS.all })
    },
  })
}

export const useDeleteLeaderboard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteLeaderboard(id),
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: LEADERBOARD_QUERY_KEYS.all })
      const previousLeaderboards = queryClient.getQueryData(LEADERBOARD_QUERY_KEYS.all)
      queryClient.setQueryData(LEADERBOARD_QUERY_KEYS.all, (old: unknown) => {
        if (!Array.isArray(old)) return old
        return old.filter((leaderboard: { id: string }) => leaderboard.id !== deletedId)
      })
      return { previousLeaderboards }
    },
    onError: (_err, _id, context) => {
      if (context?.previousLeaderboards) {
        queryClient.setQueryData(LEADERBOARD_QUERY_KEYS.all, context.previousLeaderboards)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: LEADERBOARD_QUERY_KEYS.all })
    },
  })
}
