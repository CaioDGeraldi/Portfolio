const { test, expect } = require("@playwright/test");

test("recruiter can open a bilingual, evidence-linked profile from About", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/?lang=pt-BR#about");
  await expect(page.locator("#about")).toBeVisible();
  const link = page.locator('#about a[href*="profile.html"]');
  await expect(link).toHaveAttribute("href", /lang=pt-BR/);
  await link.click();
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.locator("h1")).toContainText("Caio Darin");
  await expect(page.locator("#experienceTitle")).toContainText("Experiência");
  await expect(page.locator("#workTitle")).toContainText("Duas formas");
  const work = page.locator(".profile-work");
  await expect(work.locator('a[href*="fractaw.html"]')).toHaveAttribute("href", /lang=pt-BR/);
  await expect(work.locator('a[href*="retorna.html"]')).toHaveAttribute("href", /lang=pt-BR/);
  const viewport = await page.evaluate(() => ({
    document: document.documentElement.scrollWidth,
    viewport: window.innerWidth
  }));
  expect(viewport.document).toBeLessThanOrEqual(viewport.viewport + 1);
});

test("theme preference carries from portfolio to profile and back", async ({ page }) => {
  await page.goto("/?lang=en#about");
  await page.locator("#themeToggle").click();
  await expect(page.locator("body")).toHaveClass(/light-mode/);
  await page.locator('#about a[href*="profile.html"]').click();
  await expect(page.locator("body")).toHaveClass(/light-mode/);
  await page.locator("#profileThemeToggle").click();
  await expect(page.locator("body")).not.toHaveClass(/light-mode/);
  await page.locator('.site-brand[href*="index.html"]').click();
  await expect(page.locator("body")).not.toHaveClass(/light-mode/);
});

test("profile has functional native print action", async ({ page }) => {
  await page.goto("/profile.html?lang=en");
  await page.evaluate(() => {
    window.__printCalled = false;
    window.print = () => { window.__printCalled = true; };
  });
  await page.locator("#printProfile").click();
  expect(await page.evaluate(() => window.__printCalled)).toBe(true);
});
