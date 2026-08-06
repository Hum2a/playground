import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#090909;">
  {{specimen}}
</div>
`.trim()

export const completionStrike: Specimen = {
  id: 'completion-strike',
  ref: 'SPX-330',
  title: 'Completion strike',
  blurb:
    'Marking a task complete fires a decisive graphic strike, then the row recomposes into a compact COMPLETE state without deleting the item.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired task-completion graphic language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['completion', 'task'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Strikes and mark construction are skipped; the compact completed row appears immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 380,
    height: 280,
    background: 'dark',
    scaffold,
    label: 'Task completion',
  },
  integration: [
    'Mount the task row and MARK COMPLETE control in a relative overflow-hidden frame.',
    'Import demo.css verbatim; keep frozen strike rotation (−3deg) and phase timings.',
    'Call runCompletionStrike on confirm; resetCompletionStrike restores idle instantly.',
    'Announce via polite live region; keep decorative strikes aria-hidden.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with the instant path.',
  ],
  acceptance: [
    'Task remains visible after completion; row becomes more compact',
    'Red strike crosses before layout contracts; black secondary strike follows',
    'Angular completion mark constructs from two bars (not Unicode check)',
    'COMPLETE label appears last; total ≈720ms; nothing loops',
    'Undo restores without theatrical un-complete; reduced motion is immediate',
    'Checkbox semantics + status announcement; sandbox-safe; no dependencies',
  ],
}
