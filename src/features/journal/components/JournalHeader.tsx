import { journalBackgrounds } from '@/features/journals/components/journalBackgrounds'
import { journalColors } from '@/features/journals/components/journalColors'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { JournalHeaderProps } from '../types'
import { JournalContentMenu } from './JournalContentMenu'

export function JournalHeader({
  journal,
  entriesCount,
  showSuggestions,
  setShowSuggestions,
  dailyEntries,
  setCurrentIndex,
  todaysIndex,
}: JournalHeaderProps) {
  const selectedColor = journalColors[journal.color as keyof typeof journalColors]
  const background = journalBackgrounds[journal.background as keyof typeof journalBackgrounds]
  const textColors = selectedColor.textColors
  const textColor = textColors[journal.textColor as keyof typeof textColors]

  const createdDate = format(new Date(journal._creationTime || ''), 'M/d/yyyy @ h:mm a')

  const updatedDate = format(new Date(journal.updatedAt || ''), 'M/d/yyyy @ h:mm a')

  return (
    <div className="flex h-fit w-full flex-col items-center gap-2 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:items-stretch">
        <div
          className={cn(
            'relative flex h-48 w-36 shrink-0 rounded-md border shadow-xl',
            selectedColor.bg,
          )}
        >
          {background}
          <div className={cn('z-10 h-full w-4 border-r-2', selectedColor.border)} />

          <div
            className={cn(
              'flex h-full w-full flex-col items-center gap-2 p-1 pt-11 text-xl font-semibold',
              textColor,
            )}
          >
            <p className="text-center text-[10px]">{journal.title}</p>
          </div>
        </div>

        <div className="flex w-full flex-col justify-between py-1">
          <p className="text-lg font-medium">
            {journal.type === 'default' ? 'Journal' : 'Future Self Journal'}
          </p>

          <h1 className="text-4xl font-bold">{journal.title}</h1>

          <p className="font-medium">{`Entries: ${entriesCount}`}</p>

          <div className="flex items-center gap-4 text-muted-foreground">
            <p>{`Updated: ${updatedDate}`}</p>
            {'|'}
            <p>{`Created: ${createdDate}`}</p>
          </div>
        </div>
      </div>

      <JournalContentMenu
        journal={journal}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        dailyEntries={dailyEntries}
        setCurrentIndex={setCurrentIndex}
        todaysIndex={todaysIndex}
      />
    </div>
  )
}
