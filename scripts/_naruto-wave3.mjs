/**
 * Naruto Wave 3 — harden entry acceptance + intensity for all specimens.
 * Prefer measurable bullets; bump subtle→graphic for multi-phase effects.
 * Run: node scripts/_naruto-wave3.mjs
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve('src/specimens/library/naruto')

/** @type {Record<string, { intensity?: string, acceptance: string[], blurb?: string }>} */
const UPGRADES = {
  'hand-sign-combo-sequence': {
    intensity: 'graphic',
    acceptance: [
      'Four distinct glyphs acquire with snap (not fade) at 130ms steps',
      'Ready hold settles 90ms; final READY shows all four locked',
      'Reduced motion shows all four READY immediately',
    ],
  },
  'circular-seal-lock': {
    intensity: 'graphic',
    acceptance: [
      'Ring rotates to align with frozen tick marks then locks',
      'Settle angle and tick count are contract-frozen',
      'Reduced motion shows locked ring immediately',
    ],
  },
  'seal-release-sequence': {
    intensity: 'graphic',
    acceptance: [
      'Rings disengage outward on a frozen stagger array',
      'Open glyph appears only after rings clear',
      'Reduced motion shows open state immediately',
    ],
  },
  'multi-key-seal': {
    intensity: 'graphic',
    acceptance: [
      'Exactly N keys arm before petals open',
      'Petal angles frozen in contract; unlock is progressive',
      'Reduced motion shows armed+open immediately',
    ],
  },
  'seal-stamp-confirmation': {
    intensity: 'graphic',
    acceptance: [
      'Stamp overshoots then settles to a frozen angle',
      'Confirmation ring pulses exactly once',
      'Reduced motion shows settled stamp immediately',
    ],
  },
  'summoning-seal-materialise': {
    intensity: 'graphic',
    acceptance: [
      'Seal draw-stroke completes before panel expands from center',
      'Panel uses clip/scale expansion (not fade)',
      'Reduced motion shows materialised panel immediately',
    ],
  },
  'exam-start-seal': {
    intensity: 'graphic',
    acceptance: [
      'Seal break unlocks into active exam surface',
      'Unlock phases frozen in contract',
      'Reduced motion shows unlocked surface immediately',
    ],
  },
  'shadow-clone-fan-out': {
    intensity: 'graphic',
    acceptance: [
      'Clones spawn from a single origin with frozen stagger',
      'Worker count and travel are contract-frozen',
      'Reduced motion fills slots immediately',
    ],
  },
  'parallel-worker-clones': {
    intensity: 'graphic',
    acceptance: [
      'Parallel bars fill then recombine inheriting worker marks',
      'Progress commits are discrete and frozen',
      'Reduced motion shows completed merge immediately',
    ],
  },
  'clone-merge-result': {
    intensity: 'graphic',
    acceptance: [
      'Clones travel inward by frozen px and reabsorb into one result',
      'Final output inherits worker traits',
      'Reduced motion shows merged result immediately',
    ],
  },
  'clone-failure-pop': {
    intensity: 'graphic',
    acceptance: [
      'Failed clone pops leaving frozen residue then clears',
      'Surviving clones remain; residue timing in contract',
      'Reduced motion shows final failed/complete states',
    ],
  },
  'substitution-swap': {
    intensity: 'graphic',
    acceptance: [
      'Mid-sequence shows decoy only before true target restores',
      'Swap timings frozen (log → decoy → target)',
      'Reduced motion jumps to failover target',
    ],
  },
  'error-substitution-recovery': {
    intensity: 'graphic',
    acceptance: [
      'Primary faults at 170ms then decoy fallback acquires at +100ms',
      'Recovered state latches Service B ACTIVE with primary FAULTED',
      'Reduced motion shows recovered fallback immediately',
    ],
  },
  'transformation-morph': {
    intensity: 'graphic',
    acceptance: [
      'Collapse → ink intermediate → expand with trait inheritance',
      'Intermediate is not a simple crossfade',
      'Reduced motion shows second profile immediately',
    ],
  },
  'shadow-bind-selection': {
    intensity: 'graphic',
    acceptance: [
      'Bind tendrils lock selection with frozen count and lock ms',
      'Selected target cannot move until released',
      'Reduced motion shows already bound',
    ],
  },
  'body-flicker-page-jump': {
    intensity: 'graphic',
    acceptance: [
      'Streaks fire then destination identity appears',
      'Streak count/angle frozen; no fade-as-travel',
      'Reduced motion shows destination immediately',
    ],
  },
  'high-speed-card-relocation': {
    intensity: 'graphic',
    acceptance: [
      'Card absent mid-travel with afterimages along frozen path',
      'Ends docked in destination slot',
      'Reduced motion places card in slot B immediately',
    ],
  },
  'teleport-card-transfer': {
    intensity: 'graphic',
    acceptance: [
      'Mid-transfer empty hold with frozen aperture diameters',
      'Card reconstructs at destination only after aperture closes',
      'Reduced motion shows reconstructed destination',
    ],
  },
  'shuriken-radial-menu': {
    intensity: 'graphic',
    acceptance: [
      'Sectors open to frozen angles and radii',
      'No continuous rotation under reduced motion',
      'Selection commits one sector',
    ],
  },
  'wire-connection-draw': {
    intensity: 'subtle',
    acceptance: [
      'Wire draws via pathLength to LINKED then snaps',
      'Path and duration frozen in contract',
      'Reduced motion shows fully drawn LINKED',
    ],
  },
  'fireball-commit': {
    intensity: 'graphic',
    acceptance: [
      'Charge → launch → impact confirm with frozen ms',
      'Target shows CONFIRMED after impact',
      'Reduced motion shows CONFIRMED without charge/launch',
    ],
  },
  'earth-wall-blocker': {
    intensity: 'graphic',
    acceptance: [
      'Faceted slabs rise with frozen count and rise px',
      'Final PROTECTED after last slab settles',
      'Reduced motion shows raised wall immediately',
    ],
  },
  'lightning-target-acquisition': {
    intensity: 'graphic',
    acceptance: [
      'Branch-bolt reticle acquires then LOCKED',
      'Branch geometry frozen in contract',
      'Reduced motion shows LOCKED immediately',
    ],
  },
  'element-merge-recipe': {
    intensity: 'graphic',
    acceptance: [
      'Dual inputs meet at frozen seam then result token appears',
      'Result inherits marks from both inputs',
      'Reduced motion shows result token directly',
    ],
  },
  'vortex-hold-to-confirm': {
    intensity: 'graphic',
    acceptance: [
      'Early release before 900ms never confirms',
      'Full hold builds 3 rings then CONFIRMED',
      'Reduced motion retains threshold then auto-confirms',
    ],
  },
  'smoke-mask-transition': {
    intensity: 'graphic',
    acceptance: [
      'Smoke mask covers then content identity swaps mid-cover',
      'Mask keyframes frozen; A≠B after swap',
      'Reduced motion instant swaps without choreography',
    ],
  },
  'water-wave-page-transition': {
    intensity: 'graphic',
    acceptance: [
      'Wave wipe uses frozen clip-path steps',
      'Page B identity visible after wipe completes',
      'Reduced motion instant page swap',
    ],
  },
  'wind-slice-transition': {
    intensity: 'graphic',
    acceptance: [
      'Blade sweeps at frozen angles with stagger',
      'Content swaps under slices; blade count in contract',
      'Reduced motion instant swap',
    ],
  },
  'scroll-to-panel-transform': {
    intensity: 'graphic',
    acceptance: [
      'Scroll morphs to panel via scale/clip (not crossfade)',
      'Morph timings frozen',
      'Reduced motion shows expanded panel immediately',
    ],
  },
  'mission-scroll-unroll': {
    intensity: 'subtle',
    acceptance: [
      'Scroll unrolls by frozen height/clip ms',
      'Briefing lines visible when fully unrolled',
      'Reduced motion fully unrolled immediately',
    ],
  },
  'mission-rank-reveal': {
    intensity: 'graphic',
    acceptance: [
      'Rank glyph + stamp settle with frozen overshoot angle',
      'Final CONFIRMED static',
      'Reduced motion shows settled rank immediately',
    ],
  },
  'mission-complete-stamp': {
    intensity: 'graphic',
    acceptance: [
      'Stamp slams with measurable settle angle; ring pulses once',
      'Host briefing card remains readable under stamp',
      'Reduced motion shows settled COMPLETE stamp',
    ],
  },
  'mission-board-dispatch': {
    intensity: 'subtle',
    acceptance: [
      'Card travels frozen path into destination lane and docks',
      'Lane shows dispatched card identity',
      'Reduced motion shows card docked immediately',
    ],
  },
  'rank-promotion-card': {
    intensity: 'graphic',
    acceptance: [
      'Old rank morphs to new rank through frozen phases',
      'Final promoted rank static',
      'Reduced motion shows promoted rank immediately',
    ],
  },
  'target-dossier-reveal': {
    intensity: 'graphic',
    acceptance: [
      'Redaction bands lift in frozen order/count',
      'Declassified content readable after last band',
      'Reduced motion shows declassified immediately',
    ],
  },
  'versus-clash-card': {
    intensity: 'graphic',
    acceptance: [
      'Cards travel frozen px then clash-hold',
      'Impact settles both cards in clash pose',
      'Reduced motion shows already clashed',
    ],
  },
  'objective-chain-advance': {
    intensity: 'subtle',
    acceptance: [
      'Checkpoints latch in frozen step ms sequence',
      'Final MISSION CLEAR after last checkpoint',
      'Reduced motion shows all checkpoints clear',
    ],
  },
  'technique-mastery-tree': {
    intensity: 'graphic',
    acceptance: [
      'Nodes unlock in frozen order with edge draw',
      'MASTERED state on completed nodes',
      'Reduced motion shows nodes MASTERED',
    ],
  },
  'three-person-cell-formation': {
    intensity: 'subtle',
    acceptance: [
      'Three nodes assemble at frozen positions with link draw',
      'Formation locks when all links complete',
      'Reduced motion shows formed cell immediately',
    ],
  },
  'chakra-charge-field': {
    intensity: 'subtle',
    acceptance: [
      'Boundary grows through frozen diameters to READY',
      'Growth is irregular not a linear bar only',
      'Reduced motion shows resolved READY immediately',
    ],
  },
  'chakra-control-balance': {
    intensity: 'subtle',
    acceptance: [
      'Needle locks at frozen balance threshold',
      'Wobble settles before LOCKED',
      'Reduced motion jumps to locked-balanced',
    ],
  },
  'chakra-signature-match': {
    intensity: 'graphic',
    acceptance: [
      'Waveform aligns to frozen threshold then MATCH',
      'Sample points frozen in contract',
      'Reduced motion snaps to MATCH',
    ],
  },
  'healing-progress-field': {
    intensity: 'graphic',
    acceptance: [
      'Tiles restore in frozen order/stagger',
      'All tiles RESTORED at end',
      'Reduced motion shows all RESTORED',
    ],
  },
  'focus-mode-activation': {
    intensity: 'graphic',
    acceptance: [
      'Brackets converge to frozen inset on host content',
      'Focus mode on without continuous loop',
      'Reduced motion shows focus on immediately',
    ],
  },
  'weak-point-detection': {
    intensity: 'graphic',
    acceptance: [
      'Exactly N weak points bracket in frozen order',
      'Host content remains visible under brackets',
      'Reduced motion shows all points bracketed',
    ],
  },
  'presence-radar-sweep': {
    intensity: 'graphic',
    acceptance: [
      'Blips at frozen bearings appear as sweep crosses them',
      'Contact log lists bearings; sweep rests when done',
      'Reduced motion shows blips logged with beam at rest',
    ],
  },
  'network-scan-360': {
    intensity: 'graphic',
    acceptance: [
      'Sweep hits nodes at 0/72/144/216/288° with 150ms steps',
      'Five links activate in order; final MAPPED',
      'Reduced motion shows all five mapped immediately',
    ],
  },
  'four-point-barrier-construct': {
    intensity: 'graphic',
    acceptance: [
      'Corners then edges then fill with frozen coords/ms',
      'Field filled only after edges complete',
      'Reduced motion shows connected filled field',
    ],
  },
  'barrier-breach-alert': {
    intensity: 'graphic',
    acceptance: [
      'Exactly one fracture at frozen angle; alert latches',
      'No looping flash after latch',
      'Reduced motion shows fracture/alert without pulse',
    ],
  },
  'explosive-tag-countdown': {
    intensity: 'graphic',
    acceptance: [
      'Arm 220ms then digits 3→2→1 at 480ms each',
      'Burst 240ms then CLEAR settle 200ms',
      'Reduced motion shows CLEAR immediately',
    ],
  },
}

function patchEntry(src, upgrade) {
  let out = src
  if (upgrade.intensity) {
    out = out.replace(/intensity:\s*'[^']+'/, `intensity: '${upgrade.intensity}'`)
  }
  if (upgrade.blurb) {
    out = out.replace(/blurb:\s*'[^']*'/, `blurb: '${upgrade.blurb.replace(/'/g, "\\'")}'`)
    out = out.replace(/blurb:\s*`[^`]*`/, `blurb: \`${upgrade.blurb}\``)
  }

  // Inject or replace acceptance array
  const acc = upgrade.acceptance.map((a) => `    '${a.replace(/'/g, "\\'")}',`).join('\n')
  if (/acceptance:\s*\[/.test(out)) {
    out = out.replace(/acceptance:\s*\[[^\]]*\]/s, `acceptance: [\n${acc}\n  ]`)
  } else {
    out = out.replace(
      /loadPayload:/,
      `acceptance: [\n${acc}\n  ],\n  loadPayload:`,
    )
  }
  return out
}

let n = 0
for (const [id, upgrade] of Object.entries(UPGRADES)) {
  const entryPath = path.join(ROOT, id, 'entry.ts')
  if (!fs.existsSync(entryPath)) {
    console.warn('missing', id)
    continue
  }
  const src = fs.readFileSync(entryPath, 'utf8')
  fs.writeFileSync(entryPath, patchEntry(src, upgrade))
  n += 1
}
console.log(`Wave 3 hardened ${n} entries`)
