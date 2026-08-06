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

export const menuBarActiveTransfer: Specimen = {
  id: 'menu-bar-active-transfer',
  ref: 'SPX-1470',
  title: 'Menu Bar Active Transfer',
  blurb:
    'FILE menu opens at 190px width; pointer transfer to EDIT/VIEW slides surface 120ms, adjusts height 100ms; FILE 5, EDIT 6, VIEW 4 rows; 220ms grace.',
  origin: {
    project: 'Original',
    surface: 'macOS-inspired menu ownership transfer',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['macos'],
  },
  tags: ['menu', 'hover-ownership', 'transfer'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, menu transfers instantly between anchors.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 340,
    height: 280,
    background: 'dark',
    scaffold,
    label: 'Menu bar active transfer',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 32px bar, 190px menu, row counts.',
    'Single reused menu surface — no duplicates.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Menu must be opened first',
    'Pointer transfer changes ownership',
    'Surface is reused rather than duplicated',
    'Row counts correct',
    'Grace period prevents accidental close during transfer',
    'Reduced motion: instant transfer',
  ],
}
