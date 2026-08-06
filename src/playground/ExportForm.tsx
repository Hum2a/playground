import { useState, type FormEvent } from 'react'
import {
  buildSpecimenZip,
  downloadZip,
  validateExportMeta,
  type ExportMeta,
} from './exportSpecimen'
import type { HarnessControls } from '../harness'
import './export-form.css'

interface ExportFormProps {
  html: string
  css: string
  js: string
  controls: HarnessControls
}

const empty: ExportMeta = {
  id: '',
  title: '',
  blurb: '',
  originProject: '',
  originSurface: '',
}

export function ExportForm({ html, css, js, controls }: ExportFormProps) {
  const [open, setOpen] = useState(false)
  const [meta, setMeta] = useState<ExportMeta>(empty)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const problem = validateExportMeta(meta)
    if (problem) {
      setError(problem)
      return
    }
    const zip = buildSpecimenZip({ ...meta, html, css, js, controls })
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
