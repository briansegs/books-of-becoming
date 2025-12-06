'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useRef, RefObject, useEffect } from 'react'

interface Props {
  external?: boolean
  newTab?: boolean
  scroll?: boolean
}

type UseClickableCardType<T extends HTMLElement> = {
  card: RefObject<T | null>
  link: RefObject<HTMLAnchorElement | null>
}

export function useClickableCard<T extends HTMLElement>({
  external = false,
  newTab = false,
  scroll = true,
}: Props): UseClickableCardType<T> {
  const router = useRouter()
  const card = useRef<T | null>(null)
  const link = useRef<HTMLAnchorElement | null>(null)
  const timeDown = useRef<number>(0)

  const handleMouseDown = useCallback((_e: MouseEvent) => {
    timeDown.current = Date.now()
  }, [])

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      if (!link.current?.href) return

      const elapsed = Date.now() - timeDown.current
      if (elapsed <= 250 && e.button === 0 && !e.ctrlKey) {
        if (external) {
          window.open(link.current.href, newTab ? '_blank' : '_self')
        } else {
          router.push(link.current.href, { scroll })
        }
      }
    },
    [external, newTab, scroll, router],
  )

  useEffect(() => {
    const el = card.current
    if (!el) return
    el.addEventListener('mousedown', handleMouseDown)
    el.addEventListener('mouseup', handleMouseUp)
    return () => {
      el.removeEventListener('mousedown', handleMouseDown)
      el.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseDown, handleMouseUp])

  return { card, link }
}
