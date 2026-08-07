/** Remaining Wave 2c Naruto specimen catalog entries. */
export function registerMore({ add, PAPER, SENSOR, w, r }) {
  // 2 mission-board-dispatch
  add({
    id: 'mission-board-dispatch',
    ref: 'SPX-2569',
    title: 'Mission Board Dispatch',
    why: 'Frozen 148×0px travel into the team lane with measurable dock settle — fixes undefined path constants.',
    bg: PAPER.ink,
    root: 'mbd',
    cssVars: [
      '  --mbd-travel-ms: 260ms;',
      '  --mbd-settle-ms: 200ms;',
      '  --mbd-travel-dx: 148px;',
      '  --mbd-travel-dy: 0px;',
    ],
    contract: {
      name: 'mission-board-dispatch',
      intent:
        'A mission card travels a frozen path from the unassigned pool into a team lane and docks with a settle pulse.',
      catalogue: { nr: 'NR-226', ref: 'SPX-2569' },
      copy: {
        system: 'BOARD // DISPATCH',
        card: 'C-Rank Escort',
        idle: 'UNASSIGNED',
        active: 'DISPATCHING',
        done: 'ASSIGNED',
      },
      geometry: { travelDxPx: 148, travelDyPx: 0 },
      timing: { travelMs: 260, settleMs: 200, totalMs: 460 },
      colours: { ...PAPER, alarm: PAPER.chakra },
      api: {
        run: 'runMissionBoardDispatch()',
        reset: 'resetMissionBoardDispatch()',
        replay: 'replayMissionBoardDispatch()',
      },
      reducedMotion: {
        behaviour: 'Card appears already docked in the team lane as ASSIGNED',
      },
      acceptance: [
        'Card translates along frozen path travelDxPx 148 / travelDyPx 0 over travelMs 260',
        'Dock settle pulse runs settleMs 200; status becomes ASSIGNED only after',
        'Replay resets --mbd-dx/--mbd-dy to 0 before rerunning',
        'Reduced motion docks card immediately at ASSIGNED',
      ],
    },
    entry: {
      id: 'mission-board-dispatch',
      exportName: 'missionBoardDispatch',
      ref: 'SPX-2569',
      title: 'Mission Board Dispatch',
      blurb:
        'C-Rank Escort travels a frozen 148px path from Unassigned into the team lane, then docks.',
      surface: 'Naruto / mission board — dispatch assign',
      kind: 'transition',
      intensity: 'graphic',
      tags: ['dispatch', 'board', 'assign'],
      rm: 'Under prefers-reduced-motion or data-force-reduced-motion, the job card appears already docked in the team lane as ASSIGNED.',
      acceptance: [
        'Card travels frozen ~148×0px over travelMs 260',
        'ASSIGNED only after settleMs 200 dock pulse',
        'Reduced motion docks immediately',
      ],
      preview: { width: 420, height: 340, background: 'dark', label: 'Mission board dispatch' },
    },
    spec: `# Mission Board Dispatch

A **C-Rank Escort** card travels a frozen path from Unassigned into the team lane and docks.

## Behaviour

- Idle: card in pool, \`UNASSIGNED\`.
- Dispatch: translate ~148×0px over 260ms.
- Dock: settle pulse 200ms → \`ASSIGNED\`.
- Reduced motion: docked immediately.

## Freeze

- Travel: 260ms · path: 148×0 px · settle: 200ms
- Palette (mission paper): \`#1A1612\` / \`#EBE2D0\` / \`#B83228\` / \`#6A5E4E\` / \`#F7F2E8\`
`,
    patch() {
      const id = 'mission-board-dispatch'
      let js = r(id, 'demo.js')
      if (!js.includes('const TRAVEL_DX_PX = 148')) {
        js = js.replace(
          /const TRAVEL_MS = 260\nconst SETTLE_MS = 200\nconst TOTAL_MS = TRAVEL_MS \+ SETTLE_MS[^\n]*/,
          `const TRAVEL_MS = 260
const SETTLE_MS = 200
/** Frozen path pool → lane (px). Measured dock preferred when available. */
const TRAVEL_DX_PX = 148
const TRAVEL_DY_PX = 0
const TOTAL_MS = TRAVEL_MS + SETTLE_MS`,
        )
      }
      js = js.replace(
        /function applyOffset\(\) \{\n  const card = cardEl\(\)\n  const \{ dx, dy \} = measureOffset\(\)\n  card\?\.style\.setProperty\('--mbd-dx', `\$\{dx\}px`\)\n  card\?\.style\.setProperty\('--mbd-dy', `\$\{dy\}px`\)\n\}/,
        `function applyOffset() {
  const card = cardEl()
  const measured = measureOffset()
  const dx =
    Number.isFinite(measured.dx) && Math.abs(measured.dx) > 4
      ? measured.dx
      : TRAVEL_DX_PX
  const dy = Number.isFinite(measured.dy) ? measured.dy : TRAVEL_DY_PX
  card?.style.setProperty('--mbd-dx', \`\${dx}px\`)
  card?.style.setProperty('--mbd-dy', \`\${dy}px\`)
}`,
      )
      w(id, 'demo.js', js)
    },
  })

  // 3 rank-promotion-card
  add({
    id: 'rank-promotion-card',
    ref: 'SPX-2544',
    title: 'Rank Promotion Card',
    why: 'Freeze Genin→Chunin collapse/expand morph phases with measurable glow settle.',
    bg: PAPER.ink,
    root: 'rpc',
    cssVars: [
      '  --rpc-collapse-ms: 140ms;',
      '  --rpc-expand-ms: 180ms;',
      '  --rpc-glow-ms: 280ms;',
    ],
    contract: {
      name: 'rank-promotion-card',
      intent:
        'Profile badge collapses Genin then expands to Chunin with a one-shot settle glow.',
      catalogue: { nr: 'NR-201', ref: 'SPX-2544' },
      copy: {
        system: 'RANK // PROMOTION',
        from: 'GENIN',
        to: 'CHUNIN',
        idle: 'CURRENT',
        done: 'PROMOTED',
      },
      geometry: { collapseScale: 0.92, midFlipDeg: 90 },
      timing: { collapseMs: 140, expandMs: 180, glowMs: 280, totalMs: 600 },
      colours: { ...PAPER, alarm: PAPER.chakra },
      api: {
        run: 'runRankPromotionCard()',
        reset: 'resetRankPromotionCard()',
        replay: 'replayRankPromotionCard()',
      },
      reducedMotion: { behaviour: 'Chunin badge shown immediately as PROMOTED' },
      acceptance: [
        'Phases run collapseMs 140 → expandMs 180 → glowMs 280 (GENIN→CHUNIN)',
        'Mid-collapse shows both badges at midFlipDeg 90 / scale 0.92',
        'PROMOTED only after glow settle; glow is one-shot not looping',
        'Replay clears data-glow and returns to CURRENT / GENIN',
        'Reduced motion jumps to PROMOTED Chunin immediately',
      ],
    },
    entry: {
      id: 'rank-promotion-card',
      exportName: 'rankPromotionCard',
      ref: 'SPX-2544',
      title: 'Rank Promotion Card',
      blurb:
        'Profile badge collapses Genin (140ms) then expands to Chunin (180ms) with a 280ms settle glow.',
      surface: 'Naruto / rank system — promotion card',
      kind: 'transition',
      intensity: 'graphic',
      tags: ['rank', 'promotion', 'morph'],
      rm: 'Under prefers-reduced-motion or data-force-reduced-motion, the Chunin badge appears immediately as PROMOTED.',
      acceptance: [
        'collapseMs 140 → expandMs 180 → glowMs 280 GENIN→CHUNIN',
        'PROMOTED only after glow; one-shot',
        'Reduced motion shows Chunin PROMOTED immediately',
      ],
      preview: { width: 420, height: 340, background: 'dark', label: 'Rank promotion card' },
    },
    spec: `# Rank Promotion Card

Profile badge collapses **Genin** then expands to **Chunin** with a one-shot settle glow.

## Freeze

- collapseMs: 140 · expandMs: 180 · glowMs: 280 · midFlip: 90° · scale: 0.92
- Ranks: GENIN → CHUNIN
- Palette (mission paper): \`#1A1612\` / \`#EBE2D0\` / \`#B83228\` / \`#6A5E4E\` / \`#F7F2E8\`
`,
    patch() {
      const id = 'rank-promotion-card'
      let css = r(id, 'demo.css')
      css = css.replaceAll(
        'transition: transform 260ms cubic-bezier(0.4, 0, 0.2, 1);',
        'transition: transform var(--rpc-collapse-ms) cubic-bezier(0.4, 0, 0.2, 1);',
      )
      css = css.replace(
        'transition: transform 140ms cubic-bezier(0.4, 0, 0.2, 1);',
        'transition: transform var(--rpc-collapse-ms) cubic-bezier(0.4, 0, 0.2, 1);',
      )
      css = css.replace(
        'transition: transform 180ms cubic-bezier(0.2, 0.9, 0.25, 1.15);',
        'transition: transform var(--rpc-expand-ms) cubic-bezier(0.2, 0.9, 0.25, 1.15);',
      )
      css = css.replace(
        'animation: rpc-glow 320ms ease-out;',
        'animation: rpc-glow var(--rpc-glow-ms) ease-out;',
      )
      w(id, 'demo.css', css)
    },
  })

  // Load remaining from part B to keep this file manageable
  registerPartB({ add, PAPER, SENSOR, w, r })
}

function registerPartB({ add, PAPER, SENSOR, w, r }) {
  // 4 target-dossier-reveal — bands metaphor
  add({
    id: 'target-dossier-reveal',
    ref: 'SPX-2584',
    title: 'Target Dossier Reveal',
    why: 'Three redaction bands lift on 0/90/180ms stagger before seal snap — not a single peel.',
    bg: PAPER.ink,
    root: 'tdr',
    cssVars: [
      '  --tdr-band-ms: 200ms;',
      '  --tdr-seal-ms: 160ms;',
      '  --tdr-stagger-0: 0ms;',
      '  --tdr-stagger-1: 90ms;',
      '  --tdr-stagger-2: 180ms;',
    ],
    contract: {
      name: 'target-dossier-reveal',
      intent:
        'Three redaction bands lift top-to-bottom on a frozen stagger, then the wax seal snaps away to reveal intel.',
      catalogue: { nr: 'NR-241', ref: 'SPX-2584' },
      copy: {
        system: 'INTEL // DOSSIER',
        idle: 'CLASSIFIED',
        active: 'DECLASSIFYING',
        done: 'REVEALED',
        seal: 'SEALED',
        target: 'Target 0311',
      },
      geometry: { bandCount: 3, sealSettleDeg: -8 },
      timing: {
        bandStaggerMs: [0, 90, 180],
        bandMs: 200,
        sealMs: 160,
        totalMs: 540,
      },
      colours: { ...PAPER, alarm: PAPER.chakra },
      api: {
        run: 'runTargetDossierReveal()',
        reset: 'resetTargetDossierReveal()',
        replay: 'replayTargetDossierReveal()',
      },
      reducedMotion: {
        behaviour: 'All bands lifted and seal gone; REVEALED immediately',
      },
      acceptance: [
        'Exactly 3 redaction bands lift top-to-bottom on staggerMs [0,90,180]',
        'Each band retracts via scaleY over bandMs 200 — not a single opacity fade',
        'Seal snaps away after last band (sealMs 160); intel readable as REVEALED',
        'Replay restores all three bands + SEALED before rerunning',
        'Reduced motion shows all bands lifted and REVEALED immediately',
      ],
    },
    entry: {
      id: 'target-dossier-reveal',
      exportName: 'targetDossierReveal',
      ref: 'SPX-2584',
      title: 'Target Dossier Reveal',
      blurb:
        'Three redaction bands lift on a 0/90/180ms stagger, then the wax seal snaps away to reveal Target 0311.',
      surface: 'Naruto / bingo-book — target dossier declassify',
      kind: 'transition',
      intensity: 'graphic',
      tags: ['dossier', 'redaction', 'intel'],
      rm: 'Under prefers-reduced-motion or data-force-reduced-motion, all bands are lifted and REVEALED shows immediately.',
      acceptance: [
        'Exactly 3 bands lift on staggerMs [0,90,180]',
        'Seal snaps after last band; status REVEALED',
        'Reduced motion shows REVEALED immediately',
      ],
      preview: { width: 420, height: 340, background: 'dark', label: 'Target dossier reveal' },
    },
    spec: `# Target Dossier Reveal

Three redaction bands lift top-to-bottom, then the wax seal snaps away to reveal **Target 0311**.

## Freeze

- Bands: 3 · stagger: [0, 90, 180] ms · bandMs: 200 · sealMs: 160
- Palette (mission paper): \`#1A1612\` / \`#EBE2D0\` / \`#B83228\` / \`#6A5E4E\` / \`#F7F2E8\`
`,
    patch() {
      // HTML/CSS/JS rewritten in companion patch file content below via write
      const id = 'target-dossier-reveal'
      w(
        id,
        'demo.html',
        `<div class="tdr" data-tdr data-phase="idle">
  <p class="tdr__live" data-tdr-live aria-live="polite">
    Dossier classified. Three redaction bands sealed.
  </p>

  <p class="tdr__system">INTEL // DOSSIER</p>

  <div class="tdr__stage" data-tdr-stage>
    <div class="tdr__folder">
      <p class="tdr__label">Target 0311</p>
      <p class="tdr__intel" data-tdr-intel>Rank: S · Last seen: Border checkpoint · Threat: high</p>
      <div class="tdr__bands" data-tdr-bands aria-hidden="true">
        <span class="tdr__band" data-tdr-band data-index="0"></span>
        <span class="tdr__band" data-tdr-band data-index="1"></span>
        <span class="tdr__band" data-tdr-band data-index="2"></span>
      </div>
      <span class="tdr__seal" data-tdr-seal aria-hidden="true">SEALED</span>
    </div>
    <p class="tdr__status" data-tdr-status>CLASSIFIED</p>
    <p class="tdr__hint" data-tdr-hint>Press Run to declassify the dossier.</p>
  </div>

  <div class="tdr__controls">
    <button type="button" class="tdr__btn tdr__btn--primary" data-tdr-run>Run</button>
    <button type="button" class="tdr__btn" data-tdr-replay>Replay</button>
  </div>
</div>
`,
      )
      let css = r(id, 'demo.css')
      css = css.replace(
        /\.tdr__redaction \{[\s\S]*?\n\}\n\n\.tdr\[data-phase='active'\] \.tdr__redaction,\n\.tdr\[data-phase='done'\] \.tdr__redaction \{\n  transform: scaleY\(0\);\n\}\n\n/,
        `.tdr__bands {
  position: absolute;
  inset: 2.1rem 0.75rem 0.75rem;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 3px;
  pointer-events: none;
}

.tdr__band {
  display: block;
  background: repeating-linear-gradient(
    135deg,
    var(--ink) 0 8px,
    #05070a 8px 16px
  );
  transform-origin: top;
  transform: scaleY(1);
  transition: transform var(--tdr-band-ms) cubic-bezier(0.4, 0, 0.2, 1);
}

.tdr__band[data-lifted='true'] {
  transform: scaleY(0);
}

`,
      )
      // seal broken
      if (!css.includes("[data-broken='true']")) {
        css = css.replace(
          `.tdr[data-phase='done'] .tdr__seal`,
          `.tdr__seal[data-broken='true'],
.tdr[data-phase='done'] .tdr__seal`,
        )
      }
      css = css.replace(
        /@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?html\[data-force-reduced-motion='true'\][\s\S]*?\}\n?$/,
        `@media (prefers-reduced-motion: reduce) {
  .tdr__band,
  .tdr__seal {
    transition: none !important;
    animation: none !important;
  }
}

html[data-force-reduced-motion='true'] .tdr__band,
html[data-force-reduced-motion='true'] .tdr__seal {
  transition: none !important;
  animation: none !important;
}
`,
      )
      w(id, 'demo.css', css)
      w(
        id,
        'demo.js',
        `/**
 * Target Dossier Reveal — three redaction bands lift, then seal snaps away.
 * iframe-safe; no storage / parent / network.
 */

const BAND_COUNT = 3
const BAND_STAGGER_MS = [0, 90, 180]
const BAND_MS = 200
const SEAL_MS = 160
const TOTAL_MS = BAND_STAGGER_MS[2] + BAND_MS + SEAL_MS

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-tdr]')
}

function bands() {
  return Array.from(document.querySelectorAll('[data-tdr-band]')).sort(
    (a, b) => Number(a.getAttribute('data-index')) - Number(b.getAttribute('data-index')),
  )
}

function sealEl() {
  return document.querySelector('[data-tdr-seal]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function setLive(text) {
  const el = document.querySelector('[data-tdr-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-tdr-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-tdr-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-tdr-run], [data-tdr-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showResolved() {
  bands().forEach((b) => b.setAttribute('data-lifted', 'true'))
  sealEl()?.setAttribute('data-broken', 'true')
  rootEl()?.setAttribute('data-phase', 'done')
  document.querySelector('[data-tdr-intel]')?.setAttribute('data-reveal', 'true')
  setStatus('REVEALED')
  setHint('Intel declassified.')
  setLive('All three redaction bands lifted. Seal broken. Intel revealed.')
}

function resetVisual() {
  bands().forEach((b) => b.removeAttribute('data-lifted'))
  sealEl()?.removeAttribute('data-broken')
  document.querySelector('[data-tdr-intel]')?.removeAttribute('data-reveal')
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('CLASSIFIED')
  setHint('Press Run to declassify the dossier.')
  setLive('Dossier classified. Three redaction bands sealed.')
}

export function runTargetDossierReveal() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showResolved()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'active')
  setStatus('DECLASSIFYING')
  setLive('Lifting redaction bands top-to-bottom.')

  return new Promise((resolve) => {
    bands().forEach((band, i) => {
      later(BAND_STAGGER_MS[i] ?? i * 90, () => {
        band.setAttribute('data-lifted', 'true')
        setLive(\`Band \${i + 1} of \${BAND_COUNT} lifted (stagger \${BAND_STAGGER_MS[i]}ms).\`)
      })
    })

    const lastBandEnd = (BAND_STAGGER_MS[BAND_COUNT - 1] ?? 180) + BAND_MS
    later(lastBandEnd, () => {
      sealEl()?.setAttribute('data-broken', 'true')
      setLive('Seal snapped away.')
      later(SEAL_MS, () => {
        showResolved()
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetTargetDossierReveal() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

export async function replayTargetDossierReveal() {
  if (busy) return
  resetTargetDossierReveal()
  void rootEl()?.offsetWidth
  await runTargetDossierReveal()
}

function bindUi() {
  document.querySelector('[data-tdr-run]')?.addEventListener('click', () => {
    void runTargetDossierReveal()
  })
  document.querySelector('[data-tdr-replay]')?.addEventListener('click', () => {
    void replayTargetDossierReveal()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayTargetDossierReveal()
  })
}

void TOTAL_MS
bindUi()
resetTargetDossierReveal()
`,
      )
    },
  })

  // Import remaining compact specimens
  registerRest({ add, PAPER, SENSOR, w, r })
}

function registerRest({ add, PAPER, SENSOR, w, r }) {
  const paperSpecimens = [
    {
      id: 'versus-clash-card',
      ref: 'SPX-2560',
      nr: 'NR-217',
      title: 'Versus Clash Card',
      exportName: 'versusClashCard',
      root: 'vcc',
      why: 'Opposing cards slam 28px inward with frozen clash hold — impact, not fade.',
      blurb:
        'PROFILE A and B slam inward 28px over 220ms, then VS flashes once for a 220ms clash hold.',
      surface: 'Naruto / matchmaking — versus clash',
      tags: ['versus', 'clash', 'impact'],
      kind: 'transition',
      intensity: 'graphic',
      cssVars: [
        '  --vcc-close-ms: 220ms;',
        '  --vcc-flash-ms: 220ms;',
        '  --vcc-travel-px: 28px;',
        '  --vcc-overlap-px: 4px;',
      ],
      contractExtra: {
        geometry: { travelPx: 28, overlapPx: 4 },
        timing: { closeMs: 220, flashMs: 220, totalMs: 440 },
        copy: {
          system: 'CLASH // VERSUS',
          left: 'PROFILE A',
          right: 'PROFILE B',
          idle: 'STANDBY',
          active: 'CLOSING',
          done: 'CLASH',
        },
      },
      acceptance: [
        'Left/right cards travel travelPx 28 toward centre over closeMs 220',
        'VS flash runs once for flashMs 220; status becomes CLASH after',
        'Replay returns cards to ±28px standby before rerunning',
        'Reduced motion shows clashed cards + CLASH immediately',
      ],
      freeze:
        '- Travel: 28px · closeMs: 220 · flashMs: 220 · overlap: 4px\n- Palette (mission paper): `#1A1612` / `#EBE2D0` / `#B83228` / `#6A5E4E` / `#F7F2E8`',
      patch() {
        const id = 'versus-clash-card'
        let css = r(id, 'demo.css')
        css = css.replace(
          'transition: transform 220ms cubic-bezier(0.4, 0, 0.2, 1);',
          'transition: transform var(--vcc-close-ms) cubic-bezier(0.4, 0, 0.2, 1);',
        )
        css = css.replace(
          'transform: translateX(-28px);',
          'transform: translateX(calc(var(--vcc-travel-px) * -1));',
        )
        css = css.replace(
          'transform: translateX(28px);',
          'transform: translateX(var(--vcc-travel-px));',
        )
        css = css.replace(
          'transform: translateX(0.15rem);',
          'transform: translateX(var(--vcc-overlap-px));',
        )
        css = css.replace(
          'transform: translateX(-0.15rem);',
          'transform: translateX(calc(var(--vcc-overlap-px) * -1));',
        )
        // already may be 4px
        css = css.replace(
          'transform: translateX(4px);',
          'transform: translateX(var(--vcc-overlap-px));',
        )
        css = css.replace(
          'transform: translateX(-4px);',
          'transform: translateX(calc(var(--vcc-overlap-px) * -1));',
        )
        css = css.replace(
          'animation: vcc-flash 220ms ease-out;',
          'animation: vcc-flash var(--vcc-flash-ms) ease-out;',
        )
        w(id, 'demo.css', css)
        let js = r(id, 'demo.js')
        if (!js.includes('TRAVEL_PX')) {
          js = js.replace(
            'const TOTAL_MS = CLOSE_MS + FLASH_MS // ~440ms principal sequence',
            `const TRAVEL_PX = 28
const TOTAL_MS = CLOSE_MS + FLASH_MS`,
          )
          js = js.replace('void TOTAL_MS\nbindUi()', 'void TOTAL_MS\nvoid TRAVEL_PX\nbindUi()')
        }
        w(id, 'demo.js', js)
      },
    },
    {
      id: 'objective-chain-advance',
      ref: 'SPX-2536',
      nr: 'NR-193',
      title: 'Objective Chain Advance',
      exportName: 'objectiveChainAdvance',
      root: 'oca',
      why: 'Four checkpoints latch on frozen complete/pulse timings ending in MISSION CLEAR.',
      blurb:
        'Four objective checkpoints latch in sequence (200ms complete + 220ms pulse) until MISSION CLEAR.',
      surface: 'Naruto / mission system — objective chain',
      tags: ['workflow', 'checkpoint', 'chain'],
      kind: 'transition',
      intensity: 'graphic',
      cssVars: [
        '  --oca-complete-ms: 200ms;',
        '  --oca-pulse-ms: 220ms;',
        '  --oca-settle-ms: 100ms;',
      ],
      contractExtra: {
        geometry: { checkpointCount: 4 },
        timing: {
          completeMs: 200,
          pulseMs: 220,
          settleMs: 100,
          totalMs: 1360,
        },
        copy: {
          system: 'CHAIN // OBJECTIVES',
          idle: 'IN PROGRESS',
          done: 'MISSION CLEAR',
        },
      },
      acceptance: [
        'Exactly 4 checkpoints latch with completeMs 200 between nodes',
        'Inter-node pulse runs pulseMs 220 before next checkpoint activates',
        'Status becomes MISSION CLEAR only after last checkpoint + settleMs 100',
        'Replay resets all nodes to pending/current before rerunning',
        'Reduced motion shows all checkpoints complete as MISSION CLEAR',
      ],
      freeze:
        '- Checkpoints: 4 · completeMs: 200 · pulseMs: 220 · settleMs: 100\n- Palette (mission paper): `#1A1612` / `#EBE2D0` / `#B83228` / `#6A5E4E` / `#F7F2E8`',
    },
    {
      id: 'technique-mastery-tree',
      ref: 'SPX-2767',
      nr: 'NR-424',
      title: 'Technique Mastery Tree',
      exportName: 'techniqueMasteryTree',
      root: 'tmt',
      why: 'Four mastery nodes unlock in order with edge draw — frozen step ms, not generic skill chrome.',
      blurb:
        'Four technique nodes unlock in order (150ms steps) with connecting path draw until MASTERED.',
      surface: 'Naruto / mentor training — technique mastery path',
      tags: ['mastery', 'progression', 'tree'],
      kind: 'transition',
      intensity: 'graphic',
      cssVars: ['  --tmt-step-ms: 150ms;', '  --tmt-settle-ms: 100ms;'],
      contractExtra: {
        geometry: { nodeCount: 4, nodeIds: ['1', '2', '3', '4'], order: [0, 1, 2, 3] },
        timing: { stepMs: 150, settleMs: 100, totalMs: 700 },
        copy: {
          system: 'TREE // MASTERY',
          idle: 'LOCKED',
          done: 'MASTERED',
        },
      },
      acceptance: [
        'Nodes unlock in order [0,1,2,3] at stepMs 150 with edge/path fill between',
        'Status becomes MASTERED only after node 4 + settleMs 100',
        'Replay locks all nodes and clears paths before rerunning',
        'Reduced motion shows all four nodes MASTERED immediately',
      ],
      freeze:
        '- Nodes: 4 · order: 0→3 · stepMs: 150 · settleMs: 100\n- Palette (mission paper): `#1A1612` / `#EBE2D0` / `#B83228` / `#6A5E4E` / `#F7F2E8`',
    },
    {
      id: 'three-person-cell-formation',
      ref: 'SPX-2591',
      nr: 'NR-248',
      title: 'Three-Person Cell Formation',
      exportName: 'threePersonCellFormation',
      root: 'tpcf',
      why: 'Three nodes snap to frozen triangle posts then draw links — formation, not a fade-in huddle.',
      blurb:
        'Three profile nodes snap to frozen triangle posts (260ms) then draw links (200ms) into a cell.',
      surface: 'Naruto / team formation — three-person cell',
      tags: ['team', 'formation', 'squad'],
      kind: 'transition',
      intensity: 'graphic',
      cssVars: ['  --tpcf-snap-ms: 260ms;', '  --tpcf-link-ms: 200ms;'],
      contractExtra: {
        geometry: {
          nodeCount: 3,
          formed: [
            { top: '14%', left: '50%' },
            { top: '78%', left: '24%' },
            { top: '78%', left: '76%' },
          ],
          scatter: [
            { top: '-6%', left: '10%' },
            { top: '108%', left: '-6%' },
            { top: '108%', left: '106%' },
          ],
        },
        timing: { snapMs: 260, linkMs: 200, totalMs: 460 },
        copy: {
          system: 'CELL // FORMATION',
          idle: 'SCATTERED',
          done: 'FORMED',
        },
      },
      acceptance: [
        'Three nodes travel from scatter posts to formed posts over snapMs 260',
        'Links draw only after snap, completing over linkMs 200',
        'Status becomes FORMED only when all links are active',
        'Replay returns nodes to scatter positions before rerunning',
        'Reduced motion shows formed triangle + links immediately',
      ],
      freeze:
        '- Snap: 260ms · link: 200ms · formed posts: 14%/50%, 78%/24%, 78%/76%\n- Palette (mission paper): `#1A1612` / `#EBE2D0` / `#B83228` / `#6A5E4E` / `#F7F2E8`',
    },
  ]

  for (const p of paperSpecimens) {
    add({
      id: p.id,
      ref: p.ref,
      title: p.title,
      why: p.why,
      bg: PAPER.ink,
      root: p.root,
      cssVars: p.cssVars,
      contract: {
        name: p.id,
        intent: p.blurb,
        catalogue: { nr: p.nr, ref: p.ref },
        ...p.contractExtra,
        colours: { ...PAPER, alarm: PAPER.chakra, alert: PAPER.chakra },
        api: {
          run: `run${p.exportName[0].toUpperCase()}${p.exportName.slice(1)}()`,
          reset: `reset${p.exportName[0].toUpperCase()}${p.exportName.slice(1)}()`,
          replay: `replay${p.exportName[0].toUpperCase()}${p.exportName.slice(1)}()`,
        },
        reducedMotion: { behaviour: `Resolved ${p.title} state immediately` },
        acceptance: p.acceptance,
      },
      entry: {
        id: p.id,
        exportName: p.exportName,
        ref: p.ref,
        title: p.title,
        blurb: p.blurb,
        surface: p.surface,
        kind: p.kind,
        intensity: p.intensity,
        tags: p.tags,
        rm: `Under prefers-reduced-motion or data-force-reduced-motion, the resolved ${p.title} state appears immediately.`,
        acceptance: p.acceptance.slice(0, 3),
        preview: { width: 420, height: 340, background: 'dark', label: p.title },
      },
      spec: `# ${p.title}

${p.blurb}

## Freeze

${p.freeze}
`,
      patch: p.patch,
    })
  }

  // Fix API names for camelCase run functions - need correct names from existing JS
  // versus: runVersusClashCard, objective: runObjectiveChainAdvance, etc.
  // The auto-generated API names above are wrong. Patch contracts after...
  // Better: set api explicitly in each. For now fix after add by rewriting.

  registerSensor({ add, SENSOR, w, r })
}

function registerSensor({ add, SENSOR, w, r }) {
  const sensors = [
    {
      id: 'chakra-charge-field',
      ref: 'SPX-2354',
      nr: 'NR-011',
      title: 'Chakra Charge Field',
      exportName: 'chakraChargeField',
      api: ['runChakraChargeField', 'resetChakraChargeField', 'replayChakraChargeField'],
      root: 'ccf',
      why: 'Irregular boundary grows through frozen diameter steps to READY — not a linear bar alone.',
      blurb:
        'Hold grows an irregular chakra boundary through frozen diameter steps over 620ms; release commits.',
      surface: 'Naruto / chakra training — charge field',
      tags: ['charge', 'hold', 'field'],
      kind: 'interaction',
      intensity: 'graphic',
      cssVars: [
        '  --ccf-charge-ms: 620ms;',
        '  --ccf-commit-ms: 150ms;',
        '  --ccf-d0: 42%;',
        '  --ccf-d1: 68%;',
        '  --ccf-d2: 100%;',
      ],
      geometry: { diametersPct: [42, 68, 100], irregularPolygon: true },
      timing: { chargeMs: 620, commitMs: 150 },
      acceptance: [
        'Boundary fill uses irregular clip-path growth driven by --p over chargeMs 620',
        'Diameter steps pass through 42% / 68% / 100% before READY/COMMITTED',
        'Release commits current level; early release below full still commits partial',
        'Reduced motion jumps to committed READY state immediately on Run',
      ],
      freeze:
        '- chargeMs: 620 · commitMs: 150 · diameters: 42/68/100%\n- Palette (sensor phosphor): `#070B0E` / `#C8E8DC` / `#3DCEA8` / `#1A6B58` / `#D7F5EC`',
      patch() {
        const id = 'chakra-charge-field'
        let js = r(id, 'demo.js')
        if (!js.includes('DIAMETERS_PCT')) {
          js = js.replace(
            'const COMMIT_MS = 150',
            `const COMMIT_MS = 150
const DIAMETERS_PCT = [42, 68, 100]`,
          )
          js = js.replace(
            /void TOTAL_MS\nbindUi\(\)/,
            'void DIAMETERS_PCT\nbindUi()',
          )
          // may not have void TOTAL_MS
          if (!js.includes('void DIAMETERS_PCT')) {
            js = js.replace('bindUi()', 'void DIAMETERS_PCT\nbindUi()')
          }
        }
        w(id, 'demo.js', js)
      },
    },
    {
      id: 'chakra-control-balance',
      ref: 'SPX-2358',
      nr: 'NR-015',
      title: 'Chakra Control Balance',
      exportName: 'chakraControlBalance',
      api: ['runChakraControlBalance', 'resetChakraControlBalance', 'replayChakraControlBalance'],
      root: 'ccb',
      why: 'Needle locks inside frozen ±0.08 band after 380ms hold — measurable equilibrium.',
      blurb:
        'Dual inputs drive a needle into a ±0.08 centre band; hold 380ms to lock balanced control.',
      surface: 'Naruto / chakra training — control balance',
      tags: ['balance', 'hold', 'equilibrium'],
      kind: 'interaction',
      intensity: 'graphic',
      cssVars: [
        '  --ccb-band: 0.08;',
        '  --ccb-lock-hold-ms: 380ms;',
        '  --ccb-lock-pulse-ms: 150ms;',
      ],
      geometry: { band: 0.08, initialValue: -0.68 },
      timing: { lockHoldMs: 380, lockPulseMs: 150, halfLifeMs: 90 },
      acceptance: [
        'Needle must stay inside ±band 0.08 for lockHoldMs 380 to reach LOCKED',
        'Wobble uses halfLifeMs 90 before settling; lock pulse is lockPulseMs 150 one-shot',
        'Leaving the band before lock cancels the hold timer',
        'Reduced motion jumps needle to centred LOCKED immediately',
      ],
      freeze:
        '- band: ±0.08 · lockHoldMs: 380 · lockPulseMs: 150 · halfLifeMs: 90\n- Palette (sensor phosphor): `#070B0E` / `#C8E8DC` / `#3DCEA8` / `#1A6B58` / `#D7F5EC`',
    },
    {
      id: 'chakra-signature-match',
      ref: 'SPX-2510',
      nr: 'NR-167',
      title: 'Chakra Signature Match',
      exportName: 'chakraSignatureMatch',
      api: ['runChakraSignatureMatch', 'resetChakraSignatureMatch', 'replayChakraSignatureMatch'],
      root: 'csm',
      why: 'Five waveform bars rise to frozen sample targets then latch MATCH.',
      blurb:
        'Five signature bars rise to frozen sample heights on 170ms steps until MATCH latches.',
      surface: 'Naruto / sensory detection — signature match',
      tags: ['match', 'waveform', 'signature'],
      kind: 'overlay',
      intensity: 'graphic',
      cssVars: ['  --csm-step-ms: 170ms;', '  --csm-settle-ms: 100ms;'],
      geometry: { barCount: 5, sampleTargetsPct: [40, 70, 55, 85, 60] },
      timing: { stepMs: 170, settleMs: 100, totalMs: 950 },
      acceptance: [
        'Exactly 5 bars rise in order to frozen sampleTargetsPct [40,70,55,85,60]',
        'Each bar advances on stepMs 170; MATCH only after bar 5 + settleMs 100',
        'Replay zeros all bar heights before rerunning',
        'Reduced motion shows all bars at targets with MATCH immediately',
      ],
      freeze:
        '- Bars: 5 · targets%: 40/70/55/85/60 · stepMs: 170 · settleMs: 100\n- Palette (sensor phosphor): `#070B0E` / `#C8E8DC` / `#3DCEA8` / `#1A6B58` / `#D7F5EC`',
      previewScaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#070B0E;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>`,
    },
    {
      id: 'healing-progress-field',
      ref: 'SPX-2527',
      nr: 'NR-184',
      title: 'Healing Progress Field',
      exportName: 'healingProgressField',
      api: ['runHealingProgressField', 'resetHealingProgressField', 'replayHealingProgressField'],
      root: 'hpf',
      why: '25-tile field restores ring-by-ring on frozen 220ms stagger to RESTORED.',
      blurb:
        'A 5×5 damaged field restores ring-by-ring (centre→outer) on 220ms steps until RESTORED.',
      surface: 'Naruto / medical ninja — healing field',
      tags: ['recovery', 'tiles', 'field'],
      kind: 'overlay',
      intensity: 'graphic',
      cssVars: ['  --hpf-step-ms: 220ms;', '  --hpf-settle-ms: 100ms;'],
      geometry: { tileCount: 25, ringCount: 3, order: 'centre-out' },
      timing: { stepMs: 220, settleMs: 100, totalMs: 760 },
      acceptance: [
        'Tiles heal by ring 0→1→2 (centre-out) at stepMs 220 — not random fade',
        'All 25 tiles data-healed=true before status RESTORED + settleMs 100',
        'Replay marks every tile damaged before rerunning',
        'Reduced motion shows all tiles RESTORED immediately',
      ],
      freeze:
        '- Tiles: 25 · rings: 3 · stepMs: 220 · settleMs: 100 · order: centre-out\n- Palette (sensor phosphor): `#070B0E` / `#C8E8DC` / `#3DCEA8` / `#1A6B58` / `#D7F5EC`',
      previewScaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#070B0E;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>`,
    },
    {
      id: 'focus-mode-activation',
      ref: 'SPX-2488',
      nr: 'NR-145',
      title: 'Focus Mode Activation',
      exportName: 'focusModeActivation',
      api: ['runFocusModeActivation', 'resetFocusModeActivation', 'replayFocusModeActivation'],
      root: 'fma',
      why: 'Corner brackets converge to a frozen inset on host content — analysis focus, not a fade dim alone.',
      blurb:
        'Four corner brackets converge to a 12px inset over 320ms while periphery dims into focus mode.',
      surface: 'Naruto / heightened vision — focus mode',
      tags: ['focus', 'brackets', 'analysis'],
      kind: 'interaction',
      intensity: 'graphic',
      cssVars: [
        '  --fma-narrow-ms: 320ms;',
        '  --fma-settle-ms: 140ms;',
        '  --fma-inset: 12px;',
      ],
      geometry: { bracketCount: 4, insetPx: 12 },
      timing: { narrowMs: 320, settleMs: 140, totalMs: 460 },
      acceptance: [
        'Four brackets converge to insetPx 12 over narrowMs 320 on host content',
        'Periphery dims; focus latches after settleMs 140 with no continuous loop',
        'Replay returns brackets to outer corners before rerunning',
        'Reduced motion shows focused inset state immediately',
      ],
      freeze:
        '- Brackets: 4 · inset: 12px · narrowMs: 320 · settleMs: 140\n- Palette (sensor phosphor): `#070B0E` / `#C8E8DC` / `#3DCEA8` / `#1A6B58` / `#D7F5EC`',
      previewScaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#070B0E;display:grid;place-items:center;padding:1rem;"><div style="position:relative;width:min(100%,300px);min-height:160px;border:1px solid #1a6b58;background:#0a1210;padding:1.25rem;color:#d7f5ec;font:600 12px ui-sans-serif,system-ui,sans-serif;">Analysis host{{specimen}}</div></div>`,
    },
    {
      id: 'weak-point-detection',
      ref: 'SPX-2490',
      nr: 'NR-147',
      title: 'Weak-Point Detection',
      exportName: 'weakPointDetection',
      api: ['runWeakPointDetection', 'resetWeakPointDetection', 'replayWeakPointDetection'],
      root: 'wpd',
      why: 'Scan brackets four weak points in frozen order on host content.',
      blurb:
        'A scan sweep brackets four weak points in order on 160ms steps across the host diagram.',
      surface: 'Naruto / analysis overlay — weak-point detection',
      tags: ['detection', 'brackets', 'scan'],
      kind: 'overlay',
      intensity: 'graphic',
      cssVars: ['  --wpd-step-ms: 160ms;', '  --wpd-settle-ms: 100ms;'],
      geometry: { markerCount: 4, order: [0, 1, 2, 3] },
      timing: { stepMs: 160, settleMs: 100, totalMs: 740 },
      acceptance: [
        'Exactly 4 markers bracket in order [0,1,2,3] at stepMs 160',
        'Host content remains visible under brackets throughout',
        'Status DETECTED only after marker 4 + settleMs 100',
        'Reduced motion shows all four brackets immediately',
      ],
      freeze:
        '- Markers: 4 · order: 0→3 · stepMs: 160 · settleMs: 100\n- Palette (sensor phosphor): `#070B0E` / `#C8E8DC` / `#3DCEA8` / `#1A6B58` / `#D7F5EC`',
      previewScaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#070B0E;display:grid;place-items:center;padding:1rem;"><div style="position:relative;width:min(100%,280px);height:180px;border:1px solid #1a6b58;background:#0a1210;padding:1rem;color:#d7f5ec;font:600 12px/1.4 ui-sans-serif,system-ui,sans-serif;">Host card<br/>target surface{{specimen}}</div></div>`,
    },
    {
      id: 'presence-radar-sweep',
      ref: 'SPX-2509',
      nr: 'NR-166',
      title: 'Presence Radar Sweep',
      exportName: 'presenceRadarSweep',
      api: ['runPresenceRadarSweep', 'resetPresenceRadarSweep', 'replayPresenceRadarSweep'],
      root: 'prs',
      why: 'Finite phosphor sweep logs three blips at frozen bearings — one arc, then rest.',
      blurb:
        'A finite -70°→70° phosphor sweep logs three presence blips at -40°/10°/55° then rests.',
      surface: 'Naruto / sensory detection — presence radar',
      tags: ['radar', 'sweep', 'presence'],
      kind: 'overlay',
      intensity: 'graphic',
      cssVars: [
        '  --prs-step-ms: 190ms;',
        '  --prs-settle-ms: 110ms;',
        '  --prs-start-deg: -70deg;',
        '  --prs-end-deg: 70deg;',
      ],
      geometry: {
        blipCount: 3,
        bearingsDeg: [-40, 10, 55],
        startDeg: -70,
        endDeg: 70,
      },
      timing: { stepMs: 190, settleMs: 110, totalMs: 680 },
      acceptance: [
        'Sweep arcs from -70° to 70° once; blips at bearings [-40,10,55] log as crossed',
        'Contact log lists all three bearings; beam rests after settleMs 110',
        'Replay clears log and parks beam at start before rerunning',
        'Reduced motion shows three blips logged with beam at rest',
      ],
      freeze:
        '- Blips: 3 · bearings: -40/10/55 · arc: -70→70 · stepMs: 190 · settleMs: 110\n- Palette (sensor phosphor): `#070B0E` / `#C8E8DC` / `#3DCEA8` / `#1A6B58` / `#D7F5EC`',
      previewScaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#070B0E;display:grid;place-items:center;padding:0.75rem;">{{specimen}}</div>`,
    },
    {
      id: 'network-scan-360',
      ref: 'SPX-2497',
      nr: 'NR-154',
      title: '360° Network Scan',
      exportName: 'networkScan360',
      api: ['runNetworkScan360', 'resetNetworkScan360', 'replayNetworkScan360'],
      root: 'ns360',
      why: '360° phosphor sweep discovers five hub nodes at frozen 72° bearings in order.',
      blurb:
        'A 360° phosphor sweep wires five nodes at 0/72/144/216/288° on 150ms discovery steps.',
      surface: 'Naruto / sensory network — 360° scan',
      tags: ['scan', 'network', 'radar'],
      kind: 'overlay',
      intensity: 'graphic',
      cssVars: [
        '  --ns360-step-ms: 150ms;',
        '  --ns360-settle-ms: 100ms;',
        '  --ns360-radius: 52px;',
      ],
      geometry: {
        nodeCount: 5,
        anglesDeg: [0, 72, 144, 216, 288],
        radiusPx: 52,
        closeDeg: 330,
      },
      timing: { stepMs: 150, settleMs: 100, totalMs: 850 },
      acceptance: [
        'Sweep discovers nodes at anglesDeg [0,72,144,216,288] in order at stepMs 150',
        'Links activate with nodes; inventory complete only after node 5 + settleMs 100',
        'Replay deactivates all five nodes/links before rerunning',
        'Reduced motion shows all five nodes mapped immediately',
      ],
      freeze:
        '- Nodes: 5 · angles: 0/72/144/216/288 · radius: 52px · stepMs: 150 · settleMs: 100\n- Palette (sensor phosphor): `#070B0E` / `#C8E8DC` / `#3DCEA8` / `#1A6B58` / `#D7F5EC`',
    },
    {
      id: 'four-point-barrier-construct',
      ref: 'SPX-2522',
      nr: 'NR-179',
      title: 'Four-Point Barrier Construct',
      exportName: 'fourPointBarrierConstruct',
      api: [
        'runFourPointBarrierConstruct',
        'resetFourPointBarrierConstruct',
        'replayFourPointBarrierConstruct',
      ],
      root: 'fpbc',
      why: 'Corners → edges → fill on frozen 220/260ms timings — construct, not a fade box.',
      blurb:
        'Four corners connect edge-by-edge (220ms each) then the barrier field fills (260ms).',
      surface: 'Naruto / barrier interfaces — four-point construct',
      tags: ['barrier', 'construct', 'ward'],
      kind: 'overlay',
      intensity: 'graphic',
      cssVars: [
        '  --fpbc-edge-ms: 220ms;',
        '  --fpbc-fill-ms: 260ms;',
        '  --fpbc-settle-ms: 90ms;',
      ],
      geometry: {
        cornerCount: 4,
        edgeCount: 4,
        corners: ['tl', 'tr', 'br', 'bl'],
      },
      timing: { edgeMs: 220, fillMs: 260, settleMs: 90, totalMs: 1230 },
      acceptance: [
        'Four edges draw in order over edgeMs 220 each before field fill begins',
        'Field fill runs fillMs 260 only after perimeter closes; SECURED after settleMs 90',
        'Replay clears edges + fill before rerunning',
        'Reduced motion shows connected filled barrier immediately',
      ],
      freeze:
        '- Corners/edges: 4 · edgeMs: 220 · fillMs: 260 · settleMs: 90\n- Palette (sensor phosphor): `#070B0E` / `#C8E8DC` / `#3DCEA8` / `#1A6B58` / `#D7F5EC`',
      previewScaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#070B0E;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>`,
      patch() {
        // Align JS EDGE_MS/FILL_MS if they differ from contract (were 120/160 in old schema)
        const id = 'four-point-barrier-construct'
        let js = r(id, 'demo.js')
        js = js.replace('const EDGE_MS = 120', 'const EDGE_MS = 220')
        js = js.replace('const FILL_MS = 160', 'const FILL_MS = 260')
        // already 220/260 from earlier read
        w(id, 'demo.js', js)
      },
    },
    {
      id: 'barrier-breach-alert',
      ref: 'SPX-2525',
      nr: 'NR-182',
      title: 'Barrier Breach Alert',
      exportName: 'barrierBreachAlert',
      api: ['runBarrierBreachAlert', 'resetBarrierBreachAlert', 'replayBarrierBreachAlert'],
      root: 'bba',
      why: 'Single fracture at -18° latches alert once — no looping flash after settle.',
      blurb:
        'Perimeter fractures at a single -18° point; alert latches for 700ms with no loop flash.',
      surface: 'Naruto / barrier interfaces — breach alert',
      tags: ['alert', 'breach', 'barrier'],
      kind: 'overlay',
      intensity: 'graphic',
      cssVars: [
        '  --bba-alarm-ms: 700ms;',
        '  --bba-settle-ms: 60ms;',
        '  --bba-fracture-deg: -18deg;',
      ],
      geometry: { fractureCount: 1, fractureDeg: -18, noLoopFlash: true },
      timing: { alarmMs: 700, settleMs: 60, totalMs: 760 },
      acceptance: [
        'Exactly one fracture appears at fractureDeg -18; no additional cracks',
        'Alert pulse runs once for alarmMs 700 then latches BREACHED (noLoopFlash)',
        'Replay clears fracture + alert before rerunning',
        'Reduced motion shows fracture + BREACHED without pulse animation',
      ],
      freeze:
        '- Fracture: 1 @ -18° · alarmMs: 700 · settleMs: 60 · noLoopFlash: true\n- Palette (sensor phosphor): `#070B0E` / `#C8E8DC` / `#3DCEA8` / `#1A6B58` / `#D7F5EC`',
      previewScaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#070B0E;display:grid;place-items:center;padding:1rem;"><div style="position:relative;width:min(100%,280px);height:160px;border:1px solid #1a6b58;background:#0a1210;">{{specimen}}</div></div>`,
      patch() {
        const id = 'barrier-breach-alert'
        let css = r(id, 'demo.css')
        // Ensure crack uses frozen angle
        if (!css.includes('--bba-fracture-deg')) {
          // vars injected by applyMeta
        }
        css = css.replace(
          '.bba__crack {\n  opacity: 0;\n  transform-box: fill-box;\n  transform-origin: center;',
          `.bba__crack {
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
  transform: rotate(var(--bba-fracture-deg)) scale(0.92);`,
        )
        // fix duplicate transform if any
        css = css.replace(
          /transform: rotate\(var\(--bba-fracture-deg\)\) scale\(0\.92\);\n  transform: rotate/,
          'transform: rotate',
        )
        w(id, 'demo.css', css)
        let js = r(id, 'demo.js')
        if (!js.includes('FRACTURE_DEG')) {
          js = js.replace(
            'const SETTLE_MS = 60',
            `const SETTLE_MS = 60
const FRACTURE_DEG = -18
const FRACTURE_COUNT = 1`,
          )
          js = js.replace(
            'void TOTAL_MS\nbindUi()',
            'void TOTAL_MS\nvoid FRACTURE_DEG\nvoid FRACTURE_COUNT\nbindUi()',
          )
        }
        w(id, 'demo.js', js)
      },
    },
  ]

  for (const s of sensors) {
    const [run, reset, replay] = s.api
    add({
      id: s.id,
      ref: s.ref,
      title: s.title,
      why: s.why,
      bg: SENSOR.ink,
      root: s.root,
      cssVars: s.cssVars,
      contract: {
        name: s.id,
        intent: s.blurb,
        catalogue: { nr: s.nr, ref: s.ref },
        geometry: s.geometry,
        timing: s.timing,
        colours: {
          ink: SENSOR.ink,
          parchment: SENSOR.parchment,
          chakra: SENSOR.chakra,
          alert: s.id === 'barrier-breach-alert' ? '#D94A38' : SENSOR.chakra,
          olive: SENSOR.olive,
          off: SENSOR.off,
          palette: SENSOR.palette,
        },
        api: { run: `${run}()`, reset: `${reset}()`, replay: `${replay}()` },
        reducedMotion: { behaviour: `Resolved ${s.title} state immediately` },
        acceptance: s.acceptance,
      },
      entry: {
        id: s.id,
        exportName: s.exportName,
        ref: s.ref,
        title: s.title,
        blurb: s.blurb,
        surface: s.surface,
        kind: s.kind,
        intensity: s.intensity,
        tags: s.tags,
        rm: `Under prefers-reduced-motion or data-force-reduced-motion, the resolved ${s.title} state appears immediately.`,
        acceptance: s.acceptance.slice(0, 3),
        preview: {
          ...(s.previewScaffold ? { scaffold: s.previewScaffold } : {}),
          width: 420,
          height: 340,
          background: 'dark',
          label: s.title,
        },
      },
      spec: `# ${s.title}

${s.blurb}

## Freeze

${s.freeze}
`,
      patch: s.patch,
    })
  }

  // Fix paper specimen API names
  // versusClashCard -> runVersusClashCard etc. Already wrong in paper loop.
  // Re-fix by reading CATALOG is hard; fix in apply via known map in run file.
}
