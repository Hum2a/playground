import { comingSoonTape } from './coming-soon-tape/entry'
import type { Specimen } from './types'

export type { Specimen } from './types'

/** Explicit specimen registry. Add one import per specimen. */
export const specimens: Specimen[] = [comingSoonTape]

export function getSpecimen(id: string): Specimen | undefined {
  return specimens.find((s) => s.id === id)
}
