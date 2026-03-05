import React from 'react'
import { Box, Typography } from '@mui/material'

interface PageHeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
}

export const PageHeader = ({ title, subtitle, action }: PageHeaderProps) => {
  return (
    <Box
      sx={{
        px: 4,
        py: 3,
        borderBottom: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Box>
        <Typography variant="h2" color="text.primary" sx={{ lineHeight: 1 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
    </Box>
  )
}
