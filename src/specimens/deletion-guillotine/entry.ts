import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#15171c;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim()

export const deletionGuillotine: Specimen = {
  id: 'deletion-guillotine',
  ref: 'SPX-TODO',
  title: 'Deletion Guillotine',
  blurb:
    'After deliberate confirmation, a black irregular blade cuts Project Nightfall along a diagonal; complementary clipped halves exit opposite ways — visual delete only, no persistence.',
  origin: {
    project: 'Original',
    surface: 'Destructive delete / irreversible removal language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  tags: ['delete', 'destructive', 'removal'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, jumps immediately to PROJECT REMOVED with status announcement — no blade or split.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 380,
    height: 300,
    background: 'dark',
    scaffold,
    label: 'Project card delete (demo)',
  },
  integration: [
    'Mount as a card-scoped demo; keep host overflow hidden so blade/pieces stay local.',
    'Import demo.css verbatim; complementary clip polygons and −18deg blade are the cut contract.',
    'Require a deliberate confirm step before confirmDeletion; cancel returns to the intact card.',
    'This specimen never deletes persistent data — production must own confirmation, auth, and real state removal.',
    'Announce once after the cut: “Project Nightfall removed.” Keep stage/pieces aria-hidden.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate removed state.',
  ],
  acceptance: [
    'Card begins intact with PROJECT NIGHTFALL / 12 artifacts / DELETE',
    'Confirmation is required before the cut runs',
    'Blade enters from upper-right, crosses the full card at ~−18deg in ~160ms',
    'Split geometry matches the blade diagonal via complementary clip-path polygons',
    'Card becomes two major pieces that exit opposite directions (no opacity-only delete)',
    'DELETED appears briefly; final PROJECT REMOVED state remains',
    'Reduced motion jumps to PROJECT REMOVED; status announces Project Nightfall removed.',
    'No external fonts/assets/libraries; cut timing and polygons documented in spec/contract',
  ],
}
