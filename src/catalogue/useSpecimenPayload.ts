import { useEffect, useState } from 'react'
import { resolvePayload } from '../specimens/resolvePayload'
import type { Specimen, SpecimenPayload } from '../specimens/types'

/**
 * Load specimen HTML/CSS/JS when `enabled` (typically frame visibility).
 * Cached via resolvePayload — remounts do not re-download the chunk.
 */
export function useSpecimenPayload(specimen: Specimen, enabled: boolean) {
  const [payload, setPayload] = useState<SpecimenPayload | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!enabled) {
      setPayload(null)
      setError(null)
      return
    }

    let cancelled = false
    setError(null)

    void resolvePayload(specimen)
      .then((next) => {
        if (!cancelled) setPayload(next)
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setPayload(null)
          setError(err instanceof Error ? err : new Error(String(err)))
        }
      })

    return () => {
      cancelled = true
    }
  }, [specimen, enabled])

  return { payload, error, loading: enabled && !payload && !error }
}
