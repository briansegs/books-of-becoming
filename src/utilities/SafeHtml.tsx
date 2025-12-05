'use client'

import { useEffect, useMemo, useState } from 'react'
import createDOMPurify from 'dompurify'

type SafeHtmlProps = {
  html: string | null | undefined
  className?: string
}

export function SafeHtml({ html, className }: SafeHtmlProps) {
  const [isMounted, setIsMounted] = useState(false)

  // Prevent SSR mismatch by delaying any DOMPurify usage
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const DOMPurify = useMemo(() => {
    if (typeof window !== 'undefined') {
      return createDOMPurify(window)
    }
    return null
  }, [])

  const sanitized = useMemo(() => {
    if (!isMounted || !html || !DOMPurify) return ''
    return DOMPurify.sanitize(html)
  }, [isMounted, html, DOMPurify])

  // During SSR + first client render: return empty container
  return <div className={className} dangerouslySetInnerHTML={{ __html: sanitized }} />
}
