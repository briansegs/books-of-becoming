import { Button } from '@/features/shared/components/ui/button'
import { Card, CardContent, CardFooter } from '@/features/shared/components/ui/card'
import { auth } from '@clerk/nextjs/server'
import { api } from 'convex/_generated/api'
import { Doc } from 'convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'
import { BookIcon, Plus } from 'lucide-react'

type JournalsType = Doc<'journals'>[] | null

export default async function Journals() {
  const { userId, getToken } = await auth()

  if (!userId) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p>Please sign in to view your journals.</p>
      </div>
    )
  }

  let journals: JournalsType = null
  let fetchError = false

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
      <div className="flex w-full justify-center">
        {journals ? (
          journals.map((journal) => {
            return (
              <Card key={journal._id}>
                <CardContent>
                  <BookIcon />
                </CardContent>

                <CardFooter>{journal.title}</CardFooter>
              </Card>
            )
          })
        ) : fetchError ? (
          <p>Failed to load jounal data. Please try again later.</p>
        ) : (
          <p>Loading journals...</p>
        )}

        <Card className="flex flex-col items-center pt-4">
          <CardContent>
            <BookIcon className="h-32 w-32" />
          </CardContent>

          <CardFooter>
            <Button>
              <Plus /> Create a Journal
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
