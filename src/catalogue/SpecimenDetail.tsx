import { useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ControlStrip,
  DEFAULT_CONTROLS,
  PreviewFrame,
  type HarnessControls,
  type PreviewFrameHandle,
} from '../harness'
import { buildPrompt, CopyButton } from '../prompt'
import { getSpecimen } from '../specimens'
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

export function SpecimenDetail() {
  const { id } = useParams<{ id: string }>()
  const specimen = id ? getSpecimen(id) : undefined
  const frameRef = useRef<PreviewFrameHandle>(null)
  const [tab, setTab] = useState<TabId>('spec')
  const baseId = useId()
  const [controls, setControls] = useState<HarnessControls>(() =>
    specimen
      ? {
          ...DEFAULT_CONTROLS,
          background: specimen.preview.background,
          viewport: specimen.preview.width <= 360 ? 360 : DEFAULT_CONTROLS.viewport,
        }
      : DEFAULT_CONTROLS,
  )

  const prompts = useMemo(() => {
    if (!specimen) return null
    return {
      full: buildPrompt(specimen, 'full'),
      code: buildPrompt(specimen, 'code'),
      contract: buildPrompt(specimen, 'contract'),
    }
  }, [specimen])

  if (!specimen || !prompts) {
    return (
      <div className="specimen-detail__empty">
        <p>No specimen with id “{id}”.</p>
        <p>
          <Link to="/">Return to the catalogue</Link> and open a plate from the list.
        </p>
      </div>
    )
  }

  const tabIndex = TABS.findIndex((t) => t.id === tab)

  const onTabKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft' && event.key !== 'Home' && event.key !== 'End') {
      return
    }
    event.preventDefault()
    let next = tabIndex
    if (event.key === 'ArrowRight') next = (tabIndex + 1) % TABS.length
    if (event.key === 'ArrowLeft') next = (tabIndex - 1 + TABS.length) % TABS.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = TABS.length - 1
    setTab(TABS[next].id)
    document.getElementById(`${baseId}-tab-${TABS[next].id}`)?.focus()
  }

  const panel = (() => {
    switch (tab) {
      case 'spec':
        return (
          <div
            className="specimen-detail__md"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(specimen.spec) }}
          />
        )
      case 'markup':
        return <pre className="specimen-detail__code">{specimen.files.html}</pre>
      case 'styles':
        return <pre className="specimen-detail__code">{specimen.files.css}</pre>
      case 'contract':
        return (
          <pre className="specimen-detail__code">
            {JSON.stringify(specimen.contract, null, 2)}
          </pre>
        )
      case 'prompt':
        return <pre className="specimen-detail__code">{prompts.full}</pre>
    }
  })()

  const copyForTab =
    tab === 'markup' || tab === 'styles'
      ? { text: prompts.code, mode: 'code' as const, label: 'Copy code' }
      : tab === 'contract'
        ? { text: prompts.contract, mode: 'contract' as const, label: 'Copy contract' }
        : { text: prompts.full, mode: 'full' as const, label: 'Copy prompt' }

  return (
    <div className="specimen-detail">
      <header className="specimen-detail__header">
        <p className="mono-label">
          {specimen.ref} · {specimen.origin.project}
        </p>
        <h1 className="display specimen-detail__title">{specimen.title}</h1>
        <p className="specimen-detail__blurb">{specimen.blurb}</p>
      </header>

      <div className="specimen-detail__layout">
        <div className="specimen-detail__preview-col">
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
          <ControlStrip
            value={controls}
            onChange={setControls}
            onRestart={() => frameRef.current?.restart()}
          />
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
            <CopyButton
              text={copyForTab.text}
              mode={copyForTab.mode}
              label={copyForTab.label}
            />
            {tab === 'prompt' ? (
              <>
                <CopyButton text={prompts.code} mode="code" />
                <CopyButton text={prompts.contract} mode="contract" />
              </>
            ) : null}
          </div>
          <div
            id={`${baseId}-panel-${tab}`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${tab}`}
            className="specimen-detail__panel"
          >
            {panel}
          </div>
        </div>
      </div>
    </div>
  )
}
