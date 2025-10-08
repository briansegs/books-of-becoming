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

export type JournalsContentProps = Journals

export type JournalFilterSelectProps = Journals & FilterState

export type JournalsListProps = Journals

export type JournalsMenuProps = Journals & FilterState

export type JournalsCardProps = {
  journal: Journal
}
