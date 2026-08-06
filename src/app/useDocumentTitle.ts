import { useEffect } from 'react'

/** Set `document.title` for the active route; restore archive default on leave. */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previous = document.title
    document.title = title
    return () => {
      document.title = previous
    }
  }, [title])
}
