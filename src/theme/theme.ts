import { createTheme } from '@mui/material/styles'

import { COMPONENT_OVERRIDES } from './components'
import { PALETTE } from './palette'
import { TYPOGRAPHY_VARIANTS } from './typography'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    ...PALETTE,
  },
  typography: TYPOGRAPHY_VARIANTS,
  components: COMPONENT_OVERRIDES,
  shape: {
    borderRadius: 0,
  },
  spacing: 8,
})
