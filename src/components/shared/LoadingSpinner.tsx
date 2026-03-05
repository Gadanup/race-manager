import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

interface LoadingSpinnerProps {
  label?: string
  fullHeight?: boolean
}

export const LoadingSpinner = ({ label, fullHeight = true }: LoadingSpinnerProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        ...(fullHeight && { minHeight: '60vh' }),
        py: fullHeight ? 0 : 6,
      }}
    >
      <CircularProgress color="primary" size={36} thickness={3} />
      {label && (
        <Typography variant="body2" color="text.disabled">
          {label}
        </Typography>
      )}
    </Box>
  )
}
