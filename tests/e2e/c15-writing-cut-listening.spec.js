const { test, expect } = require('@playwright/test');

async function openPage(page) {
  await page.goto('/c15/writing-cut-listening.html', { waitUntil: 'domcontentloaded' });
}

test('renders the c15 writing cut listening page with reused writing cut images', async ({ page }) => {
  await openPage(page);

  await expect(page.locator('h1')).toHaveText('15과 쓰기 컷 듣기');
  await expect(page.locator('#progressText')).toHaveText('1 / 14');
  await expect(page.locator('#cutRail .rail-button')).toHaveCount(14);
  await expect(page.locator('#narrationAudio')).toHaveAttribute('src', /assets\/c15\/reading-writing\/audio\/c15-writing-cut-listening\.mp3$/);
  await expect(page.locator('#cutImage')).toHaveAttribute('src', /assets\/c15\/reading-writing\/images\/writing-cut\/c15-cut01\.webp$/);
  await expect(page.locator('body')).not.toContainText('부자가 되려면 작은 돈부터 아껴 써야 합니다.');

  const assetUsage = await page.evaluate(() => window.C15_WRITING_CUT_LISTENING.cuts.map((cut) => cut.imageSrc));
  const audioTiming = await page.evaluate(() => ({
    audioSrc: window.C15_WRITING_CUT_LISTENING.audioSrc,
    duration: window.C15_WRITING_CUT_LISTENING.duration,
    firstStart: window.C15_WRITING_CUT_LISTENING.cuts[0].start,
    lastEnd: window.C15_WRITING_CUT_LISTENING.cuts.at(-1).end
  }));

  expect(assetUsage).toHaveLength(14);
  expect(assetUsage.every((src) => src.includes('/writing-cut/c15-cut'))).toBe(true);
  expect(assetUsage.some((src) => src.includes('writing-cut-listening'))).toBe(false);
  expect(audioTiming.audioSrc).toContain('/audio/c15-writing-cut-listening.mp3');
  expect(audioTiming.duration).toBeCloseTo(75.36, 2);
  expect(audioTiming.firstStart).toBe(0);
  expect(audioTiming.lastEnd).toBeCloseTo(75.36, 2);
});

test('moves between cuts without replacing the reused asset path', async ({ page }) => {
  await openPage(page);

  await page.locator('[data-action="next"]').click();
  await expect(page.locator('#progressText')).toHaveText('2 / 14');
  await expect(page.locator('#cutImage')).toHaveAttribute('src', /assets\/c15\/reading-writing\/images\/writing-cut\/c15-cut02\.webp$/);
  await expect(page.locator('#cutRail .rail-button').nth(1)).toHaveAttribute('aria-current', 'true');

  await page.locator('#cutRail .rail-button').nth(13).click();
  await expect(page.locator('#progressText')).toHaveText('14 / 14');
  await expect(page.locator('#cutImage')).toHaveAttribute('src', /assets\/c15\/reading-writing\/images\/writing-cut\/c15-cut14\.webp$/);
  await expect(page.locator('[data-action="next"]')).toBeDisabled();
});

test('syncs the current cut to generated audio timing', async ({ page }) => {
  await openPage(page);

  await page.evaluate(() => {
    const audio = document.getElementById('narrationAudio');
    audio.currentTime = 28.5;
    audio.dispatchEvent(new Event('timeupdate'));
  });

  await expect(page.locator('#progressText')).toHaveText('7 / 14');
  await expect(page.locator('#cutImage')).toHaveAttribute('src', /assets\/c15\/reading-writing\/images\/writing-cut\/c15-cut07\.webp$/);
});
