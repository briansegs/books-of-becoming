'use client'

import { useMemo } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/features/shared/components/ui/popover'
import { Button } from '@/features/shared/components/ui/button'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/features/shared/components/ui/calendar'
import { format } from 'date-fns'
import { JournalCalendarProps } from '../types'

function toDateKey(date: Date) {
  return format(date, 'yyyy-MM-dd')
}

export function JournalCalendar({ dailyEntries, setCurrentIndex }: JournalCalendarProps) {
  const entryDateToIndex = useMemo(() => {
    const map = new Map<string, number>()
    dailyEntries.forEach((g, i) => map.set(g.date, i))
    return map
  }, [dailyEntries])

  const entryDates = useMemo(() => {
    return dailyEntries
      .map(({ date }) => {
        const parts = date.split('-')
        if (parts.length !== 3) return null

        const [y, m, d] = parts.map(Number) as [number, number, number]
        return new Date(y, m - 1, d)
      })
      .filter((d): d is Date => d !== null)
  }, [dailyEntries])

  const entryBounds = useMemo(() => {
    if (entryDates.length === 0) return undefined

    const sorted = [...entryDates].sort((a, b) => a.getTime() - b.getTime())
    const first = sorted.at(0)
    const last = sorted.at(-1)

    if (!first || !last) return undefined

    return {
      startMonth: new Date(first.getFullYear(), first.getMonth(), 1),
      endMonth: new Date(last.getFullYear(), last.getMonth(), 1),
    }
  }, [entryDates])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" aria-label="Open calendar">
          <CalendarIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="space-y-6">
        <Calendar
          mode="single"
          disabled={(date) => !entryDateToIndex.has(toDateKey(date))}
          modifiers={{ hasEntry: entryDates }}
          modifiersClassNames={{
            hasEntry: 'bg-accent/50 rounded-md',
          }}
          onSelect={(date) => {
            if (!date) return
            const index = entryDateToIndex.get(toDateKey(date))
            if (index !== undefined) {
              setCurrentIndex(index)
            }
          }}
          captionLayout="dropdown"
          startMonth={entryBounds?.startMonth}
          endMonth={entryBounds?.endMonth}
          className="w-full rounded-lg border"
        />
      </PopoverContent>
    </Popover>
  )
}
