const { test, expect } = require('@playwright/test');

async function blockExternalRequests(page) {
  await page.route('https://www.googletagmanager.com/**', (route) => route.abort());
  await page.route('https://fonts.googleapis.com/**', (route) => route.abort());
  await page.route('https://fonts.gstatic.com/**', (route) => route.abort());
  await page.route('https://cdnjs.cloudflare.com/**', (route) => route.abort());
}

test('draws a full presentation order and enables copying', async ({ page }) => {
  await blockExternalRequests(page);
  await page.goto('/apps/standalone-pages/presentation-order-draw.html', { waitUntil: 'domcontentloaded' });

  await expect(page.locator('[data-action="start-draw"]')).toBeVisible();
  await expect(page.locator('#result-count')).toHaveText('0');

  await page.locator('[data-action="start-draw"]').click();
  await expect(page.locator('#status-pill')).toHaveText('Mixing');

  await expect
    .poll(async () => page.locator('[data-result-item]').count(), { timeout: 8_000 })
    .toBe(29);

  await expect(page.locator('#status-pill')).toHaveText('Done');
  await expect(page.locator('[data-action="copy-result"]')).toBeEnabled();
  await expect(page.locator('#result-count')).toHaveText('29');
  await expect(page.locator('[data-mix-board] .chip.compact')).toHaveCount(29);

  const names = await page.locator('[data-result-item] .name').allTextContents();
  expect(new Set(names).size).toBe(29);
});

test('excludes checked students from the draw', async ({ page }) => {
  await blockExternalRequests(page);
  await page.goto('/apps/standalone-pages/presentation-order-draw.html', { waitUntil: 'domcontentloaded' });

  await page.locator('[data-action="open-exclusions"]').click();
  await expect(page.locator('#exclusion-modal')).toHaveClass(/open/);
  await page.locator('[data-action="toggle-exclusion"][data-index="0"]').check();
  await page.locator('[data-action="toggle-exclusion"][data-index="5"]').check();
  await page.locator('[data-action="close-exclusions"]').click();

  await expect(page.locator('#active-count')).toHaveText('27');
  await expect(page.locator('#excluded-count')).toHaveText('2');
  await expect(page.locator('#result-total')).toHaveText('27');

  await page.locator('[data-action="start-draw"]').click();

  await expect
    .poll(async () => page.locator('[data-result-item]').count(), { timeout: 8_000 })
    .toBe(27);
  await expect(page.locator('[data-mix-board] .chip.compact')).toHaveCount(27);

  const names = await page.locator('[data-result-item] .name').allTextContents();
  expect(names).not.toContain('도안 티 응엣 하');
  expect(names).not.toContain('버 탄 쩡');
  expect(new Set(names).size).toBe(27);
});
