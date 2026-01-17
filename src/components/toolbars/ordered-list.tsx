'use client'

import { ListOrdered } from 'lucide-react'
import React from 'react'

import { Button, type ButtonProps } from '@/features/shared/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/features/shared/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useToolbar } from '@/components/toolbars/toolbar-provider'
import { useEditorIsActive } from '@/hooks/useEditorIsActive'
import { useEditorState } from '@tiptap/react'

const OrderedListToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar()

    const isOrderedListActive = useEditorIsActive(editor, 'orderedList')

    const canToggleOrderedList = useEditorState({
      editor,
      selector: ({ editor }) => (editor ? editor.can().toggleOrderedList() : false),
    })

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn('h-8 w-8', isOrderedListActive && 'bg-accent', className)}
            onClick={(e) => {
              editor?.chain().focus().toggleOrderedList().run()
              onClick?.(e)
            }}
            disabled={!canToggleOrderedList}
            ref={ref}
            {...props}
          >
            {children || <ListOrdered className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Ordered list</span>
        </TooltipContent>
      </Tooltip>
    )
  },
)

OrderedListToolbar.displayName = 'OrderedListToolbar'

export { OrderedListToolbar }
