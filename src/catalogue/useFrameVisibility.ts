import { useLayoutEffect, useRef, useState } from 'react'

function parseRootMargin(rootMargin: string): {
  top: number
  right: number
  bottom: number
  left: number
} {
  const parts = rootMargin.trim().split(/\s+/)
  const [a = '0px', b = a, c = a, d = b] = parts
  const px = (token: string, axis: 'y' | 'x') => {
    if (token.endsWith('%')) {
      const n = Number.parseFloat(token)
      const base = axis === 'y' ? window.innerHeight : window.innerWidth
      return (n / 100) * base
    }
    return Number.parseFloat(token) || 0
  }
  return {
    top: px(a, 'y'),
    right: px(b, 'x'),
    bottom: px(c, 'y'),
    left: px(d, 'x'),
  }
}

function intersectsExpandedViewport(
  rect: DOMRectReadOnly,
  rootMargin: string,
): boolean {
  const m = parseRootMargin(rootMargin)
  const top = -m.top
  const left = -m.left
  const bottom = window.innerHeight + m.bottom
  const right = window.innerWidth + m.right
  return (
    rect.bottom > top &&
    rect.right > left &&
    rect.top < bottom &&
    rect.left < right
  )
}

/** Mount when near viewport; unmount when outside the expanded margin. */
export function useFrameVisibility(rootMargin = '50% 0px') {
  const ref = useRef<HTMLDivElement>(null)
  // Start false so offscreen cells never mount iframes before IO runs.
  const [visible, setVisible] = useState(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    // Sync above-fold check avoids a blank flash for cells already in view.
    setVisible(intersectsExpandedViewport(el.getBoundingClientRect(), rootMargin))

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
      },
      { root: null, rootMargin, threshold: 0 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return { ref, visible }
}
