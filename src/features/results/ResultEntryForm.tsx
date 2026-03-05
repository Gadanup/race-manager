import React, { useEffect, useState } from 'react'
import { Box, Button, Divider, InputAdornment, TextField, Typography } from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'

import { ErrorAlert, LoadingSpinner, PointsBadge } from '@/components/shared'
import { useGetResults, useUpsertResults } from '@/hooks'
import { MAX_RACE_POSITIONS, POINTS_BY_POSITION, RACE_LABELS } from '@/helpers/constants'
import { useSnackbar } from '@/components/shared/SnackbarProvider'

import type { ResultEntry } from '@/types/result.types'

interface ResultEntryFormProps {
  raceId: string
  isLocked: boolean
}

const buildEmptyEntries = (): ResultEntry[] =>
  Array.from({ length: MAX_RACE_POSITIONS }, (_, index) => ({
    position: index + 1,
    playerName: '',
    points: POINTS_BY_POSITION[index] ?? 0,
  }))

const POSITION_LABELS: Record<number, { label: string; color: string }> = {
  1: { label: '1ST', color: '#FFD700' },
  2: { label: '2ND', color: '#C0C0C0' },
  3: { label: '3RD', color: '#CD7F32' },
}

export const ResultEntryForm = ({ raceId, isLocked }: ResultEntryFormProps) => {
  const [entries, setEntries] = useState<ResultEntry[]>(buildEmptyEntries())

  const { data: existingResults, isLoading, isError } = useGetResults(raceId)
  const { mutate: upsertResults, isPending: isSaving } = useUpsertResults(raceId)
  const { showSnackbar } = useSnackbar()

  // Pre-fill from existing results
  useEffect(() => {
    if (!existingResults) return

    setEntries((previous) =>
      previous.map((entry) => {
        const match = existingResults.find((result) => result.position === entry.position)
        return match ? { ...entry, playerName: match.player_name } : entry
      }),
    )
  }, [existingResults])

  if (isLoading) return <LoadingSpinner fullHeight={false} />
  if (isError) return <ErrorAlert />

  const handlePlayerNameChange = (position: number, playerName: string) => {
    setEntries((previous) =>
      previous.map((entry) => (entry.position === position ? { ...entry, playerName } : entry)),
    )
  }

  const handleSave = () => {
    upsertResults(entries, {
      onSuccess: () => showSnackbar(RACE_LABELS.resultsSuccess),
    })
  }

  const filledCount = entries.filter((entry) => entry.playerName.trim() !== '').length

  return (
    <Box sx={{ maxWidth: 600 }}>
      {/* Section header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <EmojiEventsIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h4">Race Results</Typography>
        </Box>
        <Typography variant="body2" color="text.disabled">
          {filledCount}/{MAX_RACE_POSITIONS} positions filled
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Position rows */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {entries.map((entry) => {
          const positionStyle = POSITION_LABELS[entry.position]

          return (
            <Box
              key={entry.position}
              sx={{
                display: 'grid',
                gridTemplateColumns: '52px 1fr 80px',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              {/* Position badge */}
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid',
                  borderColor: positionStyle ? positionStyle.color : 'divider',
                  bgcolor: positionStyle ? `${positionStyle.color}12` : 'background.paper',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: positionStyle ? positionStyle.color : 'text.disabled',
                    lineHeight: 1,
                  }}
                >
                  {positionStyle?.label ?? `P${entry.position}`}
                </Typography>
              </Box>

              {/* Player name input */}
              <TextField
                size="small"
                placeholder="Player name"
                value={entry.playerName}
                onChange={(event) => handlePlayerNameChange(entry.position, event.target.value)}
                disabled={isLocked}
                fullWidth
                InputProps={{
                  startAdornment: entry.playerName ? undefined : (
                    <InputAdornment position="start">
                      <Typography variant="caption" color="text.disabled">
                        #{entry.position}
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: entry.playerName ? 'rgba(246,195,42,0.04)' : 'transparent',
                  },
                }}
              />

              {/* Points */}
              <PointsBadge points={entry.points} size="small" />
            </Box>
          )
        })}
      </Box>

      {/* Save button */}
      {!isLocked && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={isSaving || filledCount === 0}
            sx={{ minWidth: 160 }}
          >
            {isSaving ? 'Saving...' : RACE_LABELS.saveResults}
          </Button>
        </Box>
      )}
    </Box>
  )
}
