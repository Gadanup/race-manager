import React from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'

import { EmptyState } from '@/components/shared'
import { LEADERBOARD_LABELS } from '@/helpers/constants'
import type { LeaderboardStandingEntry } from '@/types/leaderboard.types'

interface LeaderboardRaceRow {
  race_id: string
  races?: { name: string } | null
}

interface StandingsTableProps {
  standings: LeaderboardStandingEntry[]
  leaderboardRaces: LeaderboardRaceRow[]
}

const RANK_STYLES: Record<number, { color: string; bg: string }> = {
  1: { color: '#FFD700', bg: 'rgba(255,215,0,0.06)' },
  2: { color: '#C0C0C0', bg: 'rgba(192,192,192,0.04)' },
  3: { color: '#CD7F32', bg: 'rgba(205,127,50,0.06)' },
}

const PRIZE_LABELS: Record<number, string> = {
  1: '🥇',
  2: '🥈',
  3: '🥉',
}

export const StandingsTable = ({ standings, leaderboardRaces }: StandingsTableProps) => {
  if (standings.length === 0) {
    return (
      <EmptyState
        icon={<EmojiEventsIcon fontSize="inherit" />}
        title="No standings yet"
        subtitle="Results need to be entered for the races in this leaderboard"
      />
    )
  }

  const topTen = standings.slice(0, 10)

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {LEADERBOARD_LABELS.standings}
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 64 }}>Rank</TableCell>
              <TableCell>{LEADERBOARD_LABELS.driver}</TableCell>
              {leaderboardRaces.map((leaderboardRace) => (
                <TableCell key={leaderboardRace.race_id} align="center">
                  {leaderboardRace.races?.name ?? 'Race'}
                </TableCell>
              ))}
              <TableCell align="right">{LEADERBOARD_LABELS.totalPoints}</TableCell>
              <TableCell align="right">Prize</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {topTen.map((standingEntry) => {
              const rankStyle = RANK_STYLES[standingEntry.rank]
              const prizeLabel = PRIZE_LABELS[standingEntry.rank]

              return (
                <TableRow
                  key={standingEntry.playerName}
                  sx={{
                    bgcolor: rankStyle?.bg ?? 'transparent',
                    '&:hover': {
                      bgcolor: rankStyle?.bg ?? 'rgba(255,255,255,0.02)',
                    },
                    transition: 'background-color 0.15s',
                  }}
                >
                  {/* Rank */}
                  <TableCell>
                    <Typography
                      variant="h3"
                      sx={{
                        color: rankStyle?.color ?? 'text.disabled',
                        lineHeight: 1,
                        fontSize: rankStyle ? '2rem' : '1.25rem',
                      }}
                    >
                      {standingEntry.rank}
                    </Typography>
                  </TableCell>

                  {/* Driver name */}
                  <TableCell>
                    <Typography variant="h6" color={rankStyle ? 'text.primary' : 'text.secondary'}>
                      {standingEntry.playerName}
                    </Typography>
                  </TableCell>

                  {/* Per-race points */}
                  {leaderboardRaces.map((leaderboardRace) => {
                    const racePoints = standingEntry.racePts[leaderboardRace.race_id]

                    return (
                      <TableCell key={leaderboardRace.race_id} align="center">
                        <Typography
                          variant="body2"
                          color={racePoints ? 'text.primary' : 'text.disabled'}
                          sx={{ fontWeight: racePoints ? 600 : 400 }}
                        >
                          {racePoints ?? '—'}
                        </Typography>
                      </TableCell>
                    )
                  })}

                  {/* Total points */}
                  <TableCell align="right">
                    <Typography
                      variant="h4"
                      sx={{
                        color: rankStyle?.color ?? 'primary.main',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {standingEntry.totalPoints}
                    </Typography>
                  </TableCell>

                  {/* Prize */}
                  <TableCell align="right">
                    {prizeLabel ? (
                      <Typography variant="h5" sx={{ lineHeight: 1 }}>
                        {prizeLabel}
                      </Typography>
                    ) : (
                      <Typography variant="caption" color="text.disabled">
                        Top {standingEntry.rank}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {standings.length > 10 && (
        <Typography variant="caption" color="text.disabled" sx={{ mt: 1.5, display: 'block' }}>
          +{standings.length - 10} drivers outside prize positions
        </Typography>
      )}
    </Box>
  )
}
