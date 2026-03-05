export enum ROUTES {
  ROOT = '/',
  RACES = '/races',
  RACE_DETAIL = '/races/:id',
  LEADERBOARDS = '/leaderboards',
  LEADERBOARD_DETAIL = '/leaderboards/:id',
  LOGIN = '/login',
}

export const buildRaceDetailRoute = (id: string) => `/races/${id}`

export const buildLeaderboardDetailRoute = (id: string) => `/leaderboards/${id}`
