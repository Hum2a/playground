import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Wrap real buttons/links; place four corner bracket spans (aria-hidden) inside each control.',
    'Import demo.css verbatim; drive visibility with :focus-visible only.',
    'Do not show brackets on :hover or permanent :active/selected states.',
    'Keep high-contrast companion border/shadow when focused; honour reduced-motion instant appear.',
  ],
  acceptance: [
    'Real keyboard focus via Tab; four visible angular brackets',
    'Focus and hover are distinct; clicking does not permanently leave brackets',
    'No persistent selection model; high contrast; reduced motion immediate',
    'CSS-only; portable; timings and geometry frozen in contract.json',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:240px;background:#071525;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css },
  spec,
  contract,
}

export default payload
