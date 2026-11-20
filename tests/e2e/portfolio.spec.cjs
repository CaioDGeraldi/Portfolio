const { test, expect } = require("@playwright/test");
const fs = require("node:fs");

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

test("projects are presented as individual problem-solution pitches", async ({ page }) => {
  await page.goto("");
  await page.locator("[data-language-toggle]").click();
  for (const id of ["fractaw", "retorna", "centro-em-movimento"]) {
    const project = page.locator(`#${id}`);
    await expect(project).toBeVisible();
    await expect(project.locator(".pitch-chapter")).toHaveCount(3);
    await expect(project.locator(".pitch-link")).toBeVisible();
  }
  await expect(page.locator("#fractaw")).toContainText("O cenário");
  await expect(page.locator("#fractaw")).toContainText("A proposta");
  await expect(page.locator("#fractaw")).toContainText("Como funciona");
});

test("favicon, GitHub avatar and project visual assets are present", async ({ page }) => {
  await page.goto("");
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute("href", /\/favicon\.svg$/);
  await expect(page.locator(".brand-avatar")).toHaveAttribute("src", "https://avatars.githubusercontent.com/u/161092309?v=4");
  const fractawImage = page.locator("#fractaw .pitch-visual img");
  await expect(fractawImage).toHaveAttribute("src", /(?:FractawModules\/main\/docs\/evidencias\/ux143\/modularidade-1440\.png|fractaw-logo-dark\.svg)$/);
  await page.waitForFunction(() => {
    const image = document.querySelector("#fractaw .pitch-visual img");
    return image && image.complete && image.naturalWidth > 0;
  }, { timeout: 12000 });
  const retornaImage = page.locator("#retorna .pitch-retorna-brand img");
  await expect(retornaImage).toBeVisible();
  await expect(retornaImage).toHaveAttribute("src", /(?:retorna-symbol|data:image\/svg\+xml)/);
  await page.waitForFunction(() => {
    const image = document.querySelector("#retorna .pitch-retorna-brand img");
    return image && image.complete && image.naturalWidth > 0;
  });
  await expect(page.locator("#ai")).toBeAttached();
});


test("professional profile reflects verified CV experience and Inova recognition in both languages", async ({ page }) => {
  await page.goto("profile.html?lang=en");
  await expect(page.locator(".profile-intro")).toContainText("Backend developer in training");
  await expect(page.locator(".profile-intro")).toContainText("Delphi/Object Pascal");
  await expect(page.locator(".profile-item").first()).toContainText("2 months");
  await expect(page.locator(".profile-item").first()).toContainText("Excel exports");
  await expect(page.locator(".profile-work")).toContainText("Fractaw");
  await expect(page.locator(".profile-work")).toContainText("Retorna");
  await expect(page.locator(".profile-work")).toContainText("winning project at the 1st Inova Araras 2026");
  await page.locator('[data-portfolio-lang="pt-BR"]').click();
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.locator(".profile-intro")).toContainText("Desenvolvedor em formação");
  await expect(page.locator(".profile-work")).toContainText("projeto vencedor na 1ª edição do Inova Araras 2026");
});

test("Centro em Movimento includes the live prototype and hackathon build time", async ({ page }) => {
  await page.goto("");
  const project = page.locator("#centro-em-movimento");
  await expect(project.getByRole("link", { name: /live prototype|ver protótipo ao vivo/i })).toHaveAttribute("href", "https://vem-pro-centro-b1127bee3afd.herokuapp.com/");
  await expect(project).toContainText(/2 hours and 30 minutes|2 horas e 30 minutos|2h30/i);
});

test("industrial assembly follows the seven-section sequence and exposes its motion phases", async ({ page }) => {
  test.setTimeout(180_000);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("");

  const scene = page.locator(".assembly-scene");
  const output = "test-results/industrial-assembly-review";
  fs.mkdirSync(output, { recursive: true });

  const phases = [
    { name: "source", progress: 0.1, state: "source" },
    { name: "travel", progress: 0.5, state: "moving" },
    { name: "seated", progress: 0.96, state: "seated" }
  ];
  const sections = ["top", "projects", "about", "experience", "skills", "ai", "contact"];

  for (const [index, sectionId] of sections.entries()) {
    for (const phase of phases) {
      await page.evaluate(({ id, progress }) => {
        const section = document.getElementById(id);
        const anchor = window.innerHeight * 0.48;
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const destination = id === "top"
          ? progress * Math.max(section.offsetHeight - anchor, 1)
          : sectionTop + section.offsetHeight * progress - anchor;
        window.scrollTo(0, destination);
      }, { id: sectionId, progress: phase.progress });

      await expect(scene).toHaveAttribute("data-section", sectionId);
      await expect(scene).toHaveAttribute("data-module-index", String(index));
      await expect(scene).toHaveAttribute("data-piece-state", phase.state);

      if (await scene.getAttribute("data-hidden") === "false") {
        await expect(scene.locator("canvas")).toHaveCount(1);
        await expect(scene.locator("canvas")).toBeVisible();
        expect(Number(await scene.getAttribute("data-overlap"))).toBe(0);
      } else {
        await expect(scene.locator("canvas")).toHaveCount(0);
      }

      await page.waitForTimeout(180);
      await page.screenshot({ path: output + "/desktop-" + sectionId + "-" + phase.name + ".png" });
    }
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(scene).toHaveAttribute("data-hidden", "true");
  await expect(scene.locator("canvas")).toHaveCount(0);
  await page.screenshot({ path: output + "/mobile-hidden.png" });
});

test("industrial assembly falls back to a static sculpture for reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("");

  const scene = page.locator(".assembly-scene");
  await expect(scene).toBeAttached();
  await expect(scene).toHaveAttribute("data-piece-state", "seated");
  await expect(scene.locator(".assembly-fallback")).toBeVisible();
  await expect(scene.locator("canvas")).toHaveCount(0);
});
