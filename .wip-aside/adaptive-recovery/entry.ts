import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:460px;background:#101218;display:grid;place-items:center;padding:16px;">
  {{specimen}}
</div>
`.trim()

export const adaptiveRecovery: Specimen = {
  id: 'adaptive-recovery',
  ref: 'SPX-1211',
  title: 'Adaptive Recovery',
  blurb:
    'A failed worker reconstructs through a frozen health ladder, briefly matches its prior baseline, then adapts three metrics upward — previous baseline stays visible beside the new one.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired Zenkai-style post-failure adaptation (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['recovery', 'adaptation', 'improvement'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Health ladder and adaptation motion are skipped; adapted metrics and ADAPTED status appear immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 480,
    background: 'dark',
    scaffold,
    label: 'Adaptive recovery demo',
  },
  integration: [
    'Mount inline; keep previous-baseline panel visible throughout.',
    'Import demo.css verbatim; preserve health ladder, 120ms baseline hold, and three adaptation struts.',
    'Call runAdaptiveRecovery / runAdaptiveRecoveryReset; adaptation must follow recovery, never skip the hold under motion.',
    'Announce previous and new baseline values for accessibility.',
    'Honour both reduced-motion triggers with an immediate adapted state.',
  ],
  acceptance: [
    'Begins FAILED at 18% with PREVIOUS BASELINE visible',
    'Health walks 18→36→57→78→100 over ~700ms then holds 120ms at old baseline',
    'Exactly three adaptation struts; capacity 100→128, retries 2→4, latency 84→61ms',
    'Deltas and NEW BASELINE appear; status ADAPTED; before/after remain readable',
    'Reduced motion immediately shows adapted result',
  ],
}
