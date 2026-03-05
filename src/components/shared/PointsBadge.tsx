import React from 'react'
import { Box, Typography } from '@mui/material'

interface PointsBadgeProps {
  points: number
  size?: 'small' | 'medium' | 'large'
}

const SIZE_MAP = {
  small: { px: 1, py: 0.25, variant: 'caption' as const },
  medium: { px: 1.5, py: 0.5, variant: 'subtitle2' as const },
  large: { px: 2, py: 0.75, variant: 'subtitle1' as const },
}

export const PointsBadge = ({ points, size = 'medium' }: PointsBadgeProps) => {
  const sizeConfig = SIZE_MAP[size]

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        px: sizeConfig.px,
        py: sizeConfig.py,
        bgcolor: 'rgba(246, 195, 42, 0.1)',
        border: '1px solid',
        borderColor: 'primary.main',
      }}
    >
      <Typography
        variant={sizeConfig.variant}
        color="primary"
        sx={{ fontWeight: 700, lineHeight: 1 }}
      >
        +{points}
      </Typography>
    </Box>
  )
}
