const { test, expect } = require("@playwright/test");

test("c15 grammar2 speedquiz stays usable on smartphone", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/c15/grammar2-speedquiz.html");

    await expect(page.locator("h1")).toContainText("문법 2 스피드퀴즈");
    await expect(page.locator(".swipe-hint")).toBeVisible();

    const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasOverflow).toBeFalsy();

    const startButton = page.locator("#introCard .btn-primary");
    await expect(startButton).toBeVisible();

    const startBox = await startButton.boundingBox();
    expect(startBox).not.toBeNull();
    expect(startBox.height).toBeGreaterThanOrEqual(54);

    await startButton.click();

    await expect(page.locator("#gameCard")).toBeVisible();
    await expect(page.locator(".choice")).toHaveCount(3);

    const choiceBox = await page.locator(".choice").first().boundingBox();
    expect(choiceBox).not.toBeNull();
    expect(choiceBox.height).toBeGreaterThanOrEqual(60);
    expect(choiceBox.width).toBeLessThanOrEqual(370);

    await page.locator(".choice").first().click();
    await expect(page.locator("#feedbackBox")).toHaveClass(/show/);
    await expect(page.locator("#nextBtn")).toBeVisible();

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator("#nextBtn")).toBeInViewport();
});

test("c15 grammar2 speedquiz can finish all questions", async ({ page }) => {
    await page.goto("/c15/grammar2-speedquiz.html");
    await page.locator("#introCard .btn-primary").click();

    for (let index = 0; index < 10; index += 1) {
        await page.locator(".choice").first().click();
        await page.locator("#nextBtn").click();
    }

    await expect(page.locator("#resultBox")).toHaveClass(/show/);
    await expect(page.locator("#finalScore")).toContainText("점 / 100점");
    await expect(page.locator("#resultComment")).not.toHaveText("");
});
