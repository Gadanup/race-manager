import React, { useState } from 'react'
import { Box, Button, Chip, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckIcon from '@mui/icons-material/Check'
import { useNavigate, useParams } from 'react-router-dom'

import { PageHeader } from '@/components/layout'
import { ConfirmDialog, ErrorAlert, LoadingSpinner, StatusChip } from '@/components/shared'
import { ResultEntryForm } from '@/features/results/ResultEntryForm'
import { useGetRace, useUpdateRace } from '@/hooks'
import { RACE_LABELS, ROUTES, UI_LABELS } from '@/helpers/constants'

export const RaceDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [isFinishDialogOpen, setIsFinishDialogOpen] = useState(false)

  const { data: race, isLoading, isError, refetch } = useGetRace(id ?? '')
  const { mutate: updateRace, isPending: isUpdating } = useUpdateRace(id ?? '')

  if (isLoading) return <LoadingSpinner />
  if (isError || !race) return <ErrorAlert onRetry={refetch} />

  const isFinished = race.status === 'finished'

  const formattedDate = race.date
    ? new Date(race.date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null

  const handleMarkFinished = () => {
    updateRace({ status: 'finished' }, { onSuccess: () => setIsFinishDialogOpen(false) })
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <PageHeader
        title={race.name}
        subtitle={[race.location, formattedDate].filter(Boolean).join(' · ') || undefined}
        action={
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <StatusChip status={race.status} />
            {!isFinished && (
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckIcon />}
                onClick={() => setIsFinishDialogOpen(true)}
              >
                {RACE_LABELS.markFinished}
              </Button>
            )}
          </Box>
        }
      />

      {/* Back button */}
      <Box sx={{ px: 4, pt: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(ROUTES.RACES)}
          sx={{ color: 'text.secondary', mb: 3 }}
        >
          {UI_LABELS.back}
        </Button>

        {isFinished && (
          <Box
            sx={{
              mb: 3,
              px: 2,
              py: 1.5,
              bgcolor: 'rgba(0, 196, 140, 0.06)',
              border: '1px solid',
              borderColor: 'success.main',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <CheckIcon sx={{ fontSize: 16, color: 'success.main' }} />
            <Typography variant="body2" color="success.main">
              {RACE_LABELS.resultsLocked}
            </Typography>
          </Box>
        )}

        <ResultEntryForm raceId={id ?? ''} isLocked={isFinished} />
      </Box>

      <ConfirmDialog
        open={isFinishDialogOpen}
        title={RACE_LABELS.markFinishedConfirmTitle}
        message={RACE_LABELS.markFinishedConfirmMessage}
        confirmLabel={RACE_LABELS.markFinished}
        isLoading={isUpdating}
        onConfirm={handleMarkFinished}
        onCancel={() => setIsFinishDialogOpen(false)}
      />
    </Box>
  )
}
