'use client'

import { Card } from '@/features/shared/components/ui/card'
import { JournalId, JournalsListProps } from '../types'
import { JournalsCard } from './JournalsCard'
import { JournalsListEmptyCard } from './JournalsListEmptyCard'
import { useState } from 'react'
import { JournalDeleteDialog } from './JournalDeleteDialog'

export function JournalsList({ journals }: JournalsListProps) {
  const [openJournalDeleteDialog, setOpenJournalDeleteDialog] = useState(false)
  const [journalId, setJournalId] = useState<JournalId>(null)

  return (
    <>
      {journals?.length !== 0 ? (
        <Card className="w-full px-6 py-10">
          <div className="mx-auto grid w-full [grid-template-columns:repeat(auto-fill,minmax(320px,1fr))] justify-items-center gap-6">
            {journals.map((journal) => {
              return (
                <JournalsCard
                  key={journal._id}
                  journal={journal}
                  setOpen={setOpenJournalDeleteDialog}
                  setJournalId={setJournalId}
                />
              )
            })}
          </div>

          <JournalDeleteDialog
            open={openJournalDeleteDialog}
            setOpen={setOpenJournalDeleteDialog}
            journalId={journalId}
          />
        </Card>
      ) : (
        <JournalsListEmptyCard />
      )}
    </>
  )
}
