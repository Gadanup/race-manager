import { Components, Theme } from '@mui/material/styles'

export const COMPONENT_OVERRIDES: Components<Theme> = {
  MuiCssBaseline: {
    styleOverrides: {
      '@import': [
        "url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@400;500;600&display=swap')",
      ],
      body: {
        scrollbarWidth: 'thin',
        scrollbarColor: '#2A2A35 #0A0A0C',
        '&::-webkit-scrollbar': { width: '6px' },
        '&::-webkit-scrollbar-track': { background: '#0A0A0C' },
        '&::-webkit-scrollbar-thumb': {
          background: '#2A2A35',
          borderRadius: '3px',
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        padding: '10px 24px',
        boxShadow: 'none',
        '&:hover': { boxShadow: 'none' },
      },
      containedPrimary: {
        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 100%, 8px 100%)',
      },
    },
    defaultProps: {
      disableElevation: true,
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        borderRadius: 0,
        border: '1px solid #2A2A35',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        borderRadius: 0,
        border: '1px solid #2A2A35',
        backgroundColor: '#18181F',
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        fontFamily: '"Barlow Condensed", Arial, sans-serif',
        fontWeight: 700,
        letterSpacing: '0.08em',
        fontSize: '0.75rem',
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
    },
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 0,
          '& fieldset': { borderColor: '#2A2A35' },
          '&:hover fieldset': { borderColor: '#6B6B80' },
          '&.Mui-focused fieldset': { borderColor: '#F6C32A' },
        },
        '& .MuiInputLabel-root.Mui-focused': { color: '#F6C32A' },
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      root: {
        borderRadius: 0,
      },
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: {
        '& .MuiTableCell-root': {
          backgroundColor: '#111116',
          color: '#9999AA',
          fontFamily: '"Barlow Condensed", Arial, sans-serif',
          fontWeight: 700,
          letterSpacing: '0.1em',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          borderBottom: '1px solid #2A2A35',
        },
      },
    },
  },
  MuiTableBody: {
    styleOverrides: {
      root: {
        '& .MuiTableCell-root': {
          borderBottom: '1px solid rgba(42, 42, 53, 0.5)',
          color: '#E8E8F0',
        },
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: '#2A2A35',
      },
    },
  },
  MuiSnackbar: {
    defaultProps: {
      anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: 0,
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        borderRadius: 0,
        backgroundColor: '#18181F',
        border: '1px solid #2A2A35',
        fontFamily: '"Barlow", Arial, sans-serif',
        fontSize: '0.8125rem',
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        backgroundColor: '#2A2A35',
      },
    },
  },
}
