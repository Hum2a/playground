import { useEffect, useRef, useState } from 'react'

/** Mount when near viewport; unmount when more than one viewport away. */
export function useFrameVisibility(rootMargin = '100% 0px') {
  const ref = useRef<HTMLDivElement>(null)
  // Start true so above-fold cells avoid a blank flash before IO fires.
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return

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
