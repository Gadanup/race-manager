import React from 'react'
import { Box } from '@mui/material'

interface PageTransitionProps {
  children: React.ReactNode
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <Box
      sx={{
        animation: 'fadeSlideIn 0.2s ease both',
        '@keyframes fadeSlideIn': {
          from: { opacity: 0, transform: 'translateY(8px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      {children}
    </Box>
  )
}
