import { Doc, Id } from 'convex/_generated/dataModel'
import { Dispatch, SetStateAction } from 'react'

export type JournalFilterOptions = 'title' | 'asc' | 'desc' | ''

export type Journal = Doc<'journals'>

export type JournalId = Id<'journals'> | null | undefined

type Journals = {
  journals: Journal[]
}

type FilterState = {
  filter: JournalFilterOptions
  setFilter: Dispatch<SetStateAction<JournalFilterOptions>>
}

type OpenJournalCardMenuState = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export type JournalsContentProps = Journals

export type JournalFilterSelectProps = Journals & FilterState

export type JournalsListProps = Journals

export type JournalsMenuProps = Journals & FilterState

export type JournalsCardProps = {
  journal: Journal
  setCurrentJournal: Dispatch<SetStateAction<Journal | null | undefined>>
  setOpenJournalDeleteDialog: Dispatch<SetStateAction<boolean>>
  setOpenJournalEditDialog: Dispatch<SetStateAction<boolean>>
}

export type JournalDeleteDialogProps = OpenJournalCardMenuState & {
  journal: Journal | null | undefined
}

export type JournalsCardMenuProps = {
  buttonColor: string
  setCurrentJournal: Dispatch<SetStateAction<Journal | null | undefined>>
  journal: Journal
  setOpenJournalDeleteDialog: Dispatch<SetStateAction<boolean>>
  setOpenJournalEditDialog: Dispatch<SetStateAction<boolean>>
}
