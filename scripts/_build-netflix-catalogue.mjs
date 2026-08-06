import fs from 'node:fs'
import path from 'node:path'

const src = 'docs/catalogue/netflix_motion_ui_specimen_catalogue.md'
const t = fs.readFileSync(src, 'utf8')

const re =
  /-\s+\[\s\]\s+[★☆]+\s+\*\*([^*]+)\*\*\s*---\s*([\s\S]*?)(?=\n-\s+\[|\n---+|\n# |\n## |$)/g
const items = []
let m
while ((m = re.exec(t))) {
  const title = m[1].replace(/\s+/g, ' ').trim()
  const blurb = m[2].replace(/\s+/g, ' ').trim().replace(/\.$/, '')
  items.push({ title, blurb })
}

fs.mkdirSync('.wip-aside', { recursive: true })
fs.writeFileSync('.wip-aside/netflix-items.json', JSON.stringify(items, null, 2))
console.log('count', items.length)

const waves = {
  A: [
    'Preview Card Hover Expand',
    'Neighbour Push-Out',
    'Preview Collapse Return',
    'Horizontal Content Rail',
    'Rail Page Snap',
    'Details Panel Expand',
    'Playback Controls Fade-In',
    'Scrub Preview Thumbnail',
    'Skip Intro Appear',
    'Next Episode Countdown',
  ],
  B: [
    'Delayed Preview Expansion',
    'Expanded Card Metadata Reveal',
    'Keyboard Focus Expansion',
    'Featured Hero Crossfade',
    'Hero Metadata Cascade',
    'Search Field Expand',
    'Live Result Grid Reflow',
    'Oversized Rank Numeral',
    'Rank Change Slide',
    'Directional Focus Travel',
  ],
  C: [
    'Autoplay Preview Countdown',
    'Preview Start Crossfade',
    'Ten-Second Seek Ripple',
    'Controls Idle Dissolve',
    'Timeline Hover Preview',
    'Skip Intro Commit',
    'Next-Up Cancel',
    'Binge Continuation Transition',
    'Minimal Buffer Spinner',
    'Buffer-to-Playback Resolve',
  ],
  D: [
    "Who's Watching Grid Focus",
    'Profile Avatar Select Snap',
    'Match Confidence Meter',
    'Thumb Rating Feedback',
    'Add-to-List Confirmation',
    'Remove-from-List Undo',
    'Resume Playback Handoff',
    'Continue-Watching Progress Bar',
    'Details Close Return',
    'Back Navigation Return',
  ],
  E: [
    'Playback Error Takeover',
    'Retry-to-Buffer Transition',
    'Network Lost Overlay',
    'Vertical Clip Snap',
    'Clip-to-Title Handoff',
    'Download Progress Ring',
    'Download Complete Morph',
    'Cinematic Ribbon Reveal',
    'Vertical Light-Bar Intro',
    'More Info Overlay',
  ],
}

const byTitle = new Map(
  items.map((it, i) => [
    it.title,
    { nf: i + 1, spx: 3109 + i + 1, title: it.title, blurb: it.blurb },
  ]),
)

const waveMap = {}
for (const [w, titles] of Object.entries(waves)) {
  console.log('WAVE', w)
  waveMap[w] = []
  for (const title of titles) {
    const hit = byTitle.get(title)
    if (!hit) {
      console.log(' MISSING', title)
      continue
    }
    console.log(
      ` NF-${String(hit.nf).padStart(3, '0')} SPX-${hit.spx} ${title}`,
    )
    waveMap[w].push(hit)
  }
}

fs.writeFileSync('.wip-aside/netflix-wave-map.json', JSON.stringify(waveMap, null, 2))

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function nf(n) {
  return `NF-${String(n).padStart(3, '0')}`
}

const leftover =
  'Non-catalogue specimens (other franchises / originals) use gaps not reserved by open P5 (`SPX-015`–`SPX-312`), P3 (`SPX-400`–`SPX-635`), PK (`SPX-700`–`SPX-965`), DB (`SPX-966`–`SPX-1209`), IOS (`SPX-1300`–`SPX-1557`), AND (`SPX-1558`–`SPX-1974`), MHA (`SPX-1975`–`SPX-2343`), NR (`SPX-2344`–`SPX-2918`), P4 (`SPX-2919`–`SPX-3109`), or open NF rows; prefer leftover `SPX-313`–`SPX-399`, `SPX-636`–`SPX-699`, `SPX-1210`–`SPX-1299`, or `SPX-3307+`.'

const lines = []
lines.push('# Netflix Specimen Checklist')
lines.push('')
lines.push(
  '> Working backlog for portable motion/UI artifacts inspired by modern streaming interfaces (Netflix as primary reference): cinematic identity, content rails, expanding previews, playback chrome, skip/next-up, profiles, progress, downloads, TV focus, and vertical discovery. Interaction primitives, not product replicas. Avoid Netflix logos, wordmarks, Netflix Sans, proprietary artwork, show/movie imagery, copyrighted video/audio, or pixel-copied production screens. Use original placeholder titles, generic media cards, and abstract geometry.',
)
lines.push('')
lines.push('## How to use')
lines.push('')
lines.push('- **NF-NNN** — stable catalogue id (this list).')
lines.push(
  '- **SPX-NNN** — specimen registry ref. Unbuilt ideas are pre-assigned `SPX-3110`…`SPX-3306` — use that ref when implementing; do not invent a different number.',
)
lines.push(`- ${leftover}`)
lines.push(
  '- Mark **`[x]`** only when the specimen is registered in `src/specimens/index.ts` with a real `ref` (not `SPX-TODO`) and verified. Agents must update this file in the same change — see `.cursor/rules/37_persona-catalogue.mdc`.',
)
lines.push(`- Progress: **0 / ${items.length}** complete.`)
lines.push('')
lines.push('| Status | Count |')
lines.push('| --- | --- |')
lines.push('| Done | 0 |')
lines.push(`| Open | ${items.length} |`)
lines.push('')
lines.push('## Visual grammar')
lines.push('')
lines.push('| Motif | Use for |')
lines.push('| --- | --- |')
lines.push('| Cinematic identity | brand/product arrival without logo lockup |')
lines.push('| Profile / identity | workspace or account switchers |')
lines.push('| Hero / featured | featured object staging |')
lines.push('| Rails / carousels | horizontal category browsing |')
lines.push('| Preview expand | rich inspection without navigation |')
lines.push('| Playback chrome | controls that yield to content |')
lines.push('| Scrub / timeline | time-based inspection |')
lines.push('| Skip / next-up | contextual shortcuts and timed handoffs |')
lines.push('| Progress / downloads | resumable and background jobs |')
lines.push('| TV focus / vertical clips | directional focus and mobile discovery |')
lines.push('')
lines.push('## Shipped (mapped to live specimens)')
lines.push('')
lines.push('| NF | SPX | Specimen id | Title |')
lines.push('| --- | --- | --- | --- |')
lines.push('')
lines.push('## Core first-wave')
lines.push('')
lines.push(
  'Curated implementation priority (Recommended Build Waves A–E / Top 50). Same checkbox as the master list — checking either counts.',
)
lines.push('')

const waveLabels = {
  A: 'Wave A — Core streaming grammar',
  B: 'Wave B — Browse / discovery',
  C: 'Wave C — Playback',
  D: 'Wave D — State and personalisation',
  E: 'Wave E — Errors, mobile and cinematic polish',
}

for (const [w, list] of Object.entries(waveMap)) {
  lines.push(`### ${waveLabels[w]}`)
  lines.push('')
  for (const hit of list) {
    lines.push(
      `- [ ] **${nf(hit.nf)}** · \`SPX-${hit.spx}\` · **${hit.title}** — \`${slugify(hit.title)}\``,
    )
  }
  lines.push('')
}

// Section headers from source for master list grouping
const sectionRe = /^# (\d+)\. (.+)$/gm
const sections = []
while ((m = sectionRe.exec(t))) {
  sections.push({ index: m.index, num: m[1], name: m[2].trim() })
}

// Assign items to sections by position in source
const itemPositions = []
const itemFind = /-\s+\[\s\]\s+[★☆]+\s+\*\*([^*]+)\*\*/g
while ((m = itemFind.exec(t))) {
  itemPositions.push({ title: m[1].replace(/\s+/g, ' ').trim(), index: m.index })
}

let sectionIdx = 0
let writtenSection = -1
let itemNo = 0
for (const pos of itemPositions) {
  while (
    sectionIdx + 1 < sections.length &&
    pos.index >= sections[sectionIdx + 1].index
  ) {
    sectionIdx += 1
  }
  if (writtenSection !== sectionIdx) {
    writtenSection = sectionIdx
    const s = sections[sectionIdx]
    lines.push(`## ${s.num}. ${s.name}`)
    lines.push('')
  }
  const hit = byTitle.get(pos.title)
  if (!hit) continue
  itemNo += 1
  lines.push(
    `- [ ] **${nf(hit.nf)}** · \`SPX-${hit.spx}\` · **${hit.title}** — ${hit.blurb}`,
  )
}
lines.push('')
lines.push('## Strong software mappings')
lines.push('')
lines.push('- **Content rails → portfolio/catalogue browsing**')
lines.push('- **Hover preview → rich object inspection**')
lines.push('- **Continue Watching → resume workflow**')
lines.push('- **Skip Intro → contextual shortcut**')
lines.push('- **Next Episode → queued auto-advance**')
lines.push('- **Top 10 → priority ranking**')
lines.push('- **Profile picker → workspace switcher**')
lines.push('- **Scrub preview → timeline inspector**')
lines.push('- **Buffering → asynchronous job wait**')
lines.push('- **Details expansion → object drilldown**')
lines.push('- **Download progress → export/build job**')
lines.push('- **Recommendation match → relevance/confidence**')
lines.push('')
lines.push('## Playground technical contract')
lines.push('')
lines.push('- Plain HTML + CSS preferred; tiny vanilla JS only for state/timing/keyboard/pointer/measurement.')
lines.push('- Must run inside `<iframe sandbox="allow-scripts">`. Never add `allow-same-origin`.')
lines.push('- No parent access, storage, navigation, fetch, or external APIs.')
lines.push('- No external images, fonts, video, or audio. Abstract poster placeholders and CSS/inline SVG only.')
lines.push("- Prefer `deps: 'none'`. Freeze dimensions, timings, easing, thresholds, and copy. No runtime randomness.")
lines.push('- Honour both `prefers-reduced-motion` and `data-force-reduced-motion`.')
lines.push('- Register explicitly in `src/specimens/index.ts`. Do not redesign catalogue chrome.')
lines.push('')
lines.push('## Catalogue thesis')
lines.push('')
lines.push(
  'The useful lesson from streaming-style motion is **continuity of intent**: cards expand because interest is clear, neighbours move to make room, controls yield to content, skip actions appear only when contextual, and progress persists for return. Specimens should feel browsable, resumable, previewable, and continuous.',
)
lines.push('')

const out = 'docs/catalogue/netflix-specimen-catalogue.md'
fs.writeFileSync(out, lines.join('\n'))
console.log('wrote', out, 'items', itemNo, 'parsed', items.length)
if (itemNo !== items.length) {
  console.warn('mismatch itemNo vs parsed')
}
