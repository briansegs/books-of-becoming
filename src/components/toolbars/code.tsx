'use client'

import { Code2 } from 'lucide-react'
import React from 'react'

import { Button, type ButtonProps } from '@/features/shared/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/features/shared/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useToolbar } from '@/components/toolbars/toolbar-provider'
import { useEditorIsActive } from '@/hooks/useEditorIsActive'
import { useEditorState } from '@tiptap/react'

const CodeToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar()

    const isCodeActive = useEditorIsActive(editor, 'code')

    const canToggleCode = useEditorState({
      editor,
      selector: ({ editor }) => (editor ? editor.can().toggleCode() : false),
    })

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn('h-8 w-8', isCodeActive && 'bg-accent', className)}
            onClick={(e) => {
              editor?.chain().focus().toggleCode().run()
              onClick?.(e)
            }}
            disabled={!canToggleCode}
            ref={ref}
            {...props}
          >
            {children || <Code2 className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Code</span>
        </TooltipContent>
      </Tooltip>
    )
  },
)

CodeToolbar.displayName = 'CodeToolbar'

export { CodeToolbar }
