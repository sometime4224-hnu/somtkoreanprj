const { test, expect } = require('@playwright/test');

async function blockExternalRequests(page) {
  await page.route('https://www.googletagmanager.com/**', (route) => route.abort());
  await page.route('https://fonts.googleapis.com/**', (route) => route.abort());
  await page.route('https://fonts.gstatic.com/**', (route) => route.abort());
  await page.route('https://cdnjs.cloudflare.com/**', (route) => route.abort());
}

test.describe('speaking bank mobile navigation', () => {
  test.use({
    viewport: { width: 390, height: 844 }
  });

  test('shows one question card at a time and supports prev/next plus overview selection', async ({ page }) => {
    await blockExternalRequests(page);
    await page.addInitScript(() => {
      window.localStorage.clear();
    });

    await page.goto('/review/speaking-bank-10-13.html#q3', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('#mobileQuestionOverviewBtn')).toBeVisible();
    await expect(page.locator('#questionList .sb-question-btn:visible')).toHaveCount(1);
    await expect(page.locator('[data-question-id="q3"]')).toBeVisible();
    await expect(page.locator('[data-question-id="q2"]')).toBeHidden();

    await page.locator('#mobileNextQuestionBtn').click();
    await expect(page).toHaveURL(/#q4$/);
    await expect(page.locator('#questionList .sb-question-btn:visible')).toHaveCount(1);
    await expect(page.locator('[data-question-id="q4"]')).toBeVisible();

    await page.locator('#mobileQuestionOverviewBtn').click();
    await expect(page.locator('#popupModal')).toBeVisible();
    await expect(page.locator('[data-popup-question-id="q3"]')).toBeVisible();

    await page.locator('[data-popup-question-id="q3"]').click();
    await expect(page.locator('#popupModal')).toBeHidden();
    await expect(page).toHaveURL(/#q3$/);
    await expect(page.locator('#questionList .sb-question-btn:visible')).toHaveCount(1);
    await expect(page.locator('[data-question-id="q3"]')).toBeVisible();
  });
});
