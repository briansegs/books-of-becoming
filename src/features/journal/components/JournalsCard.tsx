import { Card } from '@/features/shared/components/ui/card'
import { formatDistanceToNow } from 'date-fns'
import { EllipsisVertical } from 'lucide-react'
import { Button } from '@/features/shared/components/ui/button'
import { cn } from '@/lib/utils'
import { journalBackgrounds } from './journalBackgrounds'
import { buttonColors, journalColors } from './journalColors'
import { JournalsCardProps } from '../types'

export function JournalsCard({ journal }: JournalsCardProps) {
  const selectedColor = journalColors[journal.color as keyof typeof journalColors]
  const textColors = selectedColor.textColors
  const textColor = textColors[journal.textColor as keyof typeof textColors]
  const buttonColor = buttonColors[journal.textColor as keyof typeof buttonColors]
  const background = journalBackgrounds[journal.background as keyof typeof journalBackgrounds]

  return (
    <Card
      key={journal._id}
      className={cn('relative flex h-96 w-72 rounded-md shadow-xl', selectedColor.bg)}
    >
      {background}
      <div className={cn('z-10 h-full w-6 border-r-2', selectedColor.border)} />
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex flex-col gap-6 px-6 pt-6">
          <div className="flex w-full items-center justify-between">
            <p className={cn(textColor)}>
              {journal.type === 'default' ? 'Journal' : 'Future Self Journal'}
            </p>

            <Button
              variant="outline"
              className={cn(
                'rounded-full border-none bg-transparent',
                'hover:border-none',
                'shadow-none',
                buttonColor,
              )}
              size="icon"
            >
              <EllipsisVertical className="size-6" />
            </Button>
          </div>

          <h3 className={cn('text-center text-xl font-bold', textColor)}>{journal.title}</h3>
        </div>

        <div className="w-full space-y-2 px-6 pb-6">
          <p className={cn(textColor)}>{`Entries: 0`}</p>
          <p
            className={cn('text-sm', textColor)}
          >{`Updated: ${formatDistanceToNow(new Date(journal.updatedAt), { addSuffix: true })}`}</p>
        </div>
      </div>
    </Card>
  )
}
