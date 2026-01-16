'use client'

import { CornerUpRight } from 'lucide-react'
import React from 'react'

import { Button, type ButtonProps } from '@/features/shared/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/features/shared/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useToolbar } from '@/components/toolbars/toolbar-provider'
import { useEditorState } from '@tiptap/react'

const RedoToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar()

    const canRedo = useEditorState({
      editor,
      selector: ({ editor }) => {
        if (!editor) return null

        return editor.can().redo()
      },
    })

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn('h-8 w-8', className)}
            onClick={(e) => {
              editor?.chain().focus().redo().run()
              onClick?.(e)
            }}
            disabled={!canRedo}
            ref={ref}
            {...props}
          >
            {children || <CornerUpRight className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Redo</span>
        </TooltipContent>
      </Tooltip>
    )
  },
)

RedoToolbar.displayName = 'RedoToolbar'

export { RedoToolbar }
