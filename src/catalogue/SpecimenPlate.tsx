import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DEFAULT_CONTROLS, PreviewFrame } from '../harness'
import { buildPrompt, CopyButton } from '../prompt'
import type { Specimen } from '../specimens'
import { formatFacets, formatInspiredBy } from '../specimens'
import { useFrameVisibility } from './useFrameVisibility'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'
import './specimen-plate.css'

interface SpecimenPlateProps {
  specimen: Specimen
}

export function SpecimenPlate({ specimen }: SpecimenPlateProps) {
  const { ref, visible } = useFrameVisibility()
  const prefersReduced = usePrefersReducedMotion()
  const [play, setPlay] = useState(false)
  const animate = !prefersReduced || play
  const prompt = buildPrompt(specimen, 'full')

  return (
    <article className="plate specimen-plate" ref={ref}>
      <header className="specimen-plate__meta">
        <span className="mono-label">{specimen.ref}</span>
        <span className="mono-label specimen-plate__origin">
          {specimen.origin.project}
        </span>
      </header>

      <div
        className="specimen-plate__preview"
        tabIndex={0}
        aria-label={`Preview: ${specimen.preview.label}`}
      >
        {visible ? (
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
        ) : (
          <div
            className="specimen-plate__placeholder"
            style={{ aspectRatio: `${specimen.preview.width} / ${specimen.preview.height}` }}
            aria-hidden
          />
        )}
        {prefersReduced && !play ? (
          <button
            type="button"
            className="specimen-plate__play"
            onClick={() => setPlay(true)}
          >
            Play
          </button>
        ) : null}
      </div>

      <h2 className="display specimen-plate__title">{specimen.title}</h2>
      <p className="mono-label specimen-plate__facets">
        {formatFacets(specimen.facets)}
      </p>
      {specimen.inspiredBy ? (
        <p className="mono-label specimen-plate__inspired">
          {formatInspiredBy(specimen.inspiredBy)}
        </p>
      ) : null}
      {specimen.tags.length > 0 ? (
        <p className="mono-label specimen-plate__tags">{specimen.tags.join(' · ')}</p>
      ) : null}

      <div className="specimen-plate__actions">
        <CopyButton text={prompt} mode="full" />
        <Link className="specimen-plate__open" to={`/s/${specimen.id}`}>
          Open →
        </Link>
      </div>
    </article>
  )
}
