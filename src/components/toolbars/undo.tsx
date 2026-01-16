'use client'

import { Button, type ButtonProps } from '@/features/shared/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/features/shared/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useToolbar } from '@/components/toolbars/toolbar-provider'
import { CornerUpLeft } from 'lucide-react'
import React from 'react'
import { useEditorState } from '@tiptap/react'

const UndoToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar()

    const canUndo = useEditorState({
      editor,
      selector: ({ editor }) => editor.can().undo(),
    })

    if (!editor) return null

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn('h-8 w-8', className)}
            onClick={(e) => {
              editor?.chain().focus().undo().run()
              onClick?.(e)
            }}
            disabled={!canUndo}
            ref={ref}
            {...props}
          >
            {children || <CornerUpLeft className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Undo</span>
        </TooltipContent>
      </Tooltip>
    )
  },
)

UndoToolbar.displayName = 'UndoToolbar'

export { UndoToolbar }
