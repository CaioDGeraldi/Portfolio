const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const home = fs.readFileSync(path.join(root, "index.html"), "utf8");
const casePage = fs.readFileSync(path.join(root, "projects/retorna.html"), "utf8");
const dictionary = fs.readFileSync(path.join(__dirname, "i18n.js"), "utf8");
const caseScript = fs.readFileSync(path.join(__dirname, "case.js"), "utf8");
const mainScript = fs.readFileSync(path.join(__dirname, "main.js"), "utf8");

test("homepage immediately presents the work, without a full-screen intro", () => {
  assert.doesNotMatch(home, /id="intro"/);
  assert.match(home, /class="hero-headline"/);
  assert.match(home, /href="\.\/projects\/retorna\.html" data-localized-link/);
  assert.match(home, /href="#projetos"/);
  assert.match(home, /styles\/editorial\.css/);
});

test("Retorna has a navigable, source-linked technical case study", () => {
  assert.match(casePage, /<html lang="en">/);
  assert.match(casePage, /<main id="content"/);
  assert.match(casePage, /<h1>Retorna/);
  for (const anchor of ["problem", "architecture", "decisions", "evidence"]) {
    assert.match(casePage, new RegExp('id="' + anchor + '"'));
    assert.match(casePage, new RegExp('href="#' + anchor + '"'));
  }
  assert.match(casePage, /apps\/fidelidade\/resgates\.py/);
  assert.match(casePage, /test_concorrencia_resgates\.py/);
  assert.match(casePage, /team documents the use of AI tools/);
  assert.match(casePage, /scripts\/i18n\.js/);
  assert.match(casePage, /scripts\/case\.js/);
});

test("all local case navigation links support explicit locale routing", () => {
  const localLinks = [...casePage.matchAll(/<a\b[^>]*data-localized-link[^>]*>/g)];
  assert.ok(localLinks.length >= 2);
  for (const match of localLinks) {
    assert.match(match[0], /href="\.\.\/index\.html#projetos"/);
  }
  assert.match(dictionary, /target\.searchParams\.set\("lang", lang\)/);
});

test("new project content has Portuguese translations", () => {
  const essentialLabels = [
    "Selected work", "Read case study", "The problem", "Engineering decisions",
    "Evidence & limitations", "Loyalty infrastructure built around predictable business rules.",
    "Architecture", "Source repository", "TEAM PROJECT", "Back to selected work"
  ];
  for (const label of essentialLabels) {
    // Locale keys are JSON string literals in the dictionary.
    assert.ok(dictionary.includes(JSON.stringify(label) + ":"), "Missing PT translation: " + label);
  }
});

test("decorative 3D is optional and case-study theme stays independent", () => {
  assert.match(mainScript, /allowDecorative3D/);
  assert.match(mainScript, /saveData/);
  assert.doesNotMatch(mainScript, /function updateIntro\(/);
  assert.match(caseScript, /portfolio-theme/);
  assert.match(caseScript, /portfolio-language-change/);
});
