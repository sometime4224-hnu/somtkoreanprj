const { test, expect } = require('@playwright/test');

const writingCutPages = [
  '/c10/writing-cut.html',
  '/c11/writing-cut.html',
  '/c12/writing-cut.html'
];

async function blockExternalRequests(page) {
  await page.route('https://www.googletagmanager.com/**', (route) => route.abort());
  await page.route('https://fonts.googleapis.com/**', (route) => route.abort());
  await page.route('https://fonts.gstatic.com/**', (route) => route.abort());
}

async function openWritingCutPage(page, pagePath) {
  await blockExternalRequests(page);
  await page.addInitScript(() => {
    window.localStorage.clear();
  });
  await page.goto(pagePath, { waitUntil: 'domcontentloaded' });
  await page.locator('[data-image-panel]').waitFor();
}

async function solveCurrentStepOneCut(page) {
  const choices = page.locator('[data-action="select-choice"]');
  const totalChoices = await choices.count();

  for (let index = 0; index < totalChoices; index += 1) {
    await choices.nth(index).click();
    await page.locator('[data-action="check-step1"]').click();

    const canProceed = await page.locator('[data-action="next"]').isEnabled();
    if (canProceed) return;
  }

  throw new Error('Could not find a correct answer for the current step 1 cut.');
}

async function getImagePanelTop(page) {
  return page.locator('[data-image-panel]').evaluate((element) => element.getBoundingClientRect().top);
}

async function expectImagePanelNearTop(page) {
  await page.waitForFunction(() => {
    const imagePanel = document.querySelector('[data-image-panel]');
    if (!imagePanel) return false;
    const top = imagePanel.getBoundingClientRect().top;
    return top >= -8 && top <= 96;
  });

  const topAfterScroll = await getImagePanelTop(page);
  expect(topAfterScroll).toBeGreaterThanOrEqual(-8);
  expect(topAfterScroll).toBeLessThanOrEqual(96);
}

async function scrollNextButtonAndConfirmImagePanelMovedOffscreen(page) {
  await page.locator('[data-action="next"]').scrollIntoViewIfNeeded();
  const topBeforeNext = await getImagePanelTop(page);
  expect(topBeforeNext).toBeLessThan(-150);
}

async function getCutProgress(page) {
  return page.evaluate(() => {
    const desc = document.querySelector('.progress-desc')?.textContent || '';
    const numbers = (desc.match(/\d+/g) || []).map(Number);
    return {
      currentCut: numbers[0],
      totalCuts: numbers[1]
    };
  });
}

async function getStepProgress(page) {
  return page.evaluate(() => {
    const eyebrow = document.querySelector('.eyebrow')?.textContent || '';
    const numbers = (eyebrow.match(/\d+/g) || []).map(Number);
    return {
      currentStep: numbers[0],
      totalSteps: numbers[1]
    };
  });
}

async function advanceToLastCutOfStepOne(page) {
  while (true) {
    await solveCurrentStepOneCut(page);
    const { currentCut, totalCuts } = await getCutProgress(page);
    if (currentCut === totalCuts) return;

    await page.locator('[data-action="next"]').click();
    await page.locator('[data-action="check-step1"]').waitFor();
  }
}

for (const pagePath of writingCutPages) {
  test(`auto-scrolls back to the image panel after moving to the next cut on ${pagePath}`, async ({ page }) => {
    await openWritingCutPage(page, pagePath);

    await solveCurrentStepOneCut(page);
    await scrollNextButtonAndConfirmImagePanelMovedOffscreen(page);

    await page.locator('[data-action="next"]').click();
    await expectImagePanelNearTop(page);
  });

  test(`auto-scrolls back to the image panel after entering the next step from the last cut on ${pagePath}`, async ({ page }) => {
    await openWritingCutPage(page, pagePath);
    await advanceToLastCutOfStepOne(page);

    const stepBeforeNext = await getStepProgress(page);
    expect(stepBeforeNext.currentStep).toBe(1);

    await scrollNextButtonAndConfirmImagePanelMovedOffscreen(page);
    await page.locator('[data-action="next"]').click();

    await expectImagePanelNearTop(page);

    const stepAfterNext = await getStepProgress(page);
    const cutAfterNext = await getCutProgress(page);
    expect(stepAfterNext.currentStep).toBe(2);
    expect(stepAfterNext.totalSteps).toBe(stepBeforeNext.totalSteps);
    expect(cutAfterNext.currentCut).toBe(1);
    await expect(page.locator('[data-action="activate-slot"]').first()).toBeVisible();
  });
}

test.describe('mobile viewport', () => {
  test.use({
    viewport: { width: 390, height: 844 }
  });

  for (const pagePath of writingCutPages) {
    test(`auto-scrolls back to the image panel after moving to the next cut on mobile for ${pagePath}`, async ({ page }) => {
      await openWritingCutPage(page, pagePath);

      await solveCurrentStepOneCut(page);
      await scrollNextButtonAndConfirmImagePanelMovedOffscreen(page);

      await page.locator('[data-action="next"]').click();
      await expectImagePanelNearTop(page);
    });
  }
});
