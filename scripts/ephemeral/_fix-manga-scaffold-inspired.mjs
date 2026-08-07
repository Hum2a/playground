import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const mangaDir = 'src/specimens/library/manga'
for (const name of readdirSync(mangaDir)) {
  const entryPath = join(mangaDir, name, 'entry.ts')
  if (!existsSync(entryPath)) continue
  let src = readFileSync(entryPath, 'utf8')
  if (!src.includes("inspiredBy: { franchise: 'persona'")) continue
  if (!src.includes('SPX-TODO')) continue
  src = src.replace(
    /\/\/ inspiredBy: \{ franchise: 'persona', works: \['persona-5'\] \},?\r?\n/,
    "inspiredBy: { franchise: 'manga' },\n",
  )
  writeFileSync(entryPath, src)
  console.log('patched', name)
}
