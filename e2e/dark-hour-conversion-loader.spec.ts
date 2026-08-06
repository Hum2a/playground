import { expect, test } from '@playwright/test'

test('dark hour conversion loader progress maps 1:1 at checkpoints', async ({ page }) => {
  await page.goto('/s/dark-hour-conversion-loader')
  const frame = page.frameLocator('iframe[title^="Preview:"]').first()
  await expect(frame.getByRole('button', { name: /start/i })).toBeVisible()

  const checkpoints = [0, 10, 25, 50, 75, 90, 100]
  for (const p of checkpoints) {
    await frame.locator('[data-dhcl]').evaluate((_, pct) => {
      // @ts-expect-error sandbox hook
      globalThis.setDarkHourConversionProgress(pct)
    }, p)

    await expect(frame.locator('[data-dhcl-pct]')).toHaveText(
      `${String(p).padStart(2, '0')}%`,
    )
    await expect(frame.locator('[data-dhcl-bar]')).toHaveAttribute(
      'aria-valuenow',
      String(p),
    )
    const cssP = await frame.locator('[data-dhcl]').evaluate((el) =>
      getComputedStyle(el).getPropertyValue('--dhcl-p').trim(),
    )
    expect(cssP).toBe(`${p}%`)
  }
})
