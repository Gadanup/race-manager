import React, { useEffect } from 'react'
import { Box, Button, Drawer, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useCreateRace, useUpdateRace } from '@/hooks'
import { useSnackbar } from '@/components/shared/SnackbarProvider'
import { RACE_LABELS, RACE_STATUS_OPTIONS, UI_LABELS } from '@/helpers/constants'
import type { Race } from '@/types/race.types'

const raceFormSchema = z.object({
  name: z.string().min(1, 'Race name is required'),
  location: z.string().optional(),
  date: z.string().optional(),
  status: z.enum(['pending', 'ongoing', 'finished']),
})

type RaceFormValues = z.infer<typeof raceFormSchema>

interface RaceFormDrawerProps {
  open: boolean
  race?: Race
  onClose: () => void
}

export const RaceFormDrawer = ({ open, race, onClose }: RaceFormDrawerProps) => {
  const isEditing = Boolean(race)

  const { mutate: createRace, isPending: isCreating } = useCreateRace()
  const { mutate: updateRace, isPending: isUpdating } = useUpdateRace(race?.id ?? '')

  const isPending = isCreating || isUpdating

  const { showSnackbar } = useSnackbar()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RaceFormValues>({
    resolver: zodResolver(raceFormSchema),
    defaultValues: {
      name: '',
      location: '',
      date: '',
      status: 'pending',
    },
  })

  useEffect(() => {
    if (open) {
      reset({
        name: race?.name ?? '',
        location: race?.location ?? '',
        date: race?.date ?? '',
        status: race?.status ?? 'pending',
      })
    }
  }, [open, race, reset])

  const onSubmit = (values: RaceFormValues) => {
    if (isEditing && race) {
      updateRace(
        {
          name: values.name,
          location: values.location ?? null,
          date: values.date ?? null,
          status: values.status,
        },
        {
          onSuccess: () => {
            showSnackbar(RACE_LABELS.updateSuccess)
            onClose()
          },
        },
      )
    } else {
      createRace(
        {
          name: values.name,
          location: values.location ?? null,
          date: values.date ?? null,
          status: values.status,
          created_by: '', // injected server-side via RLS — placeholder
        },
        {
          onSuccess: () => {
            showSnackbar(RACE_LABELS.createSuccess)
            onClose()
          },
        },
      )
    }
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 440 },
          bgcolor: 'background.paper',
          borderLeft: '1px solid',
          borderColor: 'divider',
          p: 0,
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
        <Typography variant="h4">
          {isEditing ? RACE_LABELS.editRace : RACE_LABELS.createRace}
        </Typography>
      </Box>

      {/* Form */}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <Stack spacing={3} sx={{ p: 3, flexGrow: 1 }}>
          <TextField
            label={RACE_LABELS.raceName}
            {...register('name')}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            fullWidth
          />
          <TextField label={RACE_LABELS.location} {...register('location')} fullWidth />
          <TextField
            label={RACE_LABELS.date}
            type="date"
            {...register('date')}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              {RACE_LABELS.status}
            </Typography>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select {...field} fullWidth size="small">
                  {RACE_STATUS_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </Box>
        </Stack>

        {/* Footer actions */}
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
