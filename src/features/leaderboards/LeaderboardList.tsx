import React from 'react'
import { Box, Grid } from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { useNavigate } from 'react-router-dom'

import { EmptyState, ErrorAlert, LoadingSpinner } from '@/components/shared'
import { useGetLeaderboards } from '@/hooks'
import { buildLeaderboardDetailRoute, LEADERBOARD_LABELS } from '@/helpers/constants'

import { LeaderboardCard } from './LeaderboardCard'

export const LeaderboardList = () => {
  const { data: leaderboards, isLoading, isError, refetch } = useGetLeaderboards()
  const navigate = useNavigate()

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorAlert onRetry={refetch} />

  if (!leaderboards?.length) {
    return (
      <EmptyState
        icon={<EmojiEventsIcon fontSize="inherit" />}
        title={LEADERBOARD_LABELS.noLeaderboards}
        subtitle={LEADERBOARD_LABELS.noLeaderboardsSubtitle}
      />
    )
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {leaderboards.map((leaderboard) => (
          <Grid item xs={12} sm={6} lg={4} key={leaderboard.id}>
            <LeaderboardCard
              leaderboard={leaderboard}
              onClick={() => navigate(buildLeaderboardDetailRoute(leaderboard.id))}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
