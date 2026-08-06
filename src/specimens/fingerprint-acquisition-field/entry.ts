import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:400px;background:#141218;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim()

export const fingerprintAcquisitionField: Specimen = {
  id: 'fingerprint-acquisition-field',
  ref: 'SPX-1830',
  title: 'Fingerprint Acquisition Field',
  blurb:
    '88×88 hold target with 12 arc segments lighting over 900ms; release before 720ms rewinds; success resolves to check mark.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired biometric acquisition progress',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['biometric', 'authentication', 'progress'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Segments change in discrete stages with no pulsing or scaling under both reduced-motion triggers.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 320,
    height: 400,
    background: 'dark',
    scaffold,
    label: 'Fingerprint acquisition field',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze target 88×88, hold 900ms, rewind 720ms.',
    'Wire resetFingerprintAcquisitionField.',
    'No biometric or native APIs.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Acquisition is hold-driven, not a looping loader',
    'Progress stops immediately on early release',
    'Success only occurs after required hold',
    'Failure pulse happens once per failed attempt',
    'Reduced motion: discrete segment stages only',
  ],
}
