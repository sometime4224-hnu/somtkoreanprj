const { test, expect } = require('@playwright/test');

async function blockExternalRequests(page) {
  await page.route('https://www.googletagmanager.com/**', (route) => route.abort());
  await page.route('https://fonts.googleapis.com/**', (route) => route.abort());
  await page.route('https://fonts.gstatic.com/**', (route) => route.abort());
  await page.route('https://cdnjs.cloudflare.com/**', (route) => route.abort());
}

test('renders underline markup in the c14 mock exam', async ({ page }) => {
  await blockExternalRequests(page);
  await page.addInitScript(() => {
    window.localStorage.clear();
  });

  await page.goto('/c14/mock-exam.html', { waitUntil: 'domcontentloaded' });

  await expect(page.locator('.question-card[data-question="3"] .question-underline')).toHaveText('병원, 은행, 마트, 버스정류장이 가까이에 있어서');
  await expect(page.locator('.question-card[data-question="8"] .question-underline')).toHaveText('못 알아봤어요');
  await expect(page.locator('.question-card[data-question="27"] .question-underline')).toHaveText('미리 켜고 왔어야 했는데');

  const bodyText = await page.locator('body').textContent();
  expect(bodyText).not.toContain('==');
});
