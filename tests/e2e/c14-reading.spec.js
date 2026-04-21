const { test, expect } = require("@playwright/test");

test("c14 reading page loads webp story images on smartphone", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/c14/reading.html");

    await expect(page.locator("h1")).toContainText("도낏자루 썩는 줄 모른다");
    await expect(page.locator('img[src$=".webp"]')).toHaveCount(7);

    const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasOverflow).toBeFalsy();

    const imageState = await page.locator('img[src$=".webp"]').evaluateAll((images) => {
        return images.map((img) => ({
            complete: img.complete,
            naturalWidth: img.naturalWidth,
            currentSrc: img.currentSrc
        }));
    });

    for (const item of imageState) {
        expect(item.complete).toBeTruthy();
        expect(item.naturalWidth).toBeGreaterThan(0);
        expect(item.currentSrc.endsWith(".webp")).toBeTruthy();
    }
});
