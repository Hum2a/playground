import { useState, type FormEvent } from 'react'
import {
  FACET_KEYS,
  FACET_LABELS,
  FACET_VALUES,
} from '../specimens'
import type { FacetKey } from '../specimens/taxonomy'
import type { HarnessControls } from '../harness'
import {
  buildSpecimenZip,
  downloadZip,
  validateExportMeta,
  type ExportMeta,
} from './exportSpecimen'
import './export-form.css'

interface ExportFormProps {
  html: string
  css: string
  js: string
  controls: HarnessControls
  previewWidth: number
  previewHeight: number
}

const empty: ExportMeta = {
  id: '',
  title: '',
  blurb: '',
  originProject: '',
  originSurface: '',
  kind: 'overlay',
  tech: 'css-only',
  scope: 'card',
  intensity: 'subtle',
  tags: '',
}

export function ExportForm({
  html,
  css,
  js,
  controls,
  previewWidth,
  previewHeight,
}: ExportFormProps) {
  const [open, setOpen] = useState(false)
  const [meta, setMeta] = useState<ExportMeta>(empty)
  const [error, setError] = useState<string | null>(null)

  const setFacet = (key: FacetKey, value: string) => {
    setMeta({ ...meta, [key]: value } as ExportMeta)
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const problem = validateExportMeta(meta)
    if (problem) {
      setError(problem)
      return
    }
    const zip = buildSpecimenZip({
      ...meta,
      html,
      css,
      js,
      controls,
      previewWidth,
      previewHeight,
    })
    downloadZip(`${meta.id}.zip`, zip)
    setError(null)
    setOpen(false)
    setMeta(empty)
  }

  if (!open) {
    return (
      <button type="button" className="export-form__open" onClick={() => setOpen(true)}>
        Export specimen
      </button>
    )
  }

  return (
    <form className="export-form" onSubmit={onSubmit}>
      <h2 className="mono-label">Export specimen</h2>
      <p className="export-form__size mono-label">
        Preview {previewWidth}×{previewHeight}
      </p>
      <label>
        Id (slug)
        <input
          required
          value={meta.id}
          onChange={(e) => setMeta({ ...meta, id: e.target.value.trim() })}
          placeholder="my-specimen"
        />
      </label>
      <label>
        Title
        <input
          required
          value={meta.title}
          onChange={(e) => setMeta({ ...meta, title: e.target.value })}
        />
      </label>
      <label>
        Blurb
        <input
          required
          value={meta.blurb}
          onChange={(e) => setMeta({ ...meta, blurb: e.target.value })}
        />
      </label>
      <label>
        Origin project
        <input
          required
          value={meta.originProject}
          onChange={(e) => setMeta({ ...meta, originProject: e.target.value })}
        />
      </label>
      <label>
        Origin surface (optional)
        <input
          value={meta.originSurface ?? ''}
          onChange={(e) => setMeta({ ...meta, originSurface: e.target.value })}
        />
      </label>
      {FACET_KEYS.map((key) => (
        <label key={key}>
          {FACET_LABELS[key]}
          <select
            required
            value={meta[key]}
            onChange={(e) => setFacet(key, e.target.value)}
          >
            {FACET_VALUES[key].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      ))}
      <label>
        Tags (comma-separated)
        <input
          value={meta.tags}
          onChange={(e) => setMeta({ ...meta, tags: e.target.value })}
          placeholder="wipe, comic, glitch"
        />
      </label>
      {error ? <p className="export-form__error">{error}</p> : null}
      <div className="export-form__actions">
        <button type="submit">Download zip</button>
        <button
          type="button"
          onClick={() => {
            setOpen(false)
            setError(null)
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
