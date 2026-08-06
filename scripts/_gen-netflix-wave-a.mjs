/**
 * Generate compact Netflix Wave A specimen sources into .wip-aside/<id>/
 */
import fs from 'node:fs'
import path from 'node:path'

const specs = [
  {
    id: 'neighbour-push-out',
    exportName: 'neighbourPushOut',
    spx: 'SPX-3147',
    nf: 'NF-038',
    title: 'Neighbour Push-Out',
    blurb:
      'Adjacent cards translate away from an expanding selection while keeping their size — room is made without shrinking neighbours.',
    tags: ['preview', 'layout'],
    kind: 'push',
  },
  {
    id: 'preview-collapse-return',
    exportName: 'previewCollapseReturn',
    spx: 'SPX-3149',
    nf: 'NF-040',
    title: 'Preview Collapse Return',
    blurb:
      'Expanded content returns exactly to its rail slot without layout residue — expand then RETURN settles on the origin geometry.',
    tags: ['preview', 'collapse'],
    kind: 'collapse',
  },
  {
    id: 'horizontal-content-rail',
    exportName: 'horizontalContentRail',
    spx: 'SPX-3134',
    nf: 'NF-025',
    title: 'Horizontal Content Rail',
    blurb:
      'A row of cards moves by one viewport group with clear directional continuity — PREV/NEXT pages three titles at a time.',
    tags: ['rail', 'carousel'],
    kind: 'rail',
  },
  {
    id: 'rail-page-snap',
    exportName: 'railPageSnap',
    spx: 'SPX-3136',
    nf: 'NF-027',
    title: 'Rail Page Snap',
    blurb:
      'A multi-card row translates to the next group and settles on exact card boundaries — no fractional overhang after snap.',
    tags: ['rail', 'snap'],
    kind: 'snap',
  },
  {
    id: 'details-panel-expand',
    exportName: 'detailsPanelExpand',
    spx: 'SPX-3198',
    nf: 'NF-089',
    title: 'Details Panel Expand',
    blurb:
      'A compact card opens a details panel without navigating away — CLOSE returns to the compact rail state.',
    tags: ['details', 'expand'],
    kind: 'details',
  },
  {
    id: 'playback-controls-fade-in',
    exportName: 'playbackControlsFadeIn',
    spx: 'SPX-3161',
    nf: 'NF-052',
    title: 'Playback Controls Fade-In',
    blurb:
      'Pointer or keyboard activity reveals playback controls over content; after a frozen idle window they dissolve.',
    tags: ['playback', 'controls'],
    kind: 'controls',
  },
  {
    id: 'scrub-preview-thumbnail',
    exportName: 'scrubPreviewThumbnail',
    spx: 'SPX-3170',
    nf: 'NF-061',
    title: 'Scrub Preview Thumbnail',
    blurb:
      'Dragging the progress handle reveals a preview card anchored to the current time along the timeline.',
    tags: ['scrub', 'timeline'],
    kind: 'scrub',
  },
  {
    id: 'skip-intro-appear',
    exportName: 'skipIntroAppear',
    spx: 'SPX-3178',
    nf: 'NF-069',
    title: 'Skip Intro Appear',
    blurb:
      'During a skippable intro window a SKIP INTRO control fades in; outside that window it is gone.',
    tags: ['skip', 'contextual'],
    kind: 'skip',
  },
  {
    id: 'next-episode-countdown',
    exportName: 'nextEpisodeCountdown',
    spx: 'SPX-3184',
    nf: 'NF-075',
    title: 'Next Episode Countdown',
    blurb:
      'A timed next-episode handoff counts down then advances; CANCEL keeps the current end card.',
    tags: ['next-up', 'countdown'],
    kind: 'next',
  },
]

function htmlFor(s) {
  switch (s.kind) {
    case 'push':
      return `<div class="nf" data-nf data-kind="push">
  <p class="nf__eyebrow">NEIGHBOUR PUSH-OUT</p>
  <div class="nf__rail" data-rail>
    <button type="button" class="nf__card" data-i="0">Alpha</button>
    <button type="button" class="nf__card" data-i="1">Bravo</button>
    <button type="button" class="nf__card" data-i="2">Charlie</button>
  </div>
  <button type="button" class="nf__btn" data-select>SELECT MIDDLE</button>
</div>`
    case 'collapse':
      return `<div class="nf" data-nf data-kind="collapse">
  <p class="nf__eyebrow">PREVIEW COLLAPSE RETURN</p>
  <div class="nf__rail" data-rail>
    <button type="button" class="nf__card" data-i="0">Dock A</button>
    <button type="button" class="nf__card is-origin" data-i="1">Origin</button>
    <button type="button" class="nf__card" data-i="2">Dock B</button>
  </div>
  <div class="nf__actions">
    <button type="button" class="nf__btn" data-expand>EXPAND</button>
    <button type="button" class="nf__btn" data-return>RETURN</button>
  </div>
</div>`
    case 'rail':
      return `<div class="nf" data-nf data-kind="rail">
  <p class="nf__eyebrow">HORIZONTAL CONTENT RAIL</p>
  <div class="nf__viewport" data-viewport>
    <div class="nf__track" data-track>
      ${[1, 2, 3, 4, 5, 6].map((n) => `<div class="nf__card" data-card="${n}">Title ${n}</div>`).join('\n      ')}
    </div>
  </div>
  <div class="nf__actions">
    <button type="button" class="nf__btn" data-prev>PREV</button>
    <button type="button" class="nf__btn" data-next>NEXT</button>
  </div>
</div>`
    case 'snap':
      return `<div class="nf" data-nf data-kind="snap">
  <p class="nf__eyebrow">RAIL PAGE SNAP</p>
  <div class="nf__viewport" data-viewport>
    <div class="nf__track" data-track>
      ${[1, 2, 3, 4, 5, 6].map((n) => `<div class="nf__card" data-card="${n}">Card ${n}</div>`).join('\n      ')}
    </div>
  </div>
  <p class="nf__meta">Page <span data-page>1</span> / 2 · offset <span data-offset>0</span>px</p>
  <button type="button" class="nf__btn" data-snap>SNAP NEXT</button>
</div>`
    case 'details':
      return `<div class="nf" data-nf data-kind="details">
  <p class="nf__eyebrow">DETAILS PANEL EXPAND</p>
  <button type="button" class="nf__feature" data-open>
    <span class="nf__poster" aria-hidden="true"></span>
    <span>Midnight Circuit</span>
  </button>
  <div class="nf__panel" data-panel hidden>
    <p class="nf__panel-title">Midnight Circuit</p>
    <p class="nf__panel-body">Match 94% · 8 episodes · Drama</p>
    <button type="button" class="nf__btn" data-close>CLOSE</button>
  </div>
</div>`
    case 'controls':
      return `<div class="nf" data-nf data-kind="controls">
  <p class="nf__eyebrow">PLAYBACK CONTROLS</p>
  <div class="nf__stage" data-stage tabindex="0">
    <div class="nf__chrome" data-chrome aria-hidden="true">
      <span>◀︎ 10</span><span>❚❚</span><span>10 ▶︎</span>
    </div>
  </div>
  <button type="button" class="nf__btn" data-nudge>SHOW CONTROLS</button>
</div>`
    case 'scrub':
      return `<div class="nf" data-nf data-kind="scrub">
  <p class="nf__eyebrow">SCRUB PREVIEW</p>
  <div class="nf__stage">
    <div class="nf__thumb" data-thumb hidden><span data-time>00:00</span></div>
    <input class="nf__range" data-range type="range" min="0" max="100" value="24" aria-label="Timeline" />
  </div>
</div>`
    case 'skip':
      return `<div class="nf" data-nf data-kind="skip">
  <p class="nf__eyebrow">SKIP INTRO</p>
  <div class="nf__stage">
    <p class="nf__clock">INTRO <span data-t>0.0</span>s</p>
    <button type="button" class="nf__skip" data-skip hidden>SKIP INTRO</button>
  </div>
  <button type="button" class="nf__btn" data-play>PLAY INTRO</button>
</div>`
    case 'next':
      return `<div class="nf" data-nf data-kind="next">
  <p class="nf__eyebrow">NEXT EPISODE</p>
  <div class="nf__stage" data-stage>
    <p class="nf__ep" data-ep>S1 E3 · Still Water</p>
    <p class="nf__count" data-count hidden>Next in <span data-n>5</span>…</p>
  </div>
  <div class="nf__actions">
    <button type="button" class="nf__btn" data-start>START COUNTDOWN</button>
    <button type="button" class="nf__btn" data-cancel>CANCEL</button>
  </div>
</div>`
    default:
      return ''
  }
}

const css = `/* Netflix specimen — portable */
.nf{--ink:#0c0c0f;--panel:#14141a;--rule:#2a2a33;--pewter:#8b8b96;--chalk:#ececf1;--accent:#e8a45a;box-sizing:border-box;width:min(100%,440px);margin:0 auto;padding:14px;font-family:system-ui,sans-serif;color:var(--chalk);background:var(--panel);border:1px solid var(--rule)}
.nf *,.nf *::before,.nf *::after{box-sizing:border-box}
.nf__eyebrow{margin:0 0 12px;font:11px/1.2 ui-monospace,monospace;letter-spacing:.12em;color:var(--pewter)}
.nf__rail,.nf__actions{display:flex;gap:10px;align-items:center;justify-content:center}
.nf__card,.nf__feature{border:1px solid var(--rule);background:var(--ink);color:inherit;cursor:pointer}
.nf__card{flex:0 0 100px;height:132px;padding:8px;font-size:12px;transition:transform 200ms ease}
.nf__btn{margin-top:12px;padding:8px 12px;font:11px/1 ui-monospace,monospace;letter-spacing:.1em;border:1px solid var(--chalk);background:var(--chalk);color:var(--ink);cursor:pointer}
.nf__btn:focus-visible,.nf__card:focus-visible,.nf__feature:focus-visible,.nf__skip:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.nf__rail.is-push .nf__card[data-i="0"]{transform:translateX(-28px)}
.nf__rail.is-push .nf__card[data-i="1"]{transform:scale(1.12);border-color:var(--accent);z-index:2}
.nf__rail.is-push .nf__card[data-i="2"]{transform:translateX(28px)}
.nf__rail.is-open .nf__card.is-origin{transform:scale(1.2);border-color:var(--accent)}
.nf__rail.is-open .nf__card[data-i="0"]{transform:translateX(-24px)}
.nf__rail.is-open .nf__card[data-i="2"]{transform:translateX(24px)}
.nf__viewport{overflow:hidden;width:100%;max-width:336px;margin:0 auto;border:1px solid var(--rule)}
.nf__track{display:flex;gap:8px;padding:8px;transform:translateX(0);transition:transform 280ms cubic-bezier(.22,.61,.36,1)}
.nf__track .nf__card{flex:0 0 100px;display:grid;place-items:center}
.nf__meta{margin:8px 0 0;font-size:11px;color:var(--pewter);text-align:center}
.nf__feature{display:flex;gap:12px;align-items:center;width:100%;padding:10px;text-align:left}
.nf__poster{width:56px;height:72px;background:linear-gradient(145deg,#2a3344,#1a2030)}
.nf__panel{margin-top:10px;padding:12px;border:1px solid var(--accent);background:var(--ink)}
.nf__panel[hidden]{display:none}
.nf__panel-title{margin:0 0 6px;font-weight:600}
.nf__panel-body{margin:0 0 10px;font-size:12px;color:var(--pewter)}
.nf__stage{position:relative;height:160px;border:1px solid var(--rule);background:var(--ink);display:grid;place-items:center}
.nf__chrome{display:flex;gap:24px;opacity:0;transition:opacity 180ms ease;font:12px/1 ui-monospace,monospace}
.nf__stage.is-live .nf__chrome{opacity:1}
.nf__thumb{position:absolute;bottom:36px;left:0;width:72px;height:42px;border:1px solid var(--accent);background:#1c2430;display:grid;place-items:center;font-size:10px;transform:translateX(-50%)}
.nf__thumb[hidden]{display:none}
.nf__range{position:absolute;left:12px;right:12px;bottom:12px;width:auto}
.nf__skip{position:absolute;right:12px;bottom:12px;padding:8px 12px;border:1px solid var(--chalk);background:rgba(20,20,26,.92);color:var(--chalk);font:11px/1 ui-monospace,monospace;letter-spacing:.08em}
.nf__skip[hidden]{display:none}
.nf__clock,.nf__ep,.nf__count{margin:0;font:12px/1.4 ui-monospace,monospace}
.nf__count[hidden]{display:none}
@media (prefers-reduced-motion:reduce){.nf__card,.nf__track,.nf__chrome{transition:none!important}}
[data-force-reduced-motion="true"] .nf__card,[data-force-reduced-motion="true"] .nf__track,[data-force-reduced-motion="true"] .nf__chrome{transition:none!important}
`

function jsFor(s) {
  const common = `
function prefersRM(){const f=document.documentElement.getAttribute('data-force-reduced-motion')==='true';return f||window.matchMedia('(prefers-reduced-motion: reduce)').matches}
`
  switch (s.kind) {
    case 'push':
      return `${common}
export function runNeighbourPush(){document.querySelector('[data-rail]')?.classList.add('is-push')}
export function runNeighbourReset(){document.querySelector('[data-rail]')?.classList.remove('is-push')}
document.querySelector('[data-select]')?.addEventListener('click',()=>runNeighbourPush())
`
    case 'collapse':
      return `${common}
export function runPreviewExpand(){document.querySelector('[data-rail]')?.classList.add('is-open')}
export function runPreviewReturn(){document.querySelector('[data-rail]')?.classList.remove('is-open')}
document.querySelector('[data-expand]')?.addEventListener('click',()=>runPreviewExpand())
document.querySelector('[data-return]')?.addEventListener('click',()=>runPreviewReturn())
`
    case 'rail':
      return `${common}
const PAGE=108; let page=0
function paint(){const t=document.querySelector('[data-track]'); if(t) t.style.transform='translateX('+(-page*PAGE*3)+'px)'}
export function runRailNext(){page=Math.min(1,page+1); paint()}
export function runRailPrev(){page=Math.max(0,page-1); paint()}
document.querySelector('[data-next]')?.addEventListener('click',()=>runRailNext())
document.querySelector('[data-prev]')?.addEventListener('click',()=>runRailPrev())
`
    case 'snap':
      return `${common}
const STEP=324; let page=0
function paint(){
  const t=document.querySelector('[data-track]');
  const o=-page*STEP;
  if(t) t.style.transform='translateX('+o+'px)';
  const p=document.querySelector('[data-page]'); if(p) p.textContent=String(page+1);
  const d=document.querySelector('[data-offset]'); if(d) d.textContent=String(Math.abs(o));
}
export function runRailSnap(){page=page?0:1; paint()}
document.querySelector('[data-snap]')?.addEventListener('click',()=>runRailSnap())
`
    case 'details':
      return `${common}
export function runDetailsOpen(){const p=document.querySelector('[data-panel]'); if(p) p.hidden=false}
export function runDetailsClose(){const p=document.querySelector('[data-panel]'); if(p) p.hidden=true}
document.querySelector('[data-open]')?.addEventListener('click',()=>runDetailsOpen())
document.querySelector('[data-close]')?.addEventListener('click',()=>runDetailsClose())
`
    case 'controls':
      return `${common}
const IDLE=900; let timer=0
export function runControlsShow(){
  const s=document.querySelector('[data-stage]'); const c=document.querySelector('[data-chrome]');
  s?.classList.add('is-live'); if(c) c.setAttribute('aria-hidden','false');
  window.clearTimeout(timer);
  if(prefersRM()) return;
  timer=window.setTimeout(()=>{s?.classList.remove('is-live'); c?.setAttribute('aria-hidden','true')}, IDLE)
}
document.querySelector('[data-nudge]')?.addEventListener('click',()=>runControlsShow())
document.querySelector('[data-stage]')?.addEventListener('pointermove',()=>runControlsShow())
`
    case 'scrub':
      return `${common}
function sync(){
  const r=document.querySelector('[data-range]'); const th=document.querySelector('[data-thumb]'); const tm=document.querySelector('[data-time]');
  if(!r||!th||!tm) return;
  const v=Number(r.value); const pct=v/100; const w=r.clientWidth||300;
  th.hidden=false; th.style.left=(12+pct*w)+'px';
  const sec=Math.round(pct*3600); tm.textContent=String(Math.floor(sec/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0');
}
export function runScrubTo(v=50){const r=document.querySelector('[data-range]'); if(r){r.value=String(v); sync()}}
const range=document.querySelector('[data-range]');
range?.addEventListener('input',sync); range?.addEventListener('pointerdown',sync);
`
    case 'skip':
      return `${common}
const INTRO_MS=3000; const APPEAR_AT=400; let timers=[]
function clear(){for(const id of timers) window.clearTimeout(id); timers=[]}
export function runSkipIntroDemo(){
  clear(); const skip=document.querySelector('[data-skip]'); const t=document.querySelector('[data-t]');
  if(skip) skip.hidden=true; let start=performance.now();
  function tick(now){
    const elapsed=now-start; if(t) t.textContent=(elapsed/1000).toFixed(1);
    if(elapsed>=APPEAR_AT && elapsed<=INTRO_MS){ if(skip) skip.hidden=false }
    else if(elapsed>INTRO_MS){ if(skip) skip.hidden=true; return }
    timers.push(window.requestAnimationFrame(tick))
  }
  if(prefersRM()){ if(skip) skip.hidden=false; if(t) t.textContent='1.2'; return }
  timers.push(window.requestAnimationFrame(tick))
}
document.querySelector('[data-play]')?.addEventListener('click',()=>runSkipIntroDemo())
document.querySelector('[data-skip]')?.addEventListener('click',()=>{clear(); const s=document.querySelector('[data-skip]'); if(s) s.hidden=true})
`
    case 'next':
      return `${common}
let timers=[]; let n=5
function clear(){for(const id of timers) window.clearTimeout(id); timers=[]}
export function runNextCountdown(){
  clear(); n=5; const box=document.querySelector('[data-count]'); const num=document.querySelector('[data-n]'); const ep=document.querySelector('[data-ep]');
  if(box) box.hidden=false; if(num) num.textContent='5';
  if(prefersRM()){ if(ep) ep.textContent='S1 E4 · Deep Current'; if(box) box.hidden=true; return }
  function step(){
    n-=1; if(num) num.textContent=String(n);
    if(n<=0){ if(ep) ep.textContent='S1 E4 · Deep Current'; if(box) box.hidden=true; return }
    timers.push(window.setTimeout(step,1000))
  }
  timers.push(window.setTimeout(step,1000))
}
export function runNextCancel(){clear(); const box=document.querySelector('[data-count]'); if(box) box.hidden=true}
document.querySelector('[data-start]')?.addEventListener('click',()=>runNextCountdown())
document.querySelector('[data-cancel]')?.addEventListener('click',()=>runNextCancel())
`
    default:
      return ''
  }
}

for (const s of specs) {
  const dir = path.join('.wip-aside', s.id)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'demo.html'), htmlFor(s) + '\n')
  fs.writeFileSync(path.join(dir, 'demo.css'), css + '\n')
  fs.writeFileSync(path.join(dir, 'demo.style.txt'), css + '\n')
  fs.writeFileSync(path.join(dir, 'demo.js'), jsFor(s))
  fs.writeFileSync(
    path.join(dir, 'entry.ts'),
    `import type { Specimen } from '../types'

export const ${s.exportName}: Specimen = {
  id: '${s.id}',
  ref: '${s.spx}',
  title: '${s.title}',
  blurb: ${JSON.stringify(s.blurb)},
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ${JSON.stringify(s.tags)},
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Motion transitions are skipped; semantic end states remain available.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: '${s.title} demo' },
}
`,
  )
  fs.writeFileSync(
    path.join(dir, 'payload.ts'),
    `import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inline; import demo.css verbatim.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Implements ${s.title} per Netflix catalogue contract',
    'Reduced motion preserves semantic state',
  ],
  scaffold: \`<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0c0c0f;display:grid;place-items:center;padding:16px;">{{specimen}}</div>\`,
  files: { html, css, js },
  spec,
  contract,
}

export default payload
`,
  )
  fs.writeFileSync(
    path.join(dir, 'contract.json'),
    JSON.stringify(
      {
        name: s.id,
        intent: s.blurb,
        ref: s.spx,
        nf: s.nf,
        reducedMotion: {
          triggers: [
            '@media (prefers-reduced-motion: reduce)',
            '[data-force-reduced-motion="true"]',
          ],
        },
      },
      null,
      2,
    ) + '\n',
  )
  fs.writeFileSync(
    path.join(dir, 'spec.md'),
    `# ${s.title}\n\n${s.blurb}\n\nRef: ${s.spx} · ${s.nf}\n`,
  )
  console.log('wrote', s.id)
}
