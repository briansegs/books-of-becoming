import { Editor, useEditorState } from '@tiptap/react'

export function useEditorIsActive(editor: Editor | null, item: string, obj?: { level: number }) {
  return useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return false
      return editor.isActive(item, obj)
    },
  })
}
