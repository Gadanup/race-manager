import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

import { AppShell } from '@/components/layout'
import { ProtectedRoute } from '@/components/layout'
import { ROUTES } from '@/helpers/constants'

// Pages — these are placeholder divs until Phase 5/6/7
const RacesPage = () => <div style={{ padding: 32, color: 'white' }}>Races Page</div>
const RaceDetailPage = () => <div style={{ padding: 32, color: 'white' }}>Race Detail Page</div>
const LeaderboardsPage = () => <div style={{ padding: 32, color: 'white' }}>Leaderboards Page</div>
const LeaderboardDetailPage = () => (
  <div style={{ padding: 32, color: 'white' }}>Leaderboard Detail Page</div>
)
const LoginPage = () => <div style={{ padding: 32, color: 'white' }}>Login Page</div>

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
