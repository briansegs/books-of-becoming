import { Calendar, CalendarDays, Lightbulb, LightbulbOff, Search, Settings } from 'lucide-react'
import { Button } from '@/features/shared/components/ui/button'
import { JournalContentMenuProps } from '../types'

export function JournalContentMenu({
  showSuggestions,
  setShowSuggestions,
  isToday,
}: JournalContentMenuProps) {
  return (
    <div className="absolute top-0 right-0 flex items-center gap-2">
      {isToday && (
        <Button size="icon" onClick={() => setShowSuggestions((prev) => !prev)}>
          {showSuggestions ? <LightbulbOff /> : <Lightbulb />}
        </Button>
      )}

      <Button size="icon">
        <Search />
      </Button>

      <Button size="icon">
        <Calendar />
      </Button>

      <Button size="icon">
        <Settings />
      </Button>
    </div>
  )
}
