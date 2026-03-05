import React from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { Sidebar } from './Sidebar'

const SIDEBAR_WIDTH = 240

export const AppShell = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar width={SIDEBAR_WIDTH} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          // On mobile: offset for top bar and bottom nav
          ...(isMobile ? { mt: '56px', mb: '64px', ml: 0 } : { ml: `${SIDEBAR_WIDTH}px` }),
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}
