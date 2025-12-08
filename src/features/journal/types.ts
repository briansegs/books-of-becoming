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

type NarrowedJournalType = 'default' | 'future'

type JournalType = {
  type: NarrowedJournalType
}

export type JournalHeaderProps = {
  journal: Journal
}

export type JournalContentProps = DailyEntries & {
  journal: Journal
}

type SetOpenDeleteDialog = {
  setOpenDeleteDialog: Dispatch<SetStateAction<boolean>>
}

type SetSelectedEntry = {
  setSelectedEntry: Dispatch<SetStateAction<SelectedEntry>>
}

export type JournalContentForSelectedDayProps = CurrentEntry &
  SetOpenDeleteDialog &
  SetSelectedEntry

export type JournalContentMenuProps = SuggestionsState & IsToday & JournalType

export type JournalContentNavProps = DailyEntries &
  TodaysDate &
  IsToday &
  CurrentEntry & {
    currentIndex: number
    setCurrentIndex: Dispatch<SetStateAction<number>>
  }

export type JournalContentForTodayProps = DailyEntries &
  TodaysDate &
  SetOpenDeleteDialog &
  SetSelectedEntry

export type JournalSuggestionsProps = SuggestionsState & JournalType

export type JournalTextEditorProps = {
  journalId: Id<'journals'>
}

export type SelectedEntry = JournalEntry | null

export type JournalEntryDeleteDialogProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  selectedEntry: SelectedEntry
}

export type JournalDailyEntryProps = CurrentEntry &
  SetOpenDeleteDialog &
  SetSelectedEntry & {
    entry: SelectedEntry
    index: number
  }
