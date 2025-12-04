import { Separator } from '@/features/shared/components/ui/separator'
import { format } from 'date-fns'
import { JournalContentForTodayProps } from '../types'

export function JournalContentForToday({ dailyEntries, todaysDate }: JournalContentForTodayProps) {
  const todaysEntries = dailyEntries.find((g) => {
    const groupDate = g.date
    const today = format(new Date(todaysDate), 'yyyy-MM-dd')
    return groupDate === today
  })

  return (
    <div className="space-y-8">
      <Separator className="my-10" />

      {todaysEntries?.entries.map((entry, index) => {
        return (
          <div key={entry._creationTime} className="px-8">
            <h2 className="mb-4 text-2xl">{entry.title}</h2>

            <div
              className="prose prose-sm mb-8 max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: entry.content }}
            />

            {index !== todaysEntries.entries.length - 1 && <Separator />}
          </div>
        )
      })}
    </div>
  )
}
