'use client'

import React, { useMemo } from 'react'
import DOMPurify from 'isomorphic-dompurify'

type SafeHtmlProps = {
  html: string | null | undefined
  className?: string
}

export function SafeHtml({ html, className }: SafeHtmlProps) {
  const sanitized = useMemo(() => {
    if (!html) return ''
    return DOMPurify.sanitize(html, {
      USE_PROFILES: { html: true },
    })
  }, [html])

  return <div className={className} dangerouslySetInnerHTML={{ __html: sanitized }} />
}
