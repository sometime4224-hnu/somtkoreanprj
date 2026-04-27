const { test, expect } = require('@playwright/test');

async function blockExternalRequests(page) {
  await page.route('https://www.googletagmanager.com/**', (route) => route.abort());
  await page.route('https://fonts.googleapis.com/**', (route) => route.abort());
  await page.route('https://fonts.gstatic.com/**', (route) => route.abort());
  await page.route('https://cdnjs.cloudflare.com/**', (route) => route.abort());
}

test('renders and grades the c15 vocabulary grammar mock exam', async ({ page }) => {
  await blockExternalRequests(page);
  await page.addInitScript(() => {
    window.localStorage.clear();
  });

  await page.goto('/c15/mock-exam.html', { waitUntil: 'domcontentloaded' });

  await expect(page.locator('h1')).toHaveText('15과 어휘·문법 30문제 모의고사');
  await expect(page.locator('.question-card')).toHaveCount(30);
  await expect(page.locator('#heroStats')).toContainText('어휘 15 · 문법 15');
  await expect(page.locator('.question-card[data-question="11"] .question-underline')).toHaveText('들어 있어요');

  const questions = await page.evaluate(() =>
    window.C15_MOCK_EXAM.sections
      .flatMap((section) => section.questions)
      .map((question) => ({ number: question.number, correct: question.correct }))
  );

  for (const question of questions) {
    await page.locator(`#q${question.number}-${question.correct}`).check({ force: true });
  }

  await page.locator('[data-action="grade"]').first().click();

  await expect(page.locator('#progressText')).toHaveText('30 / 30');
  await expect(page.locator('#summaryCard')).toContainText('30 / 30');
  await expect(page.locator('body')).not.toContainText('==');
});
