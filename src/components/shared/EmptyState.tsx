import React from 'react'
import { Box, Button, Typography } from '@mui/material'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  subtitle?: string
  actionLabel?: string
  onAction?: () => void
}

export const EmptyState = ({ icon, title, subtitle, actionLabel, onAction }: EmptyStateProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 10,
        px: 4,
        gap: 2,
        textAlign: 'center',
      }}
    >
      {icon && <Box sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }}>{icon}</Box>}
      <Typography variant="h4" color="text.secondary">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.disabled">
          {subtitle}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Button variant="contained" color="primary" onClick={onAction} sx={{ mt: 1 }}>
          {actionLabel}
        </Button>
      )}
    </Box>
  )
}
