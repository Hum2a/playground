import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { composeSrcDoc } from './composeSrcDoc'
import type { HarnessControls, PreviewBackground } from './types'
import './preview-frame.css'

export interface PreviewFrameProps {
  html: string
  css: string
  js?: string
  label: string
  width: number
  height: number
  scaffold?: string
  controls: HarnessControls
  background?: PreviewBackground
  className?: string
}

export interface PreviewFrameHandle {
  /** Soft restart — CSS animations via postMessage. */
  restart: () => void
  /** Hard restart — remount srcdoc so JS-driven specimens reset. */
  hardRestart: () => void
}

export const PreviewFrame = forwardRef<PreviewFrameHandle, PreviewFrameProps>(
  function PreviewFrame(
    {
      html,
      css,
      js,
      label,
      width,
      height,
      scaffold,
      controls,
      background,
      className,
    },
    ref,
  ) {
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const shellRef = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState(1)
    const [remountKey, setRemountKey] = useState(0)

    const bg = background ?? controls.background
    // Prefers also applies force so specimen CSS `@media` + `[data-force-…]` gates both fire.
    const forceReducedMotion =
      controls.reducedMotion === 'force' ||
      controls.reducedMotion === 'prefers'
    const emulatePrefersReducedMotion = controls.reducedMotion === 'prefers'

    const srcDoc = useMemo(
      () =>
        composeSrcDoc({
          html,
          css,
          js,
          background: bg,
          forceReducedMotion,
          emulatePrefersReducedMotion,
          scaffold,
        }),
      [html, css, js, bg, forceReducedMotion, emulatePrefersReducedMotion, scaffold],
    )

    const frameWidth =
      controls.viewport === 'full' ? width : Math.min(width, controls.viewport)

    const postPlayback = () => {
      iframeRef.current?.contentWindow?.postMessage(
        { type: 'playback', rate: controls.playbackRate },
        '*',
      )
    }

    useImperativeHandle(ref, () => ({
      restart: () => {
        iframeRef.current?.contentWindow?.postMessage({ type: 'restart' }, '*')
      },
      hardRestart: () => {
        setRemountKey((k) => k + 1)
      },
    }))

    useEffect(() => {
      const shell = shellRef.current
      if (!shell) return

      const update = () => {
        const available = shell.clientWidth
        setScale(available < frameWidth ? available / frameWidth : 1)
      }

      update()
      const observer = new ResizeObserver(update)
      observer.observe(shell)
      return () => observer.disconnect()
    }, [frameWidth])

    useEffect(() => {
      postPlayback()
    }, [controls.playbackRate, srcDoc, remountKey])

    return (
      <div
        ref={shellRef}
        className={['preview-frame', className].filter(Boolean).join(' ')}
      >
        <div
          className="preview-frame__scaler"
          style={{
            width: frameWidth * scale,
            height: height * scale,
          }}
        >
          <iframe
            key={remountKey}
            ref={iframeRef}
            className="preview-frame__iframe"
            title={`Preview: ${label}`}
            sandbox="allow-scripts"
            loading="lazy"
            tabIndex={-1}
            srcDoc={srcDoc}
            onLoad={postPlayback}
            style={{
              width: frameWidth,
              height,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          />
        </div>
      </div>
    )
  },
)
