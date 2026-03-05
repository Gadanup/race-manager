import React, { useState } from 'react'
import { Box, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'

import { PageHeader } from '@/components/layout'
import { RaceList } from '@/features/races/RaceList'
import { RaceFormDrawer } from '@/features/races/RaceFormDrawer'
import { RACE_LABELS } from '@/helpers/constants'

export const RacesPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <PageHeader
        title={RACE_LABELS.pageTitle}
        subtitle="Manage and track all your street races"
        action={
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setIsFormOpen(true)}
          >
            {RACE_LABELS.createRace}
          </Button>
        }
      />
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <RaceList onRaceClick={(id) => navigate(`/races/${id}`)} />
      </Box>
      <RaceFormDrawer open={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </Box>
  )
}
