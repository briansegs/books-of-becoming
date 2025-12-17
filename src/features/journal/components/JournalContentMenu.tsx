import { JournalContentMenuProps } from '../types'

import { JournalCalendar } from './JournalCalendar'
import { JournalSettingsMenu } from './JournalSettingsMenu'
import { JournalSearch } from './JournalSearch'
import { JournalShowSuggestionsToggle } from './JournalShowSuggestionsToggle'

// TODO: Implement search functionality
// TODO: Implement settings functionality
// TODO: Implement calendar functionality

export function JournalContentMenu({
  journal,
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

      <JournalSettingsMenu
        journal={journal}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
      />
    </div>
  )
}
