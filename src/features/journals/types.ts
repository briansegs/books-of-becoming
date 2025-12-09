import { Doc } from 'convex/_generated/dataModel'
import { Dispatch, SetStateAction } from 'react'

export type JournalFilterOptions = 'title' | 'asc' | 'desc' | ''

export type Journal = Doc<'journals'>
export type Entry = Doc<'entries'>

type Journals = {
  journals: JournalWithEntriesCount[]
}

type FilterState = {
  filter: JournalFilterOptions
  setFilter: Dispatch<SetStateAction<JournalFilterOptions>>
}

type SetCurrentJournal = { setCurrentJournal: Dispatch<SetStateAction<Journal | null | undefined>> }

type SetOpenJournalDeleteDialog = {
  setOpenJournalDeleteDialog: Dispatch<SetStateAction<boolean>>
}

type SetOpenJournalEditDialog = { setOpenJournalEditDialog: Dispatch<SetStateAction<boolean>> }

type DialogOpenState = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export type JournalsContentProps = Journals

export type JournalFilterSelectProps = FilterState & Journals
export type JournalsListProps = Journals

export type JournalsMenuProps = FilterState & Journals

export type JournalsCardProps = SetCurrentJournal &
  SetOpenJournalDeleteDialog &
  SetOpenJournalEditDialog & {
    journal: JournalWithEntriesCount
  }

export type JournalDeleteDialogProps = DialogOpenState & {
  journal?: Journal | null
}

export type JournalsCardMenuProps = SetCurrentJournal &
  SetOpenJournalDeleteDialog &
  SetOpenJournalEditDialog & {
    journal: JournalWithEntriesCount
    buttonColor: string
  }

export type JournalEditDialogProps = DialogOpenState & {
  journal?: Journal | null
}

export type JournalWithEntriesCount = Journal & { entriesCount: number }
