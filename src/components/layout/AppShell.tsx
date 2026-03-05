import React from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { Sidebar } from './Sidebar'

const SIDEBAR_WIDTH = 240

export const AppShell = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar width={SIDEBAR_WIDTH} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${SIDEBAR_WIDTH}px`,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}
