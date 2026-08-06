import { useMemo, useRef, useState } from 'react'
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
import './specimen-detail.css'

export function SpecimenDetail() {
  const { id } = useParams<{ id: string }>()
  const specimen = id ? getSpecimen(id) : undefined
  const frameRef = useRef<PreviewFrameHandle>(null)
  const [controls, setControls] = useState<HarnessControls>(() =>
    specimen
      ? {
          ...DEFAULT_CONTROLS,
          background: specimen.preview.background,
          viewport: specimen.preview.width <= 360 ? 360 : DEFAULT_CONTROLS.viewport,
        }
      : DEFAULT_CONTROLS,
  )

  if (!specimen) {
    return (
      <div className="specimen-detail__empty">
        <p>No specimen with id “{id}”.</p>
        <p>
          <Link to="/">Return to the catalogue</Link> and open a plate from the list.
        </p>
      </div>
    )
  }

  const prompts = useMemo(
    () => ({
      full: buildPrompt(specimen, 'full'),
      code: buildPrompt(specimen, 'code'),
      contract: buildPrompt(specimen, 'contract'),
    }),
    [specimen],
  )

  return (
    <div className="specimen-detail">
      <header className="specimen-detail__header">
        <p className="mono-label">
          {specimen.ref} · {specimen.origin.project}
        </p>
        <h1 className="display specimen-detail__title">{specimen.title}</h1>
        <p className="specimen-detail__blurb">{specimen.blurb}</p>
        <div className="specimen-detail__copy">
          <CopyButton text={prompts.full} mode="full" label="Full prompt" />
          <CopyButton text={prompts.code} mode="code" />
          <CopyButton text={prompts.contract} mode="contract" />
        </div>
      </header>
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
  )
}
