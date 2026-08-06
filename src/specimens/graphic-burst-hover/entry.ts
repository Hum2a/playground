import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:220px;border:1px solid #2c313c;border-radius:2px;background:#12141a;">
  <div style="opacity:0.45;padding:0.85rem 1rem 0;">
    <div style="font:700 0.65rem/1.2 system-ui,sans-serif;letter-spacing:0.16em;text-transform:uppercase;color:#767e8c;">Portfolio</div>
  </div>
  {{specimen}}
</div>
`.trim()

export const graphicBurstHover: Specimen = {
  id: 'graphic-burst-hover',
  ref: 'SPX-023',
  title: 'Graphic Burst Hover',
  blurb:
    'Angular graphic shards burst outward behind a restrained CTA on hover and focus, with a red offset backing and a stable interactive target.',
  origin: {
    project: 'Original',
    surface: 'Persona 5 explosive graphic emphasis language',
  },
  facets: {
    kind: 'interaction',
    tech: 'css-only',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['hover', 'burst', 'clip-path'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Shard travel is skipped under prefers-reduced-motion or data-force-reduced-motion; the final burst composition appears and disappears immediately with hover/focus.',
  },
  files: { html, css },
  spec,
  contract,
  preview: {
    width: 360,
    height: 240,
    background: 'card',
    scaffold,
    label: 'Portfolio CTA',
  },
  integration: [
    'Mount inside a relative overflow-hidden surface so burst shards clip safely.',
    'Import demo.css verbatim; keep frozen black/red/paper palette and shard travel offsets.',
    'Use a real link or button; keep burst layers pointer-events: none to prevent hover flicker.',
    'Ensure :focus-visible triggers the same burst as :hover.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an instant static burst.',
  ],
  acceptance: [
    'Idle CTA remains visually restrained',
    'Hover/focus creates eight outward-expanding graphic elements (not fade-in)',
    'Target moves only a few pixels (≤2px / −1deg / ≤1.02 scale); red backing appears behind it',
    'Hover does not flicker; pointer-events none on burst layers',
    'Keyboard focus-visible activates equivalent visual state; exit retracts faster (~150ms vs ~220ms)',
    'Reduced motion shows static final burst; CSS-only; no external assets; works ~320–768px',
  ],
}
