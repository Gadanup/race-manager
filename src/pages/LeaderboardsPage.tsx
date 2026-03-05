import React, { useState } from 'react'
import { Box, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import { PageHeader } from '@/components/layout'
import { LeaderboardList } from '@/features/leaderboards/LeaderboardList'
import { CreateLeaderboardDrawer } from '@/features/leaderboards/CreateLeaderboardDrawer'
import { LEADERBOARD_LABELS } from '@/helpers/constants'

export const LeaderboardsPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <PageHeader
        title={LEADERBOARD_LABELS.pageTitle}
        subtitle="Combine multiple races into a championship standing"
        action={
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setIsDrawerOpen(true)}
          >
            {LEADERBOARD_LABELS.createLeaderboard}
          </Button>
        }
      />
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <LeaderboardList />
      </Box>
      <CreateLeaderboardDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </Box>
  )
}
