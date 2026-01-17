'use client'

import { TextQuote } from 'lucide-react'
import React from 'react'

import { Button, type ButtonProps } from '@/features/shared/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/features/shared/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useToolbar } from '@/components/toolbars/toolbar-provider'
import { useEditorState } from '@tiptap/react'
import { useEditorIsActive } from '@/hooks/useEditorIsActive'

const BlockquoteToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar()

    const isBlockquoteActive = useEditorIsActive(editor, 'blockquote')

    const canToggleBlockquote = useEditorState({
      editor,
      selector: ({ editor }) => (editor ? editor.can().toggleBlockquote() : false),
    })

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn('h-8 w-8', isBlockquoteActive && 'bg-accent', className)}
            onClick={(e) => {
              editor?.chain().focus().toggleBlockquote().run()
              onClick?.(e)
            }}
            disabled={!canToggleBlockquote}
            ref={ref}
            {...props}
          >
            {children || <TextQuote className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Blockquote</span>
        </TooltipContent>
      </Tooltip>
    )
  },
)

BlockquoteToolbar.displayName = 'BlockquoteToolbar'

export { BlockquoteToolbar }
