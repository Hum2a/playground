import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const items = JSON.parse(readFileSync('scripts/_music-top50.json', 'utf8'))
if (items.length !== 50) throw new Error(`Expected 50 Music items; found ${items.length}.`)
const modes = ['fader', 'meter', 'scope', 'switch', 'sequence', 'deck', 'patch', 'tape', 'tuner', 'timeline']

for (const [index, item] of items.entries()) {
  const dir = join('src', 'specimens', 'library', 'music-equipment', item.slug)
  mkdirSync(dir, { recursive: true })
  const mode = modes[index % modes.length]
  const exportName = item.slug.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
  const title = item.title.toUpperCase()
  const html = `<div class="me me--${mode}" data-me-root data-state="idle">
  <header><span>STUDIO UNIT 04</span><b>${title}</b><em data-me-status>READY</em></header>
  <div class="me__panel">
    <div class="me__display">${item.title}</div>
    <div class="me__meter"><i></i><i></i><i></i><i></i><i></i><i></i></div>
    <div class="me__control"><span></span><span></span><span></span><span></span></div>
    <div class="me__signal" aria-hidden="true"></div>
  </div>
  <button type="button" data-me-run>ENGAGE</button>
  <button type="button" data-me-reset hidden>RESET</button>
  <p class="me__announcement" aria-live="polite" data-me-announcement>${item.title} ready.</p>
</div>
`
  const css = `/* ${item.slug} — portable, manufacturer-neutral music equipment specimen */
.me{--chassis:#17191c;--panel:#25282d;--ink:#d7d9dc;--idle:#3b3f45;--signal:#78c68a;--warn:#e2b45b;--clip:#d85d57;min-height:280px;padding:14px;color:var(--ink);background:var(--chassis);font-family:ui-monospace,SFMono-Regular,monospace;overflow:hidden}.me *{box-sizing:border-box}.me header{display:flex;gap:8px;align-items:center;border-bottom:1px solid var(--idle);padding-bottom:8px;font-size:9px;letter-spacing:.08em}.me header b{flex:1;font-size:10px}.me header em{font-style:normal;color:var(--signal)}.me__panel{position:relative;display:grid;gap:14px;min-height:175px;margin-top:12px;padding:14px;border:1px solid var(--idle);background:var(--panel);overflow:hidden}.me__display{border:1px solid var(--idle);padding:8px;color:var(--signal);font-size:12px}.me__meter{display:flex;align-items:end;gap:4px;height:48px}.me__meter i{width:10%;height:15%;background:var(--idle);transform-origin:bottom;transition:height 360ms ease,background 180ms}.me__control{display:flex;gap:12px}.me__control span{width:22px;height:22px;border:2px solid var(--ink);border-radius:50%;transform:rotate(-135deg);transition:transform 420ms cubic-bezier(.2,.8,.2,1)}.me__signal{position:absolute;inset:auto 14px 14px;height:2px;background:var(--idle);transform-origin:left;transition:transform 420ms ease}.me button{margin:10px 6px 0 0;border:1px solid var(--ink);padding:7px 10px;background:transparent;color:var(--ink);font:inherit;font-size:10px;letter-spacing:.08em}.me button:focus-visible{outline:2px solid var(--signal);outline-offset:2px}.me__announcement{margin:8px 0 0;font-size:9px}.me[data-state="done"] header em{color:var(--signal)}.me[data-state="done"] .me__meter i{height:var(--h,70%);background:var(--signal)}.me[data-state="done"] .me__meter i:nth-child(2){height:92%;background:var(--warn)}.me[data-state="done"] .me__meter i:nth-child(5){height:58%}.me[data-state="done"] .me__control span{transform:rotate(45deg)}.me[data-state="done"] .me__signal{background:var(--signal);transform:scaleX(1)}.me--fader .me__control{transform:translateY(40px);transition:transform 420ms ease}.me--fader[data-state="done"] .me__control{transform:none}.me--meter .me__meter i{transition-delay:calc(var(--i,0)*45ms)}.me--scope .me__signal{height:32px;background:linear-gradient(135deg,transparent 42%,var(--signal) 43% 48%,transparent 49% 56%,var(--signal) 57% 62%,transparent 63%);transform:translateX(-110%)}.me--scope[data-state="done"] .me__signal{transform:none}.me--switch .me__display{clip-path:inset(0 100% 0 0);transition:clip-path 260ms steps(6)}.me--switch[data-state="done"] .me__display{clip-path:inset(0)}.me--sequence .me__control span{border-radius:2px;transform:scale(.35)}.me--sequence[data-state="done"] .me__control span{transform:scale(1);background:var(--signal)}.me--deck .me__display{border-radius:50%;width:70px;height:70px;padding:25px 4px;text-align:center;transition:transform 520ms ease}.me--deck[data-state="done"] .me__display{transform:rotate(360deg)}.me--patch .me__signal{height:60px;border:2px solid var(--signal);border-left:0;border-bottom:0;background:transparent;transform:scaleX(0)}.me--patch[data-state="done"] .me__signal{transform:scaleX(1)}.me--tape .me__display{transform:translateX(105%);transition:transform 420ms ease}.me--tape[data-state="done"] .me__display{transform:none}.me--tuner .me__signal{transform:rotate(-25deg) scaleX(.7)}.me--tuner[data-state="done"] .me__signal{transform:rotate(0) scaleX(1)}.me--timeline .me__signal{transform:scaleX(.1)}@media(prefers-reduced-motion:reduce){.me *{animation:none!important;transition:none!important}}[data-force-reduced-motion="true"] .me *{animation:none!important;transition:none!important}
`
  const js = `;(function(){const root=document.querySelector('[data-me-root]');if(!root)return;const run=root.querySelector('[data-me-run]'),reset=root.querySelector('[data-me-reset]'),status=root.querySelector('[data-me-status]'),announcement=root.querySelector('[data-me-announcement]');const engage=()=>{root.dataset.state='done';status.textContent='LOCKED';run.hidden=true;reset.hidden=false;announcement.textContent='${item.title} engaged.'};run.addEventListener('click',engage);reset.addEventListener('click',()=>{root.dataset.state='idle';status.textContent='READY';run.hidden=false;reset.hidden=true;announcement.textContent='${item.title} ready.'});if(matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.dataset.forceReducedMotion==='true')engage()})()
`
  const entry = `import type { Specimen } from '../../../types'

export const ${exportName}: Specimen = {
  id: '${item.slug}', ref: '${item.ref}', title: '${item.title}',
  blurb: 'A manufacturer-neutral music equipment primitive for ${item.title.toLowerCase()}.',
  origin: { project: 'Original', surface: 'Music equipment interaction language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'music-equipment' },
  tags: ['hardware', '${mode}'], deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the engaged hardware state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'dark', label: '${item.title}' },
}
`
  const payload = `import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'
const payload: SpecimenPayload = { files: { html, css, js }, spec, contract, integration: ['Import the portable CSS verbatim.', 'Use ENGAGE and RESET to control state.', 'Honor both reduced-motion triggers.'], acceptance: ['Uses original manufacturer-neutral hardware geometry.', 'Uses deterministic visual state only; no audio or external assets.', 'Preserves an accessible static engaged state.'] }
export default payload
`
  writeFileSync(join(dir, 'demo.html'), html)
  writeFileSync(join(dir, 'demo.css'), css)
  writeFileSync(join(dir, 'demo.style.txt'), css)
  writeFileSync(join(dir, 'demo.js'), js)
  writeFileSync(join(dir, 'entry.ts'), entry)
  writeFileSync(join(dir, 'payload.ts'), payload)
  writeFileSync(join(dir, 'contract.json'), `${JSON.stringify({ name: item.slug, ref: item.ref, title: item.title, mode, externalAssets: false, reducedMotion: 'Immediate engaged state.' }, null, 2)}\n`)
  writeFileSync(join(dir, 'spec.md'), `# ${item.title}\n\nA portable, manufacturer-neutral music equipment motion primitive using original labels and deterministic visual signals only.\n\n## Reduced motion\nThe engaged state is rendered without choreography.\n\n## Controls\nUse ENGAGE and RESET to demonstrate the state transition.\n`)
}
console.log(`Generated ${items.length} Music specimen folders.`)
