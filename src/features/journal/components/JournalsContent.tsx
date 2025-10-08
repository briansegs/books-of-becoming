'use client'

import { JournalsList } from '@/features/journal/components/JournalsList'
import { JournalsMenu } from '@/features/journal/components/JournalsMenu'
import { useMemo, useState } from 'react'
import { JournalFilterOptions, JournalsContentProps } from '../types'

export function JournalsContent({ journals }: JournalsContentProps) {
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

      <JournalsList journals={sortedJournals} />
    </div>
  )
}
