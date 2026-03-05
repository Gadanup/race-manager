import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

import { UI_LABELS } from '@/helpers/constants'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  isLoading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel = UI_LABELS.confirm,
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{
        sx: {
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          minWidth: 360,
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText color="text.secondary">{message}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={onCancel}
          disabled={isLoading}
          sx={{ borderColor: 'divider', color: 'text.secondary' }}
        >
          {UI_LABELS.cancel}
        </Button>
        <Button variant="contained" color="error" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? UI_LABELS.loading : confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
