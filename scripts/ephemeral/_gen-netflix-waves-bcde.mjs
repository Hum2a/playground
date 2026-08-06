/**
 * Generate compact Netflix Wave B/C/D/E specimen sources into .wip-aside/<id>/
 */
import fs from 'node:fs'
import path from 'node:path'

const RM_HEAD = `function prefersRM(){var f=document.documentElement.getAttribute('data-force-reduced-motion')==='true';return f||window.matchMedia('(prefers-reduced-motion: reduce)').matches}
`

const RM_CSS = `@media (prefers-reduced-motion:reduce){.nf *{transition:none!important;animation:none!important}}
[data-force-reduced-motion="true"] .nf *{transition:none!important;animation:none!important}
`

const BASE_CSS = `.nf{--ink:#0c0c0f;--panel:#14141a;--panel2:#1b1b22;--rule:#2a2a33;--pewter:#8b8b96;--chalk:#ececf1;--accent:#e8a45a;box-sizing:border-box;width:min(100%,460px);margin:0 auto;padding:14px;font-family:system-ui,sans-serif;color:var(--chalk);background:var(--panel);border:1px solid var(--rule)}
.nf *,.nf *::before,.nf *::after{box-sizing:border-box}
.nf__eyebrow{margin:0 0 12px;font:11px/1.2 ui-monospace,monospace;letter-spacing:.12em;color:var(--pewter)}
.nf__actions{display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap;margin-top:12px}
.nf__btn{padding:8px 12px;font:11px/1 ui-monospace,monospace;letter-spacing:.1em;border:1px solid var(--chalk);background:var(--chalk);color:var(--ink);cursor:pointer}
.nf__btn[disabled]{opacity:.4;cursor:default}
.nf__meta{margin:8px 0 0;font-size:11px;color:var(--pewter);text-align:center}
.nf__stage{position:relative;min-height:150px;border:1px solid var(--rule);background:var(--ink);overflow:hidden}
.nf__btn:focus-visible,.nf a:focus-visible,.nf button:focus-visible,.nf [tabindex]:focus-visible,.nf input:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
`

/** ---------- WAVE B ---------- */
const waveB = [
  {
    id: 'delayed-preview-expansion',
    exportName: 'delayedPreviewExpansion',
    spx: 'SPX-3145',
    nf: 'NF-036',
    title: 'Delayed Preview Expansion',
    blurb:
      'Hovering or focusing a card starts a 450ms dwell timer before it expands in place — a quick pass-over never triggers the preview.',
    tags: ['preview', 'dwell', 'expand'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">DELAYED PREVIEW EXPANSION</p>
  <div class="nf__rail">
    <button type="button" class="nf__card" data-card>
      <span class="nf__poster" aria-hidden="true"></span>
      <span class="nf__label">Signal Drift</span>
    </button>
  </div>
  <p class="nf__meta" data-status>Idle — hover and hold 450ms</p>
</div>`,
    css: `.nf__rail{display:flex;justify-content:center;padding:16px 0}
.nf__card{position:relative;width:150px;height:190px;display:flex;flex-direction:column;justify-content:flex-end;gap:6px;padding:8px;border:1px solid var(--rule);background:var(--ink);color:inherit;cursor:pointer;transform:scale(1);transition:transform 220ms cubic-bezier(.4,0,.2,1),border-color 220ms}
.nf__poster{position:absolute;inset:0;background:linear-gradient(150deg,#26303f,#161c26)}
.nf__label{position:relative;font-size:12px;opacity:0;transition:opacity 220ms}
.nf__card.is-armed{border-color:var(--pewter)}
.nf__card.is-expanded{transform:scale(1.14);border-color:var(--accent);z-index:2}
.nf__card.is-expanded .nf__label{opacity:1}`,
    js: `var DWELL=450
var timer=0
var card=document.querySelector('[data-card]')
var status=document.querySelector('[data-status]')
function setStatus(t){ if(status) status.textContent=t }
function arm(){
  card.classList.add('is-armed')
  setStatus('Dwelling\u2026')
  window.clearTimeout(timer)
  if(prefersRM()){ commit(); return }
  timer=window.setTimeout(commit,DWELL)
}
function commit(){
  card.classList.remove('is-armed')
  card.classList.add('is-expanded')
  setStatus('Expanded')
}
function cancel(){
  window.clearTimeout(timer)
  card.classList.remove('is-armed','is-expanded')
  setStatus('Idle \u2014 hover and hold 450ms')
}
export function runDelayedPreviewExpansion(){ arm() }
export function runDelayedPreviewCancel(){ cancel() }
card.addEventListener('pointerenter',arm)
card.addEventListener('focus',arm)
card.addEventListener('pointerleave',cancel)
card.addEventListener('blur',cancel)
`,
    timing: { dwellMs: 450, transitionMs: 220, easing: 'cubic-bezier(.4,0,.2,1)', expandScale: 1.14 },
    acceptance: [
      'Hover or focus the card: nothing changes until 450ms elapse',
      'Leaving before 450ms cancels — the card never expands',
      'Holding past 450ms expands the card and reveals its label',
      'Reduced motion commits the expanded state immediately on hover/focus',
    ],
  },
  {
    id: 'expanded-card-metadata-reveal',
    exportName: 'expandedCardMetadataReveal',
    spx: 'SPX-3146',
    nf: 'NF-037',
    title: 'Expanded Card Metadata Reveal',
    blurb:
      'An expanded card reveals its title, match score, and genre line as three staggered fades rather than one flat cut.',
    tags: ['preview', 'metadata', 'stagger'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">EXPANDED CARD METADATA REVEAL</p>
  <button type="button" class="nf__card" data-card aria-expanded="false">
    <span class="nf__poster" aria-hidden="true"></span>
    <span class="nf__info" data-info>
      <span class="nf__row nf__title">Amber Field</span>
      <span class="nf__row nf__sub"><span class="nf__match">96% Match</span><span class="nf__age">16+</span></span>
      <span class="nf__row nf__genres">Thriller \u00b7 Drama \u00b7 2h 4m</span>
    </span>
  </button>
</div>`,
    css: `.nf__card{position:relative;display:flex;flex-direction:column;justify-content:flex-end;width:220px;height:180px;margin:0 auto;padding:10px;border:1px solid var(--rule);background:var(--ink);color:inherit;cursor:pointer;transition:border-color 200ms}
.nf__poster{position:absolute;inset:0;background:linear-gradient(150deg,#2a3344,#1a2030)}
.nf__info{position:relative;display:flex;flex-direction:column;gap:4px}
.nf__row{opacity:0;transform:translateY(6px);transition:opacity 220ms ease,transform 220ms ease}
.nf__title{font-weight:600}
.nf__sub{display:flex;gap:8px;font-size:11px}
.nf__match{color:var(--accent)}
.nf__age{color:var(--pewter)}
.nf__genres{font-size:11px;color:var(--pewter)}
.nf__card.is-open{border-color:var(--accent)}
.nf__card.is-open .nf__title{transition-delay:0ms}
.nf__card.is-open .nf__sub{transition-delay:70ms}
.nf__card.is-open .nf__genres{transition-delay:140ms}
.nf__card.is-open .nf__row{opacity:1;transform:translateY(0)}`,
    js: `var card=document.querySelector('[data-card]')
function open(){ card.classList.add('is-open'); card.setAttribute('aria-expanded','true') }
function close(){ card.classList.remove('is-open'); card.setAttribute('aria-expanded','false') }
export function runMetadataReveal(){ open() }
export function runMetadataHide(){ close() }
card.addEventListener('pointerenter',open)
card.addEventListener('focus',open)
card.addEventListener('pointerleave',close)
card.addEventListener('blur',close)
`,
    timing: { staggerMs: [0, 70, 140], transitionMs: 220, easing: 'ease' },
    acceptance: [
      'Idle: card shows only its poster, no metadata text',
      'Hover or focus: title, match/age row, then genre line fade in over 220ms each, staggered 70ms apart',
      'Leaving hides all three rows together',
      'Reduced motion shows all rows at once, no stagger',
    ],
  },
  {
    id: 'keyboard-focus-expansion',
    exportName: 'keyboardFocusExpansion',
    spx: 'SPX-3150',
    nf: 'NF-041',
    title: 'Keyboard Focus Expansion',
    blurb:
      'Tabbing through a card rail expands whichever card holds keyboard focus, with the same neighbour push as pointer hover.',
    tags: ['keyboard', 'focus', 'expand'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">KEYBOARD FOCUS EXPANSION \u2014 TAB THROUGH</p>
  <div class="nf__rail" data-rail>
    <button type="button" class="nf__card" data-i="0">Alpha</button>
    <button type="button" class="nf__card" data-i="1">Bravo</button>
    <button type="button" class="nf__card" data-i="2">Charlie</button>
  </div>
  <p class="nf__meta" data-status>Press Tab to move focus</p>
</div>`,
    css: `.nf__rail{display:flex;gap:10px;justify-content:center;padding:16px 0}
.nf__card{width:100px;height:132px;border:1px solid var(--rule);background:var(--ink);color:inherit;cursor:pointer;transition:transform 200ms cubic-bezier(.4,0,.2,1),border-color 200ms}
.nf__rail[data-focused="0"] .nf__card[data-i="0"],.nf__rail[data-focused="1"] .nf__card[data-i="1"],.nf__rail[data-focused="2"] .nf__card[data-i="2"]{transform:scale(1.15);border-color:var(--accent);z-index:2}
.nf__rail[data-focused="1"] .nf__card[data-i="0"]{transform:translateX(-16px)}
.nf__rail[data-focused="1"] .nf__card[data-i="2"]{transform:translateX(16px)}
.nf__rail[data-focused="2"] .nf__card[data-i="0"]{transform:translateX(-16px)}
.nf__rail[data-focused="2"] .nf__card[data-i="1"]{transform:translateX(-16px)}
.nf__rail[data-focused="0"] .nf__card[data-i="1"]{transform:translateX(16px)}
.nf__rail[data-focused="0"] .nf__card[data-i="2"]{transform:translateX(16px)}`,
    js: `var rail=document.querySelector('[data-rail]')
var status=document.querySelector('[data-status]')
var names=['Alpha','Bravo','Charlie']
rail.addEventListener('focusin',function(e){
  var i=e.target.getAttribute('data-i')
  if(i===null) return
  rail.setAttribute('data-focused',i)
  if(status) status.textContent='Focused: '+names[Number(i)]
})
rail.addEventListener('focusout',function(){
  window.setTimeout(function(){
    if(!rail.contains(document.activeElement)){
      rail.removeAttribute('data-focused')
      if(status) status.textContent='Press Tab to move focus'
    }
  },0)
})
export function runFocusIndex(i){ var el=rail.querySelector('[data-i="'+i+'"]'); if(el) el.focus() }
`,
    timing: { transitionMs: 200, expandScale: 1.15, neighbourPushPx: 16, easing: 'cubic-bezier(.4,0,.2,1)' },
    acceptance: [
      'Tabbing onto any card expands it 1.15x and pushes the other two cards outward',
      'Tabbing away collapses the rail back to flush',
      'Mouse hover is not required — keyboard focus alone drives the effect',
      'Reduced motion applies the same end states with no transition',
    ],
  },
  {
    id: 'featured-hero-crossfade',
    exportName: 'featuredHeroCrossfade',
    spx: 'SPX-3126',
    nf: 'NF-017',
    title: 'Featured Hero Crossfade',
    blurb:
      'The featured hero banner crossfades its backdrop and title between two features rather than cutting instantly.',
    tags: ['hero', 'crossfade', 'featured'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">FEATURED HERO CROSSFADE</p>
  <div class="nf__stage" data-stage>
    <div class="nf__layer is-visible" data-layer="0">
      <p class="nf__hero-title">Amber Field</p>
    </div>
    <div class="nf__layer" data-layer="1">
      <p class="nf__hero-title">Night Route</p>
    </div>
  </div>
  <div class="nf__actions">
    <button type="button" class="nf__btn" data-next>NEXT FEATURE</button>
  </div>
</div>`,
    css: `.nf__stage{height:180px}
.nf__layer{position:absolute;inset:0;display:flex;align-items:flex-end;padding:14px;opacity:0;transition:opacity 500ms ease}
.nf__layer[data-layer="0"]{background:linear-gradient(150deg,#3a2c22,#171310)}
.nf__layer[data-layer="1"]{background:linear-gradient(150deg,#1c2c33,#0d1416)}
.nf__layer.is-visible{opacity:1;z-index:1}
.nf__hero-title{margin:0;font-size:20px;font-weight:700}`,
    js: `var stage=document.querySelector('[data-stage]')
var active=0
export function runHeroCrossfade(){
  var layers=stage.querySelectorAll('[data-layer]')
  active=active===0?1:0
  layers.forEach(function(l){ l.classList.toggle('is-visible', Number(l.getAttribute('data-layer'))===active) })
}
document.querySelector('[data-next]')?.addEventListener('click',runHeroCrossfade)
`,
    timing: { crossfadeMs: 500, easing: 'ease' },
    acceptance: [
      'Idle: one hero layer visible, the other fully transparent',
      'NEXT FEATURE crossfades opacity between the two layers over 500ms with an overlap, never a hard cut',
      'Repeated clicks alternate between the two features',
      'Reduced motion swaps the visible layer instantly',
    ],
  },
  {
    id: 'hero-metadata-cascade',
    exportName: 'heroMetadataCascade',
    spx: 'SPX-3127',
    nf: 'NF-018',
    title: 'Hero Metadata Cascade',
    blurb:
      'A hero banner reveals its title, tag row, and action buttons as a top-down cascade rather than appearing all at once.',
    tags: ['hero', 'cascade', 'stagger'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">HERO METADATA CASCADE</p>
  <div class="nf__stage" data-stage>
    <div class="nf__hero" data-hero>
      <p class="nf__row nf__hero-title" data-row="0">Midnight Circuit</p>
      <p class="nf__row nf__tags" data-row="1">Sci-Fi \u00b7 Thriller \u00b7 2024</p>
      <div class="nf__row nf__hero-actions" data-row="2">
        <span class="nf__chip">\u25b6 Play</span>
        <span class="nf__chip">+ My List</span>
      </div>
    </div>
  </div>
  <div class="nf__actions">
    <button type="button" class="nf__btn" data-reveal>REVEAL HERO</button>
    <button type="button" class="nf__btn" data-hide>HIDE</button>
  </div>
</div>`,
    css: `.nf__stage{height:170px;background:linear-gradient(150deg,#242a3a,#12141c)}
.nf__hero{position:absolute;left:14px;bottom:14px;right:14px}
.nf__row{opacity:0;transform:translateY(-8px);transition:opacity 260ms ease,transform 260ms ease}
.nf__hero-title{margin:0 0 6px;font-size:19px;font-weight:700}
.nf__tags{margin:0 0 8px;font-size:11px;color:var(--pewter)}
.nf__hero-actions{display:flex;gap:8px}
.nf__chip{padding:5px 10px;font-size:11px;border:1px solid var(--chalk);background:rgba(236,238,241,.08)}
.nf__hero.is-cascaded [data-row="0"]{transition-delay:0ms}
.nf__hero.is-cascaded [data-row="1"]{transition-delay:80ms}
.nf__hero.is-cascaded [data-row="2"]{transition-delay:160ms}
.nf__hero.is-cascaded .nf__row{opacity:1;transform:translateY(0)}`,
    js: `var hero=document.querySelector('[data-hero]')
export function runHeroCascade(){ hero.classList.add('is-cascaded') }
export function runHeroCascadeReset(){ hero.classList.remove('is-cascaded') }
document.querySelector('[data-reveal]')?.addEventListener('click',runHeroCascade)
document.querySelector('[data-hide]')?.addEventListener('click',runHeroCascadeReset)
`,
    timing: { staggerMs: [0, 80, 160], transitionMs: 260, easing: 'ease' },
    acceptance: [
      'Idle: title, tags, and action chips are all hidden',
      'REVEAL HERO cascades title, then tags, then action chips top-down, 80ms apart',
      'HIDE removes all three rows together',
      'Reduced motion shows every row at once with no stagger',
    ],
  },
  {
    id: 'search-field-expand',
    exportName: 'searchFieldExpand',
    spx: 'SPX-3206',
    nf: 'NF-097',
    title: 'Search Field Expand',
    blurb:
      'A compact search icon expands into a full-width text field on activation, and collapses back on Escape or blur.',
    tags: ['search', 'expand', 'chrome'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">SEARCH FIELD EXPAND</p>
  <div class="nf__searchbar" data-bar>
    <button type="button" class="nf__icon" data-open aria-label="Open search">\u2315</button>
    <input class="nf__input" data-input type="text" placeholder="Titles, people, genres" aria-hidden="true" tabindex="-1" />
    <button type="button" class="nf__icon" data-close aria-label="Close search" hidden>\u2715</button>
  </div>
</div>`,
    css: `.nf__searchbar{display:flex;align-items:center;gap:0;height:38px;border:1px solid var(--rule);background:var(--ink);overflow:hidden;width:38px;transition:width 260ms cubic-bezier(.4,0,.2,1)}
.nf__searchbar.is-open{width:100%}
.nf__icon{flex:0 0 auto;width:38px;height:38px;border:0;background:transparent;color:var(--chalk);font-size:16px;cursor:pointer}
.nf__input{flex:1;min-width:0;height:100%;border:0;background:transparent;color:var(--chalk);font-size:13px;padding:0;opacity:0;transition:opacity 200ms ease}
.nf__searchbar.is-open .nf__input{opacity:1;padding:0 8px}`,
    js: `var bar=document.querySelector('[data-bar]')
var input=document.querySelector('[data-input]')
var openBtn=document.querySelector('[data-open]')
var closeBtn=document.querySelector('[data-close]')
export function runSearchExpand(){
  bar.classList.add('is-open')
  input.removeAttribute('aria-hidden')
  input.tabIndex=0
  openBtn.hidden=true
  closeBtn.hidden=false
  input.focus()
}
export function runSearchCollapse(){
  bar.classList.remove('is-open')
  input.setAttribute('aria-hidden','true')
  input.tabIndex=-1
  input.value=''
  openBtn.hidden=false
  closeBtn.hidden=true
}
openBtn.addEventListener('click',runSearchExpand)
closeBtn.addEventListener('click',runSearchCollapse)
input.addEventListener('keydown',function(e){ if(e.key==='Escape') runSearchCollapse() })
`,
    timing: { widthTransitionMs: 260, easing: 'cubic-bezier(.4,0,.2,1)' },
    acceptance: [
      'Idle: only the search icon is visible at 38px wide',
      'Activating it expands the bar to full width and focuses the input',
      'Escape or the close icon collapses back to the icon-only state',
      'Reduced motion snaps width instantly, same open/close states',
    ],
  },
  {
    id: 'live-result-grid-reflow',
    exportName: 'liveResultGridReflow',
    spx: 'SPX-3207',
    nf: 'NF-098',
    title: 'Live Result Grid Reflow',
    blurb:
      'Typing into a search field filters a result grid in place — non-matching cards shrink and fade so the rest reflow smoothly.',
    tags: ['search', 'grid', 'filter'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">LIVE RESULT GRID REFLOW</p>
  <input class="nf__filter" data-filter type="text" placeholder="Type: a, b, c\u2026" aria-label="Filter results" />
  <div class="nf__grid" data-grid>
    <span class="nf__chip" data-name="Amber Field">Amber Field</span>
    <span class="nf__chip" data-name="Bravo Signal">Bravo Signal</span>
    <span class="nf__chip" data-name="Charlie Route">Charlie Route</span>
    <span class="nf__chip" data-name="Ashen Drift">Ashen Drift</span>
    <span class="nf__chip" data-name="Bright Circuit">Bright Circuit</span>
  </div>
</div>`,
    css: `.nf__filter{width:100%;height:34px;padding:0 10px;margin-bottom:12px;border:1px solid var(--rule);background:var(--ink);color:var(--chalk);font-size:13px}
.nf__grid{display:flex;flex-wrap:wrap;gap:8px}
.nf__chip{padding:8px 12px;border:1px solid var(--rule);background:var(--panel2);font-size:12px;transition:opacity 220ms ease,transform 220ms ease,max-width 220ms ease,padding 220ms ease,margin 220ms ease;max-width:200px;overflow:hidden;white-space:nowrap}
.nf__chip.is-out{opacity:0;transform:scale(.7);max-width:0;padding:0;margin:0;border-color:transparent}`,
    js: `var grid=document.querySelector('[data-grid]')
var chips=Array.prototype.slice.call(grid.querySelectorAll('[data-name]'))
function apply(q){
  var query=q.trim().toLowerCase()
  chips.forEach(function(c){
    var match=!query||c.getAttribute('data-name').toLowerCase().indexOf(query)!==-1
    c.classList.toggle('is-out',!match)
  })
}
document.querySelector('[data-filter]')?.addEventListener('input',function(e){ apply(e.target.value) })
export function runGridFilter(q){ var f=document.querySelector('[data-filter]'); if(f){ f.value=q; apply(q) } }
`,
    timing: { transitionMs: 220, easing: 'ease' },
    acceptance: [
      'Idle: all five chips visible in a flex-wrap grid',
      'Typing a query fades and collapses non-matching chips, reflowing the remaining ones into the freed space',
      'Clearing the query restores every chip',
      'Reduced motion applies matched/unmatched states instantly',
    ],
  },
  {
    id: 'oversized-rank-numeral',
    exportName: 'oversizedRankNumeral',
    spx: 'SPX-3232',
    nf: 'NF-123',
    title: 'Oversized Rank Numeral',
    blurb:
      'A Top 10-style card sits beside an oversized rank numeral that bleeds behind its poster edge.',
    tags: ['rank', 'top10', 'numeral'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">OVERSIZED RANK NUMERAL</p>
  <div class="nf__rankcard">
    <span class="nf__numeral" data-numeral>1</span>
    <span class="nf__poster" aria-hidden="true"></span>
  </div>
  <div class="nf__actions">
    <button type="button" class="nf__btn" data-cycle>NEXT RANK</button>
  </div>
</div>`,
    css: `.nf__rankcard{position:relative;display:flex;align-items:flex-end;height:170px;justify-content:center}
.nf__numeral{font:900 128px/1 ui-monospace,monospace;color:var(--panel2);-webkit-text-stroke:2px var(--rule);position:relative;z-index:0;margin-right:-34px;user-select:none;transition:color 200ms}
.nf__poster{position:relative;z-index:1;width:108px;height:150px;background:linear-gradient(150deg,#2a3344,#1a2030);border:1px solid var(--rule)}`,
    js: `var numeral=document.querySelector('[data-numeral]')
var ranks=['1','2','3']
var i=0
export function runRankCycle(){
  i=(i+1)%ranks.length
  numeral.textContent=ranks[i]
}
document.querySelector('[data-cycle]')?.addEventListener('click',runRankCycle)
`,
    timing: { numeralFontPx: 128, overlapPx: 34, strokeColor: 'var(--rule)' },
    acceptance: [
      'The numeral renders behind the poster, overlapping its left edge',
      'NEXT RANK cycles the numeral through 1, 2, 3',
      'The numeral never changes the poster size or position',
      'Reduced motion has no transition to disable beyond the numeral swap, which is instant either way',
    ],
  },
  {
    id: 'rank-change-slide',
    exportName: 'rankChangeSlide',
    spx: 'SPX-3233',
    nf: 'NF-124',
    title: 'Rank Change Slide',
    blurb:
      'When two ranked list items swap places, each slides through the vertical distance to its new slot using a measured FLIP transform.',
    tags: ['rank', 'reorder', 'flip'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">RANK CHANGE SLIDE</p>
  <ol class="nf__ranklist" data-list>
    <li class="nf__rankrow" data-id="a"><span class="nf__ranknum">1</span>Amber Field</li>
    <li class="nf__rankrow" data-id="b"><span class="nf__ranknum">2</span>Bravo Signal</li>
    <li class="nf__rankrow" data-id="c"><span class="nf__ranknum">3</span>Charlie Route</li>
    <li class="nf__rankrow" data-id="d"><span class="nf__ranknum">4</span>Delta Field</li>
  </ol>
  <div class="nf__actions">
    <button type="button" class="nf__btn" data-shuffle>SHUFFLE RANKS</button>
  </div>
</div>`,
    css: `.nf__ranklist{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}
.nf__rankrow{display:flex;align-items:center;gap:10px;padding:8px 10px;border:1px solid var(--rule);background:var(--ink);font-size:13px;transition:transform 320ms cubic-bezier(.4,0,.2,1)}
.nf__ranknum{font:700 13px ui-monospace,monospace;color:var(--accent);width:16px}`,
    js: `var list=document.querySelector('[data-list]')
function rows(){ return Array.prototype.slice.call(list.querySelectorAll('[data-id]')) }
export function runRankShuffle(){
  var items=rows()
  var first=new Map()
  items.forEach(function(el){ first.set(el, el.getBoundingClientRect().top) })
  var a=list.querySelector('[data-id="a"]')
  var c=list.querySelector('[data-id="c"]')
  list.insertBefore(c,a)
  var reordered=rows()
  reordered.forEach(function(el){
    var before=first.get(el)
    var after=el.getBoundingClientRect().top
    var delta=before-after
    if(delta){
      el.style.transform='translateY('+delta+'px)'
      if(prefersRM()){ el.style.transform='' ; return }
      requestAnimationFrame(function(){
        el.style.transform='translateY(0px)'
      })
    }
  })
}
document.querySelector('[data-shuffle]')?.addEventListener('click',runRankShuffle)
`,
    timing: { transitionMs: 320, easing: 'cubic-bezier(.4,0,.2,1)' },
    acceptance: [
      'Idle: four rows in rank order 1-2-3-4',
      'SHUFFLE RANKS moves rank 3 above rank 1; both rows slide through the vertical gap rather than teleporting',
      'Rank numerals stay attached to their row, not their old slot',
      'Reduced motion reorders instantly with no slide',
    ],
  },
  {
    id: 'directional-focus-travel',
    exportName: 'directionalFocusTravel',
    spx: 'SPX-3265',
    nf: 'NF-156',
    title: 'Directional Focus Travel',
    blurb:
      'A focus indicator slides between grid cells in the direction of arrow-key travel instead of jumping to the new cell.',
    tags: ['focus', 'grid', 'navigation'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">DIRECTIONAL FOCUS TRAVEL \u2014 ARROW KEYS</p>
  <div class="nf__focusgrid" data-grid tabindex="0" role="grid" aria-label="3 by 3 title grid">
    <span class="nf__indicator" data-indicator></span>
    <div class="nf__cell" data-r="0" data-c="0">A</div>
    <div class="nf__cell" data-r="0" data-c="1">B</div>
    <div class="nf__cell" data-r="0" data-c="2">C</div>
    <div class="nf__cell" data-r="1" data-c="0">D</div>
    <div class="nf__cell" data-r="1" data-c="1">E</div>
    <div class="nf__cell" data-r="1" data-c="2">F</div>
    <div class="nf__cell" data-r="2" data-c="0">G</div>
    <div class="nf__cell" data-r="2" data-c="1">H</div>
    <div class="nf__cell" data-r="2" data-c="2">I</div>
  </div>
</div>`,
    css: `.nf__focusgrid{position:relative;display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:8px;outline:none}
.nf__cell{height:56px;display:grid;place-items:center;border:1px solid var(--rule);background:var(--ink);font:12px ui-monospace,monospace;color:var(--pewter)}
.nf__indicator{position:absolute;width:calc(33.333% - 5.34px);height:56px;border:2px solid var(--accent);top:8px;left:8px;transform:translate(0,0);transition:transform 200ms cubic-bezier(.4,0,.2,1);pointer-events:none}`,
    js: `var grid=document.querySelector('[data-grid]')
var indicator=document.querySelector('[data-indicator]')
var row=0,col=0
var STEP=64
function paint(){ indicator.style.transform='translate('+(col*STEP)+'px,'+(row*STEP)+'px)' }
grid.addEventListener('keydown',function(e){
  if(e.key==='ArrowRight'){ col=Math.min(2,col+1); e.preventDefault() }
  else if(e.key==='ArrowLeft'){ col=Math.max(0,col-1); e.preventDefault() }
  else if(e.key==='ArrowDown'){ row=Math.min(2,row+1); e.preventDefault() }
  else if(e.key==='ArrowUp'){ row=Math.max(0,row-1); e.preventDefault() }
  else return
  paint()
})
export function runFocusMove(dr,dc){
  row=Math.min(2,Math.max(0,row+dr))
  col=Math.min(2,Math.max(0,col+dc))
  paint()
}
grid.focus()
paint()
`,
    timing: { transitionMs: 200, stepPx: 64, easing: 'cubic-bezier(.4,0,.2,1)' },
    acceptance: [
      'Idle: indicator sits over cell A (row 0, col 0)',
      'Arrow keys move the indicator one cell at a time, sliding through the gap rather than jumping',
      'The indicator never leaves the 3x3 bounds',
      'Reduced motion moves the indicator instantly to the new cell',
    ],
  },
]

/** ---------- WAVE C ---------- */
const waveC = [
  {
    id: 'autoplay-preview-countdown',
    exportName: 'autoplayPreviewCountdown',
    spx: 'SPX-3153',
    nf: 'NF-044',
    title: 'Autoplay Preview Countdown',
    blurb:
      'Hovering a card counts down 3 seconds before the video preview autoplays, giving a brief window to move past without triggering it.',
    tags: ['preview', 'autoplay', 'countdown'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">AUTOPLAY PREVIEW COUNTDOWN</p>
  <div class="nf__stage" data-stage>
    <button type="button" class="nf__hoverzone" data-zone>
      <span class="nf__poster" aria-hidden="true"></span>
      <span class="nf__countdown" data-count hidden>Starting in <span data-n>3</span>\u2026</span>
      <span class="nf__playing" data-playing hidden>PREVIEW PLAYING</span>
    </button>
  </div>
</div>`,
    css: `.nf__stage{height:150px;display:grid;place-items:center}
.nf__hoverzone{position:relative;width:220px;height:130px;border:1px solid var(--rule);background:var(--ink);color:inherit;cursor:pointer;overflow:hidden}
.nf__poster{position:absolute;inset:0;background:linear-gradient(150deg,#2a3344,#1a2030)}
.nf__countdown,.nf__playing{position:relative;font:12px ui-monospace,monospace;background:rgba(10,10,13,.75);padding:6px 10px}
.nf__playing{color:var(--accent)}`,
    js: `${RM_HEAD}var timers=[]
function clear(){ timers.forEach(function(id){ window.clearTimeout(id) }); timers=[] }
export function runAutoplayCountdown(){
  clear()
  var count=document.querySelector('[data-count]')
  var n=document.querySelector('[data-n]')
  var playing=document.querySelector('[data-playing]')
  playing.hidden=true
  if(prefersRM()){ playing.hidden=false; count.hidden=true; return }
  count.hidden=false
  var remaining=3
  n.textContent=String(remaining)
  function tick(){
    remaining-=1
    if(remaining<=0){ count.hidden=true; playing.hidden=false; return }
    n.textContent=String(remaining)
    timers.push(window.setTimeout(tick,1000))
  }
  timers.push(window.setTimeout(tick,1000))
}
export function runAutoplayCancel(){
  clear()
  document.querySelector('[data-count]').hidden=true
  document.querySelector('[data-playing]').hidden=true
}
var zone=document.querySelector('[data-zone]')
zone.addEventListener('pointerenter',runAutoplayCountdown)
zone.addEventListener('focus',runAutoplayCountdown)
zone.addEventListener('pointerleave',runAutoplayCancel)
zone.addEventListener('blur',runAutoplayCancel)
`,
    timing: { countdownFromS: 3, tickMs: 1000 },
    acceptance: [
      'Hover or focus starts a 3-2-1 countdown over the poster',
      'Leaving before it reaches zero cancels the countdown entirely',
      'Reaching zero swaps the countdown text for a PREVIEW PLAYING label',
      'Reduced motion shows PREVIEW PLAYING immediately, skipping the counted delay',
    ],
  },
  {
    id: 'preview-start-crossfade',
    exportName: 'previewStartCrossfade',
    spx: 'SPX-3154',
    nf: 'NF-045',
    title: 'Preview Start Crossfade',
    blurb:
      'When an autoplay preview begins, the static poster crossfades into the moving preview layer instead of cutting.',
    tags: ['preview', 'autoplay', 'crossfade'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">PREVIEW START CROSSFADE</p>
  <div class="nf__stage" data-stage>
    <span class="nf__poster is-visible" data-poster aria-hidden="true"></span>
    <span class="nf__preview" data-preview aria-hidden="true"></span>
  </div>
  <div class="nf__actions">
    <button type="button" class="nf__btn" data-start>START PREVIEW</button>
    <button type="button" class="nf__btn" data-stop>SHOW POSTER</button>
  </div>
</div>`,
    css: `.nf__stage{height:150px}
.nf__poster,.nf__preview{position:absolute;inset:0;opacity:0;transition:opacity 400ms ease}
.nf__poster{background:linear-gradient(150deg,#2a3344,#1a2030)}
.nf__preview{background:repeating-linear-gradient(120deg,#4a2f1c,#4a2f1c 10px,#3a2416 10px,#3a2416 20px)}
.nf__poster.is-visible,.nf__preview.is-visible{opacity:1;z-index:1}`,
    js: `document.querySelector('[data-start]')?.addEventListener('click',function(){
  document.querySelector('[data-poster]').classList.remove('is-visible')
  document.querySelector('[data-preview]').classList.add('is-visible')
})
document.querySelector('[data-stop]')?.addEventListener('click',function(){
  document.querySelector('[data-preview]').classList.remove('is-visible')
  document.querySelector('[data-poster]').classList.add('is-visible')
})
`,
    timing: { crossfadeMs: 400, easing: 'ease' },
    acceptance: [
      'Idle: static poster visible, preview layer transparent',
      'START PREVIEW crossfades poster out and preview layer in over 400ms',
      'SHOW POSTER reverses the crossfade back to the static frame',
      'Reduced motion swaps the visible layer instantly',
    ],
  },
  {
    id: 'ten-second-seek-ripple',
    exportName: 'tenSecondSeekRipple',
    spx: 'SPX-3163',
    nf: 'NF-054',
    title: 'Ten-Second Seek Ripple',
    blurb:
      'Tapping the -10/+10 seek controls ripples outward from the icon and floats a brief +10/-10 label before fading.',
    tags: ['playback', 'seek', 'ripple'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">TEN-SECOND SEEK RIPPLE</p>
  <div class="nf__stage" data-stage>
    <p class="nf__clock" data-clock>00:42</p>
    <button type="button" class="nf__seek" data-seek="-10" aria-label="Back 10 seconds">\u25c0\u25c0 10</button>
    <button type="button" class="nf__seek" data-seek="10" aria-label="Forward 10 seconds">10 \u25b6\u25b6</button>
  </div>
</div>`,
    css: `.nf__stage{height:150px;display:flex;align-items:center;justify-content:space-between;padding:0 20px}
.nf__clock{position:absolute;top:10px;left:50%;transform:translateX(-50%);margin:0;font:12px ui-monospace,monospace;color:var(--pewter)}
.nf__seek{position:relative;padding:10px 12px;border:1px solid var(--rule);background:var(--panel2);color:var(--chalk);font:11px ui-monospace,monospace;cursor:pointer;overflow:visible}
.nf__ripple{position:absolute;left:50%;top:50%;width:10px;height:10px;margin:-5px 0 0 -5px;border-radius:50%;background:rgba(232,164,90,.5);transform:scale(0);opacity:1;pointer-events:none;transition:transform 420ms ease-out,opacity 420ms ease-out}
.nf__ripple.is-active{transform:scale(6);opacity:0}
.nf__float{position:absolute;bottom:100%;left:50%;transform:translate(-50%,0);font:11px ui-monospace,monospace;color:var(--accent);opacity:0;transition:opacity 420ms ease,transform 420ms ease;pointer-events:none}
.nf__float.is-active{opacity:1;transform:translate(-50%,-10px)}`,
    js: `var seconds=42
function fmt(s){ var m=Math.floor(s/60); var r=s%60; return String(m).padStart(2,'0')+':'+String(r).padStart(2,'0') }
function ripple(btn,label){
  var r=document.createElement('span'); r.className='nf__ripple'
  var f=document.createElement('span'); f.className='nf__float'; f.textContent=label
  btn.appendChild(r); btn.appendChild(f)
  requestAnimationFrame(function(){ r.classList.add('is-active'); f.classList.add('is-active') })
  window.setTimeout(function(){ r.remove(); f.remove() }, prefersRM()?0:420)
}
function prefersRM(){ var f=document.documentElement.getAttribute('data-force-reduced-motion')==='true'; return f||window.matchMedia('(prefers-reduced-motion: reduce)').matches }
export function runSeek(delta){
  seconds=Math.max(0,seconds+delta)
  document.querySelector('[data-clock]').textContent=fmt(seconds)
  var btn=document.querySelector('[data-seek="'+delta+'"]')
  if(btn) ripple(btn, delta>0?'+10':'-10')
}
document.querySelectorAll('[data-seek]').forEach(function(btn){
  btn.addEventListener('click',function(){ runSeek(Number(btn.getAttribute('data-seek'))) })
})
`,
    timing: { rippleMs: 420, seekStepS: 10, easing: 'ease-out' },
    acceptance: [
      'Clicking -10 or +10 updates the clock immediately by 10 seconds',
      'Each click ripples outward from the button and floats a +10/-10 label that fades over 420ms',
      'Multiple quick clicks can layer ripples without breaking the clock value',
      'Reduced motion updates the clock with no ripple or float animation',
    ],
  },
  {
    id: 'controls-idle-dissolve',
    exportName: 'controlsIdleDissolve',
    spx: 'SPX-3168',
    nf: 'NF-059',
    title: 'Controls Idle Dissolve',
    blurb:
      'Playback controls fully dissolve to invisible after 1.5 seconds of inactivity, distinct from a dimmed idle state.',
    tags: ['playback', 'controls', 'idle'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">CONTROLS IDLE DISSOLVE</p>
  <div class="nf__stage" data-stage tabindex="0">
    <div class="nf__chrome" data-chrome>
      <span>\u25c0\u25c0 10</span><span>\u275a\u275a</span><span>10 \u25b6\u25b6</span>
    </div>
  </div>
  <p class="nf__meta" data-status>Move pointer over the stage to reveal controls</p>
</div>`,
    css: `.nf__stage{height:150px;display:grid;place-items:center}
.nf__chrome{display:flex;gap:24px;font:12px ui-monospace,monospace;opacity:0;transition:opacity 600ms ease}
.nf__chrome.is-visible{opacity:1}`,
    js: `${RM_HEAD}var IDLE=1500
var timer=0
var stage=document.querySelector('[data-stage]')
var chrome=document.querySelector('[data-chrome]')
var status=document.querySelector('[data-status]')
export function runControlsShow(){
  chrome.classList.add('is-visible')
  if(status) status.textContent='Controls visible'
  window.clearTimeout(timer)
  if(prefersRM()) return
  timer=window.setTimeout(runControlsDissolve,IDLE)
}
export function runControlsDissolve(){
  chrome.classList.remove('is-visible')
  if(status) status.textContent='Controls dissolved'
}
stage.addEventListener('pointermove',runControlsShow)
stage.addEventListener('focus',runControlsShow)
`,
    timing: { idleMs: 1500, dissolveMs: 600, easing: 'ease' },
    acceptance: [
      'Idle: no controls visible on the stage',
      'Pointer movement or focus reveals the control chrome instantly',
      '1.5 seconds without further activity dissolves the chrome fully to opacity 0',
      'Reduced motion still reveals controls but they never auto-dissolve while reduced motion is forced',
    ],
  },
  {
    id: 'timeline-hover-preview',
    exportName: 'timelineHoverPreview',
    spx: 'SPX-3171',
    nf: 'NF-062',
    title: 'Timeline Hover Preview',
    blurb:
      'Moving the pointer along the timeline (without dragging) floats a thumbnail and timestamp above the cursor position.',
    tags: ['playback', 'timeline', 'hover'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">TIMELINE HOVER PREVIEW</p>
  <div class="nf__stage" data-stage>
    <div class="nf__thumb" data-thumb hidden><span data-time>00:00</span></div>
    <div class="nf__track" data-track></div>
  </div>
</div>`,
    css: `.nf__stage{height:150px;display:flex;align-items:flex-end;padding:0 12px 16px}
.nf__track{position:relative;width:100%;height:4px;background:var(--rule)}
.nf__thumb{position:absolute;bottom:34px;width:72px;height:42px;border:1px solid var(--accent);background:#1c2430;display:grid;place-items:center;font:10px ui-monospace,monospace;transform:translateX(-50%)}`,
    js: `var track=document.querySelector('[data-track]')
var thumb=document.querySelector('[data-thumb]')
var time=document.querySelector('[data-time]')
function fmt(sec){ var m=Math.floor(sec/60); var s=Math.floor(sec%60); return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0') }
export function runTimelineHover(pct){
  var w=track.clientWidth||280
  thumb.hidden=false
  thumb.style.left=(pct*w)+'px'
  time.textContent=fmt(pct*3600)
}
export function runTimelineLeave(){ thumb.hidden=true }
track.addEventListener('pointermove',function(e){
  var rect=track.getBoundingClientRect()
  var pct=Math.min(1,Math.max(0,(e.clientX-rect.left)/rect.width))
  runTimelineHover(pct)
})
track.addEventListener('pointerleave',runTimelineLeave)
`,
    timing: { totalDurationS: 3600, thumbOffsetPx: 34 },
    acceptance: [
      'Idle: no thumbnail preview visible above the track',
      'Moving the pointer along the track (without pressing) shows a thumbnail and timestamp at the cursor x position',
      'Leaving the track hides the preview',
      'Reduced motion still positions the preview but with no transition on movement',
    ],
  },
  {
    id: 'skip-intro-commit',
    exportName: 'skipIntroCommit',
    spx: 'SPX-3179',
    nf: 'NF-070',
    title: 'Skip Intro Commit',
    blurb:
      'Pressing Skip Intro visibly commits: the button collapses and the stage flashes the timestamp it jumped to.',
    tags: ['skip', 'commit', 'playback'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">SKIP INTRO COMMIT</p>
  <div class="nf__stage" data-stage>
    <p class="nf__clock" data-clock>00:14</p>
    <p class="nf__flash" data-flash hidden>Skipped to 01:32</p>
    <button type="button" class="nf__skip" data-skip>SKIP INTRO</button>
  </div>
</div>`,
    css: `.nf__stage{height:150px;display:grid;place-items:center}
.nf__clock{position:absolute;top:10px;left:10px;margin:0;font:12px ui-monospace,monospace;color:var(--pewter)}
.nf__skip{position:absolute;right:14px;bottom:14px;padding:9px 14px;border:1px solid var(--chalk);background:var(--chalk);color:var(--ink);font:11px ui-monospace,monospace;letter-spacing:.08em;cursor:pointer;transform:scale(1);opacity:1;transition:transform 220ms cubic-bezier(.4,0,.2,1),opacity 220ms}
.nf__skip.is-committed{transform:scale(.7);opacity:0;pointer-events:none}
.nf__flash{margin:0;font:13px ui-monospace,monospace;color:var(--accent);opacity:0;transition:opacity 260ms ease}
.nf__flash.is-visible{opacity:1}`,
    js: `var skip=document.querySelector('[data-skip]')
var clock=document.querySelector('[data-clock]')
var flash=document.querySelector('[data-flash]')
export function runSkipCommit(){
  skip.classList.add('is-committed')
  clock.textContent='01:32'
  flash.hidden=false
  flash.classList.add('is-visible')
  window.setTimeout(function(){ flash.classList.remove('is-visible') }, prefersRM()?0:1200)
}
function prefersRM(){ var f=document.documentElement.getAttribute('data-force-reduced-motion')==='true'; return f||window.matchMedia('(prefers-reduced-motion: reduce)').matches }
skip.addEventListener('click',runSkipCommit)
`,
    timing: { commitMs: 220, flashHoldMs: 1200 },
    acceptance: [
      'Clicking SKIP INTRO collapses the button and jumps the clock to 01:32',
      'A brief flash confirms the new timestamp, then fades after 1.2s',
      'The button never reappears once committed for this playback',
      'Reduced motion applies the same end state instantly with the flash shown then hidden without animating',
    ],
  },
  {
    id: 'next-up-cancel',
    exportName: 'nextUpCancel',
    spx: 'SPX-3185',
    nf: 'NF-076',
    title: 'Next-Up Cancel',
    blurb:
      'Cancelling a next-up countdown slides the up-next card away and swaps in a small "Cancelled" chip rather than just disappearing.',
    tags: ['next-up', 'cancel', 'playback'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">NEXT-UP CANCEL</p>
  <div class="nf__nextup" data-card>
    <div class="nf__ring" data-ring style="--pct:0"><span class="nf__ring-label" data-n>5</span></div>
    <div class="nf__nextinfo">
      <p class="nf__nextep">S1 E4 \u00b7 Deep Current</p>
      <button type="button" class="nf__btn" data-cancel>CANCEL</button>
    </div>
  </div>
  <span class="nf__chip" data-cancelled hidden>Cancelled</span>
  <div class="nf__actions">
    <button type="button" class="nf__btn" data-start>START NEXT-UP</button>
  </div>
</div>`,
    css: `.nf__nextup{display:flex;gap:12px;align-items:center;padding:10px;border:1px solid var(--rule);background:var(--ink);transition:opacity 260ms ease,transform 260ms ease}
.nf__nextup.is-cancelled{opacity:0;transform:translateX(24px);pointer-events:none}
.nf__ring{--pct:0;width:44px;height:44px;border-radius:50%;background:conic-gradient(var(--accent) calc(var(--pct)*1%),var(--rule) 0);display:grid;place-items:center;flex:0 0 auto}
.nf__ring-label{width:32px;height:32px;border-radius:50%;background:var(--ink);display:grid;place-items:center;font:11px ui-monospace,monospace}
.nf__nextep{margin:0 0 6px;font-size:12px}
.nf__chip{display:inline-block;margin-top:8px;padding:5px 10px;font-size:11px;border:1px solid var(--pewter);color:var(--pewter)}`,
    js: `${RM_HEAD}var timers=[]
function clear(){ timers.forEach(function(id){ window.clearTimeout(id) }); timers=[] }
export function runNextUpStart(){
  clear()
  var card=document.querySelector('[data-card]')
  var ring=document.querySelector('[data-ring]')
  var n=document.querySelector('[data-n]')
  var cancelled=document.querySelector('[data-cancelled]')
  card.classList.remove('is-cancelled')
  cancelled.hidden=true
  var remaining=5
  function tick(){
    var pct=Math.round(((5-remaining)/5)*100)
    ring.style.setProperty('--pct',String(pct))
    n.textContent=String(remaining)
    if(remaining<=0) return
    remaining-=1
    timers.push(window.setTimeout(tick,1000))
  }
  if(prefersRM()){ ring.style.setProperty('--pct','100'); n.textContent='0'; return }
  tick()
}
export function runNextUpCancel(){
  clear()
  document.querySelector('[data-card]').classList.add('is-cancelled')
  document.querySelector('[data-cancelled]').hidden=false
}
document.querySelector('[data-start]')?.addEventListener('click',runNextUpStart)
document.querySelector('[data-cancel]')?.addEventListener('click',runNextUpCancel)
`,
    timing: { countdownFromS: 5, tickMs: 1000, slideMs: 260 },
    acceptance: [
      'START NEXT-UP fills the ring toward 100% over 5 seconds',
      'CANCEL at any point slides the up-next card out and reveals a Cancelled chip',
      'A cancelled countdown never resumes on its own',
      'Reduced motion resolves the ring to complete immediately; cancel still slides but instantly',
    ],
  },
  {
    id: 'binge-continuation-transition',
    exportName: 'bingeContinuationTransition',
    spx: 'SPX-3190',
    nf: 'NF-081',
    title: 'Binge Continuation Transition',
    blurb:
      'Continuing from an end-credits screen wipes the credits panel upward to reveal the next episode already in progress beneath it.',
    tags: ['binge', 'continuation', 'wipe'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">BINGE CONTINUATION TRANSITION</p>
  <div class="nf__stage" data-stage>
    <div class="nf__nowplaying" data-now>NOW PLAYING: Episode 5</div>
    <div class="nf__credits" data-credits>
      <p class="nf__credits-title">END OF EPISODE 4</p>
      <button type="button" class="nf__btn" data-continue>CONTINUE</button>
    </div>
  </div>
</div>`,
    css: `.nf__stage{height:160px}
.nf__nowplaying{position:absolute;inset:0;display:grid;place-items:center;background:linear-gradient(150deg,#243a2c,#101a14);color:var(--accent);font:13px ui-monospace,monospace}
.nf__credits{position:absolute;inset:0;display:flex;flex-direction:column;gap:10px;align-items:center;justify-content:center;background:var(--ink);transform:translateY(0);transition:transform 420ms cubic-bezier(.4,0,.2,1)}
.nf__credits.is-continuing{transform:translateY(-100%)}
.nf__credits-title{margin:0;font:12px ui-monospace,monospace;color:var(--pewter)}`,
    js: `document.querySelector('[data-continue]')?.addEventListener('click',function(){
  document.querySelector('[data-credits]').classList.add('is-continuing')
})
`,
    timing: { wipeMs: 420, easing: 'cubic-bezier(.4,0,.2,1)' },
    acceptance: [
      'Idle: credits panel fully covers the now-playing layer beneath it',
      'CONTINUE wipes the credits panel upward off-stage over 420ms',
      'The next episode layer is revealed underneath, not cut to separately',
      'Reduced motion moves the credits panel out of view instantly',
    ],
  },
  {
    id: 'minimal-buffer-spinner',
    exportName: 'minimalBufferSpinner',
    spx: 'SPX-3191',
    nf: 'NF-082',
    title: 'Minimal Buffer Spinner',
    blurb:
      'A minimal single-stroke ring spins while content buffers, with no chrome besides the spinner itself.',
    tags: ['buffer', 'spinner', 'minimal'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">MINIMAL BUFFER SPINNER</p>
  <div class="nf__stage" data-stage>
    <span class="nf__spinner" data-spinner hidden></span>
  </div>
  <div class="nf__actions">
    <button type="button" class="nf__btn" data-buffer>BUFFER</button>
    <button type="button" class="nf__btn" data-ready>READY</button>
  </div>
</div>`,
    css: `.nf__stage{height:150px;display:grid;place-items:center}
.nf__spinner{width:30px;height:30px;border-radius:50%;border:3px solid var(--rule);border-top-color:var(--accent);animation:nfspin 800ms linear infinite}
@keyframes nfspin{to{transform:rotate(360deg)}}`,
    js: `var spinner=document.querySelector('[data-spinner]')
export function runBufferStart(){ spinner.hidden=false }
export function runBufferStop(){ spinner.hidden=true }
document.querySelector('[data-buffer]')?.addEventListener('click',runBufferStart)
document.querySelector('[data-ready]')?.addEventListener('click',runBufferStop)
`,
    timing: { spinMs: 800, easing: 'linear' },
    acceptance: [
      'Idle: no spinner visible',
      'BUFFER shows a single-stroke ring spinning continuously',
      'READY hides the spinner immediately',
      'Reduced motion keeps the spinner visible but frozen, not spinning',
    ],
  },
  {
    id: 'buffer-to-playback-resolve',
    exportName: 'bufferToPlaybackResolve',
    spx: 'SPX-3192',
    nf: 'NF-083',
    title: 'Buffer-to-Playback Resolve',
    blurb:
      'A buffering spinner morphs directly into a play icon the instant content is ready, rather than the spinner just vanishing.',
    tags: ['buffer', 'resolve', 'playback'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">BUFFER-TO-PLAYBACK RESOLVE</p>
  <div class="nf__stage" data-stage>
    <span class="nf__morph" data-morph>
      <span class="nf__spinner" data-spinner></span>
      <span class="nf__playicon" data-play>\u25b6</span>
    </span>
  </div>
  <div class="nf__actions">
    <button type="button" class="nf__btn" data-load>SIMULATE LOAD</button>
  </div>
</div>`,
    css: `.nf__stage{height:150px;display:grid;place-items:center}
.nf__morph{position:relative;width:40px;height:40px;display:grid;place-items:center}
.nf__spinner{position:absolute;width:32px;height:32px;border-radius:50%;border:3px solid var(--rule);border-top-color:var(--accent);animation:nfspin 800ms linear infinite;opacity:1;transition:opacity 240ms ease,transform 240ms ease}
.nf__playicon{position:absolute;font-size:22px;color:var(--accent);opacity:0;transform:scale(.6);transition:opacity 240ms ease,transform 240ms ease}
.nf__morph.is-ready .nf__spinner{opacity:0;transform:scale(.6)}
.nf__morph.is-ready .nf__playicon{opacity:1;transform:scale(1)}
@keyframes nfspin{to{transform:rotate(360deg)}}`,
    js: `${RM_HEAD}var timer=0
export function runBufferResolve(){
  var morph=document.querySelector('[data-morph]')
  morph.classList.remove('is-ready')
  window.clearTimeout(timer)
  if(prefersRM()){ morph.classList.add('is-ready'); return }
  timer=window.setTimeout(function(){ morph.classList.add('is-ready') },1800)
}
document.querySelector('[data-load]')?.addEventListener('click',runBufferResolve)
`,
    timing: { loadMs: 1800, morphMs: 240 },
    acceptance: [
      'SIMULATE LOAD starts the spinner spinning',
      'After 1.8s the spinner fades and shrinks while a play icon fades and grows in the same spot',
      'The two icons never both appear at full opacity together',
      'Reduced motion jumps straight to the play icon with no spin phase',
    ],
  },
]

/** ---------- WAVE D ---------- */
const waveD = [
  {
    id: 'whos-watching-grid-focus',
    exportName: 'whosWatchingGridFocus',
    spx: 'SPX-3118',
    nf: 'NF-009',
    title: "Who's Watching Grid Focus",
    blurb:
      'Hovering or focusing a profile avatar in the who\u2019s-watching grid scales it up and reveals its name label beneath.',
    tags: ['profile', 'grid', 'focus'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">WHO'S WATCHING</p>
  <div class="nf__profiles" data-grid>
    <button type="button" class="nf__avatar" data-name="Robin" style="background:#3a5a6e"></button>
    <button type="button" class="nf__avatar" data-name="Sam" style="background:#6e3a4e"></button>
    <button type="button" class="nf__avatar" data-name="Kids" style="background:#4e6e3a"></button>
  </div>
</div>`,
    css: `.nf__profiles{display:flex;gap:18px;justify-content:center;padding:12px 0}
.nf__avatar{position:relative;width:64px;height:64px;border-radius:8px;border:2px solid transparent;cursor:pointer;transition:transform 200ms cubic-bezier(.4,0,.2,1),border-color 200ms}
.nf__avatar::after{content:attr(data-name);position:absolute;top:100%;left:50%;transform:translateX(-50%);margin-top:8px;font-size:11px;color:var(--pewter);opacity:0;white-space:nowrap;transition:opacity 200ms ease}
.nf__avatar:hover,.nf__avatar:focus-visible{transform:scale(1.12);border-color:var(--chalk)}
.nf__avatar:hover::after,.nf__avatar:focus-visible::after{opacity:1}`,
    js: `// Pure hover/focus state via CSS; export for parity with other specimens
export function runProfileFocus(name){
  var el=document.querySelector('[data-name="'+name+'"]')
  if(el) el.focus()
}
`,
    timing: { transitionMs: 200, hoverScale: 1.12, easing: 'cubic-bezier(.4,0,.2,1)' },
    acceptance: [
      'Idle: all three avatars flush at the same scale, no name labels visible',
      'Hovering or focusing an avatar scales it up and reveals its name beneath',
      'Only one avatar is scaled at a time',
      'Reduced motion applies the scaled/labelled state instantly',
    ],
  },
  {
    id: 'profile-avatar-select-snap',
    exportName: 'profileAvatarSelectSnap',
    spx: 'SPX-3119',
    nf: 'NF-010',
    title: 'Profile Avatar Select Snap',
    blurb:
      'Selecting a profile avatar snaps it down briefly then confirms with a checkmark overlay while the others dim.',
    tags: ['profile', 'select', 'confirm'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">PROFILE AVATAR SELECT SNAP</p>
  <div class="nf__profiles" data-grid>
    <button type="button" class="nf__avatar" data-id="0" style="background:#3a5a6e"><span class="nf__check" aria-hidden="true">\u2713</span></button>
    <button type="button" class="nf__avatar" data-id="1" style="background:#6e3a4e"><span class="nf__check" aria-hidden="true">\u2713</span></button>
    <button type="button" class="nf__avatar" data-id="2" style="background:#4e6e3a"><span class="nf__check" aria-hidden="true">\u2713</span></button>
  </div>
</div>`,
    css: `.nf__profiles{display:flex;gap:18px;justify-content:center;padding:12px 0}
.nf__avatar{position:relative;width:64px;height:64px;border-radius:8px;border:2px solid transparent;cursor:pointer;transform:scale(1);opacity:1;transition:transform 160ms cubic-bezier(.4,0,.2,1),opacity 200ms ease,border-color 200ms}
.nf__profiles.has-selection .nf__avatar:not(.is-selected){opacity:.35}
.nf__avatar.is-selected{border-color:var(--accent)}
.nf__check{position:absolute;inset:0;display:grid;place-items:center;font-size:22px;color:#fff;opacity:0;transition:opacity 180ms ease}
.nf__avatar.is-selected .nf__check{opacity:1}`,
    js: `${RM_HEAD}var grid=document.querySelector('[data-grid]')
export function runProfileSelect(id){
  var el=grid.querySelector('[data-id="'+id+'"]')
  if(!el) return
  grid.querySelectorAll('.nf__avatar').forEach(function(a){ a.classList.remove('is-selected') })
  if(prefersRM()){ grid.classList.add('has-selection'); el.classList.add('is-selected'); return }
  el.style.transform='scale(.88)'
  window.setTimeout(function(){
    el.style.transform=''
    grid.classList.add('has-selection')
    el.classList.add('is-selected')
  },160)
}
grid.addEventListener('click',function(e){
  var btn=e.target.closest('[data-id]')
  if(btn) runProfileSelect(btn.getAttribute('data-id'))
})
`,
    timing: { snapMs: 160, confirmMs: 180 },
    acceptance: [
      'Clicking an avatar snaps it down briefly then a checkmark fades in over it',
      'The other avatars dim to 35% opacity once a selection is made',
      'Selecting a different avatar moves the checkmark and dimming accordingly',
      'Reduced motion applies the selected/dimmed end state immediately, no snap',
    ],
  },
  {
    id: 'match-confidence-meter',
    exportName: 'matchConfidenceMeter',
    spx: 'SPX-3214',
    nf: 'NF-105',
    title: 'Match Confidence Meter',
    blurb:
      'A match-percentage meter fills from zero to its target value while the numeral counts up in step with the bar.',
    tags: ['match', 'meter', 'metadata'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">MATCH CONFIDENCE METER</p>
  <p class="nf__matchnum"><span data-num>0</span>% Match</p>
  <div class="nf__meter"><div class="nf__meter-fill" data-fill></div></div>
  <div class="nf__actions">
    <button type="button" class="nf__btn" data-calc>CALCULATE MATCH</button>
  </div>
</div>`,
    css: `.nf__matchnum{margin:0 0 8px;font:700 20px ui-monospace,monospace;color:var(--accent)}
.nf__meter{height:6px;background:var(--rule);overflow:hidden}
.nf__meter-fill{height:100%;width:0%;background:var(--accent);transition:width 900ms cubic-bezier(.22,.61,.36,1)}`,
    js: `${RM_HEAD}var timer=0
export function runMatchCalculate(){
  var target=96
  var fill=document.querySelector('[data-fill]')
  var num=document.querySelector('[data-num]')
  if(prefersRM()){ fill.style.width=target+'%'; num.textContent=String(target); return }
  fill.style.width=target+'%'
  var start=null
  function step(ts){
    if(start===null) start=ts
    var elapsed=ts-start
    var pct=Math.min(1,elapsed/900)
    num.textContent=String(Math.round(pct*target))
    if(pct<1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}
document.querySelector('[data-calc]')?.addEventListener('click',runMatchCalculate)
`,
    timing: { fillMs: 900, targetPct: 96, easing: 'cubic-bezier(.22,.61,.36,1)' },
    acceptance: [
      'Idle: meter at 0%, numeral reads 0',
      'CALCULATE MATCH fills the bar to 96% over 900ms while the numeral counts up in sync',
      'The numeral never exceeds the bar\u2019s current fill percentage',
      'Reduced motion sets both the bar and numeral to 96% immediately',
    ],
  },
  {
    id: 'thumb-rating-feedback',
    exportName: 'thumbRatingFeedback',
    spx: 'SPX-3215',
    nf: 'NF-106',
    title: 'Thumb Rating Feedback',
    blurb:
      'Rating a title bounces and fills the chosen thumb icon, dims the other, and shows a brief thanks message.',
    tags: ['rating', 'feedback', 'thumbs'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">THUMB RATING FEEDBACK</p>
  <div class="nf__thumbs">
    <button type="button" class="nf__thumb" data-rate="up" aria-label="Rate thumbs up">\ud83d\udc4d</button>
    <button type="button" class="nf__thumb" data-rate="down" aria-label="Rate thumbs down">\ud83d\udc4e</button>
  </div>
  <p class="nf__thanks" data-thanks hidden>Thanks for your feedback</p>
</div>`,
    css: `.nf__thumbs{display:flex;gap:14px;justify-content:center}
.nf__thumb{width:52px;height:52px;border:1px solid var(--rule);background:var(--ink);font-size:22px;cursor:pointer;transform:scale(1);opacity:1;transition:transform 220ms cubic-bezier(.34,1.56,.64,1),opacity 200ms,border-color 200ms}
.nf__thumb.is-picked{border-color:var(--accent);transform:scale(1.18)}
.nf__thumb.is-dimmed{opacity:.35}
.nf__thanks{margin-top:10px;text-align:center;font-size:11px;color:var(--pewter);opacity:0;transition:opacity 220ms ease}
.nf__thanks.is-visible{opacity:1}`,
    js: `var thumbs=document.querySelectorAll('[data-rate]')
export function runThumbRate(choice){
  thumbs.forEach(function(t){
    var mine=t.getAttribute('data-rate')===choice
    t.classList.toggle('is-picked',mine)
    t.classList.toggle('is-dimmed',!mine)
  })
  var thanks=document.querySelector('[data-thanks]')
  thanks.hidden=false
  requestAnimationFrame(function(){ thanks.classList.add('is-visible') })
}
thumbs.forEach(function(t){ t.addEventListener('click',function(){ runThumbRate(t.getAttribute('data-rate')) }) })
`,
    timing: { bounceMs: 220, easing: 'cubic-bezier(.34,1.56,.64,1)' },
    acceptance: [
      'Clicking a thumb bounces it up with a spring-like overshoot and highlights its border',
      'The other thumb dims to 35% opacity',
      'A thanks message fades in beneath the thumbs',
      'Reduced motion applies the picked/dimmed state without the bounce overshoot',
    ],
  },
  {
    id: 'add-to-list-confirmation',
    exportName: 'addToListConfirmation',
    spx: 'SPX-3220',
    nf: 'NF-111',
    title: 'Add-to-List Confirmation',
    blurb:
      'A plus icon morphs into a checkmark with a brief pulse when a title is added to the list.',
    tags: ['list', 'confirm', 'morph'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">ADD-TO-LIST CONFIRMATION</p>
  <button type="button" class="nf__addbtn" data-add aria-label="Add to My List">
    <span class="nf__plus" data-plus>+</span>
    <span class="nf__tick" data-tick>\u2713</span>
  </button>
  <div class="nf__actions">
    <button type="button" class="nf__btn" data-reset>RESET</button>
  </div>
</div>`,
    css: `.nf__addbtn{position:relative;width:52px;height:52px;margin:0 auto;display:grid;place-items:center;border:1px solid var(--chalk);background:transparent;color:var(--chalk);cursor:pointer;border-radius:50%}
.nf__plus,.nf__tick{position:absolute;font-size:22px;transition:opacity 200ms ease,transform 200ms cubic-bezier(.34,1.56,.64,1)}
.nf__tick{opacity:0;transform:scale(.4);color:var(--accent)}
.nf__addbtn.is-added .nf__plus{opacity:0;transform:scale(.4) rotate(45deg)}
.nf__addbtn.is-added .nf__tick{opacity:1;transform:scale(1)}
.nf__addbtn.is-added{border-color:var(--accent)}`,
    js: `var btn=document.querySelector('[data-add]')
export function runAddToList(){ btn.classList.add('is-added') }
export function runAddToListReset(){ btn.classList.remove('is-added') }
btn.addEventListener('click',runAddToList)
document.querySelector('[data-reset]')?.addEventListener('click',runAddToListReset)
`,
    timing: { morphMs: 200, easing: 'cubic-bezier(.34,1.56,.64,1)' },
    acceptance: [
      'Idle: plus icon shown in an outlined circle',
      'Clicking morphs the plus into a checkmark with a small spring pop and accent border',
      'RESET reverses the morph back to the plus icon',
      'Reduced motion swaps the icon instantly with no rotation or overshoot',
    ],
  },
  {
    id: 'remove-from-list-undo',
    exportName: 'removeFromListUndo',
    spx: 'SPX-3221',
    nf: 'NF-112',
    title: 'Remove-from-List Undo',
    blurb:
      'Removing a title collapses its row and raises an undo snackbar; undoing restores the row to its original slot.',
    tags: ['list', 'undo', 'snackbar'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">REMOVE-FROM-LIST UNDO</p>
  <ul class="nf__listrows" data-list>
    <li class="nf__listrow" data-row="1">Amber Field <button type="button" class="nf__btn" data-remove>REMOVE</button></li>
    <li class="nf__listrow" data-row="2">Bravo Signal</li>
  </ul>
  <div class="nf__snackbar" data-snackbar hidden>Removed from My List <button type="button" class="nf__link" data-undo>UNDO</button></div>
</div>`,
    css: `.nf__listrows{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}
.nf__listrow{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px;border:1px solid var(--rule);background:var(--ink);font-size:13px;max-height:60px;overflow:hidden;opacity:1;transition:opacity 240ms ease,max-height 240ms ease,padding 240ms ease,margin 240ms ease}
.nf__listrow.is-removed{opacity:0;max-height:0;padding:0 10px;margin:0;border-color:transparent}
.nf__link{background:none;border:0;color:var(--accent);text-decoration:underline;cursor:pointer;font:11px ui-monospace,monospace}
.nf__snackbar{margin-top:10px;padding:10px;border:1px solid var(--rule);background:var(--panel2);font-size:12px;display:flex;justify-content:space-between;gap:10px}`,
    js: `var list=document.querySelector('[data-list]')
var snackbar=document.querySelector('[data-snackbar]')
var lastRemoved=null
export function runRemoveFromList(){
  var row=list.querySelector('[data-row="1"]')
  if(!row) return
  row.classList.add('is-removed')
  lastRemoved=row
  snackbar.hidden=false
}
export function runUndoRemove(){
  if(lastRemoved){ lastRemoved.classList.remove('is-removed') }
  snackbar.hidden=true
}
document.querySelector('[data-remove]')?.addEventListener('click',runRemoveFromList)
document.querySelector('[data-undo]')?.addEventListener('click',runUndoRemove)
`,
    timing: { collapseMs: 240 },
    acceptance: [
      'REMOVE collapses that row\u2019s height and opacity to zero and shows an undo snackbar',
      'UNDO restores the row to its original height and position',
      'The snackbar stays visible until UNDO is pressed',
      'Reduced motion collapses/restores the row instantly',
    ],
  },
  {
    id: 'resume-playback-handoff',
    exportName: 'resumePlaybackHandoff',
    spx: 'SPX-3226',
    nf: 'NF-117',
    title: 'Resume Playback Handoff',
    blurb:
      'Resuming from a card scales and crossfades the card directly into a full player stage, carrying its progress bar across.',
    tags: ['resume', 'handoff', 'playback'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">RESUME PLAYBACK HANDOFF</p>
  <div class="nf__handoff" data-handoff>
    <button type="button" class="nf__card" data-card>
      <span class="nf__poster" aria-hidden="true"></span>
      <span class="nf__progress"><span class="nf__progress-fill" style="width:38%"></span></span>
      <span class="nf__resume">RESUME</span>
    </button>
    <div class="nf__player" data-player>
      <span class="nf__player-progress"><span class="nf__player-fill" style="width:38%"></span></span>
      <p class="nf__playing">NOW PLAYING</p>
    </div>
  </div>
</div>`,
    css: `.nf__handoff{position:relative;height:170px;display:grid;place-items:center}
.nf__card{position:relative;width:150px;height:150px;border:1px solid var(--rule);background:var(--ink);color:inherit;cursor:pointer;display:flex;flex-direction:column;justify-content:flex-end;padding:8px;transition:transform 380ms cubic-bezier(.4,0,.2,1),opacity 380ms ease}
.nf__poster{position:absolute;inset:0;background:linear-gradient(150deg,#2a3344,#1a2030)}
.nf__progress,.nf__player-progress{position:relative;height:3px;background:var(--rule);margin-bottom:6px}
.nf__progress-fill,.nf__player-fill{position:absolute;inset:0;width:38%;background:var(--accent)}
.nf__resume{position:relative;font-size:11px;letter-spacing:.08em}
.nf__player{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:14px;background:var(--ink);opacity:0;transition:opacity 380ms ease}
.nf__playing{margin:0;font:12px ui-monospace,monospace;color:var(--accent)}
.nf__handoff.is-handed-off .nf__card{transform:scale(1.3);opacity:0}
.nf__handoff.is-handed-off .nf__player{opacity:1;z-index:1}`,
    js: `var handoff=document.querySelector('[data-handoff]')
document.querySelector('[data-card]')?.addEventListener('click',function(){
  handoff.classList.add('is-handed-off')
})
`,
    timing: { handoffMs: 380, easing: 'cubic-bezier(.4,0,.2,1)' },
    acceptance: [
      'Idle: a card with a 38% progress bar and RESUME label',
      'Clicking the card scales it up and fades it out while the full player fades in over it',
      'The 38% progress value is preserved on the player\u2019s own progress bar',
      'Reduced motion swaps card for player instantly with the same progress value',
    ],
  },
  {
    id: 'continue-watching-progress-bar',
    exportName: 'continueWatchingProgressBar',
    spx: 'SPX-3227',
    nf: 'NF-118',
    title: 'Continue-Watching Progress Bar',
    blurb:
      'Hovering a continue-watching card thickens its progress bar and reveals a play button overlay without moving the card.',
    tags: ['continue-watching', 'progress', 'hover'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">CONTINUE-WATCHING PROGRESS BAR</p>
  <div class="nf__cwcard" data-card tabindex="0">
    <span class="nf__poster" aria-hidden="true"></span>
    <span class="nf__playoverlay" data-overlay aria-hidden="true">\u25b6</span>
    <span class="nf__cwbar"><span class="nf__cwfill" data-fill style="width:57%"></span></span>
  </div>
  <div class="nf__actions">
    <button type="button" class="nf__btn" data-bump>+10% PROGRESS</button>
  </div>
</div>`,
    css: `.nf__cwcard{position:relative;width:200px;height:130px;margin:0 auto;border:1px solid var(--rule);cursor:pointer;overflow:hidden}
.nf__poster{position:absolute;inset:0;background:linear-gradient(150deg,#2a3344,#1a2030)}
.nf__playoverlay{position:absolute;inset:0;display:grid;place-items:center;font-size:22px;color:#fff;background:rgba(10,10,13,0);opacity:0;transition:opacity 200ms ease,background 200ms ease}
.nf__cwcard:hover .nf__playoverlay,.nf__cwcard:focus-visible .nf__playoverlay{opacity:1;background:rgba(10,10,13,.35)}
.nf__cwbar{position:absolute;left:0;right:0;bottom:0;height:3px;background:rgba(236,238,241,.25);transition:height 200ms ease}
.nf__cwcard:hover .nf__cwbar,.nf__cwcard:focus-visible .nf__cwbar{height:6px}
.nf__cwfill{position:absolute;inset:0;width:57%;background:var(--accent);transition:width 400ms ease}`,
    js: `var fill=document.querySelector('[data-fill]')
var pct=57
export function runProgressBump(){
  pct=Math.min(100,pct+10)
  fill.style.width=pct+'%'
}
document.querySelector('[data-bump]')?.addEventListener('click',runProgressBump)
`,
    timing: { hoverTransitionMs: 200, fillTransitionMs: 400 },
    acceptance: [
      'Idle: thin 3px progress bar at 57%, no play overlay',
      'Hover or focus thickens the bar to 6px and fades in a play icon overlay',
      '+10% PROGRESS grows the fill width smoothly without resetting the hover state',
      'Reduced motion applies the hover/progress states with no transition',
    ],
  },
  {
    id: 'details-close-return',
    exportName: 'detailsCloseReturn',
    spx: 'SPX-3202',
    nf: 'NF-093',
    title: 'Details Close Return',
    blurb:
      'Closing an open details panel returns it exactly to its origin card geometry rather than just disappearing.',
    tags: ['details', 'close', 'return'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">DETAILS CLOSE RETURN</p>
  <div class="nf__detailhost" data-host>
    <button type="button" class="nf__card" data-origin>
      <span class="nf__poster" aria-hidden="true"></span>
    </button>
    <div class="nf__panel" data-panel hidden>
      <p class="nf__panel-title">Midnight Circuit</p>
      <p class="nf__panel-body">Match 94% \u00b7 8 episodes \u00b7 Drama</p>
      <button type="button" class="nf__btn" data-close>CLOSE</button>
    </div>
  </div>
  <div class="nf__actions">
    <button type="button" class="nf__btn" data-open>OPEN DETAILS</button>
  </div>
</div>`,
    css: `.nf__detailhost{position:relative;height:170px;display:grid;place-items:center}
.nf__card{position:relative;width:110px;height:150px;border:1px solid var(--rule);background:var(--ink);cursor:pointer;transition:transform 280ms cubic-bezier(.4,0,.2,1),opacity 220ms ease}
.nf__poster{position:absolute;inset:0;background:linear-gradient(150deg,#2a3344,#1a2030)}
.nf__panel{position:absolute;inset:10px;padding:14px;border:1px solid var(--accent);background:var(--panel2);opacity:0;transform:scale(.85);transition:opacity 280ms ease,transform 280ms cubic-bezier(.4,0,.2,1)}
.nf__panel.is-open{opacity:1;transform:scale(1)}
.nf__detailhost.is-open .nf__card{opacity:0;transform:scale(.85)}
.nf__panel-title{margin:0 0 6px;font-weight:600}
.nf__panel-body{margin:0 0 10px;font-size:12px;color:var(--pewter)}`,
    js: `var host=document.querySelector('[data-host]')
var panel=document.querySelector('[data-panel]')
export function runDetailsOpenReturn(){
  host.classList.add('is-open')
  panel.hidden=false
  requestAnimationFrame(function(){ panel.classList.add('is-open') })
}
export function runDetailsCloseReturn(){
  panel.classList.remove('is-open')
  host.classList.remove('is-open')
  window.setTimeout(function(){ panel.hidden=true }, prefersRM()?0:280)
}
function prefersRM(){ var f=document.documentElement.getAttribute('data-force-reduced-motion')==='true'; return f||window.matchMedia('(prefers-reduced-motion: reduce)').matches }
document.querySelector('[data-open]')?.addEventListener('click',runDetailsOpenReturn)
document.querySelector('[data-close]')?.addEventListener('click',runDetailsCloseReturn)
`,
    timing: { openMs: 280, closeMs: 280, easing: 'cubic-bezier(.4,0,.2,1)' },
    acceptance: [
      'OPEN DETAILS scales the panel up from the card\u2019s footprint while the card fades out',
      'CLOSE reverses exactly: panel scales back down and fades, then the origin card reappears at full opacity',
      'The origin card never shifts position across open/close cycles',
      'Reduced motion applies open/closed end states immediately',
    ],
  },
  {
    id: 'back-navigation-return',
    exportName: 'backNavigationReturn',
    spx: 'SPX-3268',
    nf: 'NF-159',
    title: 'Back Navigation Return',
    blurb:
      'Navigating back from a detail view returns to the grid with the originating card getting a brief highlight ring.',
    tags: ['navigation', 'back', 'return'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">BACK NAVIGATION RETURN</p>
  <div class="nf__navhost" data-host>
    <div class="nf__grid3" data-grid>
      <span class="nf__card" data-card="0"></span>
      <span class="nf__card" data-card="1"></span>
      <span class="nf__card" data-card="2"></span>
    </div>
    <div class="nf__detailview" data-detail hidden>
      <p class="nf__panel-title">Bravo Signal</p>
      <button type="button" class="nf__btn" data-back>BACK</button>
    </div>
  </div>
</div>`,
    css: `.nf__navhost{position:relative;min-height:160px}
.nf__grid3{display:flex;gap:10px;justify-content:center;padding:16px 0}
.nf__card{width:100px;height:130px;border:1px solid var(--rule);background:linear-gradient(150deg,#2a3344,#1a2030);cursor:pointer;transition:box-shadow 300ms ease}
.nf__card.is-returned{box-shadow:0 0 0 2px var(--accent)}
.nf__detailview{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:var(--panel2)}
.nf__panel-title{margin:0;font-weight:600}`,
    js: `var host=document.querySelector('[data-host]')
var grid=document.querySelector('[data-grid]')
var detail=document.querySelector('[data-detail]')
var lastOpened=1
grid.addEventListener('click',function(e){
  var card=e.target.closest('[data-card]')
  if(!card) return
  lastOpened=Number(card.getAttribute('data-card'))
  grid.hidden=true
  detail.hidden=false
})
document.querySelector('[data-back]')?.addEventListener('click',function(){
  detail.hidden=true
  grid.hidden=false
  var card=grid.querySelector('[data-card="'+lastOpened+'"]')
  if(card){
    card.classList.add('is-returned')
    window.setTimeout(function(){ card.classList.remove('is-returned') }, prefersRM()?0:900)
  }
})
function prefersRM(){ var f=document.documentElement.getAttribute('data-force-reduced-motion')==='true'; return f||window.matchMedia('(prefers-reduced-motion: reduce)').matches }
`,
    timing: { highlightHoldMs: 900, transitionMs: 300 },
    acceptance: [
      'Clicking any card opens the detail view in its place',
      'BACK returns to the grid and rings the originating card with an accent outline for 900ms',
      'Opening a different card highlights that card on the next back, not the previous one',
      'Reduced motion still shows the highlight ring, held for the same duration but without a fade transition',
    ],
  },
]

/** ---------- WAVE E ---------- */
const waveE = [
  {
    id: 'playback-error-takeover',
    exportName: 'playbackErrorTakeover',
    spx: 'SPX-3244',
    nf: 'NF-135',
    title: 'Playback Error Takeover',
    blurb:
      'A playback error slides an overlay over the entire stage with an icon, message, and retry action rather than a small toast.',
    tags: ['error', 'overlay', 'playback'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">PLAYBACK ERROR TAKEOVER</p>
  <div class="nf__stage" data-stage>
    <div class="nf__overlay" data-overlay>
      <span class="nf__erricon" aria-hidden="true">\u26a0</span>
      <p class="nf__errtext">Something went wrong. Please try again.</p>
      <button type="button" class="nf__btn" data-retry>RETRY</button>
    </div>
  </div>
  <div class="nf__actions">
    <button type="button" class="nf__btn" data-error>SIMULATE ERROR</button>
  </div>
</div>`,
    css: `.nf__stage{height:160px}
.nf__overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:rgba(10,10,13,.94);opacity:0;pointer-events:none;transition:opacity 300ms ease}
.nf__overlay.is-visible{opacity:1;pointer-events:auto}
.nf__erricon{font-size:22px;color:var(--accent)}
.nf__errtext{margin:0;font-size:12px;color:var(--pewter);text-align:center;max-width:80%}`,
    js: `var overlay=document.querySelector('[data-overlay]')
export function runErrorTakeover(){ overlay.classList.add('is-visible') }
export function runErrorDismiss(){ overlay.classList.remove('is-visible') }
document.querySelector('[data-error]')?.addEventListener('click',runErrorTakeover)
document.querySelector('[data-retry]')?.addEventListener('click',runErrorDismiss)
`,
    timing: { overlayMs: 300, easing: 'ease' },
    acceptance: [
      'Idle: no overlay, stage content interactive',
      'SIMULATE ERROR fades in a full-stage overlay with icon, message, and RETRY',
      'RETRY dismisses the overlay',
      'Reduced motion shows/hides the overlay instantly',
    ],
  },
  {
    id: 'retry-to-buffer-transition',
    exportName: 'retryToBufferTransition',
    spx: 'SPX-3245',
    nf: 'NF-136',
    title: 'Retry-to-Buffer Transition',
    blurb:
      'Pressing Retry on an error overlay cross-dissolves it into a buffering spinner, which then resolves to a playing state.',
    tags: ['error', 'retry', 'buffer'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">RETRY-TO-BUFFER TRANSITION</p>
  <div class="nf__stage" data-stage>
    <div class="nf__layer nf__err" data-err>
      <span class="nf__erricon" aria-hidden="true">\u26a0</span>
      <button type="button" class="nf__btn" data-retry>RETRY</button>
    </div>
    <div class="nf__layer nf__buf" data-buf>
      <span class="nf__spinner"></span>
    </div>
    <div class="nf__layer nf__ok" data-ok>
      <span class="nf__playicon">\u25b6 PLAYING</span>
    </div>
  </div>
</div>`,
    css: `.nf__stage{height:160px}
.nf__layer{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;opacity:0;transition:opacity 320ms ease}
.nf__err{opacity:1;z-index:1}
.nf__erricon{font-size:20px;color:var(--accent)}
.nf__spinner{width:28px;height:28px;border-radius:50%;border:3px solid var(--rule);border-top-color:var(--accent);animation:nfspin 800ms linear infinite}
.nf__playicon{font:13px ui-monospace,monospace;color:var(--accent)}
@keyframes nfspin{to{transform:rotate(360deg)}}
.nf__stage[data-phase="buffer"] .nf__err{opacity:0}
.nf__stage[data-phase="buffer"] .nf__buf{opacity:1;z-index:1}
.nf__stage[data-phase="ok"] .nf__buf{opacity:0}
.nf__stage[data-phase="ok"] .nf__ok{opacity:1;z-index:1}`,
    js: `${RM_HEAD}var stage=document.querySelector('[data-stage]')
export function runRetryFlow(){
  stage.setAttribute('data-phase','buffer')
  if(prefersRM()){ stage.setAttribute('data-phase','ok'); return }
  window.setTimeout(function(){ stage.setAttribute('data-phase','ok') },1500)
}
document.querySelector('[data-retry]')?.addEventListener('click',runRetryFlow)
`,
    timing: { crossfadeMs: 320, bufferHoldMs: 1500 },
    acceptance: [
      'Idle: error state visible with icon and RETRY',
      'RETRY cross-dissolves the error layer into a spinner layer',
      'After 1.5s buffering the spinner cross-dissolves into a playing label',
      'Reduced motion jumps straight from error to playing, skipping the buffer hold',
    ],
  },
  {
    id: 'network-lost-overlay',
    exportName: 'networkLostOverlay',
    spx: 'SPX-3246',
    nf: 'NF-137',
    title: 'Network Lost Overlay',
    blurb:
      'A translucent banner announces a lost connection and pulses gently while retrying until reconnection is confirmed.',
    tags: ['network', 'overlay', 'pulse'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">NETWORK LOST OVERLAY</p>
  <div class="nf__stage" data-stage>
    <div class="nf__banner" data-banner hidden>
      <span class="nf__dot" aria-hidden="true"></span>
      <span>No internet connection \u2014 retrying\u2026</span>
    </div>
  </div>
  <div class="nf__actions">
    <button type="button" class="nf__btn" data-disconnect>DISCONNECT</button>
    <button type="button" class="nf__btn" data-reconnect>RECONNECT</button>
  </div>
</div>`,
    css: `.nf__stage{height:150px;display:flex;align-items:flex-start;justify-content:center;padding-top:14px}
.nf__banner{display:flex;align-items:center;gap:8px;padding:8px 14px;border:1px solid var(--rule);background:rgba(20,20,26,.9);font-size:11px;color:var(--chalk)}
.nf__dot{width:7px;height:7px;border-radius:50%;background:var(--accent);animation:nfpulse 1400ms ease-in-out infinite}
@keyframes nfpulse{0%,100%{opacity:.35}50%{opacity:1}}`,
    js: `var banner=document.querySelector('[data-banner]')
export function runNetworkLost(){ banner.hidden=false }
export function runNetworkReconnect(){ banner.hidden=true }
document.querySelector('[data-disconnect]')?.addEventListener('click',runNetworkLost)
document.querySelector('[data-reconnect]')?.addEventListener('click',runNetworkReconnect)
`,
    timing: { pulseMs: 1400, easing: 'ease-in-out' },
    acceptance: [
      'DISCONNECT shows a banner with a pulsing status dot',
      'The dot pulses continuously while the banner is visible',
      'RECONNECT hides the banner entirely',
      'Reduced motion shows the banner with the dot held static, not pulsing',
    ],
  },
  {
    id: 'vertical-clip-snap',
    exportName: 'verticalClipSnap',
    spx: 'SPX-3251',
    nf: 'NF-142',
    title: 'Vertical Clip Snap',
    blurb:
      'A vertical short-form feed snaps cleanly between full-bleed clips, never resting on a fractional offset.',
    tags: ['vertical', 'feed', 'snap'],
    width: 300,
    height: 460,
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">VERTICAL CLIP SNAP</p>
  <div class="nf__vfeed" data-viewport>
    <div class="nf__vtrack" data-track>
      <div class="nf__vclip" style="background:linear-gradient(200deg,#3a2c22,#171310)">Clip 1</div>
      <div class="nf__vclip" style="background:linear-gradient(200deg,#1c2c33,#0d1416)">Clip 2</div>
      <div class="nf__vclip" style="background:linear-gradient(200deg,#2a3344,#1a2030)">Clip 3</div>
    </div>
  </div>
  <div class="nf__actions">
    <button type="button" class="nf__btn" data-prev>\u2191 PREV</button>
    <button type="button" class="nf__btn" data-next>\u2193 NEXT</button>
  </div>
</div>`,
    css: `.nf__vfeed{position:relative;height:260px;overflow:hidden;border:1px solid var(--rule)}
.nf__vtrack{display:flex;flex-direction:column;transition:transform 340ms cubic-bezier(.22,.61,.36,1)}
.nf__vclip{flex:0 0 260px;display:flex;align-items:flex-end;padding:12px;font:12px ui-monospace,monospace;color:var(--chalk)}`,
    js: `var HEIGHT=260
var index=0
var track=document.querySelector('[data-track]')
function paint(){ track.style.transform='translateY('+(-index*HEIGHT)+'px)' }
export function runClipNext(){ index=Math.min(2,index+1); paint() }
export function runClipPrev(){ index=Math.max(0,index-1); paint() }
document.querySelector('[data-next]')?.addEventListener('click',runClipNext)
document.querySelector('[data-prev]')?.addEventListener('click',runClipPrev)
`,
    timing: { snapMs: 340, clipHeightPx: 260, easing: 'cubic-bezier(.22,.61,.36,1)' },
    acceptance: [
      'Idle: Clip 1 fills the viewport exactly',
      'NEXT/PREV snap the track by exactly one clip height, always resting flush',
      'The track never stops on a partial clip',
      'Reduced motion jumps directly to the target clip with no snap transition',
    ],
  },
  {
    id: 'clip-to-title-handoff',
    exportName: 'clipToTitleHandoff',
    spx: 'SPX-3252',
    nf: 'NF-143',
    title: 'Clip-to-Title Handoff',
    blurb:
      'Tapping More Info on a vertical clip morphs its full-bleed frame into a standard title card layout.',
    tags: ['vertical', 'handoff', 'morph'],
    width: 320,
    height: 320,
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">CLIP-TO-TITLE HANDOFF</p>
  <div class="nf__morphhost" data-host>
    <div class="nf__clipview" data-clip>
      <span class="nf__cliplabel">CLIP \u00b7 0:12</span>
      <button type="button" class="nf__btn" data-more>MORE INFO</button>
    </div>
    <div class="nf__titlecard" data-title>
      <p class="nf__panel-title">Amber Field</p>
      <p class="nf__panel-body">Match 92% \u00b7 Drama \u00b7 1h 58m</p>
      <button type="button" class="nf__btn" data-back>BACK TO CLIP</button>
    </div>
  </div>
</div>`,
    css: `.nf__morphhost{position:relative;height:220px}
.nf__clipview,.nf__titlecard{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:14px;gap:8px;transition:opacity 320ms ease,transform 320ms cubic-bezier(.4,0,.2,1)}
.nf__clipview{background:linear-gradient(200deg,#3a2c22,#171310)}
.nf__titlecard{background:var(--panel2);opacity:0;transform:scale(.92);pointer-events:none}
.nf__morphhost.is-title .nf__clipview{opacity:0;transform:scale(1.08);pointer-events:none}
.nf__morphhost.is-title .nf__titlecard{opacity:1;transform:scale(1);pointer-events:auto}
.nf__cliplabel{font:11px ui-monospace,monospace;color:var(--pewter)}`,
    js: `var host=document.querySelector('[data-host]')
document.querySelector('[data-more]')?.addEventListener('click',function(){ host.classList.add('is-title') })
document.querySelector('[data-back]')?.addEventListener('click',function(){ host.classList.remove('is-title') })
`,
    timing: { morphMs: 320, easing: 'cubic-bezier(.4,0,.2,1)' },
    acceptance: [
      'Idle: full-bleed clip view with a MORE INFO action',
      'MORE INFO fades and scales the clip out while the title card scales and fades in over it',
      'BACK TO CLIP reverses the morph exactly',
      'Reduced motion swaps the two layers instantly',
    ],
  },
  {
    id: 'download-progress-ring',
    exportName: 'downloadProgressRing',
    spx: 'SPX-3258',
    nf: 'NF-149',
    title: 'Download Progress Ring',
    blurb:
      'A circular ring fills clockwise around a download icon as the percentage label counts up to completion.',
    tags: ['download', 'ring', 'progress'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">DOWNLOAD PROGRESS RING</p>
  <div class="nf__dlring" data-ring style="--pct:0">
    <span class="nf__dlring-label" data-label>0%</span>
  </div>
  <div class="nf__actions">
    <button type="button" class="nf__btn" data-download>DOWNLOAD</button>
  </div>
</div>`,
    css: `.nf__dlring{--pct:0;width:72px;height:72px;margin:0 auto;border-radius:50%;background:conic-gradient(var(--accent) calc(var(--pct)*1%),var(--rule) 0);display:grid;place-items:center;transition:background 120ms linear}
.nf__dlring-label{width:56px;height:56px;border-radius:50%;background:var(--ink);display:grid;place-items:center;font:12px ui-monospace,monospace}`,
    js: `${RM_HEAD}var timer=0
export function runDownload(){
  var ring=document.querySelector('[data-ring]')
  var label=document.querySelector('[data-label]')
  window.clearTimeout(timer)
  if(prefersRM()){ ring.style.setProperty('--pct','100'); label.textContent='100%'; return }
  var pct=0
  function tick(){
    pct=Math.min(100,pct+4)
    ring.style.setProperty('--pct',String(pct))
    label.textContent=pct+'%'
    if(pct<100) timer=window.setTimeout(tick,80)
  }
  tick()
}
document.querySelector('[data-download]')?.addEventListener('click',runDownload)
`,
    timing: { tickMs: 80, stepPct: 4, totalMs: 2000 },
    acceptance: [
      'Idle: ring empty, label reads 0%',
      'DOWNLOAD fills the ring clockwise in 4% steps roughly every 80ms until 100%',
      'The label always matches the ring\u2019s current fill percentage',
      'Reduced motion jumps the ring and label directly to 100%',
    ],
  },
  {
    id: 'download-complete-morph',
    exportName: 'downloadCompleteMorph',
    spx: 'SPX-3259',
    nf: 'NF-150',
    title: 'Download Complete Morph',
    blurb:
      'A completed download ring morphs into a filled checkmark badge with a small confirming pulse.',
    tags: ['download', 'complete', 'morph'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">DOWNLOAD COMPLETE MORPH</p>
  <div class="nf__dlmorph" data-morph>
    <span class="nf__dlring" style="--pct:100"></span>
    <span class="nf__dlbadge" data-badge>\u2713 Downloaded</span>
  </div>
  <div class="nf__actions">
    <button type="button" class="nf__btn" data-complete>COMPLETE DOWNLOAD</button>
    <button type="button" class="nf__btn" data-reset>RESET</button>
  </div>
</div>`,
    css: `.nf__dlmorph{position:relative;height:72px;display:grid;place-items:center}
.nf__dlring{--pct:100;position:absolute;width:72px;height:72px;border-radius:50%;background:conic-gradient(var(--accent) calc(var(--pct)*1%),var(--rule) 0);opacity:1;transform:scale(1);transition:opacity 260ms ease,transform 260ms cubic-bezier(.34,1.56,.64,1)}
.nf__dlbadge{position:absolute;padding:6px 12px;border:1px solid var(--accent);color:var(--accent);font:11px ui-monospace,monospace;opacity:0;transform:scale(.6);transition:opacity 260ms ease,transform 260ms cubic-bezier(.34,1.56,.64,1)}
.nf__dlmorph.is-complete .nf__dlring{opacity:0;transform:scale(.6)}
.nf__dlmorph.is-complete .nf__dlbadge{opacity:1;transform:scale(1)}`,
    js: `var morph=document.querySelector('[data-morph]')
document.querySelector('[data-complete]')?.addEventListener('click',function(){ morph.classList.add('is-complete') })
document.querySelector('[data-reset]')?.addEventListener('click',function(){ morph.classList.remove('is-complete') })
`,
    timing: { morphMs: 260, easing: 'cubic-bezier(.34,1.56,.64,1)' },
    acceptance: [
      'Idle: a full progress ring with no badge visible',
      'COMPLETE DOWNLOAD shrinks and fades the ring while a Downloaded badge pops in with a small overshoot',
      'RESET reverses the morph back to the ring',
      'Reduced motion swaps ring for badge instantly with no overshoot',
    ],
  },
  {
    id: 'cinematic-ribbon-reveal',
    exportName: 'cinematicRibbonReveal',
    spx: 'SPX-3110',
    nf: 'NF-001',
    title: 'Cinematic Ribbon Reveal',
    blurb:
      'A horizontal ribbon wipes across a title panel, revealing the title text underneath as it passes.',
    tags: ['title', 'ribbon', 'wipe'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">CINEMATIC RIBBON REVEAL</p>
  <div class="nf__stage" data-stage>
    <p class="nf__titletext" data-title>NIGHT ROUTE</p>
    <span class="nf__ribbon" data-ribbon></span>
  </div>
  <div class="nf__actions">
    <button type="button" class="nf__btn" data-reveal>REVEAL</button>
    <button type="button" class="nf__btn" data-reset>RESET</button>
  </div>
</div>`,
    css: `.nf__stage{height:130px;display:grid;place-items:center;background:linear-gradient(150deg,#1c1c22,#0c0c0f)}
.nf__titletext{margin:0;font:700 26px/1 system-ui,sans-serif;letter-spacing:.06em;opacity:0;transition:opacity 60ms linear}
.nf__titletext.is-revealed{opacity:1}
.nf__ribbon{position:absolute;inset:0;background:var(--accent);transform:translateX(-100%);transition:transform 620ms cubic-bezier(.6,0,.2,1)}
.nf__ribbon.is-swept{transform:translateX(100%)}`,
    js: `${RM_HEAD}var title=document.querySelector('[data-title]')
var ribbon=document.querySelector('[data-ribbon]')
export function runRibbonReveal(){
  ribbon.classList.remove('is-swept')
  title.classList.remove('is-revealed')
  void ribbon.offsetWidth
  if(prefersRM()){ ribbon.classList.add('is-swept'); title.classList.add('is-revealed'); return }
  ribbon.classList.add('is-swept')
  window.setTimeout(function(){ title.classList.add('is-revealed') },310)
}
export function runRibbonReset(){
  ribbon.classList.remove('is-swept')
  title.classList.remove('is-revealed')
}
document.querySelector('[data-reveal]')?.addEventListener('click',runRibbonReveal)
document.querySelector('[data-reset]')?.addEventListener('click',runRibbonReset)
`,
    timing: { sweepMs: 620, titleRevealAtMs: 310, easing: 'cubic-bezier(.6,0,.2,1)' },
    acceptance: [
      'Idle: ribbon parked off-stage left, title hidden',
      'REVEAL sweeps the ribbon fully across the stage over 620ms; the title fades in as the ribbon passes its midpoint',
      'RESET returns to the parked, hidden state',
      'Reduced motion shows the swept ribbon and revealed title immediately',
    ],
  },
  {
    id: 'vertical-light-bar-intro',
    exportName: 'verticalLightBarIntro',
    spx: 'SPX-3111',
    nf: 'NF-002',
    title: 'Vertical Light-Bar Intro',
    blurb:
      'A vertical light bar sweeps left to right across a dark panel like a spotlight, revealing the title text as it passes.',
    tags: ['title', 'spotlight', 'intro'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">VERTICAL LIGHT-BAR INTRO</p>
  <div class="nf__stage" data-stage>
    <p class="nf__titletext" data-title>SIGNAL DRIFT</p>
    <span class="nf__lightbar" data-bar></span>
  </div>
  <div class="nf__actions">
    <button type="button" class="nf__btn" data-play>PLAY INTRO</button>
  </div>
</div>`,
    css: `.nf__stage{height:130px;display:grid;place-items:center;background:#08080a}
.nf__titletext{margin:0;font:700 24px/1 system-ui,sans-serif;letter-spacing:.08em;color:#3a3a44;transition:color 40ms linear}
.nf__titletext.is-lit{color:var(--chalk)}
.nf__lightbar{position:absolute;top:0;bottom:0;width:26px;left:-26px;background:linear-gradient(90deg,transparent,rgba(232,164,90,.55),transparent);transition:left 900ms linear}
.nf__lightbar.is-sweeping{left:100%}`,
    js: `${RM_HEAD}var bar=document.querySelector('[data-bar]')
var title=document.querySelector('[data-title]')
export function runLightBarIntro(){
  bar.classList.remove('is-sweeping')
  title.classList.remove('is-lit')
  void bar.offsetWidth
  if(prefersRM()){ bar.classList.add('is-sweeping'); title.classList.add('is-lit'); return }
  bar.classList.add('is-sweeping')
  window.setTimeout(function(){ title.classList.add('is-lit') },450)
}
document.querySelector('[data-play]')?.addEventListener('click',runLightBarIntro)
`,
    timing: { sweepMs: 900, titleLitAtMs: 450, easing: 'linear' },
    acceptance: [
      'Idle: title text dim, light bar parked off-stage left',
      'PLAY INTRO sweeps the light bar across the panel over 900ms; the title brightens as the bar crosses its center',
      'The title stays lit after the sweep completes',
      'Reduced motion lights the title and completes the sweep instantly',
    ],
  },
  {
    id: 'more-info-overlay',
    exportName: 'moreInfoOverlay',
    spx: 'SPX-3199',
    nf: 'NF-090',
    title: 'More Info Overlay',
    blurb:
      'Selecting a card opens a centered More Info overlay with a dimmed backdrop, growing outward from the card\u2019s position.',
    tags: ['overlay', 'details', 'backdrop'],
    html: `<div class="nf" data-nf>
  <p class="nf__eyebrow">MORE INFO OVERLAY</p>
  <div class="nf__moreinfohost" data-host>
    <button type="button" class="nf__card" data-open>
      <span class="nf__poster" aria-hidden="true"></span>
    </button>
    <div class="nf__backdrop" data-backdrop></div>
    <div class="nf__overlaypanel" data-panel>
      <p class="nf__panel-title">Bravo Signal</p>
      <p class="nf__panel-body">Match 88% \u00b7 Documentary \u00b7 1h 22m</p>
      <button type="button" class="nf__btn" data-close>CLOSE</button>
    </div>
  </div>
</div>`,
    css: `.nf__moreinfohost{position:relative;height:170px;display:grid;place-items:center}
.nf__card{position:relative;width:100px;height:140px;border:1px solid var(--rule);background:var(--ink);cursor:pointer}
.nf__poster{position:absolute;inset:0;background:linear-gradient(150deg,#2a3344,#1a2030)}
.nf__backdrop{position:absolute;inset:0;background:rgba(6,6,8,.8);opacity:0;pointer-events:none;transition:opacity 260ms ease}
.nf__overlaypanel{position:absolute;left:50%;top:50%;width:220px;padding:16px;border:1px solid var(--accent);background:var(--panel2);transform:translate(-50%,-50%) scale(.4);opacity:0;pointer-events:none;transition:opacity 260ms ease,transform 260ms cubic-bezier(.4,0,.2,1)}
.nf__moreinfohost.is-open .nf__backdrop{opacity:1;pointer-events:auto}
.nf__moreinfohost.is-open .nf__overlaypanel{opacity:1;transform:translate(-50%,-50%) scale(1);pointer-events:auto}
.nf__panel-title{margin:0 0 6px;font-weight:600}
.nf__panel-body{margin:0 0 10px;font-size:12px;color:var(--pewter)}`,
    js: `var host=document.querySelector('[data-host]')
document.querySelector('[data-open]')?.addEventListener('click',function(){ host.classList.add('is-open') })
document.querySelector('[data-close]')?.addEventListener('click',function(){ host.classList.remove('is-open') })
document.querySelector('[data-backdrop]')?.addEventListener('click',function(){ host.classList.remove('is-open') })
`,
    timing: { overlayMs: 260, easing: 'cubic-bezier(.4,0,.2,1)' },
    acceptance: [
      'Idle: no backdrop or panel visible, only the card',
      'Opening the card dims the backdrop and grows the panel from a small scale to full size, centered',
      'CLOSE or clicking the backdrop reverses both together',
      'Reduced motion shows/hides backdrop and panel instantly',
    ],
  },
]

const waves = { waveB, waveC, waveD, waveE }

for (const [waveName, specs] of Object.entries(waves)) {
  for (const s of specs) {
    const dir = path.join('.wip-aside', s.id)
    fs.mkdirSync(dir, { recursive: true })

    const fullCss = BASE_CSS + '\n' + s.css.trim() + '\n\n' + RM_CSS
    fs.writeFileSync(path.join(dir, 'demo.html'), s.html.trim() + '\n')
    fs.writeFileSync(path.join(dir, 'demo.css'), fullCss)
    fs.writeFileSync(path.join(dir, 'demo.style.txt'), fullCss)
    fs.writeFileSync(path.join(dir, 'demo.js'), (s.js.includes('function prefersRM') ? s.js : RM_HEAD + s.js).trim() + '\n')

    const width = s.width || 460
    const height = s.height || 300

    fs.writeFileSync(
      path.join(dir, 'entry.ts'),
      `import type { Specimen } from '../types'

export const ${s.exportName}: Specimen = {
  id: '${s.id}',
  ref: '${s.spx}',
  title: ${JSON.stringify(s.title)},
  blurb: ${JSON.stringify(s.blurb)},
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ${JSON.stringify(s.tags)},
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Motion transitions and dwell/countdown delays are skipped; semantic end states remain available.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: ${width}, height: ${height}, background: 'dark', label: ${JSON.stringify(s.title + ' demo')} },
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
    'Honour prefers-reduced-motion and data-force-reduced-motion — both disable transitions/animations and JS timers resolve to the end state immediately.',
  ],
  acceptance: ${JSON.stringify(s.acceptance || ['Implements ' + s.title + ' per Netflix catalogue contract', 'Reduced motion preserves semantic state'], null, 4).split('\n').join('\n  ')},
  scaffold: \`<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:${Math.max(height, 260)}px;background:#0c0c0f;display:grid;place-items:center;padding:16px;">{{specimen}}</div>\`,
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
          wave: waveName,
          colours: { ink: '#0c0c0f', panel: '#14141a', rule: '#2a2a33', pewter: '#8b8b96', chalk: '#ececf1', accent: '#e8a45a' },
          timing: s.timing || {},
          reducedMotion: {
            triggers: ['@media (prefers-reduced-motion: reduce)', '[data-force-reduced-motion="true"]'],
            behaviour: 'Transitions and animations are removed; JS timers/dwells resolve to the end state immediately.',
          },
        },
        null,
        2,
      ) + '\n',
    )

    const freezeRows = Object.entries(s.timing || {})
      .map(([k, v]) => `| ${k} | ${JSON.stringify(v)} |`)
      .join('\n')

    fs.writeFileSync(
      path.join(dir, 'spec.md'),
      `# ${s.title}

${s.blurb}

Ref: ${s.spx} \u00b7 ${s.nf}

## Freeze

| Item | Value |
| --- | --- |
${freezeRows}

## Behaviour

${(s.acceptance || []).map((a) => `- ${a}`).join('\n')}

## Reduced motion

Honours both \`prefers-reduced-motion: reduce\` and \`[data-force-reduced-motion="true"]\`: CSS transitions/animations are removed and any JS dwell/countdown timers resolve straight to their end state.

## Porting to another stack

Portable HTML/CSS/JS, no framework dependency. The JS module exports named run* functions so a host app can drive the same state transitions programmatically.
`,
    )

    console.log('wrote', waveName, s.id)
  }
}

console.log('done')
