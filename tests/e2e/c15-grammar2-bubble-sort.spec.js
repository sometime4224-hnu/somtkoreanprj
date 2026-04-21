const { test, expect } = require("@playwright/test");

test("c15 grammar2 bubble sort game compares nuance in practice and grades quiz", async ({ page }) => {
    await page.goto("/c15/grammar2-bubble-sort-game.html");

    await expect(page.locator("h1")).toContainText("말풍선을 알맞은 칸에 놓아 보세요.");
    await expect(page.locator("#progressText")).toHaveText("연습 1 / 3");
    await expect(page.locator("#scoreText")).toHaveText("비교 연습");
    await expect(page.locator("#practiceGuide")).toBeVisible();
    await expect(page.locator(".practice-guide__card")).toHaveCount(4);
    await expect(page.locator("#mobileStepNav")).toBeHidden();
    await expect(page.locator("#explainStage")).toBeVisible();
    await expect(page.locator("#actionStage")).toBeVisible();
    await expect(page.locator(".move-guide")).toContainText("움직이는 방법");
    await expect(page.locator("#moveGuideMode")).toContainText("여러 칸에 다시 놓으며");
    await expect(page.locator(".drop-direction")).toContainText("아래 칸으로 옮기세요");

    await expect.poll(async () => {
        return page.locator('.zone[data-form="geolyo"] .zone__drop').evaluate((element) => {
            return window.getComputedStyle(element, "::before").content;
        });
    }).toContain("여기에 놓기");

    await page.locator('.zone[data-form="geolyo"]').click();
    await expect(page.locator("#feedbackBox")).toContainText("지금 놓은 말의 느낌");
    await expect(page.locator("#feedbackBox")).toContainText("계좌이체로 내도 될걸요.");
    await expect(page.locator("#optionReview")).toContainText("계좌이체로 내도 될 거예요.");
    await expect(page.locator("#optionReview")).not.toContainText("최적 정답");
    await expect(page.locator('.practice-guide__card.is-active[data-form="geolyo"]')).toBeVisible();

    await page.locator('.zone[data-form="tendeyo"]').click();
    await expect(page.locator("#feedbackBox")).toContainText("계좌이체로 내도 될 텐데요.");
    await expect(page.locator("#feedbackBox")).toContainText("다른 칸에 다시 놓아도 됩니다.");
    await expect(page.locator('.practice-guide__card.is-active[data-form="tendeyo"]')).toBeVisible();
    await expect(page.locator("#nextBtn")).toHaveText("다음 예문");
    await page.locator("#nextBtn").click();

    await page.locator('.zone[data-form="geotgathayo"]').click();
    await page.locator("#nextBtn").click();

    await page.locator('.zone[data-form="geoyeyo"]').click();
    await expect(page.locator("#nextBtn")).toHaveText("문제 시작");
    await page.locator("#nextBtn").click();

    await expect(page.locator("#progressText")).toHaveText("문제 1 / 6");
    await expect(page.locator("#scoreText")).toHaveText("최적 0 · 부분 0 · 오답 0");
    await expect(page.locator("#practiceGuide")).toBeHidden();
    await expect(page.locator("#moveGuideMode")).toContainText("한 칸을 고르면 바로 판정");

    await page.locator('.zone[data-form="geoyeyo"]').click();
    await expect(page.locator("#feedbackBox")).toContainText("부분 정답");
    await expect(page.locator("#optionReview")).toContainText("최적 정답");
    await expect(page.locator('#optionReview [data-form="geolyo"]')).toContainText("최적 정답");
    await expect(page.locator('#optionReview [data-form="geoyeyo"]')).toContainText("부분 정답");
    await expect(page.locator('#optionReview [data-form="tendeyo"]')).toContainText("오답");
    await page.locator("#nextBtn").click();

    await page.locator('.zone[data-form="geoyeyo"]').click();
    await page.locator("#nextBtn").click();

    await page.locator('.zone[data-form="geotgathayo"]').click();
    await page.locator("#nextBtn").click();

    await page.locator('.zone[data-form="geoyeyo"]').click();
    await expect(page.locator("#feedbackBox")).toContainText("오답");
    await page.locator("#nextBtn").click();

    await page.locator('.zone[data-form="geolyo"]').click();
    await page.locator("#nextBtn").click();

    await page.locator('.zone[data-form="geolyo"]').click();
    await page.locator("#nextBtn").click();

    await expect(page.locator("#resultScreen")).toContainText("최적 정답");
    await expect(page.locator("#resultScreen")).toContainText("부분 정답");
    await expect(page.locator("#resultScreen")).toContainText("오답");

    await page.locator("#restartBtn").click();
    await expect(page.locator("#progressText")).toHaveText("연습 1 / 3");
    await expect(page.locator("#scoreText")).toHaveText("비교 연습");
    await expect(page.locator("#practiceGuide")).toBeVisible();
});

test("c15 grammar2 bubble sort game splits explanation and action on smartphone", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/c15/grammar2-bubble-sort-game.html");

    await expect(page.locator("#progressText")).toHaveText("연습 1 / 3");
    await expect(page.locator("#mobileStepNav")).toBeVisible();
    await expect(page.locator("#mobileExplainBtn")).toHaveClass(/is-active/);
    await expect(page.locator("#mobileActBtn")).not.toHaveClass(/is-active/);
    await expect(page.locator("#explainStage")).toBeVisible();
    await expect(page.locator("#actionStage")).toBeHidden();
    await expect(page.locator("#practiceGuide")).toBeVisible();
    await expect(page.locator("#mobileContinueBtn")).toBeVisible();
    await expect(page.locator("#mobileContinueBtn")).toHaveText("이제 느낌 비교하기");

    const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasOverflow).toBeFalsy();

    await page.locator("#mobileContinueBtn").click();
    await expect(page.locator("#mobileExplainBtn")).not.toHaveClass(/is-active/);
    await expect(page.locator("#mobileActBtn")).toHaveClass(/is-active/);
    await expect(page.locator("#explainStage")).toBeHidden();
    await expect(page.locator("#actionStage")).toBeVisible();
    await expect(page.locator("#mobileActionSummary")).toBeVisible();
    await expect(page.locator("#mobileActionSummary")).toContainText("수행 화면 요약");
    await expect(page.locator("#bubbleCard")).toBeVisible();
    await expect(page.locator(".zone")).toHaveCount(4);

    const bubbleBox = await page.locator("#bubbleCard").boundingBox();
    expect(bubbleBox).not.toBeNull();
    expect(bubbleBox.width).toBeLessThanOrEqual(370);

    await page.locator('.zone[data-form="geolyo"]').click();
    await expect(page.locator("#nextBtn")).toBeVisible();
    await expect(page.locator("#feedbackBox")).toContainText("지금 놓은 말의 느낌");

    await page.locator("#mobileExplainBtn").click();
    await expect(page.locator("#explainStage")).toBeVisible();
    await expect(page.locator("#actionStage")).toBeHidden();

    await page.locator("#mobileActBtn").click();
    await expect(page.locator("#actionStage")).toBeVisible();
    await page.locator("#nextBtn").click();

    await expect(page.locator("#progressText")).toHaveText("연습 2 / 3");
    await expect(page.locator("#mobileExplainBtn")).toHaveClass(/is-active/);
    await expect(page.locator("#mobileActBtn")).not.toHaveClass(/is-active/);
    await expect(page.locator("#explainStage")).toBeVisible();
    await expect(page.locator("#actionStage")).toBeHidden();

    await page.locator("#mobileContinueBtn").click();
    await expect(page.locator("#actionStage")).toBeVisible();
    await page.locator('.zone[data-form="geotgathayo"]').click();

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator("#nextBtn")).toBeInViewport();

    const nextBox = await page.locator("#nextBtn").boundingBox();
    expect(nextBox).not.toBeNull();
    expect(nextBox.height).toBeGreaterThanOrEqual(56);
});
