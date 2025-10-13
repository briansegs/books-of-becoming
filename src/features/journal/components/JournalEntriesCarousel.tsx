'use client'

import { format } from 'date-fns'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/features/shared/components/ui/carousel'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Group } from './ journalContent'

type JournalEntriesCarouselProps = {
  currentEntry?: Group
  setCurrentIndex: Dispatch<SetStateAction<number>>
  groupedEntries: Group[]
  todayDate: Date
}

export function JournalEntriesCarousel({
  currentEntry,
  setCurrentIndex,
  groupedEntries,
  todayDate,
}: JournalEntriesCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()

  const lastIndex = groupedEntries.length

  useEffect(() => {
    setCurrentIndex(lastIndex)
  }, [lastIndex, setCurrentIndex])

  useEffect(() => {
    if (!api) return

    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap())
    })
  }, [api, setCurrentIndex])

  return (
    <div className="mx-auto max-w-md space-y-4">
      <div className="text-center text-lg font-semibold">
        {currentEntry ? format(currentEntry.date, 'MMMM yyyy') : format(todayDate, 'MMMM yyyy')}
      </div>

      <Carousel
        opts={{
          align: 'start',
          loop: false,
          startIndex: groupedEntries.length,
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {groupedEntries.map((entry) => {
            const date = new Date(entry.date)
            const dayNumber = format(date, 'd')
            const weekday = format(date, 'EEEE')

            // console.log('entry: ', entry)

            // console.log('date: ', date.toISOString().split('T')[0] || '')
            // console.log('todayDate: ', format(todayDate, 'yyyy-MM-dd'))
            // console.log(
            //   'True or false: ',
            //   (date.toISOString().split('T')[0] || '') === format(todayDate, 'yyyy-MM-dd'),
            // )

            // if ((date.toISOString().split('T')[0] || '') === format(todayDate, 'yyyy-MM-dd'))
            //   return null

            return (
              <CarouselItem
                key={entry.date}
                className="flex flex-col items-center justify-center gap-4"
              >
                <div className="w-18 rounded-md border p-1 text-center text-lg">{dayNumber}</div>

                <div className="text-muted-foreground">{weekday}</div>
              </CarouselItem>
            )
          })}

          <CarouselItem className="flex flex-col items-center justify-center gap-4">
            <div className="w-18 rounded-md border p-1 text-center text-lg">
              {format(todayDate, 'd')}
            </div>

            <div className="text-muted-foreground">{`Today | ${format(todayDate, 'EEEE')} `}</div>
          </CarouselItem>
        </CarouselContent>

        <>
          <CarouselPrevious variant="ghost" className="rounded-md" />
          <CarouselNext variant="ghost" className="rounded-md" />
        </>
      </Carousel>
    </div>
  )
}
