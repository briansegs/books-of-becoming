'use client'

import { Moon, Sun } from 'lucide-react'
import { Button } from '@/features/shared/components/ui/button'
import { useTheme } from '@/providers/ThemeProvider'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? (
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      ) : (
        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      )}
    </Button>
  )
}
