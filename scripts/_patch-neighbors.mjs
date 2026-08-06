import { readFileSync, writeFileSync } from 'node:fs'

const p = 'src/specimens/index.ts'
let s = readFileSync(p, 'utf8')

if (!s.includes('getSpecimenNeighbors')) {
  const old = `export function getSpecimen(id: string): Specimen | undefined {
  return specimens.find((s) => s.id === id)
}
`
  const neu = `export function getSpecimen(idOrRef: string): Specimen | undefined {
  const needle = idOrRef.trim()
  return specimens.find(
    (s) =>
      s.id === needle ||
      s.ref === needle ||
      s.ref.toLowerCase() === needle.toLowerCase(),
  )
}

export function getSpecimenNeighbors(id: string): {
  prev?: Specimen
  next?: Specimen
} {
  const index = specimens.findIndex((s) => s.id === id)
  if (index < 0) return {}
  return {
    prev: index > 0 ? specimens[index - 1] : undefined,
    next: index < specimens.length - 1 ? specimens[index + 1] : undefined,
  }
}
`
  if (!s.includes(old)) {
    // try CRLF
    const oldCrlf = old.replace(/\n/g, '\r\n')
    const neuCrlf = neu.replace(/\n/g, '\r\n')
    if (s.includes(oldCrlf)) {
      s = s.replace(oldCrlf, neuCrlf)
    } else {
      s = s.trimEnd() + '\n\n' + neu
    }
  } else {
    s = s.replace(old, neu)
  }
  writeFileSync(p, s)
}

console.log({
  neighbors: s.includes('getSpecimenNeighbors'),
  butterfly: s.includes('butterflyEntry'),
})
