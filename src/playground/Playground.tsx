import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { useDocumentTitle } from '../app/useDocumentTitle'
import {
  ControlStrip,
  DEFAULT_CONTROLS,
  PreviewFrame,
  type HarnessControls,
  type PreviewFrameHandle,
} from '../harness'
import { getSpecimen, specimens, type Specimen } from '../specimens'
import {
  createDraft,
  createForkDraft,
  deleteDraft,
  duplicateDraft,
  listDrafts,
  loadDraft,
  renameDraft,
  saveDraft,
  type PlaygroundDraft,
} from './drafts'
import { ExportForm } from './ExportForm'
import { decodeShare, encodeShare } from './share'
import type { EditorLanguage } from './CodeEditor'
import './playground.css'

const CodeEditor = lazy(() =>
  import('./CodeEditor').then((m) => ({ default: m.CodeEditor })),
)

type EditorTab = EditorLanguage

const EDITOR_TABS: { id: EditorTab; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
  { id: 'javascript', label: 'JS' },
]

const DEFAULT_PREVIEW = { width: 360, height: 240 }

function storageMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message
  return 'Could not save draft to local storage.'
}

export function Playground() {
  useDocumentTitle('Playground — Specimen Archive')

  const frameRef = useRef<PreviewFrameHandle>(null)
  const baseId = useId()
  const [drafts, setDrafts] = useState<PlaygroundDraft[]>(() => listDrafts())
  const [activeId, setActiveId] = useState<string | null>(null)
  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [js, setJs] = useState('')
  const [controls, setControls] = useState<HarnessControls>(DEFAULT_CONTROLS)
  const [editorTab, setEditorTab] = useState<EditorTab>('html')
  const [shareNote, setShareNote] = useState('')
  const [storageError, setStorageError] = useState<string | null>(null)
  const [railCollapsed, setRailCollapsed] = useState(false)
  const [previewBase, setPreviewBase] = useState(DEFAULT_PREVIEW)
  const [catalogueQuery, setCatalogueQuery] = useState('')
  const persistTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const previewTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [preview, setPreview] = useState({ html: '', css: '', js: '' })
  const bootstrapped = useRef(false)
  const catalogueDialogRef = useRef<HTMLDialogElement>(null)
  const catalogueTriggerRef = useRef<HTMLButtonElement>(null)
  const catalogueSearchRef = useRef<HTMLInputElement>(null)

  const refreshList = useCallback(() => setDrafts(listDrafts()), [])

  const applyDraft = useCallback((draft: PlaygroundDraft) => {
    setActiveId(draft.id)
    setHtml(draft.html)
    setCss(draft.css)
    setJs(draft.js)
    setControls(draft.controls)
    setPreview({ html: draft.html, css: draft.css, js: draft.js })
  }, [])

  const flushSave = useCallback(() => {
    if (!activeId) return
    if (persistTimer.current) {
      clearTimeout(persistTimer.current)
      persistTimer.current = null
    }
    const current = loadDraft(activeId)
    if (!current) return
    try {
      saveDraft({
        ...current,
        html,
        css,
        js,
        controls,
      })
      setStorageError(null)
      refreshList()
    } catch (error) {
      setStorageError(storageMessage(error))
    }
  }, [activeId, html, css, js, controls, refreshList])

  useEffect(() => {
    if (bootstrapped.current) return
    bootstrapped.current = true

    const params = new URLSearchParams(window.location.search)
    const forkId = params.get('fork')
    if (forkId) {
      const specimen = getSpecimen(forkId)
      if (specimen) {
        try {
          const next = createForkDraft(specimen)
          setPreviewBase({
            width: specimen.preview.width,
            height: specimen.preview.height,
          })
          applyDraft(next)
          refreshList()
          setStorageError(null)
        } catch (error) {
          setStorageError(storageMessage(error))
        }
        window.history.replaceState(null, '', '/playground')
        return
      }
      window.history.replaceState(null, '', '/playground')
    }

    const shared = decodeShare(window.location.hash)
    if (shared) {
      try {
        const draft = createDraft('Shared draft')
        const next = saveDraft({
          ...draft,
          html: shared.html,
          css: shared.css,
          js: shared.js,
          controls: shared.controls,
        })
        setPreviewBase(DEFAULT_PREVIEW)
        applyDraft(next)
        refreshList()
        setStorageError(null)
      } catch (error) {
        setStorageError(storageMessage(error))
      }
      window.history.replaceState(null, '', '/playground')
      return
    }

    const existing = listDrafts()
    if (existing[0]) {
      applyDraft(existing[0])
    } else {
      try {
        const draft = createDraft()
        applyDraft(draft)
        refreshList()
        setStorageError(null)
      } catch (error) {
        setStorageError(storageMessage(error))
      }
    }
  }, [applyDraft, refreshList])

  // Debounced preview recompose (300ms) — keep iframe mounted
  useEffect(() => {
    if (previewTimer.current) clearTimeout(previewTimer.current)
    previewTimer.current = setTimeout(() => {
      setPreview({ html, css, js })
    }, 300)
    return () => {
      if (previewTimer.current) clearTimeout(previewTimer.current)
    }
  }, [html, css, js])

  // Debounced localStorage persist
  useEffect(() => {
    if (!activeId) return
    if (persistTimer.current) clearTimeout(persistTimer.current)
    persistTimer.current = setTimeout(() => {
      const current = loadDraft(activeId)
      if (!current) return
      try {
        saveDraft({
          ...current,
          html,
          css,
          js,
          controls,
        })
        setStorageError(null)
        refreshList()
      } catch (error) {
        setStorageError(storageMessage(error))
      }
    }, 400)
    return () => {
      if (persistTimer.current) clearTimeout(persistTimer.current)
    }
  }, [activeId, html, css, js, controls, refreshList])

  const activeDraft = useMemo(
    () => drafts.find((d) => d.id === activeId) ?? null,
    [drafts, activeId],
  )

  const previewWidth =
    controls.viewport === 'full' ? previewBase.width : controls.viewport
  const previewHeight = Math.max(
    1,
    Math.round(previewBase.height * (previewWidth / previewBase.width)),
  )

  const tabIndex = EDITOR_TABS.findIndex((t) => t.id === editorTab)

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
    if (event.key === 'ArrowRight') next = (tabIndex + 1) % EDITOR_TABS.length
    if (event.key === 'ArrowLeft')
      next = (tabIndex - 1 + EDITOR_TABS.length) % EDITOR_TABS.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = EDITOR_TABS.length - 1
    const nextTab = EDITOR_TABS[next]
    setEditorTab(nextTab.id)
    document.getElementById(`${baseId}-tab-${nextTab.id}`)?.focus()
  }

  const onNew = () => {
    flushSave()
    try {
      const draft = createDraft()
      setPreviewBase(DEFAULT_PREVIEW)
      applyDraft(draft)
      refreshList()
      setStorageError(null)
    } catch (error) {
      setStorageError(storageMessage(error))
    }
  }

  const filteredCatalogue = useMemo(() => {
    const q = catalogueQuery.trim().toLowerCase()
    if (!q) return specimens
    return specimens.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.ref.toLowerCase().includes(q),
    )
  }, [catalogueQuery])

  const closeCatalogueDialog = useCallback(() => {
    const dialog = catalogueDialogRef.current
    if (dialog?.open) dialog.close()
    setCatalogueQuery('')
    catalogueTriggerRef.current?.focus()
  }, [])

  const openCatalogueDialog = () => {
    setCatalogueQuery('')
    const dialog = catalogueDialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
    window.requestAnimationFrame(() => catalogueSearchRef.current?.focus())
  }

  const onForkFromCatalogue = (specimen: Specimen) => {
    flushSave()
    try {
      const next = createForkDraft(specimen)
      setPreviewBase({
        width: specimen.preview.width,
        height: specimen.preview.height,
      })
      applyDraft(next)
      refreshList()
      setStorageError(null)
      closeCatalogueDialog()
    } catch (error) {
      setStorageError(storageMessage(error))
    }
  }

  const onDuplicate = () => {
    if (!activeId) return
    flushSave()
    try {
      const copy = duplicateDraft(activeId)
      if (copy) {
        applyDraft(copy)
        refreshList()
        setStorageError(null)
      }
    } catch (error) {
      setStorageError(storageMessage(error))
    }
  }

  const onRename = () => {
    if (!activeId || !activeDraft) return
    const name = window.prompt('Rename draft', activeDraft.name)
    if (!name?.trim()) return
    flushSave()
    try {
      const next = renameDraft(activeId, name.trim())
      if (next) {
        refreshList()
        setStorageError(null)
      }
    } catch (error) {
      setStorageError(storageMessage(error))
    }
  }

  const onDelete = () => {
    if (!activeId) return
    if (!window.confirm('Delete this draft? This cannot be undone.')) return
    if (persistTimer.current) {
      clearTimeout(persistTimer.current)
      persistTimer.current = null
    }
    deleteDraft(activeId)
    const remaining = listDrafts()
    refreshList()
    setStorageError(null)
    if (remaining[0]) applyDraft(remaining[0])
    else {
      try {
        const draft = createDraft()
        setPreviewBase(DEFAULT_PREVIEW)
        applyDraft(draft)
        refreshList()
      } catch (error) {
        setActiveId(null)
        setStorageError(storageMessage(error))
      }
    }
  }

  const onSelectDraft = (id: string) => {
    if (id === activeId) return
    flushSave()
    const loaded = loadDraft(id)
    if (loaded) applyDraft(loaded)
  }

  const onShare = async () => {
    const hash = encodeShare({ html, css, js, controls })
    const url = `${window.location.pathname}#${hash}`
    window.history.replaceState(null, '', url)
    try {
      await navigator.clipboard.writeText(window.location.href)
      setShareNote('Share link copied')
    } catch {
      setShareNote('Share hash written to the URL')
    }
    window.setTimeout(() => setShareNote(''), 1600)
  }

  const valueFor = (lang: EditorTab) =>
    lang === 'html' ? html : lang === 'css' ? css : js
  const setterFor = (lang: EditorTab) =>
    lang === 'html' ? setHtml : lang === 'css' ? setCss : setJs

  return (
    <div
      className={
        railCollapsed
          ? 'playground playground--rail-collapsed'
          : 'playground'
      }
      style={
        railCollapsed
          ? { gridTemplateColumns: 'auto minmax(0, 1fr)' }
          : undefined
      }
    >
      <aside className="playground__rail">
        <div className="playground__rail-head">
          <div className="playground__rail-title-row">
            <h1 className="mono-label">Drafts</h1>
            <button
              type="button"
              className="playground__rail-toggle"
              aria-expanded={!railCollapsed}
              onClick={() => setRailCollapsed((v) => !v)}
            >
              {railCollapsed ? 'Show' : 'Hide'}
            </button>
          </div>
          {storageError ? (
            <p className="playground__storage-error" role="alert">
              {storageError}
            </p>
          ) : null}
          {!railCollapsed ? (
            <div className="playground__rail-actions">
              <button type="button" onClick={onNew}>
                New
              </button>
              <button
                type="button"
                ref={catalogueTriggerRef}
                onClick={openCatalogueDialog}
              >
                From catalogue
              </button>
              <button type="button" onClick={onDuplicate} disabled={!activeId}>
                Duplicate
              </button>
              <button type="button" onClick={onRename} disabled={!activeId}>
                Rename
              </button>
              <button type="button" onClick={onDelete} disabled={!activeId}>
                Delete
              </button>
            </div>
          ) : null}
        </div>
        {!railCollapsed ? (
          <ul className="playground__draft-list">
            {drafts.map((d) => (
              <li key={d.id}>
                <button
                  type="button"
                  className="playground__draft"
                  aria-current={d.id === activeId ? 'true' : undefined}
                  onClick={() => onSelectDraft(d.id)}
                >
                  {d.name}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </aside>

      <dialog
        ref={catalogueDialogRef}
        className="playground__catalogue-dialog"
        aria-labelledby={`${baseId}-catalogue-title`}
        onClose={() => {
          setCatalogueQuery('')
        }}
        onCancel={(event) => {
          event.preventDefault()
          closeCatalogueDialog()
        }}
      >
        <div className="playground__catalogue-dialog-head">
          <h2 id={`${baseId}-catalogue-title`} className="mono-label">
            From catalogue
          </h2>
          <button type="button" onClick={closeCatalogueDialog}>
            Cancel
          </button>
        </div>
        <label className="playground__catalogue-search-label" htmlFor={`${baseId}-catalogue-search`}>
          Filter
          <input
            ref={catalogueSearchRef}
            id={`${baseId}-catalogue-search`}
            type="search"
            className="playground__catalogue-search"
            value={catalogueQuery}
            onChange={(event) => setCatalogueQuery(event.target.value)}
            placeholder="Title, ref, or id"
            autoComplete="off"
          />
        </label>
        <ul className="playground__catalogue-list" role="listbox" aria-label="Specimens">
          {filteredCatalogue.length === 0 ? (
            <li className="playground__catalogue-empty">No specimens match.</li>
          ) : (
            filteredCatalogue.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  className="playground__catalogue-item"
                  role="option"
                  onClick={() => onForkFromCatalogue(s)}
                >
                  <span className="playground__catalogue-ref mono-label">{s.ref}</span>
                  <span className="playground__catalogue-title">{s.title}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      </dialog>

      <div className="playground__main">
        <div className="playground__editor-col">
          <div
            className="playground__editor-tabs"
            role="tablist"
            aria-label="Editor language"
            onKeyDown={onTabKeyDown}
          >
            {EDITOR_TABS.map((tab) => (
              <button
                key={tab.id}
                id={`${baseId}-tab-${tab.id}`}
                type="button"
                role="tab"
                className="playground__editor-tab"
                aria-selected={editorTab === tab.id}
                aria-controls={`${baseId}-panel-${tab.id}`}
                tabIndex={editorTab === tab.id ? 0 : -1}
                onClick={() => setEditorTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
            <button type="button" className="playground__share" onClick={() => void onShare()}>
              Share
            </button>
            <span className="playground__share-note" aria-live="polite">
              {shareNote}
            </span>
          </div>
          <Suspense fallback={<p className="playground__loading">Loading editor…</p>}>
            {EDITOR_TABS.map((tab) => {
              const selected = editorTab === tab.id
              return (
                <div
                  key={tab.id}
                  id={`${baseId}-panel-${tab.id}`}
                  role="tabpanel"
                  aria-labelledby={`${baseId}-tab-${tab.id}`}
                  className="playground__editor"
                  hidden={!selected}
                >
                  <CodeEditor
                    language={tab.id}
                    value={valueFor(tab.id)}
                    onChange={setterFor(tab.id)}
                  />
                </div>
              )
            })}
          </Suspense>
        </div>

        <div className="playground__preview-col">
          <PreviewFrame
            ref={frameRef}
            html={preview.html}
            css={preview.css}
            js={preview.js}
            label={activeDraft?.name ?? 'Playground draft'}
            width={previewWidth}
            height={previewHeight}
            controls={controls}
          />
          <ControlStrip
            value={controls}
            onChange={setControls}
            onRestart={() => frameRef.current?.hardRestart()}
            onSoftRestart={() => frameRef.current?.restart()}
          />
          <ExportForm
            html={html}
            css={css}
            js={js}
            controls={controls}
            previewWidth={previewWidth}
            previewHeight={previewHeight}
          />
        </div>
      </div>
    </div>
  )
}
