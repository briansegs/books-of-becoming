import { JournalContentMenuProps } from '../types'

import { JournalCalendar } from './JournalCalendar'
import { JournalSettingsMenu } from './JournalSettingsMenu'
import { JournalSearch } from './JournalSearch'
import { JournalShowSuggestionsToggle } from './JournalShowSuggestionsToggle'

export function JournalContentMenu({
  showSuggestions,
  setShowSuggestions,
}: JournalContentMenuProps) {
  return (
    <div className="flex gap-2">
      <JournalShowSuggestionsToggle
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
      />

      <JournalSearch />

      <JournalCalendar />

      <JournalSettingsMenu />
    </div>
  )
}
