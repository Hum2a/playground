import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'
import type { HarnessControls } from '../harness'
import { DEFAULT_CONTROLS } from '../harness'

export interface SharePayload {
  html: string
  css: string
  js: string
  controls: HarnessControls
}

export function encodeShare(payload: SharePayload): string {
  return compressToEncodedURIComponent(JSON.stringify(payload))
}

export function decodeShare(hash: string): SharePayload | null {
  const raw = hash.replace(/^#/, '')
  if (!raw) return null
  try {
    const json = decompressFromEncodedURIComponent(raw)
    if (!json) return null
    const parsed = JSON.parse(json) as Partial<SharePayload>
    if (typeof parsed.html !== 'string' || typeof parsed.css !== 'string') return null
    return {
      html: parsed.html,
      css: parsed.css,
      js: typeof parsed.js === 'string' ? parsed.js : '',
      controls: { ...DEFAULT_CONTROLS, ...parsed.controls },
    }
  } catch {
    return null
  }
}
