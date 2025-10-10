import { Card } from '@/features/shared/components/ui/card'
import { formatDistanceToNow } from 'date-fns'

import { cn } from '@/lib/utils'
import { journalBackgrounds } from './journalBackgrounds'
import { buttonColors, journalColors } from './journalColors'
import { JournalsCardProps } from '../types'
import { JournalsCardMenu } from './JournalsCardMenu'
import useClickableCard from '@/hooks/useClickableCard'
import Link from 'next/link'

export function JournalsCard({
  journal,
  setOpenJournalDeleteDialog,
  setOpenJournalEditDialog,
  setCurrentJournal,
}: JournalsCardProps) {
  const { card, link } = useClickableCard({})

  const selectedColor = journalColors[journal.color as keyof typeof journalColors]
  const textColors = selectedColor.textColors
  const textColor = textColors[journal.textColor as keyof typeof textColors]
  const buttonColor = buttonColors[journal.textColor as keyof typeof buttonColors]
  const background = journalBackgrounds[journal.background as keyof typeof journalBackgrounds]

  const href = `/journal/${journal._id}`

  return (
    <Card key={journal._id} className={cn('flex h-96 w-72 cursor-pointer rounded-md shadow-xl')}>
      <article
        ref={card.ref}
        className={cn('relative flex h-full w-full rounded-md', selectedColor.bg)}
      >
        {background}
        <div className={cn('z-10 h-full w-6 border-r-2', selectedColor.border)} />
        <div className="flex h-full w-full flex-col justify-between">
          <div className="flex flex-col gap-6 px-6 pt-6">
            <div className="flex w-full items-center justify-between">
              <p className={cn(textColor)}>
                {journal.type === 'default' ? 'Journal' : 'Future Self Journal'}
              </p>

              <JournalsCardMenu
                buttonColor={buttonColor}
                setCurrentJournal={setCurrentJournal}
                journal={journal}
                setOpenJournalDeleteDialog={setOpenJournalDeleteDialog}
                setOpenJournalEditDialog={setOpenJournalEditDialog}
              />
            </div>

            <Link href={href} ref={link.ref}>
              <h3 className={cn('text-center text-xl font-bold', textColor)}>{journal.title}</h3>
            </Link>
          </div>

          <div className="w-full space-y-2 px-6 pb-6">
            <p className={cn(textColor)}>{`Entries: ${journal.entriesCount}`}</p>
            <p
              className={cn('text-sm', textColor)}
            >{`Updated: ${formatDistanceToNow(new Date(journal.updatedAt), { addSuffix: true })}`}</p>
          </div>
        </div>
      </article>
    </Card>
  )
}
