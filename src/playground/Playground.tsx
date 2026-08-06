import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  ControlStrip,
  DEFAULT_CONTROLS,
  PreviewFrame,
  type HarnessControls,
  type PreviewFrameHandle,
} from '../harness'
import {
  createDraft,
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

export function Playground() {
  const frameRef = useRef<PreviewFrameHandle>(null)
  const [drafts, setDrafts] = useState<PlaygroundDraft[]>(() => listDrafts())
  const [activeId, setActiveId] = useState<string | null>(null)
  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [js, setJs] = useState('')
  const [controls, setControls] = useState<HarnessControls>(DEFAULT_CONTROLS)
  const [editorTab, setEditorTab] = useState<EditorTab>('html')
  const [shareNote, setShareNote] = useState('')
  const persistTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const previewTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [preview, setPreview] = useState({ html: '', css: '', js: '' })

  const refreshList = useCallback(() => setDrafts(listDrafts()), [])

  const applyDraft = useCallback((draft: PlaygroundDraft) => {
    setActiveId(draft.id)
    setHtml(draft.html)
    setCss(draft.css)
    setJs(draft.js)
    setControls(draft.controls)
    setPreview({ html: draft.html, css: draft.css, js: draft.js })
  }, [])

  useEffect(() => {
    const shared = decodeShare(window.location.hash)
    if (shared) {
      const draft = createDraft('Shared draft')
      const next = saveDraft({
        ...draft,
        html: shared.html,
        css: shared.css,
        js: shared.js,
        controls: shared.controls,
      })
      applyDraft(next)
      refreshList()
      return
    }

    const existing = listDrafts()
    if (existing[0]) {
      applyDraft(existing[0])
    } else {
      const draft = createDraft()
      applyDraft(draft)
      refreshList()
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
      saveDraft({
        ...current,
        html,
        css,
        js,
        controls,
      })
      refreshList()
    }, 400)
    return () => {
      if (persistTimer.current) clearTimeout(persistTimer.current)
    }
  }, [activeId, html, css, js, controls, refreshList])

  const activeDraft = useMemo(
    () => drafts.find((d) => d.id === activeId) ?? null,
    [drafts, activeId],
  )

  const onNew = () => {
    const draft = createDraft()
    applyDraft(draft)
    refreshList()
  }

  const onDuplicate = () => {
    if (!activeId) return
    const copy = duplicateDraft(activeId)
    if (copy) {
      applyDraft(copy)
      refreshList()
    }
  }

  const onRename = () => {
    if (!activeId || !activeDraft) return
    const name = window.prompt('Rename draft', activeDraft.name)
    if (!name?.trim()) return
    const next = renameDraft(activeId, name.trim())
    if (next) {
      refreshList()
    }
  }

  const onDelete = () => {
    if (!activeId) return
    deleteDraft(activeId)
    const remaining = listDrafts()
    refreshList()
    if (remaining[0]) applyDraft(remaining[0])
    else {
      const draft = createDraft()
      applyDraft(draft)
      refreshList()
    }
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

  const editorValue =
    editorTab === 'html' ? html : editorTab === 'css' ? css : js
  const setEditorValue =
    editorTab === 'html' ? setHtml : editorTab === 'css' ? setCss : setJs

  return (
    <div className="playground">
      <aside className="playground__rail">
        <div className="playground__rail-head">
          <h1 className="mono-label">Drafts</h1>
          <div className="playground__rail-actions">
            <button type="button" onClick={onNew}>
              New
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
        </div>
        <ul className="playground__draft-list">
          {drafts.map((d) => (
            <li key={d.id}>
              <button
                type="button"
                className="playground__draft"
                aria-current={d.id === activeId ? 'true' : undefined}
                onClick={() => {
                  const loaded = loadDraft(d.id)
                  if (loaded) applyDraft(loaded)
                }}
              >
                {d.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className="playground__main">
        <div className="playground__editor-col">
          <div className="playground__editor-tabs" role="tablist" aria-label="Editor language">
            {(['html', 'css', 'javascript'] as EditorTab[]).map((lang) => (
              <button
                key={lang}
                type="button"
                role="tab"
                className="playground__editor-tab"
                aria-selected={editorTab === lang}
                onClick={() => setEditorTab(lang)}
              >
                {lang === 'javascript' ? 'JS' : lang.toUpperCase()}
              </button>
            ))}
            <button type="button" className="playground__share" onClick={() => void onShare()}>
              Share
            </button>
            {shareNote ? <span className="playground__share-note">{shareNote}</span> : null}
          </div>
          <div className="playground__editor">
            <Suspense fallback={<p className="playground__loading">Loading editor…</p>}>
              <CodeEditor
                language={editorTab}
                value={editorValue}
                onChange={setEditorValue}
              />
            </Suspense>
          </div>
        </div>

        <div className="playground__preview-col">
          <PreviewFrame
            ref={frameRef}
            html={preview.html}
            css={preview.css}
            js={preview.js}
            label={activeDraft?.name ?? 'Playground draft'}
            width={360}
            height={240}
            controls={controls}
          />
          <ControlStrip
            value={controls}
            onChange={setControls}
            onRestart={() => frameRef.current?.restart()}
          />
          <ExportForm html={html} css={css} js={js} controls={controls} />
        </div>
      </div>
    </div>
  )
}
