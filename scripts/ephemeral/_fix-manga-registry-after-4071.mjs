import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const shard = `import type { Specimen } from '../../types'
import { mangaDiagonalPanelWipe } from '../../library/manga/manga-diagonal-panel-wipe/entry'
import { mangaDoublePageSpreadOpen } from '../../library/manga/manga-double-page-spread-open/entry'
import { mangaPageTurn } from '../../library/manga/manga-page-turn/entry'
import { mangaPanelExpandFocus } from '../../library/manga/manga-panel-expand-focus/entry'
import { mangaPanelShatterTransition } from '../../library/manga/manga-panel-shatter-transition/entry'

export const shard: Specimen[] = [
  mangaDiagonalPanelWipe,
  mangaDoublePageSpreadOpen,
  mangaPageTurn,
  mangaPanelExpandFocus,
  mangaPanelShatterTransition,
]
`

writeFileSync('src/specimens/registry/shards/manga.ts', shard)

const orderPath = 'src/specimens/registry/order.ts'
let order = readFileSync(orderPath, 'utf8')
order = order.replace(/\n  'manga-directional-speed-wipe',/g, '')
if (!order.includes("'manga-panel-expand-focus'")) {
  order = order.replace(
    "  'manga-page-turn',\n",
    "  'manga-page-turn',\n  'manga-panel-expand-focus',\n",
  )
}
if (!order.includes("'manga-panel-shatter-transition'")) {
  order = order.replace(
    "  'manga-panel-expand-focus',\n",
    "  'manga-panel-expand-focus',\n  'manga-panel-shatter-transition',\n",
  )
}
writeFileSync(orderPath, order)

const manga = 'src/specimens/library/manga'
for (const id of [
  'manga-diagonal-panel-wipe',
  'manga-double-page-spread-open',
  'manga-page-turn',
  'manga-panel-expand-focus',
  'manga-panel-shatter-transition',
]) {
  const html = join(manga, id, 'demo.html')
  const entry = join(manga, id, 'entry.ts')
  console.log(id, 'entry', existsSync(entry), 'html', existsSync(html))
}

console.log(
  'order manga lines:',
  [...order.matchAll(/'manga-[^']+'/g)].map((m) => m[0]).join(', '),
)
