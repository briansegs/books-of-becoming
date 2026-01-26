import { JournalContentMenuProps } from '../types'

import { JournalCalendar } from './JournalCalendar'
import { JournalSettingsMenu } from './JournalSettingsMenu'
import { JournalSearch } from './JournalSearch'
import { JournalShowSuggestionsToggle } from './JournalShowSuggestionsToggle'
import { JournalBookmarksList } from './JournalBookmarksList'
import { JournalStartNewEntryButton } from './JournalStartNewEntryButton'

export function JournalContentMenu({
  journal,
  showSuggestions,
  setShowSuggestions,
  dailyEntries,
  setCurrentIndex,
  todaysIndex,
}: JournalContentMenuProps) {
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <JournalShowSuggestionsToggle
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
        />

        <JournalBookmarksList
          journal={journal}
          dailyEntries={dailyEntries}
          setCurrentIndex={setCurrentIndex}
        />

        <JournalSearch dailyEntries={dailyEntries} setCurrentIndex={setCurrentIndex} />

        <JournalCalendar dailyEntries={dailyEntries} setCurrentIndex={setCurrentIndex} />

        <JournalSettingsMenu
          journal={journal}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
        />
      </div>

      <JournalStartNewEntryButton
        className="w-full"
        setCurrentIndex={setCurrentIndex}
        todaysIndex={todaysIndex}
      />
    </div>
  )
}
