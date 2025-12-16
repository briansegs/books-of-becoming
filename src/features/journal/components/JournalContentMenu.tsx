import { Lightbulb, LightbulbOff } from 'lucide-react'
import { Button } from '@/features/shared/components/ui/button'
import { JournalContentMenuProps } from '../types'

import { JournalCalendar } from './JournalCalendar'
import { JournalSettingsMenu } from './JournalSettingsMenu'
import { JournalSearch } from './JournalSearch'

export function JournalContentMenu({
  showSuggestions,
  setShowSuggestions,
}: JournalContentMenuProps) {
  return (
    <div className="flex gap-2">
      <Button size="icon" onClick={() => setShowSuggestions((prev) => !prev)}>
        {showSuggestions ? <LightbulbOff /> : <Lightbulb />}
      </Button>

      <JournalSearch />

      <JournalCalendar />

      <JournalSettingsMenu />
    </div>
  )
}
