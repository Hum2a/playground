/**
 * Batch-harden Naruto contracts with frozen geometry/timing where missing.
 * Run: node scripts/_naruto-wave3-contracts.mjs
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = 'src/specimens/library/naruto'

const PATCHES = {
  'vortex-hold-to-confirm': (j) => {
    const o = JSON.parse(j)
    // ensure hold vars documented
    if (!o.properties.holdMs) return j
    o.properties.cssVars = {
      type: 'object',
      const: { holdMs: '900ms', cancelMs: '200ms', ringCount: 3 },
    }
    return JSON.stringify(o, null, 2) + '\n'
  },
  'fireball-commit': () =>
    JSON.stringify(
      {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        $id: 'https://playground.humza-butt.space/contracts/fireball-commit.schema.json',
        title: 'FireballCommit',
        description: 'Ember charge at source, launch 216px, impact flash, CONFIRMED.',
        type: 'object',
        additionalProperties: false,
        required: ['name', 'chargeMs', 'launchMs', 'impactMs', 'settleMs', 'travelPx', 'colours', 'reducedMotion'],
        properties: {
          name: { type: 'string', const: 'fireball-commit' },
          chargeMs: { type: 'number', const: 380 },
          launchMs: { type: 'number', const: 220 },
          impactMs: { type: 'number', const: 200 },
          settleMs: { type: 'number', const: 150 },
          travelPx: { type: 'number', const: 216 },
          colours: {
            type: 'object',
            additionalProperties: false,
            required: ['ink', 'parchment', 'chakra', 'danger', 'olive', 'off'],
            properties: {
              ink: { type: 'string', const: '#0C0806' },
              parchment: { type: 'string', const: '#C4B8A8' },
              chakra: { type: 'string', const: '#E07030' },
              danger: { type: 'string', const: '#D94A38' },
              olive: { type: 'string', const: '#5A5048' },
              off: { type: 'string', const: '#F4F1E8' },
            },
          },
          reducedMotion: {
            type: 'object',
            additionalProperties: false,
            required: ['immediateConfirmed'],
            properties: { immediateConfirmed: { type: 'boolean', const: true } },
          },
        },
      },
      null,
      2,
    ) + '\n',
  'mission-complete-stamp': () =>
    JSON.stringify(
      {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        $id: 'https://playground.humza-butt.space/contracts/mission-complete-stamp.schema.json',
        title: 'MissionCompleteStamp',
        description: 'Wax stamp overshoots then settles to -12deg with one ring pulse.',
        type: 'object',
        additionalProperties: false,
        required: ['name', 'slamMs', 'settleMs', 'settleDeg', 'overshootDeg', 'ringPulseMs', 'colours', 'reducedMotion'],
        properties: {
          name: { type: 'string', const: 'mission-complete-stamp' },
          slamMs: { type: 'number', const: 220 },
          settleMs: { type: 'number', const: 140 },
          settleDeg: { type: 'number', const: -12 },
          overshootDeg: { type: 'number', const: -4 },
          ringPulseMs: { type: 'number', const: 260 },
          colours: {
            type: 'object',
            additionalProperties: false,
            required: ['ink', 'parchment', 'chakra', 'alarm', 'olive', 'off'],
            properties: {
              ink: { type: 'string', const: '#1A1612' },
              parchment: { type: 'string', const: '#EBE2D0' },
              chakra: { type: 'string', const: '#B83228' },
              alarm: { type: 'string', const: '#B83228' },
              olive: { type: 'string', const: '#6A5E4E' },
              off: { type: 'string', const: '#F7F2E8' },
            },
          },
          reducedMotion: {
            type: 'object',
            additionalProperties: false,
            required: ['immediateComplete'],
            properties: { immediateComplete: { type: 'boolean', const: true } },
          },
        },
      },
      null,
      2,
    ) + '\n',
  'shadow-clone-fan-out': () =>
    JSON.stringify(
      {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        $id: 'https://playground.humza-butt.space/contracts/shadow-clone-fan-out.schema.json',
        title: 'ShadowCloneFanOut',
        description: 'Three clones puff-scale from origin and travel to worker slots with 70ms stagger.',
        type: 'object',
        additionalProperties: false,
        required: ['name', 'cloneCount', 'staggerMs', 'fanMs', 'settleMs', 'targets', 'colours', 'reducedMotion'],
        properties: {
          name: { type: 'string', const: 'shadow-clone-fan-out' },
          cloneCount: { type: 'number', const: 3 },
          staggerMs: { type: 'number', const: 70 },
          fanMs: { type: 'number', const: 180 },
          settleMs: { type: 'number', const: 90 },
          targets: {
            type: 'array',
            const: [
              { left: '16.6%', top: '82%' },
              { left: '50%', top: '82%' },
              { left: '83.4%', top: '82%' },
            ],
          },
          colours: {
            type: 'object',
            additionalProperties: false,
            required: ['ink', 'parchment', 'chakra', 'olive', 'off'],
            properties: {
              ink: { type: 'string', const: '#12141A' },
              parchment: { type: 'string', const: '#D8D4E0' },
              chakra: { type: 'string', const: '#7A6B9A' },
              olive: { type: 'string', const: '#6E6A78' },
              off: { type: 'string', const: '#F0EEF4' },
            },
          },
          reducedMotion: {
            type: 'object',
            additionalProperties: false,
            required: ['immediateFanned'],
            properties: { immediateFanned: { type: 'boolean', const: true } },
          },
        },
      },
      null,
      2,
    ) + '\n',
  'teleport-card-transfer': (j) => {
    try {
      const o = JSON.parse(j)
      o.properties = o.properties || {}
      o.properties.midHoldMs = { type: 'number', const: 120 }
      o.properties.apertureFromPx = { type: 'number', const: 8 }
      o.properties.apertureToPx = { type: 'number', const: 72 }
      if (Array.isArray(o.required) && !o.required.includes('midHoldMs')) {
        o.required = [...o.required, 'midHoldMs', 'apertureFromPx', 'apertureToPx']
      }
      return JSON.stringify(o, null, 2) + '\n'
    } catch {
      return j
    }
  },
  'shuriken-radial-menu': (j) => {
    try {
      const o = JSON.parse(j)
      o.properties = o.properties || {}
      o.properties.sectorCount = { type: 'number', const: 6 }
      o.properties.sectorDeg = { type: 'number', const: 60 }
      o.properties.openMs = { type: 'number', const: 280 }
      return JSON.stringify(o, null, 2) + '\n'
    } catch {
      return j
    }
  },
  'water-wave-page-transition': (j) => {
    try {
      const o = JSON.parse(j)
      o.properties = o.properties || {}
      o.properties.wipeMs = { type: 'number', const: 420 }
      o.properties.clipSteps = {
        type: 'array',
        const: ['inset(0 100% 0 0)', 'inset(0 40% 0 0)', 'inset(0 0 0 0)'],
      }
      return JSON.stringify(o, null, 2) + '\n'
    } catch {
      return j
    }
  },
  'wind-slice-transition': (j) => {
    try {
      const o = JSON.parse(j)
      o.properties = o.properties || {}
      o.properties.bladeCount = { type: 'number', const: 3 }
      o.properties.bladeDeg = { type: 'array', const: [-18, 0, 18] }
      o.properties.staggerMs = { type: 'number', const: 60 }
      return JSON.stringify(o, null, 2) + '\n'
    } catch {
      return j
    }
  },
  'four-point-barrier-construct': (j) => {
    try {
      const o = JSON.parse(j)
      o.properties = o.properties || {}
      o.properties.cornerCount = { type: 'number', const: 4 }
      o.properties.edgeMs = { type: 'number', const: 120 }
      o.properties.fillMs = { type: 'number', const: 160 }
      return JSON.stringify(o, null, 2) + '\n'
    } catch {
      return j
    }
  },
  'barrier-breach-alert': (j) => {
    try {
      const o = JSON.parse(j)
      o.properties = o.properties || {}
      o.properties.fractureDeg = { type: 'number', const: -18 }
      o.properties.fractureCount = { type: 'number', const: 1 }
      o.properties.noLoopFlash = { type: 'boolean', const: true }
      return JSON.stringify(o, null, 2) + '\n'
    } catch {
      return j
    }
  },
}

let n = 0
for (const [id, fn] of Object.entries(PATCHES)) {
  const p = path.join(ROOT, id, 'contract.json')
  if (!fs.existsSync(p)) continue
  const cur = fs.readFileSync(p, 'utf8')
  const next = fn(cur)
  if (next && next !== cur) {
    fs.writeFileSync(p, next)
    n++
  }
}
console.log('patched', n, 'contracts')
