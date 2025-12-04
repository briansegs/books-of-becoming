import { Doc, Id } from 'convex/_generated/dataModel'
import { Dispatch, SetStateAction } from 'react'

type Journal = Doc<'journals'>
type JournalEntry = Doc<'entries'>

export type DailyEntryGroup = { date: string; entries: JournalEntry[] }

type DailyEntries = {
  dailyEntries: DailyEntryGroup[]
}
type CurrentEntry = {
  currentEntry?: DailyEntryGroup
}
type SuggestionsState = {
  showSuggestions: boolean
  setShowSuggestions: Dispatch<SetStateAction<boolean>>
}
type TodaysDate = {
  todaysDate: Date
}
type IsToday = {
  isToday: boolean
}

export type JournalHeaderProps = {
  journal: Journal
}

export type JournalContentProps = DailyEntries & {
  journal: Journal
}

export type JournalContentForSelectedDayProps = CurrentEntry

export type JournalContentMenuProps = SuggestionsState &
  IsToday & {
    type: string
  }

export type JournalContentNavProps = DailyEntries &
  TodaysDate &
  IsToday &
  CurrentEntry & {
    currentIndex: number
    setCurrentIndex: Dispatch<SetStateAction<number>>
  }

export type JournalContentForTodayProps = DailyEntries & TodaysDate

export type JournalSuggestionsProps = SuggestionsState & {
  type: string
}

export type JournalTextEditorProps = {
  journalId: Id<'journals'>
}
