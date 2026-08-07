import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'SOLVE collapses clue chips (520ms) into CASE SOLVED flourish (480ms).',
    'Wire solve() / reset(); harness restart resets to clues.',
  ],
  acceptance: [
    'Clue chips collapse toward center over 520ms',
    'CASE SOLVED card flourishes over 480ms with burst',
    'Visible status announces Case solved',
    'Finite run — harness restart resets, does not auto-replay',
    'Palette uses #F5C400 / #101010 / #F7F3E8 / #E8E8E8',
  ],
  scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:280px;border:1px solid #2a2a2a;border-radius:2px;background:#101010;">
  {{specimen}}
</div>`,
  files: { html, css, js },
  spec,
  contract,
}

export default payload
