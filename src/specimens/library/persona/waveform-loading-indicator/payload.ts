import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Place the fragment in a 620 × 300px region, or let its responsive root scale down to the host width.',
    'Keep the inline SVG and the two repeated 32-sample segments intact so the -440px translation remains seamless.',
    'Import demo.css verbatim; no JavaScript or external assets are required.',
    'Expose the loading state in surrounding product UI; the waveform itself is decorative.',
  ],
  acceptance: [
    'A 440 × 80px cyan waveform is visible inside a 620 × 300px dark loading region.',
    'The signal uses a deterministic 32-sample path repeated as two adjacent segments.',
    'Both segments move left in one seamless 1.4s linear infinite loop.',
    'A cyan scanline crosses the waveform every 2.2s without obscuring the trace.',
    'Reduced-motion media and data-force-reduced-motion both preserve a static visible waveform.',
  ],
  files: { html, css },
  spec,
  contract,
}

export default payload
