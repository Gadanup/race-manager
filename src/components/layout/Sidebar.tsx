import React from 'react'
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import FlagIcon from '@mui/icons-material/Flag'
import LogoutIcon from '@mui/icons-material/Logout'
import { useLocation, useNavigate } from 'react-router-dom'

import { useSignOut } from '@/hooks'
import { ROUTES } from '@/helpers/constants'

interface SidebarProps {
  width: number
}

const NAV_ITEMS = [
  { label: 'Races', icon: <FlagIcon />, route: ROUTES.RACES },
  { label: 'Leaderboards', icon: <EmojiEventsIcon />, route: ROUTES.LEADERBOARDS },
]

export const Sidebar = ({ width }: SidebarProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { handleSignOut } = useSignOut()

  const isActive = (route: string) => location.pathname.startsWith(route)

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box',
          bgcolor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          px: 3,
          py: 2.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h3" color="primary" sx={{ lineHeight: 1 }}>
          Race
        </Typography>
        <Typography variant="h3" color="text.primary" sx={{ lineHeight: 1 }}>
          Manager
        </Typography>
      </Box>

      {/* Nav items */}
      <List sx={{ px: 1, pt: 2, flexGrow: 1 }}>
        {NAV_ITEMS.map((navItem) => (
          <ListItem key={navItem.route} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => navigate(navItem.route)}
              selected={isActive(navItem.route)}
              sx={{
                borderRadius: 0,
                py: 1.25,
                '&.Mui-selected': {
                  bgcolor: 'rgba(246, 195, 42, 0.08)',
                  borderLeft: '3px solid',
                  borderColor: 'primary.main',
                  '& .MuiListItemIcon-root': { color: 'primary.main' },
                  '& .MuiListItemText-primary': { color: 'primary.main' },
                },
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.04)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                {navItem.icon}
              </ListItemIcon>
              <ListItemText
                primary={navItem.label}
                primaryTypographyProps={{ variant: 'subtitle2' }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Sign out */}
      <Box
        sx={{
          px: 2,
          py: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Divider sx={{ mb: 1.5 }} />
        <ListItemButton
          onClick={handleSignOut}
          sx={{
            borderRadius: 0,
            py: 1,
            color: 'text.secondary',
            '&:hover': {
              color: 'error.main',
              bgcolor: 'rgba(255, 70, 85, 0.06)',
              '& .MuiListItemIcon-root': { color: 'error.main' },
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Sign Out" primaryTypographyProps={{ variant: 'subtitle2' }} />
        </ListItemButton>
      </Box>
    </Drawer>
  )
}
