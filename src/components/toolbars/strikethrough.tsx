'use client'

import { Strikethrough } from 'lucide-react'
import React from 'react'

import { Button, type ButtonProps } from '@/features/shared/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/features/shared/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useToolbar } from '@/components/toolbars/toolbar-provider'
import { useEditorIsActive } from '@/hooks/useEditorIsActive'
import { useEditorState } from '@tiptap/react'

const StrikeThroughToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar()

    const isStrikeActive = useEditorIsActive(editor, 'strike')

    const canToggleStrike = useEditorState({
      editor,
      selector: ({ editor }) => (editor ? editor.can().toggleStrike() : false),
    })

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn('h-8 w-8', isStrikeActive && 'bg-accent', className)}
            onClick={(e) => {
              editor?.chain().focus().toggleStrike().run()
              onClick?.(e)
            }}
            disabled={!canToggleStrike}
            ref={ref}
            {...props}
          >
            {children || <Strikethrough className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Strikethrough</span>
          <span className="text-gray-11 ml-1 text-xs">(cmd + shift + x)</span>
        </TooltipContent>
      </Tooltip>
    )
  },
)

StrikeThroughToolbar.displayName = 'StrikeThroughToolbar'

export { StrikeThroughToolbar }
