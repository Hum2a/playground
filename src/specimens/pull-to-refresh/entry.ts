import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:480px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const pullToRefresh: Specimen = {
  id: 'pull-to-refresh',
  ref: 'SPX-1518',
  title: 'Pull To Refresh',
  blurb:
    'Eight-row feed with resisted pull to 72px threshold, two RELEASE ticks, 620ms refresh with one arc rotation, timestamp 12:42:18→12:43:02.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired pull-to-refresh threshold',
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
  tags: ['scroll', 'threshold', 'refresh'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, keep threshold interaction with static working indicator and direct completion.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 480,
    background: 'dark',
    scaffold,
    label: 'Pull to refresh',
  },
  integration: [
    'Mount inside a relative overflow-clipped host (~360×440 viewport).',
    'Import demo.css verbatim; freeze 110px max pull, 72px threshold, 58px hold.',
    'Two threshold ticks at 72px; RELEASE status; below threshold cancels.',
    'Committed refresh 620ms with one rotation; timestamp updates after cycle.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Pull is resisted with max 110px display',
    'Threshold exactly 72px with two ticks and RELEASE status',
    'Below threshold release returns to zero without refresh',
    'At/above threshold commits to 58px hold and 620ms refresh',
    'Exactly one refresh arc rotation',
    'Timestamp changes only after committed refresh',
    'Content returns to zero after refresh',
    'Reduced motion: static indicator, direct completion',
  ],
}
