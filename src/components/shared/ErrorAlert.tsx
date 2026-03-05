import React from 'react'
import { Alert, Box, Button } from '@mui/material'

import { UI_LABELS } from '@/helpers/constants'

interface ErrorAlertProps {
  message?: string
  onRetry?: () => void
}

export const ErrorAlert = ({ message = UI_LABELS.genericError, onRetry }: ErrorAlertProps) => {
  return (
    <Box sx={{ px: 4, py: 3 }}>
      <Alert
        severity="error"
        action={
          onRetry && (
            <Button color="inherit" size="small" onClick={onRetry}>
              {UI_LABELS.retry}
            </Button>
          )
        }
      >
        {message}
      </Alert>
    </Box>
  )
}
