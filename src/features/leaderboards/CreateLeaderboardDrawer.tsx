import React, { useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import FlagIcon from '@mui/icons-material/Flag'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { EmptyState, ErrorAlert, LoadingSpinner, StatusChip } from '@/components/shared'
import { useCreateLeaderboard, useGetRaces } from '@/hooks'
import { LEADERBOARD_LABELS, UI_LABELS } from '@/helpers/constants'
import { supabase } from '@/api/supabaseClient'

const createLeaderboardSchema = z.object({
  name: z.string().min(1, 'Leaderboard name is required'),
  description: z.string().optional(),
})

type CreateLeaderboardFormValues = z.infer<typeof createLeaderboardSchema>

interface CreateLeaderboardDrawerProps {
  open: boolean
  onClose: () => void
}

export const CreateLeaderboardDrawer = ({ open, onClose }: CreateLeaderboardDrawerProps) => {
  const [selectedRaceIds, setSelectedRaceIds] = useState<string[]>([])
  const [noRacesError, setNoRacesError] = useState(false)

  const { data: races, isLoading: racesLoading, isError: racesError } = useGetRaces()
  const { mutate: createLeaderboard, isPending } = useCreateLeaderboard()

  const finishedRaces = races?.filter((race) => race.status === 'finished') ?? []

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateLeaderboardFormValues>({
    resolver: zodResolver(createLeaderboardSchema),
    defaultValues: { name: '', description: '' },
  })

  useEffect(() => {
    if (open) {
      reset({ name: '', description: '' })
      setSelectedRaceIds([])
      setNoRacesError(false)
    }
  }, [open, reset])

  const handleRaceToggle = (raceId: string) => {
    setSelectedRaceIds((previous) =>
      previous.includes(raceId)
        ? previous.filter((existingId) => existingId !== raceId)
        : [...previous, raceId],
    )
    setNoRacesError(false)
  }

  const onSubmit = async (values: CreateLeaderboardFormValues) => {
    if (selectedRaceIds.length === 0) {
      setNoRacesError(true)
      return
    }

    const { data: sessionData } = await supabase.auth.getSession()
    const userId = sessionData.session?.user.id

    if (!userId) return

    createLeaderboard(
      {
        dto: {
          name: values.name,
          description: values.description ?? null,
          created_by: userId,
        },
        raceIds: selectedRaceIds,
      },
      { onSuccess: onClose },
    )
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 480 },
          bgcolor: 'background.paper',
          borderLeft: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 3,
          py: 2.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h4">{LEADERBOARD_LABELS.createLeaderboard}</Typography>
      </Box>

      {/* Form */}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}
      >
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
          <Stack spacing={3}>
            {/* Name & description */}
            <TextField
              label={LEADERBOARD_LABELS.leaderboardName}
              {...register('name')}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              fullWidth
            />
            <TextField
              label={LEADERBOARD_LABELS.description}
              {...register('description')}
              fullWidth
              multiline
              rows={2}
            />

            {/* Race selector */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                {LEADERBOARD_LABELS.selectRaces}
              </Typography>
              <Typography variant="caption" color="text.disabled" sx={{ mb: 2, display: 'block' }}>
                {LEADERBOARD_LABELS.selectRacesSubtitle}
              </Typography>

              {noRacesError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  Select at least one race
                </Alert>
              )}

              {racesLoading && <LoadingSpinner fullHeight={false} />}
              {racesError && <ErrorAlert />}

              {!racesLoading && !racesError && finishedRaces.length === 0 && (
                <EmptyState
                  icon={<FlagIcon fontSize="inherit" />}
                  title={LEADERBOARD_LABELS.noFinishedRaces}
                  subtitle={LEADERBOARD_LABELS.noFinishedRacesSubtitle}
                />
              )}

              {finishedRaces.length > 0 && (
                <Box
                  sx={{
                    border: '1px solid',
                    borderColor: noRacesError ? 'error.main' : 'divider',
                  }}
                >
                  {finishedRaces.map((race, index) => (
                    <Box
                      key={race.id}
                      sx={{
                        px: 2,
                        py: 1.5,
                        borderBottom: index < finishedRaces.length - 1 ? '1px solid' : 'none',
                        borderColor: 'divider',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        bgcolor: selectedRaceIds.includes(race.id)
                          ? 'rgba(246,195,42,0.04)'
                          : 'transparent',
                        transition: 'background-color 0.15s',
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedRaceIds.includes(race.id)}
                            onChange={() => handleRaceToggle(race.id)}
                            color="primary"
                            size="small"
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="body2" color="text.primary">
                              {race.name}
                            </Typography>
                            {race.location && (
                              <Typography variant="caption" color="text.disabled">
                                {race.location}
                              </Typography>
                            )}
                          </Box>
                        }
                        sx={{ flexGrow: 1, mr: 0 }}
                      />
                      <StatusChip status={race.status} />
                    </Box>
                  ))}
                </Box>
              )}

              {selectedRaceIds.length > 0 && (
                <Typography variant="caption" color="primary" sx={{ mt: 1, display: 'block' }}>
                  {selectedRaceIds.length} race{selectedRaceIds.length !== 1 ? 's' : ''} selected
                </Typography>
              )}
            </Box>
          </Stack>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            px: 3,
            py: 2.5,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            gap: 2,
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant="outlined"
            color="inherit"
            onClick={onClose}
            disabled={isPending}
            sx={{ borderColor: 'divider', color: 'text.secondary' }}
          >
            {UI_LABELS.cancel}
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={isPending}>
            {isPending ? UI_LABELS.loading : UI_LABELS.save}
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}
