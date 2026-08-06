import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
      "Mount inside scaffold host; import demo.css verbatim.",
      "Honour both reduced-motion triggers — end states remain visible.",
      "Listen for `{ type: \"restart\" }` postMessage where applicable."
  ],
  acceptance: [
      "Uses PlayStation palette: #2E90FF / #0B0F14 / #F4F6F8 / #7EB6FF",
      "No PS logos, glyphs, or game art",
      "iframe-safe — no parent access, storage, or navigation",
      "Reduced motion shows final states instantly"
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0B0F14;display:grid;place-items:center;padding:16px;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
