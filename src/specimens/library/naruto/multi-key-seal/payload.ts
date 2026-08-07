import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~340×320+).',
    'Import demo.css verbatim; freeze keyStepMs 150 and petalOffsetsPx from contract.json.',
    'Wire runMultiKeySeal / resetMultiKeySeal / replayMultiKeySeal.',
    'Optional keys 1–3 arm in order; honour both reduced-motion triggers.',
  ],
  acceptance: contract.acceptance,
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#140C0C;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
