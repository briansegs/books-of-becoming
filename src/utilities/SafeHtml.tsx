'use client'

import { useMemo } from 'react'
import createDOMPurify from 'dompurify'

type SafeHtmlProps = {
  html: string | null | undefined
  className?: string
}

export function SafeHtml({ html, className }: SafeHtmlProps) {
  // Only sanitize if we are on the client
  const sanitized = useMemo(() => {
    if (typeof window === 'undefined' || !html) return ''
    const DOMPurify = createDOMPurify(window)
    return DOMPurify.sanitize(html)
  }, [html])

  // Return empty div during SSR (avoids mismatch)
  return <div className={className} dangerouslySetInnerHTML={{ __html: sanitized }} />
}
