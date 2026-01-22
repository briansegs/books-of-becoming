import { JournalContentMenuProps } from '../types'

import { JournalCalendar } from './JournalCalendar'
import { JournalSettingsMenu } from './JournalSettingsMenu'
import { JournalSearch } from './JournalSearch'
import { JournalShowSuggestionsToggle } from './JournalShowSuggestionsToggle'
import { JournalBookmarksList } from './JournalBookmarksList'

export function JournalContentMenu({
  journal,
  showSuggestions,
  setShowSuggestions,
  dailyEntries,
  setCurrentIndex,
}: JournalContentMenuProps) {
  return (
    <div className="flex gap-2">
      <JournalShowSuggestionsToggle
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
      />

      <JournalBookmarksList />

      <JournalSearch dailyEntries={dailyEntries} setCurrentIndex={setCurrentIndex} />

      <JournalCalendar dailyEntries={dailyEntries} setCurrentIndex={setCurrentIndex} />

      <JournalSettingsMenu
        journal={journal}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
      />
    </div>
  )
}
