import React, { useState } from 'react'
import { Box, Grid, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import FlagIcon from '@mui/icons-material/Flag'

import { EmptyState, ErrorAlert, LoadingSpinner } from '@/components/shared'
import { useGetRaces } from '@/hooks'
import { RACE_LABELS, RACE_STATUS_OPTIONS, UI_LABELS } from '@/helpers/constants'
import { RaceCard } from './RaceCard'
import type { RaceStatus } from '@/types/race.types'

interface RaceListProps {
  onRaceClick: (id: string) => void
}

const ALL_STATUSES = 'all'

export const RaceList = ({ onRaceClick }: RaceListProps) => {
  const { data: races, isLoading, isError, refetch } = useGetRaces()
  const [statusFilter, setStatusFilter] = useState<RaceStatus | typeof ALL_STATUSES>(ALL_STATUSES)

  if (isLoading) return <LoadingSpinner label={UI_LABELS.loading} />
  if (isError) return <ErrorAlert onRetry={refetch} />

  const filteredRaces =
    races?.filter((race) =>
      statusFilter === ALL_STATUSES ? true : race.status === statusFilter,
    ) ?? []

  return (
    <Box>
      {/* Filter bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Filter:
        </Typography>
        <Select
          size="small"
          value={statusFilter}
          onChange={(event: SelectChangeEvent) =>
            setStatusFilter(event.target.value as RaceStatus | typeof ALL_STATUSES)
          }
          sx={{ minWidth: 140 }}
        >
          <MenuItem value={ALL_STATUSES}>All Statuses</MenuItem>
          {RACE_STATUS_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="body2" color="text.disabled" sx={{ ml: 'auto' }}>
          {filteredRaces.length} race{filteredRaces.length !== 1 ? 's' : ''}
        </Typography>
      </Box>

      {/* Race grid */}
      {filteredRaces.length === 0 ? (
        <EmptyState
          icon={<FlagIcon fontSize="inherit" />}
          title={RACE_LABELS.noRaces}
          subtitle={
            statusFilter !== ALL_STATUSES
              ? `No ${statusFilter} races found`
              : RACE_LABELS.noRacesSubtitle
          }
        />
      ) : (
        <Grid container spacing={2}>
          {filteredRaces.map((race) => (
            <Grid item xs={12} sm={6} lg={4} key={race.id}>
              <RaceCard race={race} onClick={() => onRaceClick(race.id)} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}
