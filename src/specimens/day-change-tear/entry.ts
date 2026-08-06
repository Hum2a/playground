import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:400px;background:#0a0b0e;">
  {{specimen}}
</div>
`.trim()

export const dayChangeTear: Specimen = {
  id: 'day-change-tear',
  ref: 'SPX-304',
  title: 'Day Change Tear',
  blurb:
    'Calendar sheet tears from the upper centre into two irregular halves that pull away, revealing the next date that was already underneath.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['value-change', 'temporal', 'paper', 'tear', 'calendar'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Date swaps immediately under prefers-reduced-motion or data-force-reduced-motion; no tear, fragments, or insertion motion. Static paper calendar remains.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 420,
    background: 'dark',
    scaffold,
    label: 'Calendar day',
  },
  integration: [
    'Mount inside a relative overflow-hidden frame (~360×400+) so torn halves clip safely.',
    'Keep the under sheet in the DOM before NEXT — never inject the next date after the tear starts.',
    'Import demo.css verbatim; keep frozen clip-paths, pull transforms (−85%/90%, −18°/21°), and 760ms NEXT timing.',
    'Wire nextDayTear / previousDayInsert / resetDayChange; PREVIOUS must insert, not reverse-tear.',
    'Announce the date once via the polite live region; keep stacked sheets decorative.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an instant date swap.',
  ],
  acceptance: [
    'Initial date is clearly readable on the paper calendar',
    'Next date exists beneath the current sheet before transition',
    'Tear begins near upper centre (~50% 18%) with an irregular edge',
    'Next date becomes visible through the growing tear gap',
    'Current sheet separates into two major pieces exiting downward/outward',
    'Exactly 3–5 small fragments accompany the tear',
    'New date barely moves (under settle 4px→0) because it was already underneath',
    'NEXT can run repeatedly without DOM accumulation or geometry drift',
    'PREVIOUS uses complementary insertion (~420ms), not reverse tear',
    'Reduced motion changes the date immediately',
    'Exactly one semantic date is exposed to assistive tech',
    'No external assets, fonts, libraries, or network',
  ],
}
