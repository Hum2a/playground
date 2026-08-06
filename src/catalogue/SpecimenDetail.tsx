import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { useDocumentTitle } from '../app/useDocumentTitle'
import {
  ControlStrip,
  DEFAULT_CONTROLS,
  PreviewFrame,
  type HarnessControls,
  type PreviewFrameHandle,
} from '../harness'
import { buildPrompt, CopyButton } from '../prompt'
import {
  formatFacets,
  formatInspiredBy,
  getSpecimen,
  getSpecimenNeighbors,
} from '../specimens'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'
import { renderMarkdown } from './renderMarkdown'
import './specimen-detail.css'

type TabId = 'spec' | 'markup' | 'styles' | 'contract' | 'prompt'

const TABS: { id: TabId; label: string }[] = [
  { id: 'spec', label: 'Spec' },
  { id: 'markup', label: 'Markup' },
  { id: 'styles', label: 'Styles' },
  { id: 'contract', label: 'Contract' },
  { id: 'prompt', label: 'Prompt' },
]

function seedControls(
  specimen: NonNullable<ReturnType<typeof getSpecimen>>,
  prefersReduced: boolean,
): HarnessControls {
  return {
    ...DEFAULT_CONTROLS,
    background: specimen.preview.background,
    viewport: specimen.preview.width <= 360 ? 360 : DEFAULT_CONTROLS.viewport,
    reducedMotion: prefersReduced ? 'force' : 'off',
    playbackRate: prefersReduced ? 0 : 1,
  }
}

export function SpecimenDetail() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const specimen = id ? getSpecimen(id) : undefined
  const prefersReduced = usePrefersReducedMotion()
  const frameRef = useRef<PreviewFrameHandle>(null)
  const [tab, setTab] = useState<TabId>('spec')
  const [controlsOpen, setControlsOpen] = useState(true)
  const baseId = useId()
  const seededFor = useRef<string | null>(null)
  const [controls, setControls] = useState<HarnessControls>(DEFAULT_CONTROLS)

  const prompts = useMemo(() => {
    if (!specimen) return null
    return {
      full: buildPrompt(specimen, 'full'),
      code: buildPrompt(specimen, 'code'),
      contract: buildPrompt(specimen, 'contract'),
    }
  }, [specimen])

  const neighbours = useMemo(
    () =>
      specimen
        ? getSpecimenNeighbors(specimen.id)
        : { prev: undefined, next: undefined },
    [specimen],
  )

  useDocumentTitle(
    specimen
      ? `${specimen.title} · ${specimen.ref} — Specimen Archive`
      : 'Specimen not found — Specimen Archive',
  )

  useEffect(() => {
    if (!specimen) return
    if (seededFor.current === specimen.id) return
    seededFor.current = specimen.id
    setControls(seedControls(specimen, prefersReduced))
  }, [specimen, prefersReduced])

  const catalogueHref = searchParams.toString()
    ? `/?${searchParams.toString()}`
    : '/'

  if (specimen && id && id !== specimen.id) {
    const qs = searchParams.toString()
    return (
      <Navigate to={`/s/${specimen.id}${qs ? `?${qs}` : ''}`} replace />
    )
  }

  if (!specimen || !prompts) {
    return (
      <div className="specimen-detail__empty">
        <p>No specimen with id “{id}”.</p>
        <p>
          <Link to="/">Return to the catalogue</Link> and open a plate from the
          list.
        </p>
      </div>
    )
  }

  const tabIndex = TABS.findIndex((t) => t.id === tab)

  const onTabKeyDown = (event: KeyboardEvent) => {
    if (
      event.key !== 'ArrowRight' &&
      event.key !== 'ArrowLeft' &&
      event.key !== 'Home' &&
      event.key !== 'End'
    ) {
      return
    }
    event.preventDefault()
    let next = tabIndex
    if (event.key === 'ArrowRight') next = (tabIndex + 1) % TABS.length
    if (event.key === 'ArrowLeft')
      next = (tabIndex - 1 + TABS.length) % TABS.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = TABS.length - 1
    setTab(TABS[next].id)
    document.getElementById(`${baseId}-tab-${TABS[next].id}`)?.focus()
  }

  const tabRaw =
    tab === 'spec'
      ? specimen.spec
      : tab === 'markup'
        ? specimen.files.html
        : tab === 'styles'
          ? specimen.files.css
          : tab === 'contract'
            ? JSON.stringify(specimen.contract, null, 2)
            : prompts.full

  const tabCopyLabel =
    tab === 'spec'
      ? 'Copy spec'
      : tab === 'markup'
        ? 'Copy HTML'
        : tab === 'styles'
          ? 'Copy CSS'
          : tab === 'contract'
            ? 'Copy JSON'
            : 'Copy prompt'

  return (
    <div className="specimen-detail">
      <nav className="specimen-detail__nav" aria-label="Specimen">
        <Link className="specimen-detail__back" to={catalogueHref}>
          ← Catalogue
        </Link>
        <div className="specimen-detail__siblings">
          {neighbours.prev ? (
            <Link to={`/s/${neighbours.prev.id}`}>← {neighbours.prev.ref}</Link>
          ) : (
            <span className="specimen-detail__sibling-disabled">← Prev</span>
          )}
          {neighbours.next ? (
            <Link to={`/s/${neighbours.next.id}`}>{neighbours.next.ref} →</Link>
          ) : (
            <span className="specimen-detail__sibling-disabled">Next →</span>
          )}
        </div>
      </nav>

      <header className="specimen-detail__header">
        <p className="mono-label">
          {specimen.ref} · {specimen.origin.project}
        </p>
        <h1 className="display specimen-detail__title">{specimen.title}</h1>
        <p className="specimen-detail__blurb">{specimen.blurb}</p>
        <p className="mono-label specimen-detail__facets">
          {formatFacets(specimen.facets)}
        </p>
        {specimen.inspiredBy ? (
          <p className="mono-label specimen-detail__inspired">
            {formatInspiredBy(specimen.inspiredBy)}
          </p>
        ) : null}
        {specimen.tags.length > 0 ? (
          <p className="mono-label specimen-detail__tags">
            {specimen.tags.join(' · ')}
          </p>
        ) : null}
        <p className="specimen-detail__fork">
          <Link
            to={`/playground?fork=${encodeURIComponent(specimen.id)}`}
            className="specimen-detail__fork-link"
          >
            Open in playground
          </Link>
        </p>
      </header>

      <div className="specimen-detail__layout">
        <div className="specimen-detail__preview-col">
          <div
            className="specimen-detail__preview-wrap"
            tabIndex={0}
            aria-label={`Preview: ${specimen.preview.label}`}
          >
            <PreviewFrame
              ref={frameRef}
              html={specimen.files.html}
              css={specimen.files.css}
              js={specimen.files.js}
              label={specimen.preview.label}
              width={specimen.preview.width}
              height={specimen.preview.height}
              scaffold={specimen.preview.scaffold}
              controls={controls}
            />
          </div>
          <button
            type="button"
            className="specimen-detail__controls-toggle"
            aria-expanded={controlsOpen}
            onClick={() => setControlsOpen((v) => !v)}
          >
            {controlsOpen ? 'Hide controls' : 'Controls'}
          </button>
          <div
            className={
              controlsOpen
                ? 'specimen-detail__controls'
                : 'specimen-detail__controls specimen-detail__controls--collapsed'
            }
          >
            <ControlStrip
              value={controls}
              onChange={setControls}
              onRestart={() => frameRef.current?.hardRestart()}
              onSoftRestart={() => frameRef.current?.restart()}
            />
          </div>
        </div>

        <div className="specimen-detail__source">
          <div
            className="specimen-detail__tabs"
            role="tablist"
            aria-label="Specimen source"
            onKeyDown={onTabKeyDown}
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                id={`${baseId}-tab-${t.id}`}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                aria-controls={`${baseId}-panel-${t.id}`}
                tabIndex={tab === t.id ? 0 : -1}
                className="specimen-detail__tab"
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="specimen-detail__copy">
            <CopyButton text={tabRaw} mode="text" label={tabCopyLabel} />
            <CopyButton text={prompts.full} mode="full" />
            <CopyButton text={prompts.code} mode="code" />
            <CopyButton text={prompts.contract} mode="contract" />
          </div>
          {TABS.map((t) => {
            const selected = tab === t.id
            let body: ReactNode = null
            if (t.id === 'spec') {
              body = (
                <div
                  className="specimen-detail__md"
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(specimen.spec),
                  }}
                />
              )
            } else if (t.id === 'markup') {
              body = (
                <pre className="specimen-detail__code">{specimen.files.html}</pre>
              )
            } else if (t.id === 'styles') {
              body = (
                <pre className="specimen-detail__code">{specimen.files.css}</pre>
              )
            } else if (t.id === 'contract') {
              body = (
                <pre className="specimen-detail__code">
                  {JSON.stringify(specimen.contract, null, 2)}
                </pre>
              )
            } else {
              body = (
                <pre className="specimen-detail__code">{prompts.full}</pre>
              )
            }
            return (
              <div
                key={t.id}
                id={`${baseId}-panel-${t.id}`}
                role="tabpanel"
                aria-labelledby={`${baseId}-tab-${t.id}`}
                className="specimen-detail__panel"
                hidden={!selected}
              >
                {body}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
