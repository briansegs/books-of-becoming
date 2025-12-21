import { JournalContentMenuProps } from '../types'

import { JournalCalendar } from './JournalCalendar'
import { JournalSettingsMenu } from './JournalSettingsMenu'
import { JournalSearch } from './JournalSearch'
import { JournalShowSuggestionsToggle } from './JournalShowSuggestionsToggle'

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
