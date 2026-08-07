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
    'Shows a neutral vinyl platter, a fixed target readout, and a stopped idle state.',
    'Action ends at the explicit 33? RPM target with no continuous playback.',
    'Reduced motion preserves the final speed and target indication without rotation.',
    'Includes Start and Reset controls plus a polite live status message for every state.',
  ]
} satisfies SpecimenPayload
