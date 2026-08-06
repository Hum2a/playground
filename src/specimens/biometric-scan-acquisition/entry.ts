import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0c1018;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim()

export const biometricScanAcquisition: Specimen = {
  id: 'biometric-scan-acquisition',
  ref: 'SPX-1426',
  title: 'Identity Scan Acquisition',
  blurb:
    'Abstract 180×180 identity field with 16 nodes — two 420ms scan passes, four brackets inward 6px, validation hold 120ms, OPEN VAULT unlocks after VERIFIED.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired biometric acquisition sequence',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['authentication', 'acquisition', 'scan'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, immediately show all 16 nodes acquired and VERIFIED.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 280,
    height: 320,
    background: 'dark',
    scaffold,
    label: 'Identity scan acquisition',
  },
  integration: [
    'Mount inside a relative overflow-clipped host (~280×320).',
    'Import demo.css verbatim; freeze field 180×180, 16 nodes, passes 420ms.',
    'Wire startBiometricScan on START SCAN; openVault after VERIFIED.',
    'Four brackets move inward 6px at validation; hold 120ms.',
    'Honour both reduced-motion triggers with instant verified state.',
  ],
  acceptance: [
    'Exactly 16 nodes in asymmetric geometry',
    'Exactly two scan passes at 420ms each',
    'First pass activates 10 nodes; second activates 6',
    'OPEN VAULT locked before verification',
    'Four acquisition brackets move inward 6px',
    'Action unlocks only after VERIFIED',
    'Reduced motion: instant all nodes acquired',
  ],
}
