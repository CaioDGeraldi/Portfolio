const { test, expect } = require("@playwright/test");

const sizes = [
  { width: 360, height: 640 },
  { width: 775, height: 400 },
  { width: 1280, height: 720 }
];

for (const viewport of sizes) {
  test(`stage fits ${viewport.width}x${viewport.height} without horizontal clipping`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/?lang=en");
    await expect(page.locator("#intro")).toBeVisible();
    await expect(page.locator("#introTitle")).toBeVisible();
    await expect(page.locator("#scrollCue")).toBeVisible();
    const metrics = await page.evaluate(() => {
      const title = document.querySelector("#introTitle").getBoundingClientRect();
      const stage = document.querySelector("#intro");
      return {
        titleLeft: title.left,
        titleRight: title.right,
        stageLeft: stage.getBoundingClientRect().left,
        stageRight: stage.getBoundingClientRect().right,
        documentWidth: document.documentElement.scrollWidth,
        windowWidth: innerWidth,
        scrollableHeight: stage.scrollHeight,
        clientHeight: stage.clientHeight
      };
    });
    expect(metrics.titleLeft).toBeGreaterThanOrEqual(-1);
    expect(metrics.titleRight).toBeLessThanOrEqual(viewport.width + 2);
    expect(metrics.documentWidth).toBeLessThanOrEqual(viewport.width + 2);
    expect(metrics.scrollableHeight).toBeGreaterThanOrEqual(metrics.clientHeight);
    // The name is reachable without scrolling; tall content may scroll *inside* a scene.
    const firstLine = page.locator(".name-reveal").first();
    await expect(firstLine).toBeInViewport();
  });
}

test("cue, scene links, keyboard, and history preserve active scene", async ({ page }) => {
  await page.goto("/?lang=en");
  await page.locator("#scrollCue").click();
  await expect(page.locator("#fractaw")).toBeVisible();
  await expect(page).toHaveURL(/#fractaw$/);
  await page.locator("#nextScene").click();
  await expect(page.locator("#retorna")).toBeVisible();
  await expect(page).toHaveURL(/#retorna$/);
  await page.goBack();
  await expect(page.locator("#fractaw")).toBeVisible();
  await page.locator("#prevScene").click();
  await expect(page.locator("#intro")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("#fractaw")).toBeVisible();
});

test("locale, theme, and individual project links work", async ({ page }) => {
  await page.goto("/?lang=pt-BR#retorna");
  await expect(page.locator("#retorna")).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  const theme = page.locator("#themeToggle");
  await theme.click();
  await expect(page.locator("body")).toHaveClass(/light-mode/);
  const project = page.locator('a[href*="projects/retorna.html"]').first();
  await expect(project).toHaveAttribute("href", /lang=pt-BR/);
  await project.click();
  await expect(page.locator("#content h1")).toContainText("Retorna");
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.locator("body")).toHaveClass(/light-mode/);
});

test("scene controls remain reachable at mobile width", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/?lang=pt-BR");
  const controls = ["#scrollCue", "#nextScene", "#themeToggle"];
  for (const selector of controls) {
    const element = page.locator(selector);
    await expect(element).toBeVisible();
    const box = await element.boundingBox();
    expect(box.width).toBeGreaterThanOrEqual(32);
    expect(box.height).toBeGreaterThanOrEqual(32);
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(321);
  }
});
