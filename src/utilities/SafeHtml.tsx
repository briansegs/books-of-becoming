'use client'

import { useMemo } from 'react'
import createDOMPurify from 'dompurify'

const getDOMPurify = () => {
  if (typeof window !== 'undefined') {
    return createDOMPurify(window)
  }
  return null
}

type SafeHtmlProps = {
  html: string | null | undefined
  className?: string
}

export function SafeHtml({ html, className }: SafeHtmlProps) {
  // Only sanitize if we are on the client
  const sanitized = useMemo(() => {
    const DOMPurify = getDOMPurify()
    if (!DOMPurify || !html) return ''

    return DOMPurify.sanitize(html)
  }, [html])

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }}
      suppressHydrationWarning
    />
  )
}
