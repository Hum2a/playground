import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const circularProgressCompletionMorph: Specimen = {
  id: 'circular-progress-completion-morph',
  ref: 'SPX-1523',
  title: 'Progress Ring Completion Morph',
  blurb:
    'EXPORT ring progresses 0→100% through fixed steps, holds, then morphs stroke geometry into a completion check — no icon swap.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired progress completion morph',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['progress', 'morph', 'completion'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, final completion geometry appears immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 280,
    height: 320,
    background: 'dark',
    scaffold,
    label: 'Progress ring completion morph',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze ring 72×72, stroke 5px, progress steps, 1100ms total.',
    'Wire runCircularProgressMorph and resetCircularProgressMorph.',
    'Morph retains 110° arc and constructs two internal check segments over 240ms.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Progress reaches exact values 0, 18, 37, 61, 84, 100',
    '100% ring visible before morph',
    'Completion mark derives from ring geometry',
    'No unrelated icon crossfade',
    'Label EXPORT → COMPLETE',
    'Final state static',
    'Reduced motion: immediate completion geometry',
  ],
}
