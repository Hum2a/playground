import { useCallback, useEffect, useRef, useState } from 'react'

export type CopyStatus = 'idle' | 'copied' | 'failed'

async function writeClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  const ta = document.createElement('textarea')
  ta.value = text
  ta.setAttribute('readonly', '')
  ta.style.position = 'fixed'
  ta.style.left = '-9999px'
  document.body.appendChild(ta)
  ta.select()
  const ok = document.execCommand('copy')
  document.body.removeChild(ta)
  if (!ok) throw new Error('execCommand copy failed')
}

export function useCopy(resetMs = 1600) {
  const [status, setStatus] = useState<CopyStatus>('idle')
  const [lastText, setLastText] = useState('')
  const [announcement, setAnnouncement] = useState('')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  const copy = useCallback(
    async (text: string, kind: 'prompt' | 'code' | 'contract' | 'text' = 'prompt') => {
      setLastText(text)
      try {
        await writeClipboard(text)
        setStatus('copied')
        const noun =
          kind === 'code'
            ? 'Code'
            : kind === 'contract'
              ? 'Contract'
              : kind === 'text'
                ? 'Text'
                : 'Prompt'
        setAnnouncement(
          `${noun} copied — ${text.length.toLocaleString('en-US')} characters`,
        )
        if (timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => {
          setStatus('idle')
          setAnnouncement('')
        }, resetMs)
      } catch {
        setStatus('failed')
        setAnnouncement('Copy failed — select the prompt below')
      }
    },
    [resetMs],
  )

  const reset = useCallback(() => {
    setStatus('idle')
    setAnnouncement('')
  }, [])

  return { status, lastText, announcement, copy, reset }
}
