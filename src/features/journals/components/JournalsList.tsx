'use client'

import { Card } from '@/features/shared/components/ui/card'
import { Journal, JournalsListProps } from '../types'
import { JournalsCard } from './JournalsCard'
import { JournalsListEmptyCard } from './JournalsListEmptyCard'
import { useState } from 'react'
import { JournalDeleteDialog } from './JournalDeleteDialog'
import { JournalEditDialog } from './JournalEditDialog'

export function JournalsList({ journals }: JournalsListProps) {
  const [openJournalDeleteDialog, setOpenJournalDeleteDialog] = useState(false)
  const [openJournalEditDialog, setOpenJournalEditDialog] = useState(false)
  const [currentJournal, setCurrentJournal] = useState<Journal | null | undefined>(null)

  return (
    <>
      {journals?.length !== 0 ? (
        <Card className="px-auto w-full py-10 sm:px-6">
          <div className="mx-auto grid w-full [grid-template-columns:repeat(auto-fill,minmax(320px,1fr))] justify-items-center gap-6">
            {journals.map((journal) => {
              return (
                <JournalsCard
                  key={journal._id}
                  journal={journal}
                  setOpenJournalDeleteDialog={setOpenJournalDeleteDialog}
                  setOpenJournalEditDialog={setOpenJournalEditDialog}
                  setCurrentJournal={setCurrentJournal}
                />
              )
            })}
          </div>

          <JournalDeleteDialog
            open={openJournalDeleteDialog}
            setOpen={setOpenJournalDeleteDialog}
            journal={currentJournal}
          />

          <JournalEditDialog
            open={openJournalEditDialog}
            setOpen={setOpenJournalEditDialog}
            journal={currentJournal}
          />
        </Card>
      ) : (
        <JournalsListEmptyCard />
      )}
    </>
  )
}
