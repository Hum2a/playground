import { readFileSync, writeFileSync } from 'node:fs'

const shardPath = 'src/specimens/registry/shards/manga.ts'
let shard = readFileSync(shardPath, 'utf8')
if (!shard.includes('mangaPanelExpandFocus')) {
  if (!shard.includes("manga-panel-expand-focus/entry")) {
    shard = shard.replace(
      "import { mangaPageTurn } from '../../library/manga/manga-page-turn/entry'\n",
      "import { mangaPageTurn } from '../../library/manga/manga-page-turn/entry'\n" +
        "import { mangaPanelExpandFocus } from '../../library/manga/manga-panel-expand-focus/entry'\n",
    )
  }
  if (!shard.includes('mangaPanelExpandFocus,')) {
    shard = shard.replace(
      '  mangaPageTurn,\n]',
      '  mangaPageTurn,\n  mangaPanelExpandFocus,\n]',
    )
  }
  writeFileSync(shardPath, shard)
}

const orderPath = 'src/specimens/registry/order.ts'
let order = readFileSync(orderPath, 'utf8')
if (!order.includes("'manga-panel-expand-focus'")) {
  order = order.replace(
    "  'manga-page-turn',\n",
    "  'manga-page-turn',\n  'manga-panel-expand-focus',\n",
  )
  writeFileSync(orderPath, order)
}

console.log('--- shard ---')
console.log(readFileSync(shardPath, 'utf8'))
console.log(
  'order has expand-focus:',
  readFileSync(orderPath, 'utf8').includes("'manga-panel-expand-focus'"),
)
