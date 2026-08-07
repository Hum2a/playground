import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

export default {
  files: { html, css, js },
  spec,
  contract,
  integration: [
    'Import portable CSS verbatim.',
    'Use the Start action and Reset control for deterministic state.',
    'Honor both reduced-motion triggers.'
  ],
  acceptance: [
    'Shows a fixed sixteen-bar waveform, ruler, stationary playhead, and 01:20 cue.',
    'Scroll action transitions from parked to cue-ready without audio, network, or random data.',
    'Reduced motion completes immediately while retaining the highlighted cue and text state.',
    'Includes Start and Reset controls plus a polite live status message for every state.',
  ]
} satisfies SpecimenPayload
