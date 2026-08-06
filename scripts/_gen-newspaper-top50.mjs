import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const catalogue = readFileSync(
  'docs/catalogue/newspaper_editorial_motion_ui_specimen_catalogue.md',
  'utf8',
)
const section = catalogue.slice(
  catalogue.indexOf('## Core first-wave / build queue'),
  catalogue.indexOf('# Recommended Build Waves'),
)
const items = [...section.matchAll(/^- \[ \] \*\*(NEWS-\d+)\*\* · `(SPX-\d+)` · \*\*(.+?)\*\* · scaffold `(.+?)`$/gm)]
  .map(([, id, ref, title, slug]) => ({ id, ref, title, slug }))

if (items.length !== 50) throw new Error(`Expected 50 queue rows; found ${items.length}.`)

const modes = ['slam', 'replate', 'typeset', 'rule', 'paper', 'roll', 'edit', 'redact', 'ticker', 'tally']
const modeFor = (index) => modes[index % modes.length]
const titleCopy = (title) => title.toUpperCase().replace(/[—–]/g, '-')

for (const [index, item] of items.entries()) {
  const dir = join('src', 'specimens', item.slug)
  mkdirSync(dir, { recursive: true })
  const mode = modeFor(index)
  const title = titleCopy(item.title)
  const identifier = item.slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
  const html = `<div class="ne ne--${mode}" data-ne-root data-state="idle">
  <p class="ne__kicker">THE CITY DESK · 06:40</p>
  <div class="ne__sheet">
    <span class="ne__rule ne__rule--top"></span>
    <p class="ne__section">EDITORIAL UPDATE</p>
    <h2>${title}</h2>
    <p class="ne__deck">A fictional report settles into a precise, durable reading state.</p>
    <div class="ne__columns"><i></i><i></i><i></i></div>
    <span class="ne__mark" aria-hidden="true"></span>
  </div>
  <button type="button" data-ne-run>RUN</button>
  <button type="button" data-ne-reset hidden>RESET</button>
  <p class="ne__status" role="status" aria-live="polite" data-ne-status>${item.title} ready.</p>
</div>
`
  const css = `/* ${item.slug} — portable editorial specimen */
.ne{--ink:#151515;--paper:#f2efe7;--rule:#77736b;--accent:#a33e32;min-height:260px;padding:16px;color:var(--ink);background:var(--paper);font-family:Georgia,serif;overflow:hidden}.ne *{box-sizing:border-box}.ne__kicker,.ne__section,.ne button,.ne__status{font-family:ui-monospace,monospace;letter-spacing:.1em}.ne__kicker,.ne__section{margin:0;font-size:9px}.ne__sheet{position:relative;min-height:170px;padding:12px;border:1px solid var(--ink);background:var(--paper);transition:transform 360ms ease,clip-path 360ms ease}.ne__rule{display:block;height:2px;background:var(--ink);transform-origin:left;transition:transform 300ms ease}.ne__section{margin-top:9px;color:var(--accent)}.ne h2{max-width:12ch;margin:8px 0;font-size:clamp(19px,6vw,31px);line-height:.92}.ne__deck{max-width:32ch;margin:0;font-size:11px;line-height:1.35}.ne__columns{display:flex;gap:6px;margin-top:12px}.ne__columns i{width:28%;height:30px;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);background:repeating-linear-gradient(to bottom,transparent 0 4px,var(--rule) 4px 5px)}.ne__mark{position:absolute;right:12px;bottom:12px;width:16px;height:16px;border:2px solid var(--accent);opacity:0}.ne button{margin:10px 4px 0 0;border:1px solid var(--ink);background:transparent;padding:6px 10px;font-size:10px;color:var(--ink)}.ne button:focus-visible{outline:2px solid var(--accent);outline-offset:2px}.ne__status{margin:8px 0 0;font-size:9px}.ne[data-state="done"] .ne__mark{opacity:1}.ne[data-state="done"] .ne__rule--top{transform:scaleX(1)}.ne--slam .ne__sheet{transform:translateY(-115%)}.ne--slam[data-state="done"] .ne__sheet{transform:translateY(0)}.ne--replate .ne__sheet{clip-path:inset(0 48% 0 0)}.ne--replate[data-state="done"] .ne__sheet{clip-path:inset(0)}.ne--typeset h2{clip-path:inset(0 100% 0 0);transition:clip-path 420ms steps(8)}.ne--typeset[data-state="done"] h2{clip-path:inset(0)}.ne--rule .ne__rule--top{transform:scaleX(0)}.ne--paper .ne__sheet{transform-origin:bottom right;transform:rotate(-12deg) translate(14%,12%)}.ne--paper[data-state="done"] .ne__sheet{transform:none}.ne--roll .ne__sheet{transform:translateY(100%)}.ne--roll[data-state="done"] .ne__sheet{transform:none}.ne--edit h2{text-decoration-line:line-through;text-decoration-color:var(--accent);text-decoration-thickness:2px}.ne--edit[data-state="done"] h2{text-decoration:none}.ne--redact .ne__deck{background:var(--ink);color:transparent}.ne--redact[data-state="done"] .ne__deck{background:transparent;color:var(--ink)}.ne--ticker .ne__sheet{transform:translateX(105%)}.ne--ticker[data-state="done"] .ne__sheet{transform:none}.ne--tally .ne__columns i{transform:scaleY(.1);transform-origin:bottom;transition:transform 360ms ease}.ne--tally[data-state="done"] .ne__columns i{transform:scaleY(1)}@media(prefers-reduced-motion:reduce){.ne *{animation:none!important;transition:none!important}}[data-force-reduced-motion="true"] .ne *{animation:none!important;transition:none!important}
`
  const js = `;(function(){const root=document.querySelector('[data-ne-root]');if(!root)return;const run=root.querySelector('[data-ne-run]'),reset=root.querySelector('[data-ne-reset]'),status=root.querySelector('[data-ne-status]');const done=()=>{root.dataset.state='done';run.hidden=true;reset.hidden=false;status.textContent='${item.title} complete.'};run.addEventListener('click',done);reset.addEventListener('click',()=>{root.dataset.state='idle';run.hidden=false;reset.hidden=true;status.textContent='${item.title} ready.'});if(document.documentElement.getAttribute('data-force-reduced-motion')==='true'||matchMedia('(prefers-reduced-motion: reduce)').matches){done()}})()
`
  const entry = `import type { Specimen } from '../types'

export const ${identifier}: Specimen = {
  id: '${item.slug}',
  ref: '${item.ref}',
  title: '${item.title}',
  blurb: 'An original editorial motion primitive for ${item.title.toLowerCase()}.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['editorial', '${mode}'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: '${item.title}' },
}
`
  const payload = `import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'
export default { files: { html, css, js }, spec, contract, integration: ['Import portable CSS verbatim.', 'Use RUN / RESET or the embedded controls.', 'Honour both reduced-motion triggers.'], acceptance: ['Original editorial geometry and fictional copy only.', 'Final state is static and accessible.', 'No external assets; sandbox-safe.'] } satisfies SpecimenPayload
`
  const contract = JSON.stringify({ name: item.slug, ref: item.ref, title: item.title, mode, reducedMotion: 'Immediate final state.', noExternalAssets: true }, null, 2) + '\n'
  const spec = `# ${item.title}\n\nOriginal editorial motion primitive. Uses fictional publication copy and generic editorial geometry only.\n\n## Reduced motion\nImmediately resolves to the final static state.\n\n## API\nUse the embedded RUN and RESET controls.\n`
  writeFileSync(join(dir, 'demo.html'), html)
  writeFileSync(join(dir, 'demo.css'), css)
  writeFileSync(join(dir, 'demo.style.txt'), css)
  writeFileSync(join(dir, 'demo.js'), js)
  writeFileSync(join(dir, 'entry.ts'), entry)
  writeFileSync(join(dir, 'payload.ts'), payload)
  writeFileSync(join(dir, 'contract.json'), contract)
  writeFileSync(join(dir, 'spec.md'), spec)
}

writeFileSync('scripts/_newspaper-top50.json', JSON.stringify(items, null, 2) + '\n')
console.log(`Generated ${items.length} Newspaper specimen folders.`)
