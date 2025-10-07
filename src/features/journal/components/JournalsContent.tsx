'use client'

import { JournalsList } from '@/features/journal/components/JournalsList'
import { JournalsListEmptyCard } from '@/features/journal/components/JournalsListEmptyCard'
import { JournalsMenu } from '@/features/journal/components/JournalsMenu'
import { useMemo, useState } from 'react'
import { JournalFilterOptions, JournalsContentProps } from '../types'
import { Card } from '@/features/shared/components/ui/card'

export function JournalsContent({ journals, fetchError }: JournalsContentProps) {
  const [filter, setFilter] = useState<JournalFilterOptions>('')

  const sortedJournals = useMemo(() => {
    return [...journals].sort((a, b) => {
      if (filter === 'title') {
        return a.title.localeCompare(b.title)
      } else if (filter === 'asc') {
        return a._creationTime - b._creationTime
      } else {
        // 'desc'
        return b._creationTime - a._creationTime
      }
    })
  }, [journals, filter])

  return (
    <div className="flex w-full flex-col gap-6">
      <JournalsMenu journals={journals} filter={filter} setFilter={setFilter} />

      {journals?.length !== 0 ? (
        <Card className="w-full px-6 py-10">
          <div className="mx-auto grid w-full [grid-template-columns:repeat(auto-fill,minmax(320px,1fr))] justify-items-center gap-6">
            <JournalsList journals={sortedJournals} fetchError={fetchError} />
          </div>
        </Card>
      ) : (
        <JournalsListEmptyCard />
      )}
    </div>
  )
}
