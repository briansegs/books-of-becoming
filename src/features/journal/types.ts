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

type JournalIdState = {
  setJournalId: Dispatch<SetStateAction<JournalId>>
  journalId: JournalId
}

type OpenJournalCardMenuState = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export type JournalsContentProps = Journals

export type JournalFilterSelectProps = Journals & FilterState

export type JournalsListProps = Journals

export type JournalsMenuProps = Journals & FilterState

export type JournalsCardProps = Pick<OpenJournalCardMenuState, 'setOpen'> &
  Pick<JournalIdState, 'setJournalId'> & {
    journal: Journal
  }

export type JournalDeleteDialogProps = OpenJournalCardMenuState & Pick<JournalIdState, 'journalId'>

export type JournalsCardMenuProps = JournalIdState &
  Pick<OpenJournalCardMenuState, 'setOpen'> & {
    buttonColor: string
  }
