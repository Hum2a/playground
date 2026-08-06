import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration:   [
    "Mount inline; import demo.css verbatim.",
    "Track active index and per-item progress; hand off on completion.",
    "Wire runDownloadQueueAdvance / resetDownloadQueueAdvance / replayDownloadQueueAdvance.",
    "Honour both reduced-motion triggers."
  ],
  acceptance:   [
    "Exactly three queue rows; only one active at a time",
    "Completing row one activates row two, then row three",
    "Completed rows keep their done state during handoff",
    "Replay resets queue to row one active",
    "Reduced motion completes all rows immediately on Run",
    "Live status announces each handoff in text"
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0B0F14;">
  {{specimen}}
</div>`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
