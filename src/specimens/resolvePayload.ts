import type { Specimen, SpecimenPayload, SpecimenResolved } from './types'

const cache = new Map<string, Promise<SpecimenPayload>>()

/**
 * Load and memoize a specimen's HTML/CSS/JS/spec/contract chunk.
 * Safe to call repeatedly when scrolling cells in and out of view.
 */
export function resolvePayload(specimen: Specimen): Promise<SpecimenPayload> {
  let pending = cache.get(specimen.id)
  if (!pending) {
    pending = specimen.loadPayload()
    cache.set(specimen.id, pending)
  }
  return pending
}

export async function resolveSpecimen(
  specimen: Specimen,
): Promise<SpecimenResolved> {
  const payload = await resolvePayload(specimen)
  const { loadPayload: _drop, ...meta } = specimen
  return { ...meta, ...payload }
}
