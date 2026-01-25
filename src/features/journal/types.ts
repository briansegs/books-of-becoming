import { Doc, Id } from 'convex/_generated/dataModel'
import { Dispatch, SetStateAction } from 'react'
import type { Editor } from '@tiptap/react'

type Journal = Doc<'journals'>

export type JournalEntry = Doc<'entries'>

export type DailyEntryGroup = { date: string; entries: JournalEntry[] }

type DailyEntries = {
  dailyEntries: DailyEntryGroup[]
}

type DailyEntriesGroup = {
  dailyEntryGroups: DailyEntryGroup[]
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

type EntriesCount = {
  entriesCount: number
}

export type JournalHeaderProps = JournalItem &
  EntriesCount &
  SuggestionsState &
  DailyEntries &
  SetCurrentIndex

export type JournalContentProps = JournalItem &
  SuggestionsState &
  DailyEntries &
  SetCurrentIndex & {
    currentIndex: number
    today: Date
    todaysKey: string
  }

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

type EntryProp = {
  entry: JournalEntry | null
}

export type JournalDailyEntryItemProps = CurrentEntryGroup &
  SetOpenDeleteDialog &
  EntryProp & {
    index: number
    editorLabel: string
  }

export type JournalContentMenuProps = SuggestionsState &
  JournalItem &
  DailyEntries &
  SetCurrentIndex

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

type EditorItem = {
  editor: Editor | null
}

export type FutureSelfJournalSuggestionsProps = SuggestionsState &
  JournalType &
  EditorItem & {
    setOpenExamplesDialog: Dispatch<SetStateAction<boolean>>
  }

type TitleState = {
  title: string
  setTitle: Dispatch<SetStateAction<string>>
}

export type JournalTextEditorProps = EditorItem & TitleState

export type JournalEditEntryEditorProps = SetEditMode & {
  selectedEntry: JournalEntry
}

export type JournalNewEntryEditorProps = EditorItem &
  TitleState & {
    journalId: Id<'journals'>
  }

type DialogOpenState = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export type JournalEntryDeleteDialogProps = DialogOpenState & {
  selectedEntry: JournalEntry | null
}

export type JournalDailyEntryProps = CurrentEntryGroup &
  SetOpenDeleteDialog &
  SetEditMode &
  EntryProp & {
    index: number
  }

export type JournalStartNewEntryButtonProps = SetCurrentIndex & {
  todaysIndex: number
}

export type JournalNewEntryProps = JournalItem & SuggestionsState

export type FutureSelfJournalExamplesDialogProps = DialogOpenState & EditorItem

export type JournalSuggestionsDialogProps = DialogOpenState & Pick<TitleState, 'setTitle'>

export type JournalSuggestionsProps = SuggestionsState &
  JournalType &
  EditorItem &
  Pick<TitleState, 'setTitle'> & {
    setOpenSuggestionsDialog: Dispatch<SetStateAction<boolean>>
  }

export type JournalPageWrapperProps = JournalItem & EntriesCount & DailyEntriesGroup

export type JournalShowSuggestionsToggleProps = SuggestionsState

export type JournalSettingsMenuProps = JournalItem & SuggestionsState

export type JournalCalendarProps = DailyEntries & SetCurrentIndex

export type JournalSearchProps = DailyEntries & SetCurrentIndex

export type JournalBookmarksListProps = SetCurrentIndex & JournalItem & DailyEntries

export type ToggleBookmarkButtonProps = {
  entry: JournalEntry
}
