import { useEffect, useRef } from 'react'
import { basicSetup } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import './code-editor.css'

export type EditorLanguage = 'html' | 'css' | 'javascript'

interface CodeEditorProps {
  language: EditorLanguage
  value: string
  onChange: (value: string) => void
}

function languageExtension(language: EditorLanguage) {
  switch (language) {
    case 'html':
      return html()
    case 'css':
      return css()
    case 'javascript':
      return javascript()
  }
}

export function CodeEditor({ language, value, onChange }: CodeEditorProps) {
  const parentRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useEffect(() => {
    if (!parentRef.current) return

    const state = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        history(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        languageExtension(language),
        oneDark,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChangeRef.current(update.state.doc.toString())
          }
        }),
        EditorView.theme({
          '&': { height: '100%', fontSize: '13px' },
          '.cm-scroller': { fontFamily: 'var(--font-mono), monospace' },
        }),
      ],
    })

    const view = new EditorView({ state, parent: parentRef.current })
    viewRef.current = view
    return () => {
      view.destroy()
      viewRef.current = null
    }
    // Recreate when language changes; value sync handled below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  useEffect(() => {
    const view = viewRef.current
    if (!view) return
    const current = view.state.doc.toString()
    if (current !== value) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value },
      })
    }
  }, [value])

  return <div className="code-editor" ref={parentRef} />
}
