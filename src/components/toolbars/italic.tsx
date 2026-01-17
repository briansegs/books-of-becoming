'use client'

import { ItalicIcon } from 'lucide-react'
import React from 'react'

import { Button, type ButtonProps } from '@/features/shared/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/features/shared/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useToolbar } from '@/components/toolbars/toolbar-provider'
import { useEditorIsActive } from '@/hooks/useEditorIsActive'
import { useEditorState } from '@tiptap/react'

const ItalicToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar()

    const isItalicActive = useEditorIsActive(editor, 'italic')

    const canToggleItalic = useEditorState({
      editor,
      selector: ({ editor }) => (editor ? editor.can().toggleItalic() : false),
    })

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn('h-8 w-8', isItalicActive && 'bg-accent', className)}
            onClick={(e) => {
              editor?.chain().focus().toggleItalic().run()
              onClick?.(e)
            }}
            disabled={!canToggleItalic}
            ref={ref}
            {...props}
          >
            {children || <ItalicIcon className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Italic</span>
          <span className="text-gray-11 ml-1 text-xs">(cmd + i)</span>
        </TooltipContent>
      </Tooltip>
    )
  },
)

ItalicToolbar.displayName = 'ItalicToolbar'

export { ItalicToolbar }
