const { test, expect } = require('@playwright/test');

async function blockExternalRequests(page) {
  await page.route('https://www.googletagmanager.com/**', (route) => route.abort());
  await page.route('https://fonts.googleapis.com/**', (route) => route.abort());
  await page.route('https://fonts.gstatic.com/**', (route) => route.abort());
  await page.route('https://cdnjs.cloudflare.com/**', (route) => route.abort());
}

test('renders and grades the second c15 vocabulary grammar mock exam', async ({ page }) => {
  await blockExternalRequests(page);
  await page.addInitScript(() => {
    window.localStorage.clear();
  });

  await page.goto('/c15/mock-exam-2.html', { waitUntil: 'domcontentloaded' });

  await expect(page.locator('h1')).toHaveText('15과 어휘·문법 20문제 모의고사 2');
  await expect(page.locator('.question-card')).toHaveCount(20);
  await expect(page.locator('#heroStats')).toContainText('어휘 10 · 문법 10');
  await expect(page.locator('.question-card[data-question="1"] .question-chip')).toHaveText('어휘');
  await expect(page.locator('.question-card[data-question="11"] .question-chip')).toHaveText('문법');

  const questions = await page.evaluate(() =>
    window.C15_MOCK_EXAM.sections
      .flatMap((section) => section.questions)
      .map((question) => ({ number: question.number, correct: question.correct }))
  );

  for (const question of questions) {
    await page.locator(`#q${question.number}-${question.correct}`).check({ force: true });
  }

  await page.locator('[data-action="grade"]').first().click();

  await expect(page.locator('#progressText')).toHaveText('20 / 20');
  await expect(page.locator('#summaryCard')).toContainText('20 / 20');
});
