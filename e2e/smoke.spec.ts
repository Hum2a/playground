import { expect, test } from '@playwright/test'
import LZString from 'lz-string'

test.describe('smoke', () => {
  test('catalogue renders N plates', async ({ page }) => {
    await page.goto('/')
    const plates = page.locator('.specimen-plate')
    // Plates mount after first paint (deferred for LCP); wait before counting.
    await expect(plates.first()).toBeVisible({ timeout: 15_000 })
    await expect(plates.first()).toContainText(/SPX-\d+/i)
  })

  test('catalogue view size persists alongside filters', async ({ page }) => {
    await page.goto('/?kind=transition&view=large')
    const catalogue = page.locator('.catalogue')
    const large = page.getByRole('button', { name: 'Large', exact: true })
    await expect(large).toHaveAttribute('aria-pressed', 'true')
    await expect(catalogue).toHaveAttribute('data-view', 'large')

    await page.getByRole('button', { name: 'Compact', exact: true }).click()
    await expect(catalogue).toHaveAttribute('data-view', 'compact')
    await expect(page).toHaveURL(/kind=transition.*view=compact|view=compact.*kind=transition/)
  })

  test("plate copy button writes a non-empty string to the clipboard", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await page.goto('/')
    const plate = page.locator('.specimen-plate').first()
    await expect(plate).toBeVisible({ timeout: 15_000 })
    await plate.getByRole('button', { name: /copy prompt/i }).click()
    await expect(plate.getByRole('button', { name: /copied/i })).toBeVisible()
    const text = await page.evaluate(() => navigator.clipboard.readText())
    expect(text.length).toBeGreaterThan(20)
    expect(text).toContain('Recreate:')
  })

  test('/s/coming-soon-tape renders its five tabs', async ({ page }) => {
    await page.goto('/s/coming-soon-tape')
    const tabs = page.getByRole('tab')
    await expect(tabs).toHaveCount(5)
    await expect(page.getByRole('tab', { name: 'Spec' })).toBeVisible()
    await expect(page.getByRole('tab', { name: 'Markup' })).toBeVisible()
    await expect(page.getByRole('tab', { name: 'Styles' })).toBeVisible()
    await expect(page.getByRole('tab', { name: 'Contract' })).toBeVisible()
    await expect(page.getByRole('tab', { name: 'Prompt' })).toBeVisible()
  })

  test('/playground loads a draft from a share hash', async ({ page }) => {
    const payload = {
      html: '<div class="from-share">shared</div>',
      css: '.from-share { color: #f5c518; }',
      js: '',
      controls: {
        viewport: 360,
        background: 'card',
        reducedMotion: 'off',
        playbackRate: 1,
      },
    }
    const hash = LZString.compressToEncodedURIComponent(JSON.stringify(payload))
    await page.goto(`/playground#${hash}`)
    await expect(page.getByRole('heading', { name: 'Drafts' })).toBeVisible()
    await expect(page.locator('.playground__draft').first()).toContainText(/shared/i)
    // Editor may be on HTML tab — confirm preview iframe title exists
    await expect(page.locator('iframe[title^="Preview:"]')).toBeVisible()
  })
})
