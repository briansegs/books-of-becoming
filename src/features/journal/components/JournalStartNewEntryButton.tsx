import { Button } from '@/features/shared/components/ui/button'
import { JournalStartNewEntryButtonProps } from '../types'

export function JournalStartNewEntryButton({
  setCurrentIndex,
  todaysIndex,
}: JournalStartNewEntryButtonProps) {
  return <Button onClick={() => setCurrentIndex(todaysIndex)}>Start new entry</Button>
}
