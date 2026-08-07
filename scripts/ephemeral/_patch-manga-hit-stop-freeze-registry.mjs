import { readFileSync, writeFileSync } from 'node:fs'

const shardPath = 'src/specimens/registry/shards/manga.ts'
let shard = readFileSync(shardPath, 'utf8')
if (!shard.includes('mangaHitStopFreeze')) {
  if (!shard.includes('manga-hit-stop-freeze/entry')) {
    // Keep imports alphabetically-ish among manga*
    const importLine =
      "import { mangaHitStopFreeze } from '../../library/manga/manga-hit-stop-freeze/entry'\n"
    if (shard.includes('mangaDoublePageSpreadOpen')) {
      shard = shard.replace(
        "import { mangaDoublePageSpreadOpen } from '../../library/manga/manga-double-page-spread-open/entry'\n",
        "import { mangaDoublePageSpreadOpen } from '../../library/manga/manga-double-page-spread-open/entry'\n" +
          importLine,
      )
    } else {
      shard = shard.replace(
        "import type { Specimen } from '../../types'\n",
        "import type { Specimen } from '../../types'\n" + importLine,
      )
    }
  }
  if (!shard.includes('mangaHitStopFreeze,')) {
    if (shard.includes('mangaDoublePageSpreadOpen,')) {
      shard = shard.replace(
        '  mangaDoublePageSpreadOpen,\n',
        '  mangaDoublePageSpreadOpen,\n  mangaHitStopFreeze,\n',
      )
    } else {
      shard = shard.replace(
        'export const shard: Specimen[] = [',
        'export const shard: Specimen[] = [\n  mangaHitStopFreeze,',
      )
    }
  }
  writeFileSync(shardPath, shard)
}

const orderPath = 'src/specimens/registry/order.ts'
let order = readFileSync(orderPath, 'utf8')
if (!order.includes("'manga-hit-stop-freeze'")) {
  // alphabetical: after manga-double-page / before manga-page-turn, or after directional
  if (order.includes("'manga-double-page-spread-open',")) {
    order = order.replace(
      "  'manga-double-page-spread-open',\n",
      "  'manga-double-page-spread-open',\n  'manga-hit-stop-freeze',\n",
    )
  } else if (order.includes("'manga-directional-speed-wipe',")) {
    order = order.replace(
      "  'manga-directional-speed-wipe',\n",
      "  'manga-directional-speed-wipe',\n  'manga-hit-stop-freeze',\n",
    )
  } else {
    order = order.replace(
      "  'manga-page-turn',\n",
      "  'manga-hit-stop-freeze',\n  'manga-page-turn',\n",
    )
  }
  writeFileSync(orderPath, order)
}

const catPath = 'docs/catalogue/manga_motion_ui_specimen_catalogue.md'
let cat = readFileSync(catPath, 'utf8')
cat = cat.replace(
  /- \[ \] \*\*MANGA-032\*\* · `SPX-4101` · ★★★★★ \*\*Hit Stop Freeze\*\*/,
  '- [x] **MANGA-032** · `SPX-4101` · ★★★★★ **Hit Stop Freeze**',
)
cat = cat.replace(
  /- \[ \] \*\*MANGA-032\*\* · `SPX-4101` · \*\*Hit Stop Freeze\*\* · scaffold `hit-stop-freeze`/,
  '- [x] **MANGA-032** · `SPX-4101` · **Hit Stop Freeze** · scaffold `hit-stop-freeze`',
)
writeFileSync(catPath, cat)

console.log('--- shard ---')
console.log(readFileSync(shardPath, 'utf8'))
console.log(
  'order has hit-stop:',
  readFileSync(orderPath, 'utf8').includes("'manga-hit-stop-freeze'"),
)
console.log(
  'catalogue marked:',
  readFileSync(catPath, 'utf8').includes(
    '- [x] **MANGA-032** · `SPX-4101` · ★★★★★ **Hit Stop Freeze**',
  ),
)
