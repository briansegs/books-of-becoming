'use client'

import React from 'react'

import { Button, type ButtonProps } from '@/features/shared/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/features/shared/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useToolbar } from '@/components/toolbars/toolbar-provider'
import { useEditorIsActive } from '@/hooks/useEditorIsActive'
import { Popover, PopoverContent, PopoverTrigger } from '@/features/shared/components/ui/popover'
import { ToggleGroup, ToggleGroupItem } from '@/features/shared/components/ui/toggle-group'

const HeadingToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick }, ref) => {
    const { editor } = useToolbar()

    const isH1Active = useEditorIsActive(editor, 'heading', { level: 1 })
    const isH2Active = useEditorIsActive(editor, 'heading', { level: 2 })
    const isH3Active = useEditorIsActive(editor, 'heading', { level: 3 })

    const activeHeading = isH1Active ? 'h1' : isH2Active ? 'h2' : isH3Active ? 'h3' : ''

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button ref={ref} variant="ghost">
            Headings
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-fit p-2"
          onOpenAutoFocus={(e) => {
            e.preventDefault()
          }}
        >
          <ToggleGroup type="single" value={activeHeading}>
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value="h1"
                  aria-label="Toggle heading 1"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                  className={cn(isH1Active && 'bg-accent', className)}
                >
                  Heading 1
                </ToggleGroupItem>
              </TooltipTrigger>

              <TooltipContent>
                <span className="text-gray-11 text-xs">(cmd + alt + 1)</span>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value="h2"
                  aria-label="Toggle heading 2"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={cn(isH2Active && 'bg-accent', className)}
                >
                  Heading 2
                </ToggleGroupItem>
              </TooltipTrigger>

              <TooltipContent>
                <span className="text-gray-11 text-xs">(cmd + alt + 2)</span>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value="h3"
                  aria-label="Toggle heading 3"
                  onClick={(e) => {
                    editor?.chain().focus().toggleHeading({ level: 3 }).run()
                    onClick?.(e)
                  }}
                  className={cn(isH3Active && 'bg-accent', className)}
                >
                  Heading 3
                </ToggleGroupItem>
              </TooltipTrigger>

              <TooltipContent>
                <span className="text-gray-11 text-xs">(cmd + alt + 3)</span>
              </TooltipContent>
            </Tooltip>
          </ToggleGroup>
        </PopoverContent>
      </Popover>
    )
  },
)

HeadingToolbar.displayName = 'HeadingToolbar'

export { HeadingToolbar }
