import { useState } from 'react'
import { DEFAULT_CONTROLS, PreviewFrame } from '../harness'
import type { Specimen } from '../specimens'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'
import './contact-sheet.css'

interface ContactSheetProps {
  specimens: Specimen[]
}

export function ContactSheet({ specimens }: ContactSheetProps) {
  const prefersReduced = usePrefersReducedMotion()
  const [playSheet, setPlaySheet] = useState(false)
  const animate = !prefersReduced || playSheet

  return (
    <section className="contact-sheet" aria-label="Contact sheet">
      <div className="contact-sheet__grid">
        {specimens.map((specimen) => (
          <div key={specimen.id} className="contact-sheet__cell">
            <PreviewFrame
              html={specimen.files.html}
              css={specimen.files.css}
              js={specimen.files.js}
              label={specimen.preview.label}
              width={specimen.preview.width}
              height={specimen.preview.height}
              scaffold={specimen.preview.scaffold}
              controls={{
                ...DEFAULT_CONTROLS,
                background: specimen.preview.background,
                viewport: 'full',
                playbackRate: animate ? 1 : 0,
                reducedMotion: animate ? 'off' : 'force',
              }}
            />
          </div>
        ))}
      </div>
      {prefersReduced && !playSheet ? (
        <button
          type="button"
          className="contact-sheet__play"
          onClick={() => setPlaySheet(true)}
        >
          Play the sheet
        </button>
      ) : null}
      <div className="contact-sheet__copy">
        <p>
          {specimens.length === 1
            ? 'One motion artifact, pulled out of a shipped project and made portable.'
            : `${specimens.length} motion artifacts, pulled out of shipped projects and made portable.`}
        </p>
        <p>Browse a specimen, copy a recreation prompt, or open the playground and export a new one.</p>
      </div>
    </section>
  )
}
