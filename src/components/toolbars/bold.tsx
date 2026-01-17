'use client'

import { BoldIcon } from 'lucide-react'
import React from 'react'

import { Button, type ButtonProps } from '@/features/shared/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/features/shared/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useToolbar } from '@/components/toolbars/toolbar-provider'
import { useEditorIsActive } from '@/hooks/useEditorIsActive'
import { useEditorState } from '@tiptap/react'

const BoldToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar()

    const isBoldActive = useEditorIsActive(editor, 'bold')

    const canToggleBold = useEditorState({
      editor,
      selector: ({ editor }) => (editor ? editor.can().toggleBold() : false),
    })

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn('h-8 w-8', isBoldActive && 'bg-accent', className)}
            onClick={(e) => {
              editor?.chain().focus().toggleBold().run()
              onClick?.(e)
            }}
            disabled={!canToggleBold}
            ref={ref}
            {...props}
          >
            {children || <BoldIcon className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Bold</span>
          <span className="text-gray-11 ml-1 text-xs">(cmd + b)</span>
        </TooltipContent>
      </Tooltip>
    )
  },
)

BoldToolbar.displayName = 'BoldToolbar'

export { BoldToolbar }
