import { Card, CardContent } from '@/features/shared/components/ui/card'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/features/shared/components/ui/empty'
import { JournalCreateDialog } from '@/features/journals/components/JournalCreateDialog'
import { BookIcon } from 'lucide-react'

export function JournalsListEmptyCard() {
  return (
    <div className="flex w-full justify-center pt-6">
      <Card className="max-w-xl">
        <CardContent>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <BookIcon />
              </EmptyMedia>
            </EmptyHeader>
            <EmptyTitle className="text-xl font-bold">No Journals</EmptyTitle>
            <EmptyDescription>
              {"You haven't created any journals yet. Get started by creating your first journal."}
            </EmptyDescription>
            <EmptyContent>
              <JournalCreateDialog />
            </EmptyContent>
          </Empty>
        </CardContent>
      </Card>
    </div>
  )
}
