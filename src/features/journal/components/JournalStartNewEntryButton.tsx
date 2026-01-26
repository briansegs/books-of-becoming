import { Button } from '@/features/shared/components/ui/button'
import { JournalStartNewEntryButtonProps } from '../types'

export function JournalStartNewEntryButton({
  setCurrentIndex,
  todaysIndex,
  className,
}: JournalStartNewEntryButtonProps) {
  function handleClick() {
    setCurrentIndex(todaysIndex)

    requestAnimationFrame(() => {
      document.getElementById('new-entry')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }

  return (
    <Button className={className} onClick={handleClick}>
      Start new entry
    </Button>
  )
}
