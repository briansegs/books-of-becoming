import { Popover, PopoverContent, PopoverTrigger } from '@/features/shared/components/ui/popover'
import { Label } from '@/features/shared/components/ui/label'
import { Switch } from '@/features/shared/components/ui/switch'
import { Separator } from '@/features/shared/components/ui/separator'
import { Button } from '@/features/shared/components/ui/button'
import { Settings } from 'lucide-react'

export function JournalSettingsMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon">
          <Settings />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Journal Settings</h3>
          <Separator />
        </div>

        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="suggestions" className="text-base">
            Show Suggestions
          </Label>

          <Switch id="suggestions" />
        </div>

        <Button>Save</Button>
      </PopoverContent>
    </Popover>
  )
}
