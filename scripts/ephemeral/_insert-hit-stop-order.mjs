import { readFileSync, writeFileSync } from 'node:fs'

const p = 'src/specimens/registry/order.ts'
let s = readFileSync(p, 'utf8')
if (!s.includes("'manga-hit-stop-freeze'")) {
  const needle = "  'manga-double-page-spread-open',"
  const i = s.indexOf(needle)
  if (i < 0) throw new Error('needle missing: manga-double-page-spread-open')
  s =
    s.slice(0, i) +
    needle +
    "\n  'manga-hit-stop-freeze'," +
    s.slice(i + needle.length)
  writeFileSync(p, s)
  console.log('inserted manga-hit-stop-freeze')
} else {
  console.log('already present')
}

console.log(
  [...s.matchAll(/'manga-[^']+'/g)].map((m) => m[0]).join('\n'),
)
