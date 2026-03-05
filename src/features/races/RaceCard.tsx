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
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import { ConfirmDialog, StatusChip } from '@/components/shared'
import { useDeleteRace } from '@/hooks'
import { RACE_LABELS, UI_LABELS } from '@/helpers/constants'
import type { Race } from '@/types/race.types'

import { RaceFormDrawer } from './RaceFormDrawer'

interface RaceCardProps {
  race: Race
  onClick: () => void
}

export const RaceCard = ({ race, onClick }: RaceCardProps) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const { mutate: deleteRace, isPending: isDeleting } = useDeleteRace()

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setMenuAnchor(event.currentTarget)
  }

  const handleMenuClose = (event: React.MouseEvent) => {
    event.stopPropagation()
    setMenuAnchor(null)
  }

  const handleEditClick = (event: React.MouseEvent) => {
    handleMenuClose(event)
    setIsEditOpen(true)
  }

  const handleDeleteClick = (event: React.MouseEvent) => {
    handleMenuClose(event)
    setIsDeleteOpen(true)
  }

  const handleDeleteConfirm = () => {
    deleteRace(race.id, {
      onSuccess: () => setIsDeleteOpen(false),
    })
  }

  const formattedDate = race.date
    ? new Date(race.date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null

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
        {/* Top accent bar based on status */}
        <Box
          sx={{
            height: 2,
            bgcolor:
              race.status === 'finished'
                ? 'success.main'
                : race.status === 'ongoing'
                  ? 'warning.main'
                  : 'divider',
          }}
        />

        <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
          <CardContent sx={{ p: 2.5 }}>
            {/* Header row */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                mb: 1.5,
              }}
            >
              <StatusChip status={race.status} />
              <IconButton
                size="small"
                onClick={handleMenuOpen}
                sx={{ mt: -0.5, mr: -0.5, color: 'text.disabled' }}
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Race name */}
            <Typography variant="h5" color="text.primary" sx={{ mb: 1.5 }}>
              {race.name}
            </Typography>

            {/* Meta info */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              {race.location && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                  <Typography variant="caption" color="text.secondary">
                    {race.location}
                  </Typography>
                </Box>
              )}
              {formattedDate && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarTodayIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                  <Typography variant="caption" color="text.secondary">
                    {formattedDate}
                  </Typography>
                </Box>
              )}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>

      {/* Action menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' },
        }}
      >
        <MenuItem onClick={handleEditClick}>
          <Typography variant="body2">{UI_LABELS.edit}</Typography>
        </MenuItem>
        <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
          <Typography variant="body2" color="inherit">
            {UI_LABELS.delete}
          </Typography>
        </MenuItem>
      </Menu>

      {/* Edit drawer */}
      <RaceFormDrawer open={isEditOpen} race={race} onClose={() => setIsEditOpen(false)} />

      {/* Delete confirm */}
      <ConfirmDialog
        open={isDeleteOpen}
        title={RACE_LABELS.deleteConfirmTitle}
        message={RACE_LABELS.deleteConfirmMessage}
        confirmLabel={UI_LABELS.delete}
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </>
  )
}
