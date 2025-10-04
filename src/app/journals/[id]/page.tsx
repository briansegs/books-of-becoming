import { JournalCreateDialog } from '@/features/shared/components/journal/JournalCreateDialog'
import { Card, CardContent, CardFooter } from '@/features/shared/components/ui/card'

import { auth } from '@clerk/nextjs/server'
import { api } from 'convex/_generated/api'
import { Doc } from 'convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'
import { BookIcon } from 'lucide-react'
import { redirect } from 'next/navigation'

type JournalsType = Doc<'journals'>[] | null

type Args = {
  params: Promise<{
    id: string
  }>
}

export default async function Journals({ params }: Args) {
  const { id: userIdFromPath } = await params
  const { userId, getToken } = await auth()

  let journals: JournalsType = null
  let fetchError = false

  if (!userId) {
    console.error('Failed to fetch Clerk user')
    fetchError = true
  }

  if (userId !== userIdFromPath) {
    redirect(`/journals/${userId}`)
  }

  try {
    const token = (await getToken({ template: 'convex' })) || ''
    journals = await fetchQuery(api.journals.get, {}, { token })
  } catch (error) {
    console.error('Failed to fetch journals:', error)
    fetchError = true
  }

  return (
    <div className="flex min-h-screen w-full flex-col gap-12 p-12">
      <div className="w-full text-center text-3xl">Journals</div>
      <div className="flex w-full flex-wrap gap-6">
        {journals ? (
          journals.map((journal) => {
            return (
              <Card key={journal._id} className="flex flex-col items-center pt-4">
                <CardContent>
                  <BookIcon className="h-32 w-32" />
                </CardContent>

                <CardFooter>
                  <p className="text-xl font-semibold">{journal.title}</p>
                </CardFooter>
              </Card>
            )
          })
        ) : fetchError ? (
          <p>Failed to load journal data. Please try again later.</p>
        ) : (
          <p>Loading journals...</p>
        )}

        <Card className="flex flex-col items-center pt-4">
          <CardContent>
            <BookIcon className="h-32 w-32" />
          </CardContent>

          <CardFooter>
            <JournalCreateDialog />
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
