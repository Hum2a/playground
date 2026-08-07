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
    'Renders a record, cue label, held needle, and labelled beat-distance timeline.',
    'Action resolves the fixed 1.2-beat offset to the cue marker.',
    'No sound playback, timers beyond the deterministic UI transition, network, or randomness.',
    'Includes Start and Reset controls plus a polite live status message for every state.',
  ]
} satisfies SpecimenPayload
