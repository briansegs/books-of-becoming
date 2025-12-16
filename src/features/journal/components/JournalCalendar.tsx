'use client'

import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/features/shared/components/ui/popover'
import { Button } from '@/features/shared/components/ui/button'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/features/shared/components/ui/calendar'

export function JournalCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon">
          <CalendarIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="space-y-6">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="w-full rounded-lg border"
        />
      </PopoverContent>
    </Popover>
  )
}
