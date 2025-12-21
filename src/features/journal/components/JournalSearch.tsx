'use client'

import { Button } from '@/features/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/features/shared/components/ui/dialog'
import { Input } from '@/features/shared/components/ui/input'
import { Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { JournalEntry, JournalSearchProps } from '../types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/features/shared/components/ui/accordion'
import { format } from 'date-fns'
import { Separator } from '@/features/shared/components/ui/separator'
import { SafeHtml } from '@/utilities/SafeHtml'

export function JournalSearch({ dailyEntries, setCurrentIndex }: JournalSearchProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  const entryDateToIndex = useMemo(() => {
    const map = new Map<string, number>()
    dailyEntries.forEach((g, i) => map.set(g.date, i))
    return map
  }, [dailyEntries])

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300)
    return () => clearTimeout(timer)
  }, [query])

  const allEntries = useMemo(
    () =>
      dailyEntries.flatMap((group) =>
        group.entries.map((entry) => ({
          ...entry,
          date: group.date,
        })),
      ),
    [dailyEntries],
  )

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return []

    const tokens = tokenize(debouncedQuery)

    return allEntries.filter((entry) => {
      const title = entry.title?.toLowerCase() ?? ''

      const titleMatch = tokens.every((t) => title.includes(t))

      const dateMatch = getDateSearchStrings(entry.date).some((dateStr) =>
        tokens.every((t) => dateStr.includes(t)),
      )

      return titleMatch || dateMatch
    })
  }, [debouncedQuery, allEntries])

  function handleClick(entry: JournalEntry & { date: string }) {
    const index = entryDateToIndex.get(entry.date)
    if (index !== undefined) {
      setCurrentIndex(index)
    }

    setQuery('')
    setOpen(false)

    requestAnimationFrame(() => {
      const el = document.getElementById(entry._id)
      el?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) {
          setQuery('')
        }
      }}
    >
      <DialogTrigger asChild>
        <Button size="icon" aria-label="Open search">
          <Search />
        </Button>
      </DialogTrigger>

      <DialogContent onCloseAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Journal Entry Search</DialogTitle>
        </DialogHeader>

        <div className="flex items-center rounded-md border">
          <Input
            type="text"
            placeholder="Search by title or date"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 shadow-none focus-visible:ring-0"
          />
          <div className="border-l-2 px-4">
            <Search />
          </div>
        </div>

        <div className="h-96 space-y-2 overflow-y-auto [scrollbar-gutter:stable]">
          <div className="space-y-1">
            <div className="flex justify-between pr-10 pl-8 text-sm">
              <div>Title</div>
              <div>Date Created</div>
            </div>

            <Separator />
          </div>

          {results.length === 0 && debouncedQuery && (
            <div className="text-sm text-muted-foreground">No results</div>
          )}

          <Accordion type="single" collapsible className="w-full">
            {results.map((entry) => {
              const date = format(new Date(entry._creationTime), 'MM/dd/yyyy')

              return (
                <AccordionItem
                  key={entry._id}
                  value={entry._id}
                  className="w-full px-4 hover:bg-accent"
                >
                  <AccordionTrigger className="w-full min-w-0 gap-4 overflow-hidden hover:no-underline">
                    <div className="flex w-full min-w-0 cursor-pointer items-center gap-2 hover:underline">
                      <div className="min-w-0 flex-1 truncate text-base font-medium">
                        {entry.title ?? date}
                      </div>
                      <div className="shrink-0 text-xs text-muted-foreground">{date}</div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div className="line-clamp-2 text-xs">
                      <SafeHtml
                        html={entry.content}
                        className="prose prose-sm max-w-none dark:prose-invert"
                      />
                    </div>

                    <Button onClick={() => handleClick(entry)}>Go To Entry</Button>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function getDateSearchStrings(dateISO: string) {
  const d = new Date(dateISO)

  const formats = [
    dateISO,
    format(d, 'MM/dd/yyyy'),
    format(d, 'M/d/yyyy'),
    format(d, 'MM/dd/yy'),
    format(d, 'M/d/yy'),
    format(d, 'MM-dd-yyyy'),
    format(d, 'M-d-yyyy'),
    format(d, 'M d yyyy'),
  ]

  return formats.map((s) => s.toLowerCase().replace(/[\s./-]+/g, ' '))
}

function tokenize(query: string) {
  return query
    .toLowerCase()
    .trim()
    .replace(/[\s./-]+/g, ' ')
    .split(' ')
    .filter(Boolean)
}
