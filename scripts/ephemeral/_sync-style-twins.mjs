import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'

const library = 'src/specimens/library'
let fixed = 0
for (const fr of readdirSync(library)) {
  const frDir = join(library, fr)
  if (!statSync(frDir).isDirectory()) continue
  for (const id of readdirSync(frDir)) {
    const dir = join(frDir, id)
    if (!statSync(dir).isDirectory()) continue
    const css = join(dir, 'demo.css')
    const txt = join(dir, 'demo.style.txt')
    if (!existsSync(css) || !existsSync(txt)) continue
    const a = readFileSync(css)
    const b = readFileSync(txt)
    if (!a.equals(b)) {
      writeFileSync(txt, a)
      fixed++
      console.log('synced', `${fr}/${id}`)
    }
  }
}
console.log('fixed', fixed)
