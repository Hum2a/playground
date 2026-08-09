import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount in a relative host at least 320×250px and import demo.css verbatim.',
    'Keep the semantic card as a real link; its pseudo-elements are decorative and remain pointer-events: none.',
    'Preserve the 280×170px card, 220ms entry, 140ms exit, and pseudo-element-only refraction.',
    'Honour both reduced-motion triggers by switching states immediately while keeping the refracted state visible.',
  ],
  acceptance: [
    'One semantic, keyboard-focusable interactive card measures 280×170px',
    'Hover and :focus-visible activate the same refraction state',
    'The effect is made by ::before and ::after geometry; no filter or canvas is used',
    'Text stays readable and a visible focus ring is present',
    'No looping animation, external assets, or JavaScript is required',
    'Reduced motion removes travel but preserves the final refraction state',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#090d18;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css },
  spec,
  contract,
}

export default payload
