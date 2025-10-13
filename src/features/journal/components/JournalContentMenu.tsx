import { Dispatch, SetStateAction } from 'react'
import { Lightbulb, LightbulbOff, Settings } from 'lucide-react'
import { Button } from '@/features/shared/components/ui/button'

export type JournalContentMenuProps = {
  showSuggestions: boolean
  setShowSuggestions: Dispatch<SetStateAction<boolean>>
  type: string
  isToday: boolean
}

export function JournalContentMenu({
  showSuggestions,
  setShowSuggestions,
  type,
  isToday,
}: JournalContentMenuProps) {
  return (
    <div className="absolute top-0 right-0 flex items-center gap-2">
      {type === 'future' && isToday && (
        <Button size="icon" onClick={() => setShowSuggestions((prev) => !prev)}>
          {showSuggestions ? <LightbulbOff /> : <Lightbulb />}
        </Button>
      )}

      <Button size="icon">
        <Settings />
      </Button>
    </div>
  )
}
