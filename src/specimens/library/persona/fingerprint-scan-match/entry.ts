import type { Specimen } from '../../../types'

export const fingerprintScanMatch: Specimen = {
  id: 'fingerprint-scan-match',
  ref: 'SPX-TODO',
  title: 'Fingerprint Scan Match',
  blurb: 'Abstract print-like lines align into match/no-match.',
  origin: { project: 'Original', surface: 'Persona 4 investigation / mystery visual language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'persona', works: ['persona-4'] },
  tags: ["mystery","biometric","scan"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Scan line and alignment jump to match state under reduced motion.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 300, background: 'dark', scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:280px;border:1px solid #2a2a2a;border-radius:2px;background:#101010;">
  {{specimen}}
</div>`, label: 'Fingerprint scan match' },
}
