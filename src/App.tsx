import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { AppShell } from '@/components/layout'
import { ProtectedRoute } from '@/components/layout'
import { ROUTES } from '@/helpers/constants'
import { LoginPage } from '@/pages/LoginPage'
import { RaceDetailPage } from '@/pages/RaceDetailPage'
import { RacesPage } from '@/pages/RacesPage'
import { LeaderboardsPage } from '@/pages/LeaderboardsPage'

// Still placeholder
const LeaderboardDetailPage = () => (
  <div style={{ padding: 32, color: 'white' }}>Leaderboard Detail Page</div>
)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to={ROUTES.RACES} replace />} />
          <Route path={ROUTES.RACES} element={<RacesPage />} />
          <Route path={ROUTES.RACE_DETAIL} element={<RaceDetailPage />} />
          <Route path={ROUTES.LEADERBOARDS} element={<LeaderboardsPage />} />
          <Route path={ROUTES.LEADERBOARD_DETAIL} element={<LeaderboardDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
