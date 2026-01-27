import { Button } from '@/features/shared/components/ui/button'
import { format } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { JournalContentNavProps } from '../types'

export function JournalContentNav({
  currentEntryGroup,
  currentIndex,
  setCurrentIndex,
  dailyEntries,
  isToday,
  todaysDate,
}: JournalContentNavProps) {
  const canGoBack = currentIndex > 0
  const canGoForward = currentIndex < dailyEntries.length - 1

  function parseLocalDate(dateString: string) {
    const [y, m, d] = dateString.split('-').map(Number)
    return new Date(y ?? 1, (m ?? 1) - 1, d ?? 1)
  }

  return (
    <div className="flex items-center justify-between sm:justify-around">
      <Button
        onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
        disabled={!canGoBack}
        aria-label="Previous day"
      >
        <ChevronLeft />
      </Button>

      <div className="flex flex-col items-center gap-2">
        <div className="text-center text-lg font-semibold">
          {currentEntryGroup
            ? format(parseLocalDate(currentEntryGroup.date), 'MMMM yyyy')
            : format(todaysDate, 'MMMM yyyy')}
        </div>

        <div className="w-18 rounded-md border p-1 text-center text-lg">
          {currentEntryGroup
            ? format(parseLocalDate(currentEntryGroup.date), 'd')
            : format(todaysDate, 'd')}
        </div>

        <div className="text-muted-foreground">
          {isToday
            ? `Today | ${format(new Date(todaysDate), 'EEEE')}`
            : format(parseLocalDate(currentEntryGroup?.date || ''), 'EEEE')}
        </div>
      </div>

      <Button
        onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, dailyEntries.length - 1))}
        disabled={!canGoForward}
        aria-label="Next day"
      >
        <ChevronRight />
      </Button>
    </div>
  )
}
