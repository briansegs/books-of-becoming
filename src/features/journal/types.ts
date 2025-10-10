import { Doc } from 'convex/_generated/dataModel'
import { Dispatch, SetStateAction } from 'react'

export type JournalFilterOptions = 'title' | 'asc' | 'desc' | ''

export type Journal = Doc<'journals'>

type Journals = {
  journals: Journal[]
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

export type JournalFilterSelectProps = Journals & FilterState

export type JournalsListProps = Journals

export type JournalsMenuProps = Journals & FilterState

export type JournalsCardProps = SetCurrentJournal &
  SetOpenJournalDeleteDialog &
  SetOpenJournalEditDialog & {
    journal: Journal
  }

export type JournalDeleteDialogProps = DialogOpenState & {
  journal: Journal | null | undefined
}

export type JournalsCardMenuProps = SetCurrentJournal &
  SetOpenJournalDeleteDialog &
  SetOpenJournalEditDialog & {
    journal: Journal
    buttonColor: string
  }

export type JournalEditDialogProps = DialogOpenState & {
  journal: Journal | null | undefined
}
