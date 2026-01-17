'use client'

import { List } from 'lucide-react'
import React from 'react'

import { Button, type ButtonProps } from '@/features/shared/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/features/shared/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useToolbar } from '@/components/toolbars/toolbar-provider'
import { useEditorIsActive } from '@/hooks/useEditorIsActive'
import { useEditorState } from '@tiptap/react'

const BulletListToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar()

    const isBulletListActive = useEditorIsActive(editor, 'bulletList')

    const canToggleBulletList = useEditorState({
      editor,
      selector: ({ editor }) => (editor ? editor.can().toggleBulletList() : false),
    })

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn('h-8 w-8', isBulletListActive && 'bg-accent', className)}
            onClick={(e) => {
              editor?.chain().focus().toggleBulletList().run()
              onClick?.(e)
            }}
            disabled={!canToggleBulletList}
            ref={ref}
            {...props}
          >
            {children || <List className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Bullet list</span>
        </TooltipContent>
      </Tooltip>
    )
  },
)

BulletListToolbar.displayName = 'BulletListToolbar'

export { BulletListToolbar }
