import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scroll to top on pathname change (keeps search for filter URLs). */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
