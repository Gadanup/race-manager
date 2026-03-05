import React from 'react'
import { Box, Button, TextField, Typography, Alert } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, useLocation } from 'react-router-dom'

import { useSignIn } from '@/hooks'
import { ROUTES, UI_LABELS } from '@/helpers/constants'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { handleSignIn, isLoading, error } = useSignIn()

  const from = (location.state as { from?: Location })?.from?.pathname ?? ROUTES.RACES

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: LoginFormValues) => {
    await handleSignIn(values.email, values.password)
    navigate(from, { replace: true })
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 1 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        autoFocus
        fullWidth
        {...register('email')}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />

      <TextField
        label="Password"
        type="password"
        autoComplete="current-password"
        fullWidth
        {...register('password')}
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isLoading}
        sx={{ mt: 1, py: 1.5 }}
      >
        {isLoading ? UI_LABELS.loading : 'Sign In'}
      </Button>
    </Box>
  )
}
