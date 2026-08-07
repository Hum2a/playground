import { readFileSync, writeFileSync } from 'node:fs'

const p = 'docs/catalogue/manga_motion_ui_specimen_catalogue.md'
let s = readFileSync(p, 'utf8')

s = s.replace(
  '- [x] **MANGA-028** · `SPX-4097` · ★★★★★ **Black Impact Frame**',
  '- [ ] **MANGA-028** · `SPX-4097` · ★★★★★ **Black Impact Frame**',
)

s = s.replace(
  /- \[x\] \*\*MANGA-028\*\* · `SPX-4097` · \*\*Black Impact Frame\*\*(?: · scaffold `black-impact-frame`)?/,
  '- [ ] **MANGA-028** · `SPX-4097` · **Black Impact Frame** · scaffold `black-impact-frame`',
)

s = s.replace(
  /\| MANGA-028 \| `SPX-4097` \| `manga-black-impact-frame` \| Black Impact Frame \|\r?\n/,
  '',
)

writeFileSync(p, s)
console.log('catalogue cleaned for MANGA-028')
console.log(
  'hit-stop marked:',
  s.includes('- [x] **MANGA-032** · `SPX-4101`'),
)
console.log(
  'black still marked x:',
  /- \[x\] \*\*MANGA-028\*\*/.test(s),
)
