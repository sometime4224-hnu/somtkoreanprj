const { test, expect } = require('@playwright/test');

async function blockExternalRequests(page) {
  await page.route('https://www.googletagmanager.com/**', (route) => route.abort());
  await page.route('https://fonts.googleapis.com/**', (route) => route.abort());
  await page.route('https://fonts.gstatic.com/**', (route) => route.abort());
}

async function openPage(page, path) {
  await blockExternalRequests(page);
  await page.addInitScript(() => window.localStorage.clear());
  await page.goto(path, { waitUntil: 'domcontentloaded' });
  await page.locator('[data-image-panel]').waitFor();
}

test('c15 writing cut teacher page unlocks every step and cut from the top card', async ({ page }) => {
  await openPage(page, '/c15/writing-cut-teacher.html');

  await expect(page.locator('.teacher-banner')).toContainText('교사용 버전');
  await expect(page.locator('[data-action="jump-to-step"]')).toHaveCount(5);
  await expect(page.locator('[data-action="jump-to-cut"]')).toHaveCount(14);
  await expect(page.locator('[data-action="next"]')).toBeEnabled();

  await page.locator('[data-action="jump-to-step"][data-step-index="4"]').click();
  await expect(page.locator('.progress-title')).toHaveText('전체 문장 쓰기');
  await expect(page.locator('[data-action="next"]')).toBeEnabled();

  await page.locator('[data-action="jump-to-cut"][data-cut-index="13"]').click();
  await expect(page.locator('[data-image-panel] h3')).toHaveText('컷 14');
  await expect(page.locator('[data-primary-image]')).toHaveAttribute('src', /c15-cut14\.webp\?v=masked1$/);

  await page.locator('[data-action="show-answer"]').click();
  await expect(page.locator('[data-action="full-text"]')).toHaveValue('미리 목표를 정하고 작은 것부터 실천합시다.');

  const storageKeys = await page.evaluate(() => ({
    teacher: window.localStorage.getItem('writing_cut_c15_teacher_v1'),
    student: window.localStorage.getItem('writing_cut_c15_modern_v1')
  }));
  expect(storageKeys.teacher).toBeTruthy();
  expect(storageKeys.student).toBeNull();
});

test('c15 writing cut student page still requires progress before moving on', async ({ page }) => {
  await openPage(page, '/c15/writing-cut.html');

  await expect(page.locator('[data-action="jump-to-step"]')).toHaveCount(0);
  await expect(page.locator('[data-action="jump-to-cut"]')).toHaveCount(0);
  await expect(page.locator('[data-action="next"]')).toBeDisabled();
});
