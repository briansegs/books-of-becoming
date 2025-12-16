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

export function JournalSearch() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon">
          <Search />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Journal Entry Search</DialogTitle>
        </DialogHeader>

        <div className="flex items-center rounded-md border">
          <Input
            type="text"
            placeholder="Search..."
            className="border-0 shadow-none focus-visible:ring-0"
          />
          <div className="border-l-2 px-4">
            <Search />
          </div>
        </div>

        <div>Results...</div>
      </DialogContent>
    </Dialog>
  )
}
