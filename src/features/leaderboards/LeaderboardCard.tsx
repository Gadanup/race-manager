import React, { useState } from 'react'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import { ConfirmDialog } from '@/components/shared'
import { useDeleteLeaderboard } from '@/hooks'
import { LEADERBOARD_LABELS, UI_LABELS } from '@/helpers/constants'
import type { Leaderboard } from '@/types/leaderboard.types'

interface LeaderboardCardProps {
  leaderboard: Leaderboard
  onClick: () => void
}

export const LeaderboardCard = ({ leaderboard, onClick }: LeaderboardCardProps) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const { mutate: deleteLeaderboard, isPending: isDeleting } = useDeleteLeaderboard()

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setMenuAnchor(event.currentTarget)
  }

  const handleMenuClose = (event: React.MouseEvent) => {
    event.stopPropagation()
    setMenuAnchor(null)
  }

  const handleDeleteClick = (event: React.MouseEvent) => {
    handleMenuClose(event)
    setIsDeleteOpen(true)
  }

  const handleDeleteConfirm = () => {
    deleteLeaderboard(leaderboard.id, {
      onSuccess: () => setIsDeleteOpen(false),
    })
  }

  const formattedDate = new Date(leaderboard.created_at).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <>
      <Card
        sx={{
          height: '100%',
          position: 'relative',
          transition: 'border-color 0.15s',
          '&:hover': { borderColor: 'primary.main' },
        }}
      >
        {/* Top accent */}
        <Box sx={{ height: 2, bgcolor: 'primary.main' }} />

        <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
          <CardContent sx={{ p: 2.5 }}>
            {/* Header */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'rgba(246,195,42,0.1)',
                  border: '1px solid',
                  borderColor: 'primary.main',
                }}
              >
                <EmojiEventsIcon sx={{ fontSize: 18, color: 'primary.main' }} />
              </Box>
              <IconButton
                size="small"
                onClick={handleMenuOpen}
                sx={{ mt: -0.5, mr: -0.5, color: 'text.disabled' }}
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Name */}
            <Typography variant="h5" color="text.primary" sx={{ mb: 1 }}>
              {leaderboard.name}
            </Typography>

            {/* Description */}
            {leaderboard.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {leaderboard.description}
              </Typography>
            )}

            {/* Created date */}
            <Typography variant="caption" color="text.disabled">
              Created {formattedDate}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      {/* Action menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
          <Typography variant="body2" color="inherit">
            {UI_LABELS.delete}
          </Typography>
        </MenuItem>
      </Menu>

      {/* Delete confirm */}
      <ConfirmDialog
        open={isDeleteOpen}
        title={LEADERBOARD_LABELS.deleteConfirmTitle}
        message={LEADERBOARD_LABELS.deleteConfirmMessage}
        confirmLabel={UI_LABELS.delete}
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </>
  )
}
