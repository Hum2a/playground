import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { DEFAULT_CONTROLS, PreviewFrame } from '../harness'
import type { Specimen } from '../specimens/types'
import { useFrameVisibility } from './useFrameVisibility'
import { useGridWindow } from './useGridWindow'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'
import { useSpecimenPayload } from './useSpecimenPayload'
import './contact-sheet.css'

interface ContactSheetProps {
  specimens: Specimen[]
}

function ContactSheetCell({
  specimen,
  animate,
}: {
  specimen: Specimen
  animate: boolean
}) {
  const { ref, visible } = useFrameVisibility()
  const { payload, loading } = useSpecimenPayload(specimen, visible)

  return (
    <div ref={ref} className="contact-sheet__cell">
      {visible && payload ? (
        <PreviewFrame
          html={payload.files.html}
          css={payload.files.css}
          js={payload.files.js}
          label={specimen.preview.label}
          width={specimen.preview.width}
          height={specimen.preview.height}
          scaffold={payload.scaffold ?? specimen.preview.scaffold}
          controls={{
            ...DEFAULT_CONTROLS,
            background: specimen.preview.background,
            viewport: 'full',
            playbackRate: animate ? 1 : 0,
            reducedMotion: animate ? 'off' : 'force',
          }}
        />
      ) : (
        <div
          className="contact-sheet__placeholder"
          style={{
            aspectRatio: `${specimen.preview.width} / ${specimen.preview.height}`,
          }}
          aria-hidden
          data-loading={loading || undefined}
        />
      )}
      <Link
        className="contact-sheet__caption mono-label"
        to={`/s/${specimen.id}`}
        title={`${specimen.ref} · ${specimen.title}`}
      >
        {specimen.ref}
      </Link>
    </div>
  )
}

export function ContactSheet({ specimens }: ContactSheetProps) {
  const prefersReduced = usePrefersReducedMotion()
  const [playSheet, setPlaySheet] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const [minTrack, setMinTrack] = useState(140)

  useEffect(() => {
    if (prefersReduced) setPlaySheet(false)
  }, [prefersReduced])

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const raw = getComputedStyle(el).getPropertyValue('--sheet-min').trim()
    const px = Number.parseFloat(raw)
    if (Number.isFinite(px) && px > 0) setMinTrack(px)
  }, [])

  const win = useGridWindow({
    containerRef: gridRef,
    itemCount: specimens.length,
    minTrackPx: minTrack,
    gapPx: 8,
    estimateRowHeight: 168,
    overscanRows: 3,
  })

  const animate = !prefersReduced || playSheet
  const slice = specimens.slice(win.start, win.end)

  return (
    <section className="contact-sheet" aria-label="Contact sheet">
      <div
        ref={gridRef}
        className="contact-sheet__grid"
        style={{
          paddingTop: win.padTop,
          paddingBottom: win.padBottom,
        }}
      >
        {slice.map((specimen) => (
          <ContactSheetCell
            key={specimen.id}
            specimen={specimen}
            animate={animate}
          />
        ))}
      </div>
      {prefersReduced ? (
        <button
          type="button"
          className="contact-sheet__play"
          onClick={() => setPlaySheet((v) => !v)}
          aria-pressed={playSheet}
        >
          {playSheet ? 'Pause the sheet' : 'Play the sheet'}
        </button>
      ) : null}
      <div className="contact-sheet__copy">
        <p>
          {specimens.length === 1
            ? 'One motion artifact, pulled out of a shipped project and made portable.'
            : `${specimens.length} motion artifacts, pulled out of shipped projects and made portable.`}
        </p>
        <p>
          Browse a specimen, copy a recreation prompt, or open the playground and
          export a new one.
        </p>
      </div>
    </section>
  )
}
