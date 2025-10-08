import { Card } from '@/features/shared/components/ui/card'
import { JournalsListProps } from '../types'
import { JournalsCard } from './JournalsCard'
import { JournalsListEmptyCard } from './JournalsListEmptyCard'

export function JournalsList({ journals }: JournalsListProps) {
  return (
    <>
      {journals?.length !== 0 ? (
        <Card className="w-full px-6 py-10">
          <div className="mx-auto grid w-full [grid-template-columns:repeat(auto-fill,minmax(320px,1fr))] justify-items-center gap-6">
            {journals.map((journal) => {
              return <JournalsCard key={journal._id} journal={journal} />
            })}
          </div>
        </Card>
      ) : (
        <JournalsListEmptyCard />
      )}
    </>
  )
}
