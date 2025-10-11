import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/features/shared/components/ui/select'
import { JournalFilterOptions, JournalFilterSelectProps } from '../types'

const journalfilterOptions = [
  {
    value: 'title',
    label: 'Title',
  },
  {
    value: 'asc',
    label: 'Ascending',
  },
  {
    value: 'desc',
    label: 'Descending',
  },
]

export function JournalFilterSelect({ journals, filter, setFilter }: JournalFilterSelectProps) {
  return (
    <Select
      disabled={journals?.length === 0}
      value={filter}
      onValueChange={(value) => setFilter(value as JournalFilterOptions)}
    >
      <SelectTrigger className="w-[180px] bg-muted">
        <SelectValue placeholder="Select Filter" />
      </SelectTrigger>
      <SelectContent className="bg-muted">
        {journalfilterOptions.map((option) => {
          return (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
