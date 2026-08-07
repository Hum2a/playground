/**
 * Naruto Wave 1 — palette families + strip NR checklist chrome + sync twins.
 * Run: node scripts/_naruto-wave1.mjs
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve('src/specimens/library/naruto')

const SHARED = {
  ink: '#101318',
  parchment: '#E7DDC7',
  chakra: '#3A9BD9',
  olive: '#69745A',
  off: '#F4F1E8',
  vermilion: '#D94A38',
  danger: '#D94A38',
  alert: '#D94A38',
}

/** @type {Record<string, Record<string, string>>} */
const PALETTES = {
  seal: {
    ink: '#140c0c',
    parchment: '#e8dcc8',
    chakra: '#c43c2e',
    olive: '#6b5048',
    off: '#f3ebe0',
    vermilion: '#c43c2e',
    danger: '#c43c2e',
    alert: '#c43c2e',
    accentName: 'vermilion',
  },
  clone: {
    ink: '#12141a',
    parchment: '#d8d4e0',
    chakra: '#7a6b9a',
    olive: '#6e6a78',
    off: '#f0eef4',
    vermilion: '#a85868',
    danger: '#a85868',
    alert: '#a85868',
  },
  fire: {
    ink: '#0c0806',
    parchment: '#c4b8a8',
    chakra: '#e07030',
    olive: '#5a5048',
    off: '#f4f1e8',
    vermilion: '#d94a38',
    danger: '#d94a38',
    alert: '#d94a38',
  },
  water: {
    ink: '#071018',
    parchment: '#c8d8e4',
    chakra: '#3a9ec9',
    olive: '#4a6a78',
    off: '#e8f2f8',
    vermilion: '#2e7a9a',
    danger: '#2e7a9a',
    alert: '#2e7a9a',
  },
  wind: {
    ink: '#0c1014',
    parchment: '#d0d6dc',
    chakra: '#8aa0b4',
    olive: '#5a6870',
    off: '#eef2f4',
    vermilion: '#6a8498',
    danger: '#6a8498',
    alert: '#6a8498',
  },
  paper: {
    ink: '#1a1612',
    parchment: '#ebe2d0',
    chakra: '#b83228',
    olive: '#6a5e4e',
    off: '#f7f2e8',
    vermilion: '#b83228',
    danger: '#b83228',
    alert: '#b83228',
  },
  sensor: {
    ink: '#070b0e',
    parchment: '#c8e8dc',
    chakra: '#3dcea8',
    olive: '#1a6b58',
    off: '#d7f5ec',
    vermilion: '#3dcea8',
    danger: '#d94a38',
    alert: '#3dcea8',
  },
}

/** @type {Record<string, string>} */
const FAMILY = {
  'hand-sign-combo-sequence': 'seal',
  'circular-seal-lock': 'seal',
  'seal-release-sequence': 'seal',
  'multi-key-seal': 'seal',
  'seal-stamp-confirmation': 'seal',
  'summoning-seal-materialise': 'seal',
  'exam-start-seal': 'seal',
  'shadow-clone-fan-out': 'clone',
  'parallel-worker-clones': 'clone',
  'clone-merge-result': 'clone',
  'clone-failure-pop': 'clone',
  'substitution-swap': 'clone',
  'error-substitution-recovery': 'clone',
  'transformation-morph': 'clone',
  'shadow-bind-selection': 'clone',
  'fireball-commit': 'fire',
  'explosive-tag-countdown': 'fire',
  'earth-wall-blocker': 'fire',
  'element-merge-recipe': 'fire',
  'water-wave-page-transition': 'water',
  'smoke-mask-transition': 'water',
  'wind-slice-transition': 'wind',
  'body-flicker-page-jump': 'wind',
  'high-speed-card-relocation': 'wind',
  'mission-scroll-unroll': 'paper',
  'scroll-to-panel-transform': 'paper',
  'mission-rank-reveal': 'paper',
  'mission-complete-stamp': 'paper',
  'mission-board-dispatch': 'paper',
  'rank-promotion-card': 'paper',
  'target-dossier-reveal': 'paper',
  'versus-clash-card': 'paper',
  'objective-chain-advance': 'paper',
  'technique-mastery-tree': 'paper',
  'three-person-cell-formation': 'paper',
  'chakra-charge-field': 'sensor',
  'chakra-control-balance': 'sensor',
  'chakra-signature-match': 'sensor',
  'healing-progress-field': 'sensor',
  'focus-mode-activation': 'sensor',
  'weak-point-detection': 'sensor',
  'presence-radar-sweep': 'sensor',
  'network-scan-360': 'sensor',
  'four-point-barrier-construct': 'sensor',
  'barrier-breach-alert': 'sensor',
  'lightning-target-acquisition': 'sensor',
  'vortex-hold-to-confirm': 'sensor',
  'wire-connection-draw': 'sensor',
  'shuriken-radial-menu': 'wind',
  'teleport-card-transfer': 'sensor',
}

/** Human system labels (never NR // NR-xxx) */
const LABELS = {
  'hand-sign-combo-sequence': 'COMBO // HAND SIGNS',
  'circular-seal-lock': 'SEAL // LOCK RING',
  'seal-release-sequence': 'SEAL // RELEASE',
  'multi-key-seal': 'SEAL // MULTI-KEY',
  'seal-stamp-confirmation': 'SEAL // STAMP CONFIRM',
  'summoning-seal-materialise': 'SEAL // MATERIALISE',
  'exam-start-seal': 'GATE // EXAM START',
  'shadow-clone-fan-out': 'CLONE // FAN-OUT',
  'parallel-worker-clones': 'CLONE // PARALLEL',
  'clone-merge-result': 'CLONE // MERGE',
  'clone-failure-pop': 'CLONE // FAILURE',
  'substitution-swap': 'FAILOVER // SWAP',
  'error-substitution-recovery': 'FAILOVER // SUBSTITUTION',
  'transformation-morph': 'IDENTITY // MORPH',
  'shadow-bind-selection': 'BIND // SELECTION',
  'fireball-commit': 'FLAME // COMMIT',
  'explosive-tag-countdown': 'TAG // COUNTDOWN',
  'earth-wall-blocker': 'BARRIER // EARTH WALL',
  'element-merge-recipe': 'RECIPE // ELEMENT MERGE',
  'water-wave-page-transition': 'WIPE // WATER WAVE',
  'smoke-mask-transition': 'COVER // SMOKE MASK',
  'wind-slice-transition': 'WIPE // WIND SLICE',
  'body-flicker-page-jump': 'JUMP // BODY FLICKER',
  'high-speed-card-relocation': 'MOVE // CARD RELOCATE',
  'mission-scroll-unroll': 'BRIEF // SCROLL',
  'scroll-to-panel-transform': 'MORPH // SCROLL PANEL',
  'mission-rank-reveal': 'RANK // REVEAL',
  'mission-complete-stamp': 'STAMP // COMPLETE',
  'mission-board-dispatch': 'BOARD // DISPATCH',
  'rank-promotion-card': 'RANK // PROMOTION',
  'target-dossier-reveal': 'INTEL // DOSSIER',
  'versus-clash-card': 'CLASH // VERSUS',
  'objective-chain-advance': 'CHAIN // OBJECTIVES',
  'technique-mastery-tree': 'TREE // MASTERY',
  'three-person-cell-formation': 'CELL // FORMATION',
  'chakra-charge-field': 'CHARGE // FIELD',
  'chakra-control-balance': 'BALANCE // CONTROL',
  'chakra-signature-match': 'MATCH // SIGNATURE',
  'healing-progress-field': 'RESTORE // FIELD',
  'focus-mode-activation': 'FOCUS // MODE',
  'weak-point-detection': 'DETECT // WEAK POINTS',
  'presence-radar-sweep': 'RADAR // PRESENCE',
  'network-scan-360': 'SCAN // 360 NETWORK',
  'four-point-barrier-construct': 'BARRIER // FOUR-POINT',
  'barrier-breach-alert': 'ALERT // BREACH',
  'lightning-target-acquisition': 'LOCK // LIGHTNING',
  'vortex-hold-to-confirm': 'HOLD // VORTEX CONFIRM',
  'wire-connection-draw': 'LINK // WIRE',
  'shuriken-radial-menu': 'MENU // RADIAL',
  'teleport-card-transfer': 'TRANSFER // TELEPORT',
}

const OVERLAY_SCAFFOLDS = {
  'weak-point-detection':
    '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#1a1e24;display:grid;place-items:center;padding:1rem;"><div style="position:relative;width:min(100%,280px);height:180px;border:1px solid #2c313c;background:#12141a;padding:1rem;color:#e6e8ec;font:600 12px/1.4 ui-sans-serif,system-ui,sans-serif;">Host card<br/>target surface{{specimen}}</div></div>',
  'focus-mode-activation':
    '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#101418;display:grid;place-items:center;padding:1rem;"><div style="position:relative;width:min(100%,300px);min-height:160px;border:1px solid #2a3038;background:#0c1014;padding:1.25rem;color:#dce2e8;font:600 12px ui-sans-serif,system-ui,sans-serif;">Analysis host{{specimen}}</div></div>',
  'mission-complete-stamp':
    '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#1a1612;display:grid;place-items:center;padding:1rem;"><div style="position:relative;width:min(100%,300px);min-height:200px;border:1px solid #3a3228;background:#ebe2d0;padding:1.25rem;color:#1a1612;font:700 13px ui-serif,Georgia,serif;">Briefing complete{{specimen}}</div></div>',
  'seal-stamp-confirmation':
    '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#140c0c;display:grid;place-items:center;padding:1rem;"><div style="position:relative;width:min(100%,300px);min-height:180px;border:1px solid #3a2820;background:#e8dcc8;padding:1.25rem;color:#140c0c;font:700 13px ui-serif,Georgia,serif;">Permit draft{{specimen}}</div></div>',
  'presence-radar-sweep':
    '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#070b0e;display:grid;place-items:center;padding:0.75rem;">{{specimen}}</div>',
  'barrier-breach-alert':
    '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#070b0e;display:grid;place-items:center;padding:1rem;"><div style="position:relative;width:min(100%,280px);height:160px;border:1px solid #1a6b58;background:#0a1210;">{{specimen}}</div></div>',
  'four-point-barrier-construct':
    '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#070b0e;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
  'target-dossier-reveal':
    '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#1a1612;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
  'summoning-seal-materialise':
    '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#140c0c;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
  'chakra-signature-match':
    '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#070b0e;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
  'healing-progress-field':
    '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#070b0e;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
}

function replaceColors(css, palette) {
  let out = css
  // CSS var declarations (lowercase hex in files)
  const pairs = [
    ['--ink:', palette.ink],
    ['--parchment:', palette.parchment],
    ['--chakra:', palette.chakra],
    ['--olive:', palette.olive],
    ['--off:', palette.off],
    ['--vermilion:', palette.vermilion],
    ['--danger:', palette.danger],
    ['--alert:', palette.alert],
  ]
  for (const [prefix, value] of pairs) {
    out = out.replace(
      new RegExp(`${prefix.replace('--', '--')}\\s*#[0-9a-fA-F]{3,8}`, 'g'),
      `${prefix} ${value.toLowerCase()}`,
    )
  }
  // Hardcoded shared hex leftovers (case insensitive)
  for (const [key, old] of Object.entries(SHARED)) {
    const next = palette[key] ?? palette.chakra
    const re = new RegExp(old.replace('#', '#'), 'gi')
    out = out.replace(re, next)
  }
  return out
}

function replaceContractColors(json, palette) {
  let out = json
  for (const [key, old] of Object.entries(SHARED)) {
    const next = (palette[key] ?? palette.chakra).toUpperCase()
    out = out.replace(new RegExp(old, 'gi'), next)
  }
  return out
}

function patchHtmlLabel(html, label) {
  let out = html.replace(/NR\s*\/\/\s*NR-\d+/gi, label)
  // Common SYSTEM lines that still say generic ACTION / SYSTEM
  out = out.replace(
    /(<p class="[^"]*__system"[^>]*>)([^<]*)(<\/p>)/i,
    `$1${label}$3`,
  )
  return out
}

function patchEntryScaffold(entrySrc, scaffold) {
  if (entrySrc.includes('scaffold:')) return entrySrc
  const esc = scaffold.replace(/`/g, '\\`')
  return entrySrc.replace(
    /preview:\s*\{/,
    `preview: {\n    scaffold: \`${esc}\`,`,
  )
}

let updated = 0
for (const id of fs.readdirSync(ROOT)) {
  const dir = path.join(ROOT, id)
  if (!fs.statSync(dir).isDirectory()) continue
  const family = FAMILY[id]
  if (!family) {
    console.warn('no family', id)
    continue
  }
  const palette = PALETTES[family]
  const label = LABELS[id] ?? id.toUpperCase()

  const cssPath = path.join(dir, 'demo.css')
  const stylePath = path.join(dir, 'demo.style.txt')
  const htmlPath = path.join(dir, 'demo.html')
  const contractPath = path.join(dir, 'contract.json')
  const entryPath = path.join(dir, 'entry.ts')

  if (fs.existsSync(cssPath)) {
    let css = fs.readFileSync(cssPath, 'utf8')
    // Skip network-scan already rewritten to ns360 phosphor vars
    if (id !== 'network-scan-360') {
      css = replaceColors(css, palette)
      fs.writeFileSync(cssPath, css)
      fs.writeFileSync(stylePath, css)
    } else {
      fs.writeFileSync(stylePath, fs.readFileSync(cssPath, 'utf8'))
    }
  }

  if (fs.existsSync(htmlPath)) {
    let html = fs.readFileSync(htmlPath, 'utf8')
    html = patchHtmlLabel(html, label)
    fs.writeFileSync(htmlPath, html)
  }

  if (fs.existsSync(contractPath) && id !== 'network-scan-360') {
    let contract = fs.readFileSync(contractPath, 'utf8')
    contract = replaceContractColors(contract, palette)
    fs.writeFileSync(contractPath, contract)
  }

  if (OVERLAY_SCAFFOLDS[id] && fs.existsSync(entryPath)) {
    let entry = fs.readFileSync(entryPath, 'utf8')
    entry = patchEntryScaffold(entry, OVERLAY_SCAFFOLDS[id])
    fs.writeFileSync(entryPath, entry)
  }

  updated += 1
}

console.log(`Wave 1 updated ${updated} specimens`)
