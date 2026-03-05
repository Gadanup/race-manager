import React from 'react'
import { Chip } from '@mui/material'

import type { RaceStatus } from '@/types/race.types'
import { RACE_STATUS_LABELS } from '@/helpers/constants'

interface StatusChipProps {
  status: RaceStatus
}

const STATUS_COLORS: Record<RaceStatus, 'default' | 'warning' | 'success'> = {
  pending: 'default',
  ongoing: 'warning',
  finished: 'success',
}

export const StatusChip = ({ status }: StatusChipProps) => {
  return (
    <Chip
      label={RACE_STATUS_LABELS[status]}
      color={STATUS_COLORS[status]}
      size="small"
      variant="outlined"
    />
  )
}
