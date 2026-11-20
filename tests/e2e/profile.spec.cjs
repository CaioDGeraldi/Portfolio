const { test, expect } = require("@playwright/test");

test("profile page is available in Portuguese and can be printed", async ({ page }) => {
  await page.goto("profile.html?lang=pt-BR");
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.getByRole("heading", { name: /Caio Darin/ })).toBeVisible();
  await page.locator("#profileThemeToggle").click();
  await expect(page.locator("body")).toHaveClass(/light-mode/);
  await expect(page.locator("#printProfile")).toBeVisible();
});

test("profile page exposes projects and career evidence", async ({ page }) => {
  await page.goto("profile.html?lang=en");
  await expect(page.getByRole("heading", { name: "Soma Soluções" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Centro em Movimento" })).toBeVisible();
  await expect(page.locator('a[href*="projects/retorna.html"]')).toBeVisible();
});
