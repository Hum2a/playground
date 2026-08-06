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
  restart: () => void
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

    const bg = background ?? controls.background
    const forceReducedMotion = controls.reducedMotion === 'force'
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

    useImperativeHandle(ref, () => ({
      restart: () => {
        iframeRef.current?.contentWindow?.postMessage({ type: 'restart' }, '*')
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
      const frame = iframeRef.current
      if (!frame?.contentWindow) return
      frame.contentWindow.postMessage(
        { type: 'playback', rate: controls.playbackRate },
        '*',
      )
    }, [controls.playbackRate, srcDoc])

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
            ref={iframeRef}
            className="preview-frame__iframe"
            title={`Preview: ${label}`}
            sandbox="allow-scripts"
            loading="lazy"
            srcDoc={srcDoc}
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
