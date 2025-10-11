import { journalBackgrounds } from '@/features/journals/components/journalBackgrounds'
import { journalColors } from '@/features/journals/components/journalColors'
import { cn } from '@/lib/utils'
import { Doc } from 'convex/_generated/dataModel'
import { format } from 'date-fns'

type Journal = Doc<'journals'>

export type JournalHeaderProps = {
  journal: Journal
}

export function JournalHeader({ journal }: JournalHeaderProps) {
  const selectedColor = journalColors[journal.color as keyof typeof journalColors]
  const background = journalBackgrounds[journal.background as keyof typeof journalBackgrounds]
  const textColors = selectedColor.textColors
  const textColor = textColors[journal.textColor as keyof typeof textColors]

  const createdDate = format(new Date(journal._creationTime || ''), 'M/d/yyyy @ h:mm a')

  const updatedDate = format(new Date(journal.updatedAt || ''), 'M/d/yyyy @ h:mm a')

  return (
    <div className="flex h-fit w-full">
      <div className="flex w-full gap-6">
        <div
          className={cn('relative flex h-48 w-36 rounded-md border shadow-xl', selectedColor.bg)}
        >
          {background}
          <div className={cn('z-10 h-full w-4 border-r-2', selectedColor.border)} />

          <div
            className={cn(
              'flex h-full w-full flex-col items-center gap-2 pt-11 text-xl font-semibold',
              textColor,
            )}
          >
            <p className="uppercase">Entries</p> <p>{journal.entriesCount}</p>
          </div>
        </div>

        <div className="prose flex w-full flex-col justify-between dark:prose-invert">
          <p className="text-muted-foreground">
            {journal.type === 'default' ? 'Journal' : 'Future Self Journal'}
          </p>

          <h1 className="font-bold text-primary">{journal.title}</h1>

          <div className="flex items-center gap-4 text-muted-foreground">
            <p>{`Updated: ${updatedDate}`}</p>
            {'|'}
            <p>{`Created: ${createdDate}`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
