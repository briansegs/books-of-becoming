import { Editor, useEditorState } from '@tiptap/react'

export function useEditorIsActive(editor: Editor | null, item: string) {
  return useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return false
      return editor.isActive(item)
    },
  })
}
