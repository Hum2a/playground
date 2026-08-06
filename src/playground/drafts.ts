import type { HarnessControls } from '../harness'
import { DEFAULT_CONTROLS } from '../harness'
import { createStarterFiles } from './starter'

export interface PlaygroundDraft {
  id: string
  name: string
  html: string
  css: string
  js: string
  controls: HarnessControls
  updatedAt: number
}

const INDEX_KEY = 'playground:drafts'
const draftKey = (id: string) => `playground:draft:${id}`

function readIndex(): string[] {
  try {
    const raw = localStorage.getItem(INDEX_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : []
  } catch {
    return []
  }
}

function writeIndex(ids: string[]) {
  localStorage.setItem(INDEX_KEY, JSON.stringify(ids))
}

export function listDrafts(): PlaygroundDraft[] {
  return readIndex()
    .map((id) => loadDraft(id))
    .filter((d): d is PlaygroundDraft => Boolean(d))
    .sort((a, b) => b.updatedAt - a.updatedAt)
}

export function loadDraft(id: string): PlaygroundDraft | null {
  try {
    const raw = localStorage.getItem(draftKey(id))
    if (!raw) return null
    const parsed = JSON.parse(raw) as PlaygroundDraft
    if (!parsed?.id) return null
    return {
      ...parsed,
      controls: { ...DEFAULT_CONTROLS, ...parsed.controls },
    }
  } catch {
    return null
  }
}

export function saveDraft(draft: PlaygroundDraft) {
  const next = { ...draft, updatedAt: Date.now() }
  try {
    localStorage.setItem(draftKey(next.id), JSON.stringify(next))
    const index = readIndex()
    if (!index.includes(next.id)) writeIndex([next.id, ...index])
  } catch (error) {
    const err = new Error(
      error instanceof Error && /quota/i.test(error.message)
        ? 'Storage full — delete a draft and try again.'
        : 'Could not save draft to local storage.',
    )
    throw err
  }
  return next
}

export function deleteDraft(id: string) {
  localStorage.removeItem(draftKey(id))
  writeIndex(readIndex().filter((x) => x !== id))
}

export function createDraft(name = 'Untitled draft'): PlaygroundDraft {
  const files = createStarterFiles()
  const draft: PlaygroundDraft = {
    id: crypto.randomUUID(),
    name,
    html: files.html,
    css: files.css,
    js: files.js,
    controls: { ...DEFAULT_CONTROLS },
    updatedAt: Date.now(),
  }
  return saveDraft(draft)
}

export function duplicateDraft(id: string): PlaygroundDraft | null {
  const source = loadDraft(id)
  if (!source) return null
  const copy: PlaygroundDraft = {
    ...source,
    id: crypto.randomUUID(),
    name: `${source.name} copy`,
    updatedAt: Date.now(),
  }
  return saveDraft(copy)
}

export function renameDraft(id: string, name: string): PlaygroundDraft | null {
  const draft = loadDraft(id)
  if (!draft) return null
  return saveDraft({ ...draft, name })
}
