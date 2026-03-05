import React from 'react'
import { Box, Typography } from '@mui/material'

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h1" color="primary">
        Race Manager
      </Typography>
    </Box>
  )
}

export default App
