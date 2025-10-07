import { Card, CardContent } from '@/features/shared/components/ui/card'
import { JournalCreateDialog } from './JournalCreateDialog'
import { JournalFilterSelect } from './JournalFilterSelect'
import { JournalsMenuProps } from '../types'

export function JournalsMenu({ journals, setFilter, filter }: JournalsMenuProps) {
  return (
    <Card>
      <CardContent className="flex items-end justify-between pt-6">
        <div className="space-y-2">
          <h3 className="flex items-center gap-2 text-lg font-bold">Filter</h3>
          <JournalFilterSelect journals={journals} filter={filter} setFilter={setFilter} />
        </div>

        <JournalCreateDialog />
      </CardContent>
    </Card>
  )
}
