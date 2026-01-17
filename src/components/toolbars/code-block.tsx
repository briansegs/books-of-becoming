'use client'

import { Code } from 'lucide-react'
import React from 'react'

import { Button, type ButtonProps } from '@/features/shared/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/features/shared/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useToolbar } from '@/components/toolbars/toolbar-provider'
import { useEditorIsActive } from '@/hooks/useEditorIsActive'
import { useEditorState } from '@tiptap/react'

const CodeBlockToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar()

    const isCodeBlockActive = useEditorIsActive(editor, 'codeBlock')

    const canToggleCodeBlock = useEditorState({
      editor,
      selector: ({ editor }) => (editor ? editor.can().toggleCodeBlock() : false),
    })

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn('h-8 w-8', isCodeBlockActive && 'bg-accent', className)}
            onClick={(e) => {
              editor?.chain().focus().toggleCodeBlock().run()
              onClick?.(e)
            }}
            disabled={!canToggleCodeBlock}
            ref={ref}
            {...props}
          >
            {children || <Code className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Code Block</span>
        </TooltipContent>
      </Tooltip>
    )
  },
)

CodeBlockToolbar.displayName = 'CodeBlockToolbar'

export { CodeBlockToolbar }
