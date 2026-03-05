import React, { createContext, useCallback, useContext, useState } from 'react'
import { Alert, Snackbar } from '@mui/material'

import { SNACKBAR_DURATION_MS } from '@/helpers/constants'

type SnackbarSeverity = 'success' | 'error' | 'warning' | 'info'

interface SnackbarMessage {
  message: string
  severity: SnackbarSeverity
}

interface SnackbarContextValue {
  showSnackbar: (message: string, severity?: SnackbarSeverity) => void
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null)

export const useSnackbar = () => {
  const context = useContext(SnackbarContext)
  if (!context) throw new Error('useSnackbar must be used within SnackbarProvider')
  return context
}

interface SnackbarProviderProps {
  children: React.ReactNode
}

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [snackbar, setSnackbar] = useState<SnackbarMessage | null>(null)
  const [open, setOpen] = useState(false)

  const showSnackbar = useCallback((message: string, severity: SnackbarSeverity = 'success') => {
    setSnackbar({ message, severity })
    setOpen(true)
  }, [])

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar open={open} autoHideDuration={SNACKBAR_DURATION_MS} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={snackbar?.severity ?? 'success'}
          variant="filled"
          sx={{ width: '100%', borderRadius: 0 }}
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}
