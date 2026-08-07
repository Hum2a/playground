import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside scaffold host; import demo.css verbatim.',
    'Keep metadata spans in markup; toggle is-focus only.',
    'Preserve RM overrides on .mcfe__card and .mcfe__meta.',
  ],
  acceptance: [
    'Focused card grows from 88×120 to 120×150 with scale 1.04 and 6px lift.',
    'Focused card reveals its metadata line (genre · hours · Play · Info) within 180ms.',
    'Only one card is focused at a time; blur/toggle clears expand.',
    'Reduced motion snaps expand and metadata with no transition.',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#0B0F14;display:grid;place-items:center;padding:16px;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
