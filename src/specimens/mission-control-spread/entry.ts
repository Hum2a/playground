import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:400px;background:#0d1118;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const missionControlSpread: Specimen = {
  id: 'mission-control-spread',
  ref: 'SPX-1348',
  title: 'Mission Control Spread',
  blurb:
    'Five overlapping desktop windows spread into a separated overview over 520ms; SPACE // 01 appears at 60%; selecting EDITOR restores exact desktop coords with EDITOR frontmost in 460ms.',
  origin: {
    project: 'Original',
    surface: 'macOS-inspired Mission Control workspace overview',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['macos'],
  },
  tags: ['workspace', 'overview', 'windows'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, desktop and overview layouts swap instantly.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 520,
    height: 480,
    background: 'dark',
    scaffold,
    label: 'Mission Control spread',
  },
  integration: [
    'Mount inside a relative overflow-clipped host (~520×400 stage).',
    'Import demo.css verbatim; freeze five window coords, overview scales 0.62–0.78, overview 520ms / restore 460ms.',
    'Wire resetMissionControlSpread; OVERVIEW spreads; EDITOR click restores.',
    'SPACE // 01 appears after 60% overview progress.',
    'Honour both reduced-motion triggers with instant layout swap.',
  ],
  acceptance: [
    'Exactly five windows: EDITOR TERMINAL DOCS CHAT PREVIEW',
    'Initial desktop overlap is obvious',
    'Overview has no overlaps with minimum 18px separation',
    'Window identities persist; no fade-out during spread',
    'Restore returns all windows to exact original coordinates',
    'Selected EDITOR ends frontmost on desktop',
    'Reduced motion: instant desktop ↔ overview swap',
  ],
}
