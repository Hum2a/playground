import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount the 320px glass badge in a relative, overflow-clipped dark host; import demo.css and demo.js verbatim.',
    'Call window.glassBadgeAssembly.assemble(root) to replay all nine deterministic fragment paths safely.',
    'Use the semantic ASSEMBLE button and preserve its polite live status announcement.',
    'Keep both reduced-motion triggers: assembly resolves instantly to the readable completed badge.',
  ],
  acceptance: [
    'Exactly nine visible glass fragments form one badge.',
    'Each fragment follows a deterministic, staggered path into the badge.',
    'ASSEMBLE is a native button and supports repeated activation without stranded timers or classes.',
    'Completed badge retains its ASSEMBLED text and silhouette.',
    'Reduced motion skips travel while retaining the completed visual state.',
    'No external assets, storage, network, parent access, canvas, or SVG.',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#07111d;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
