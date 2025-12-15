import { Doc, Id } from 'convex/_generated/dataModel'
import { Dispatch, SetStateAction } from 'react'
import type { Editor } from '@tiptap/react'

type Journal = Doc<'journals'>
export type JournalEntry = Doc<'entries'>

export type DailyEntryGroup = { date: string; entries: JournalEntry[] }

type DailyEntries = {
  dailyEntries: DailyEntryGroup[]
}
type CurrentEntryGroup = {
  currentEntryGroup?: DailyEntryGroup
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

type JournalItem = {
  journal: Journal
}

export type JournalHeaderProps = JournalItem & {
  entriesCount: number
}

export type JournalContentProps = DailyEntries & JournalItem

type SetOpenDeleteDialog = {
  setOpenDeleteDialog: Dispatch<SetStateAction<boolean>>
}

type SetSelectedEntry = {
  setSelectedEntry: Dispatch<SetStateAction<JournalEntry | null>>
}

type SetCurrentIndex = {
  setCurrentIndex: Dispatch<SetStateAction<number>>
}

type SetEditMode = {
  setEditMode: Dispatch<SetStateAction<boolean>>
}

export type JournalContentForSelectedDayProps = CurrentEntryGroup &
  SetOpenDeleteDialog &
  SetCurrentIndex & {
    todaysIndex: number
  }

export type JournalDailyEntryItemProps = CurrentEntryGroup &
  SetOpenDeleteDialog & {
    entry: JournalEntry | null
    index: number
    editorLabel: string
  }

export type JournalContentMenuProps = SuggestionsState & IsToday

export type JournalContentNavProps = DailyEntries &
  TodaysDate &
  IsToday &
  CurrentEntryGroup &
  SetCurrentIndex & {
    currentIndex: number
  }

export type JournalContentForTodayProps = DailyEntries &
  TodaysDate &
  SetOpenDeleteDialog &
  SetSelectedEntry

export type FutureSelfJournalSuggestionsProps = SuggestionsState &
  JournalType & {
    editor: Editor | null
    setOpenExamplesDialog: Dispatch<SetStateAction<boolean>>
  }

export type JournalTextEditorProps = {
  editor: Editor | null
  title: string
  setTitle: Dispatch<SetStateAction<string>>
}

export type JournalEditEntryEditorProps = SetEditMode & {
  selectedEntry: JournalEntry
}

export type JournalNewEntryEditorProps = {
  journalId: Id<'journals'>
  editor: Editor | null
  title: string
  setTitle: Dispatch<SetStateAction<string>>
}

export type JournalEntryDeleteDialogProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  selectedEntry: JournalEntry | null
}

export type JournalDailyEntryProps = CurrentEntryGroup &
  SetOpenDeleteDialog &
  SetEditMode & {
    entry: JournalEntry | null
    index: number
  }

export type JournalStartNewEntryButtonProps = SetCurrentIndex & {
  todaysIndex: number
}

export type JournalNewEntryProps = JournalItem & SuggestionsState

export type FutureSelfJournalExamplesDialogProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  editor: Editor | null
}

export type JournalSuggestionsDialogProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  setTitle: Dispatch<SetStateAction<string>>
}

export type JournalSuggestionsProps = SuggestionsState &
  JournalType & {
    editor: Editor | null
    setOpenSuggestionsDialog: Dispatch<SetStateAction<boolean>>
    setTitle: Dispatch<SetStateAction<string>>
  }
