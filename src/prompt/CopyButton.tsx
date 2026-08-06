import { useEffect, useRef } from 'react'
import { useCopy } from './useCopy'
import './copy-button.css'

export type CopyMode = 'full' | 'code' | 'contract' | 'text'

const LABELS: Record<CopyMode, string> = {
  full: 'Copy prompt',
  code: 'Code only',
  contract: 'Contract only',
  text: 'Copy',
}

interface CopyButtonProps {
  /** Eager text. Prefer `getText` when the string is expensive to build. */
  text?: string
  /** Lazy text resolver — called only on copy click. */
  getText?: () => string | Promise<string>
  mode?: CopyMode
  label?: string
  className?: string
}

export function CopyButton({
  text,
  getText,
  mode = 'full',
  label,
  className,
}: CopyButtonProps) {
  const { status, lastText, announcement, copy } = useCopy()
  const fallbackRef = useRef<HTMLTextAreaElement>(null)
  const idleLabel = label ?? LABELS[mode]

  useEffect(() => {
    if (status !== 'failed' || !fallbackRef.current) return
    fallbackRef.current.focus()
    fallbackRef.current.select()
  }, [status])

  const buttonLabel =
    status === 'copied'
      ? 'Copied'
      : status === 'failed'
        ? 'Copy failed — select the prompt below'
        : idleLabel

  return (
    <div className={['copy-button', className].filter(Boolean).join(' ')}>
      <button
        type="button"
        className={[
          'copy-button__btn',
          status === 'copied' ? 'copy-button__btn--ok' : '',
          status === 'failed' ? 'copy-button__btn--fail' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={() => {
          void (async () => {
            const resolved = getText ? await getText() : (text ?? '')
            await copy(
              resolved,
              mode === 'code'
                ? 'code'
                : mode === 'contract'
                  ? 'contract'
                  : mode === 'text'
                    ? 'text'
                    : 'prompt',
            )
          })()
        }}
      >
        {buttonLabel}
      </button>
      <span className="copy-button__live" aria-live="polite">
        {announcement}
      </span>
      {status === 'failed' ? (
        <textarea
          ref={fallbackRef}
          className="copy-button__fallback"
          readOnly
          value={lastText || text || ''}
          aria-label="Prompt text — select and copy manually"
        />
      ) : null}
    </div>
  )
}
