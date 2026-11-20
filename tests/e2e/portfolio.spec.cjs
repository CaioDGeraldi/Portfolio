const { test, expect } = require("@playwright/test");

const sizes = [
  { width: 320, height: 640 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 }
];

for (const viewport of sizes) {
  test(`conventional portfolio layout fits ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("");
    await expect(page.locator("#main")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const width = await page.evaluate(() => ({
      document: document.documentElement.scrollWidth,
      viewport: window.innerWidth
    }));
    expect(width.document).toBeLessThanOrEqual(width.viewport + 1);
  });
}

test("navigation uses normal page sections and project links remain direct", async ({ page }) => {
  await page.goto("");
  await expect(page.locator("#projects")).toBeVisible();
  await page.locator('.primary-nav a[href="#projects"]').click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator("#centro-em-movimento")).toBeAttached();
  await expect(page.locator("#fractaw")).toBeAttached();
  await expect(page.locator("#retorna")).toBeAttached();
  await page.locator("#fractaw .project-link").click();
  await expect(page).toHaveURL(/projects\/fractaw\.html\?lang=en$/);
  await expect(page.locator("#content h1")).toContainText("Fractaw");
});

test("language switch updates copy, html lang and localized case study links", async ({ page }) => {
  await page.goto("");
  await page.locator("[data-language-toggle]").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Desenvolvedor back-end");
  await expect(page.locator("#projects .project-link").first()).toHaveAttribute("href", /lang=pt-BR/);
  await page.locator("[data-language-toggle]").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Backend developer");
});

test("theme preference toggles without changing the page structure", async ({ page }) => {
  await page.goto("");
  const root = page.locator(".site-root");
  await expect(root).toHaveAttribute("data-theme", "light");
  await page.locator("[data-theme-toggle]").click();
  await expect(root).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(root).toHaveAttribute("data-theme", "dark");
});

test("mobile navigation opens, follows a link and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("");
  const toggle = page.locator(".menu-toggle");
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.locator('.primary-nav a[href="#contact"]').click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});
