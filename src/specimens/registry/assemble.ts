import type { Specimen } from '../types'
import { specimenOrder } from './order'
import { shard as personaShard } from './shards/persona'
import { shard as finalFantasyShard } from './shards/final-fantasy'
import { shard as zeldaShard } from './shards/zelda'
import { shard as metalGearShard } from './shards/metal-gear'
import { shard as aceAttorneyShard } from './shards/ace-attorney'
import { shard as celesteShard } from './shards/celeste'
import { shard as danganronpaShard } from './shards/danganronpa'
import { shard as nierShard } from './shards/nier'
import { shard as cyberpunkShard } from './shards/cyberpunk'
import { shard as splatoonShard } from './shards/splatoon'
import { shard as pokemonShard } from './shards/pokemon'
import { shard as dragonballShard } from './shards/dragonball'
import { shard as appleShard } from './shards/apple'
import { shard as androidShard } from './shards/android'
import { shard as myHeroAcademiaShard } from './shards/my-hero-academia'
import { shard as narutoShard } from './shards/naruto'
import { shard as netflixShard } from './shards/netflix'
import { shard as playstationShard } from './shards/playstation'
import { shard as editorialShard } from './shards/editorial'
import { shard as musicEquipmentShard } from './shards/music-equipment'
import { shard as mangaShard } from './shards/manga'
import { shard as originalShard } from './shards/original'

const SHARDS: Specimen[][] = [
  personaShard,
  finalFantasyShard,
  zeldaShard,
  metalGearShard,
  aceAttorneyShard,
  celesteShard,
  danganronpaShard,
  nierShard,
  cyberpunkShard,
  splatoonShard,
  pokemonShard,
  dragonballShard,
  appleShard,
  androidShard,
  myHeroAcademiaShard,
  narutoShard,
  netflixShard,
  playstationShard,
  editorialShard,
  musicEquipmentShard,
  mangaShard,
  originalShard,
]

const byIdBuild = new Map<string, Specimen>()
for (const shard of SHARDS) {
  for (const s of shard) {
    if (byIdBuild.has(s.id)) {
      throw new Error(`Duplicate specimen id: ${s.id}`)
    }
    byIdBuild.set(s.id, s)
  }
}

const missing = specimenOrder.filter((id) => !byIdBuild.has(id))
if (missing.length) {
  throw new Error(`specimenOrder ids missing from shards: ${missing.slice(0, 5).join(', ')}`)
}

const orderSet = new Set(specimenOrder)
const extras = [...byIdBuild.keys()].filter((id) => !orderSet.has(id))
if (extras.length) {
  throw new Error(`Shard specimens not in specimenOrder: ${extras.slice(0, 5).join(', ')}`)
}

/** Catalogue list in canonical order. */
export const specimens: Specimen[] = specimenOrder.map((id) => {
  const s = byIdBuild.get(id)
  if (!s) throw new Error(`Missing specimen ${id}`)
  return s
})

export const specimensById: ReadonlyMap<string, Specimen> = byIdBuild

const byRef = new Map<string, Specimen>()
for (const s of specimens) {
  byRef.set(s.ref, s)
  byRef.set(s.ref.toLowerCase(), s)
}
export const specimensByRef: ReadonlyMap<string, Specimen> = byRef

export function getSpecimen(idOrRef: string): Specimen | undefined {
  const needle = idOrRef.trim()
  return specimensById.get(needle) ?? specimensByRef.get(needle) ?? specimensByRef.get(needle.toLowerCase())
}

export function getSpecimenNeighbors(id: string): {
  prev: Specimen | undefined
  next: Specimen | undefined
} {
  const i = specimenOrder.indexOf(id)
  if (i < 0) return { prev: undefined, next: undefined }
  return {
    prev: i > 0 ? specimensById.get(specimenOrder[i - 1]) : undefined,
    next: i < specimenOrder.length - 1 ? specimensById.get(specimenOrder[i + 1]) : undefined,
  }
}
