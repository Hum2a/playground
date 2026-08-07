import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount paper identity card; REVEAL slides bars (420ms) and fills meter (680ms).',
    'Wire reveal() / reset(); harness restart resets.',
  ],
  acceptance: [
    'REVEAL slides redaction bars over 420ms and fills confidence over 680ms',
    'Detail text shows Age 17 · SECTOR 7',
    'Visible status announces revealed / redacted',
    'Root is interactive (not aria-hidden)',
    'Palette uses #F5C400 / #101010 / #F7F3E8 / #E8E8E8',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:280px;border:1px solid #2a2a2a;border-radius:2px;background:#101010;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
