import { JournalsListProps } from '../types'
import { JournalsCard } from './JournalsCard'

export function JournalsList({ journals, fetchError }: JournalsListProps) {
  return (
    <>
      {journals ? (
        journals.map((journal) => {
          return <JournalsCard key={journal._id} journal={journal} />
        })
      ) : fetchError ? (
        <p>Failed to load journal data. Please try again later.</p>
      ) : (
        <p>Loading journals...</p>
      )}
    </>
  )
}
