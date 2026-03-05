import React from 'react'
import { Box, Divider, Typography } from '@mui/material'

import { LoginForm } from '@/features/auth/LoginForm'
import { PageTransition } from '@/components/layout'

export const LoginPage = () => {
  return (
    <PageTransition>
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 400,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderTop: '2px solid',
            borderTopColor: 'primary.main',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              px: 4,
              pt: 4,
              pb: 3,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h2" color="primary" sx={{ lineHeight: 1 }}>
              Race
            </Typography>
            <Typography variant="h2" color="text.primary" sx={{ lineHeight: 1 }}>
              Manager
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
              Sign in to manage your races
            </Typography>
          </Box>

          {/* Form */}
          <Box sx={{ px: 4, py: 4 }}>
            <LoginForm />
          </Box>
        </Box>
      </Box>
    </PageTransition>
  )
}
