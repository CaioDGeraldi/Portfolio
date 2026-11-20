const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

const wcagTags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function inspect(page) {
  const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
  const issues = results.violations.map(violation => ({
    rule: violation.id,
    impact: violation.impact,
    nodes: violation.nodes.slice(0, 5).map(node => ({
      target: node.target,
      summary: node.failureSummary
    }))
  }));
  expect(issues, JSON.stringify(issues, null, 2)).toEqual([]);
}

test("WCAG automated checks: conventional home page", async ({ page }) => {
  await page.goto("");
  await expect(page.locator("#main")).toBeVisible();
  await inspect(page);
});

for (const project of ["fractaw", "retorna", "centro-em-movimento"]) {
  test(`WCAG automated checks: ${project} case study`, async ({ page }) => {
    await page.goto(`projects/${project}.html?lang=pt-BR`);
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await inspect(page);
  });
}

test("WCAG automated checks: bilingual recruiter profile", async ({ page }) => {
  await page.goto("profile.html?lang=pt-BR");
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await inspect(page);
});
