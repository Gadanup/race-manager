import type { RaceStatus } from '@/types/race.types'

export const RACE_STATUS_LABELS: Record<RaceStatus, string> = {
  pending: 'Pending',
  ongoing: 'Ongoing',
  finished: 'Finished',
}

export const RACE_STATUS_OPTIONS: { value: RaceStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'finished', label: 'Finished' },
]

export const RACE_LABELS = {
  pageTitle: 'Races',
  createRace: 'New Race',
  editRace: 'Edit Race',
  deleteRace: 'Delete Race',
  raceName: 'Race Name',
  location: 'Location',
  date: 'Date',
  status: 'Status',
  noRaces: 'No races yet',
  noRacesSubtitle: 'Create your first race to get started',
  deleteConfirmTitle: 'Delete Race',
  deleteConfirmMessage:
    'Are you sure you want to delete this race? This will also remove all its results.',
  markFinished: 'Mark as Finished',
  markFinishedConfirmTitle: 'Mark Race as Finished',
  markFinishedConfirmMessage:
    'Once finished, results will be locked and this race can be added to leaderboards.',
  saveResults: 'Save Results',
  resultsLocked: 'Results locked — race is finished',
  createSuccess: 'Race created successfully',
  updateSuccess: 'Race updated successfully',
  deleteSuccess: 'Race deleted successfully',
  resultsSuccess: 'Results saved successfully',
} as const
