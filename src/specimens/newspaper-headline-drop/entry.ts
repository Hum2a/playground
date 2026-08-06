import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#1a1a1a;">
  {{specimen}}
</div>
`.trim()

export const newspaperHeadlineDrop: Specimen = {
  id: 'newspaper-headline-drop',
  ref: 'SPX-018',
  title: 'Newspaper Headline Drop',
  blurb:
    'Oversized newsprint headline strip drops onto a host with overshoot and rebound, then ejects sideways on dismiss.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired newspaper / print interruption language',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['announcement', 'interruption', 'paper'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Fall, rebound, host nudge, and impact marks are skipped under prefers-reduced-motion or data-force-reduced-motion; the settled strip at -2deg appears immediately and dismisses instantly.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 280,
    background: 'card',
    scaffold,
    label: 'Newspaper headline interruption',
  },
  integration: [
    'Mount inside a relative, overflow-hidden host so the drop and sideways exit clip correctly.',
    'Import or inline demo.css verbatim; keep the frozen hex colours, clip-path, and timing values.',
    'Wire dropNewspaperHeadline / dismissNewspaperHeadline / replayNewspaperHeadline (or equivalent class toggles) without duplicating strip nodes.',
    'Keep role="alert" on the strip as the sole semantic announcement; leave marks and scraps aria-hidden.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with the static settled pose.',
  ],
  acceptance: [
    'Newspaper strip enters vertically from outside the host',
    'Entrance contains visible overshoot (5% / -3deg) and rebound before settling at approximately -2deg',
    'Host content nudges down exactly 3px for ~70ms at impact — no prolonged shake',
    'Headline is visually dominant and may clip slightly; exact colours #eee9da / #101010 / #cf1723',
    'Dismiss exits sideways (translateX 125%) rather than reversing the entrance; no fade',
    'Reduced motion shows a static settled strip immediately; dismiss is instant',
    'Replay is deterministic with no DOM accumulation; works 320–768px; no external imagery or fonts',
  ],
}
