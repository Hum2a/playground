import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DEFAULT_CONTROLS, PreviewFrame } from '../harness'
import { buildPrompt, CopyButton } from '../prompt'
import { formatInspiredBy } from '../specimens/inspiration'
import { resolveSpecimen } from '../specimens/resolvePayload'
import type { Specimen } from '../specimens/types'
import { useFrameVisibility } from './useFrameVisibility'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'
import { useSpecimenPayload } from './useSpecimenPayload'
import './specimen-plate.css'

interface SpecimenPlateProps {
  specimen: Specimen
  onFacetClick?: (key: string, value: string) => void
  onFranchiseClick?: (franchise: string) => void
  onTagClick?: (tag: string) => void
}

export function SpecimenPlate({
  specimen,
  onFacetClick,
  onFranchiseClick,
  onTagClick,
}: SpecimenPlateProps) {
  const { ref, visible } = useFrameVisibility()
  const { payload, loading } = useSpecimenPayload(specimen, visible)
  const prefersReduced = usePrefersReducedMotion()
  const [play, setPlay] = useState(false)
  const detailPath = `/s/${specimen.id}`
  const animate = !prefersReduced || play

  useEffect(() => {
    if (prefersReduced) setPlay(false)
  }, [prefersReduced])

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
            className="specimen-plate__placeholder"
            style={{
              aspectRatio: `${specimen.preview.width} / ${specimen.preview.height}`,
            }}
            aria-hidden
            data-loading={loading || undefined}
          />
        )}
        {prefersReduced ? (
          <button
            type="button"
            className="specimen-plate__play"
            aria-pressed={play}
            onClick={() => setPlay((v) => !v)}
          >
            {play ? 'Pause' : 'Play'}
          </button>
        ) : null}
      </div>

      <h2 className="display specimen-plate__title">
        <Link to={detailPath}>{specimen.title}</Link>
      </h2>
      <p className="specimen-plate__blurb">{specimen.blurb}</p>
      <p className="mono-label specimen-plate__facets">
        {(Object.entries(specimen.facets) as [string, string][]).map(
          ([key, value], i, arr) => (
            <span key={key}>
              {onFacetClick ? (
                <button
                  type="button"
                  className="specimen-plate__filter-btn"
                  onClick={() => onFacetClick(key, value)}
                >
                  {value}
                </button>
              ) : (
                value
              )}
              {i < arr.length - 1 ? ' · ' : null}
            </span>
          ),
        )}
      </p>
      {specimen.inspiredBy ? (
        <p className="mono-label specimen-plate__inspired">
          {onFranchiseClick ? (
            <button
              type="button"
              className="specimen-plate__filter-btn"
              onClick={() => onFranchiseClick(specimen.inspiredBy!.franchise)}
            >
              {formatInspiredBy(specimen.inspiredBy)}
            </button>
          ) : (
            formatInspiredBy(specimen.inspiredBy)
          )}
        </p>
      ) : null}
      {specimen.tags.length > 0 ? (
        <p className="mono-label specimen-plate__tags">
          {specimen.tags.map((tag, i) => (
            <span key={tag}>
              {onTagClick ? (
                <button
                  type="button"
                  className="specimen-plate__filter-btn"
                  onClick={() => onTagClick(tag)}
                >
                  {tag}
                </button>
              ) : (
                tag
              )}
              {i < specimen.tags.length - 1 ? ' · ' : null}
            </span>
          ))}
        </p>
      ) : null}

      <div className="specimen-plate__actions">
        <CopyButton
          getText={async () => {
            const resolved = await resolveSpecimen(specimen)
            return buildPrompt(resolved, 'full')
          }}
          mode="full"
        />
        <Link className="specimen-plate__open" to={detailPath}>
          Open →
        </Link>
        <Link
          className="specimen-plate__open"
          to={`/playground?fork=${encodeURIComponent(specimen.id)}`}
        >
          Playground →
        </Link>
      </div>
    </article>
  )
}
