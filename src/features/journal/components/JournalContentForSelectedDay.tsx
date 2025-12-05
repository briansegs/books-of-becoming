import { SafeHtml } from '@/utilities/SafeHtml'
import { JournalContentForSelectedDayProps } from '../types'

export function JournalContentForSelectedDay({ currentEntry }: JournalContentForSelectedDayProps) {
  return (
    <div className="space-y-4">
      {currentEntry?.entries.map((entry) => {
        return (
          <div key={entry._creationTime}>
            <h2 className="text-2xl">{entry.title}</h2>
            <SafeHtml
              html={entry.content}
              className="prose prose-sm max-w-none dark:prose-invert"
            />
          </div>
        )
      })}
    </div>
  )
}
