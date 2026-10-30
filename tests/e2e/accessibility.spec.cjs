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

for (const scene of ["intro", "fractaw", "retorna", "about", "contact"]) {
  test(`WCAG automated checks: home scene ${scene}`, async ({ page }) => {
    await page.goto(`/?lang=en#${scene}`);
    await expect(page.locator(`#${scene}`)).toBeVisible();
    await inspect(page);
  });
}

for (const project of ["fractaw", "retorna"]) {
  test(`WCAG automated checks: ${project} case study`, async ({ page }) => {
    await page.goto(`/projects/${project}.html?lang=pt-BR`);
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await inspect(page);
  });
}
