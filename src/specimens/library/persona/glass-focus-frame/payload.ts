import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount the three-button group as an inline control set; copy demo.html and demo.css verbatim.',
    'Keep one shared focus frame containing exactly four decorative corner brackets.',
    'Use native buttons so pointer, Tab, Space, and Enter work without JavaScript.',
    'Honour both reduced-motion triggers by preserving the frame while removing its transition and corner shift.',
  ],
  acceptance: [
    'Exactly three native, focusable button controls are present',
    'Exactly four decorative glass corner brackets make up the shared focus frame',
    'Pointer focus and keyboard focus reveal the same glass frame',
    'Keyboard focus also has a visible outline; active state includes text and border changes',
    'Space and Enter activate each button without custom scripting',
    'Both reduced-motion modes keep the focus state visible without animation',
    'No external assets, network, storage, parent access, canvas, SVG, or JavaScript are used',
  ],
  files: { html, css },
  spec,
  contract,
}

export default payload
