import React from 'react'
import { Box, Button, Chip, Stack, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { useNavigate, useParams } from 'react-router-dom'

import { PageHeader } from '@/components/layout'
import { ErrorAlert, LoadingSpinner } from '@/components/shared'
import { StandingsTable } from '@/features/leaderboards/StandingsTable'
import { useGetLeaderboard, useGetLeaderboardRaces, useGetLeaderboardStandings } from '@/hooks'
import { LEADERBOARD_LABELS, ROUTES } from '@/helpers/constants'

export const LeaderboardDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const {
    data: leaderboard,
    isLoading: leaderboardLoading,
    isError: leaderboardError,
  } = useGetLeaderboard(id ?? '')
  const {
    data: standings,
    isLoading: standingsLoading,
    isError: standingsError,
  } = useGetLeaderboardStandings(id ?? '')
  const { data: leaderboardRaces, isLoading: racesLoading } = useGetLeaderboardRaces(id ?? '')

  const isLoading = leaderboardLoading || standingsLoading || racesLoading
  const isError = leaderboardError || standingsError

  if (isLoading) return <LoadingSpinner />
  if (isError || !leaderboard) return <ErrorAlert />

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <PageHeader
        title={leaderboard.name}
        subtitle={leaderboard.description ?? undefined}
        action={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 1,
              bgcolor: 'rgba(246,195,42,0.06)',
              border: '1px solid',
              borderColor: 'primary.main',
            }}
          >
            <EmojiEventsIcon sx={{ fontSize: 16, color: 'primary.main' }} />
            <Typography variant="subtitle2" color="primary">
              {standings?.length ?? 0} Drivers
            </Typography>
          </Box>
        }
      />

      <Box sx={{ px: 4, pt: 3, pb: 6 }}>
        {/* Back button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(ROUTES.LEADERBOARDS)}
          sx={{ color: 'text.secondary', mb: 3 }}
        >
          {LEADERBOARD_LABELS.pageTitle}
        </Button>

        {/* Races included chips */}
        {leaderboardRaces && leaderboardRaces.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
              {LEADERBOARD_LABELS.racesIncluded}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {leaderboardRaces.map((leaderboardRace) => (
                <Chip
                  key={leaderboardRace.race_id}
                  label={leaderboardRace.races?.name ?? leaderboardRace.race_id}
                  size="small"
                  variant="outlined"
                  sx={{ borderColor: 'divider', color: 'text.secondary' }}
                />
              ))}
            </Stack>
          </Box>
        )}

        {/* Standings */}
        <StandingsTable standings={standings ?? []} leaderboardRaces={leaderboardRaces ?? []} />
      </Box>
    </Box>
  )
}
