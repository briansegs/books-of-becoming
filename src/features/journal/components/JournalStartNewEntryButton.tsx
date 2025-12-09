import { Button } from '@/features/shared/components/ui/button'
import { JournalStartNewEntryButtonProps } from '../types'

export function JournalStartNewEntryButton({
  setCurrentIndex,
  todaysIndex,
}: JournalStartNewEntryButtonProps) {
  function handleClick() {
    setCurrentIndex(todaysIndex)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return <Button onClick={handleClick}>Start new entry</Button>
}
