import { expect, test } from '@playwright/test'

test('tartarus floor ascension repeated ascend does not drift', async ({ page }) => {
  await page.goto('/s/tartarus-floor-ascension')
  const frame = page.frameLocator('iframe[title^="Preview:"]').first()

  await expect(frame.getByRole('button', { name: /ascend/i })).toBeVisible()

  const readCurrent = async () =>
    frame.locator('[data-tartarus-slab="current"] [data-slab-label]').innerText()

  expect(await readCurrent()).toMatch(/FLOOR \/\/ 041/)

  for (const expected of ['042', '043', '044']) {
    await frame.getByRole('button', { name: /ascend/i }).click()
    await expect
      .poll(async () => readCurrent(), { timeout: 3000 })
      .toMatch(new RegExp(`FLOOR // ${expected}`))

    // Canonical role classes still present after rebuild
    await expect(frame.locator('[data-tartarus-slab="current"]')).toHaveClass(
      /tartarus-ascend__slab--current/,
    )
    await expect(frame.locator('[data-tartarus-slab="next"]')).toHaveClass(
      /tartarus-ascend__slab--next/,
    )
    await expect(frame.locator('[data-tartarus-slab="future"]')).toHaveClass(
      /tartarus-ascend__slab--future/,
    )
  }

  // Floor 043 discovery path should have flipped to DISCOVERED once locked
  await frame.getByRole('button', { name: /descend/i }).click()
  await expect
    .poll(async () => readCurrent(), { timeout: 3000 })
    .toMatch(/FLOOR \/\/ 043/)
  await expect(
    frame.locator('[data-tartarus-slab="current"] [data-slab-status]'),
  ).toHaveText(/DISCOVERED/)
})
