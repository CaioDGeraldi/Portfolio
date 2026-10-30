const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const read = relative => fs.readFileSync(path.join(root, relative), "utf8");
const home = read("index.html");
const fractaw = read("projects/fractaw.html");
const retorna = read("projects/retorna.html");
const dictionary = read("scripts/i18n.js");
const stageScript = read("scripts/stage.js");
const caseScript = read("scripts/case.js");
const stageCSS = read("styles/stage.css");

test("five in-place scenes have correct navigation targets", () => {
  const ids = [...home.matchAll(/<section\b[^>]*id="([^"]+)"[^>]*data-scene/g)].map(m => m[1]);
  assert.deepEqual(ids, ["intro", "fractaw", "retorna", "about", "contact"]);
  for (const id of ids) {
    assert.ok(home.includes('href="#' + id + '" data-scene-link'));
    assert.ok(home.includes('aria-labelledby="' + id + 'Title"'));
  }
  assert.match(home, /id="stageWindow"/);
  assert.match(home, /id="prevScene"/);
  assert.match(home, /id="nextScene"/);
  assert.match(stageCSS, /html\.stage-mode \.stage-scene\[hidden\]/);
  assert.match(stageScript, /document\.startViewTransition/);
  assert.match(stageScript, /history\.pushState/);
  assert.match(stageScript, /focusHeading/);
  assert.match(stageScript, /prefers-reduced-motion/);
});

test("Fractaw is a concept and Retorna is a source-backed collaborative project", () => {
  assert.match(home, /href="\.\/projects\/fractaw\.html" data-localized-link/);
  assert.match(home, /href="\.\/projects\/retorna\.html" data-localized-link/);
  assert.doesNotMatch(home, /Kambio|Intelligent Markdown IDE/);
  assert.match(home, /pay for software features they never use/);
  assert.match(home, /A loyalty program shaped around each business/);
  assert.match(home, /RETORNA \/ COLLABORATIVE PROJECT/);
  assert.match(retorna, /team documents the use of AI tools/);
  assert.match(retorna, /test_concorrencia_resgates\.py/);
  assert.match(fractaw, /Not a commercial claim/);
  assert.match(fractaw, /No customer adoption, production deployment/);
  assert.match(fractaw, /Conceptual model illustrating the product direction/);
});

test("original brand assets are included and used rather than placeholder icons", () => {
  for (const asset of [
    "assets/fractaw-logo-dark.svg", "assets/fractaw-logo-light.svg",
    "assets/retorna-logo-dark.svg", "assets/retorna-logo-light.svg"
  ]) {
    const svg = read(asset);
    assert.match(svg, /<svg\b/);
    assert.match(svg, /<path\b/);
    assert.doesNotMatch(svg, /<script|<image|<foreignObject/i);
    assert.match(home, new RegExp(asset.replaceAll(".", "\\.")));
  }
  assert.match(fractaw, /Fractaw official logo/);
  assert.match(retorna, /Retorna official logo/);
  assert.match(stageCSS, /body\.light-mode \.theme-light-only/);
});

test("case studies provide problem, decisions and honest evidence limits", () => {
  for (const [page, anchors] of [
    [fractaw, ["problem", "approach", "thinking", "scope"]],
    [retorna, ["problem", "architecture", "decisions", "evidence"]]
  ]) {
    assert.match(page, /<main id="content"/);
    assert.match(page, /scripts\/i18n\.js/);
    assert.match(page, /scripts\/case\.js/);
    for (const id of anchors) {
      assert.ok(page.includes('id="' + id + '"'), id);
      assert.ok(page.includes('href="#' + id + '"'), id);
    }
  }
  assert.match(fractaw, /href="\.\/retorna\.html" data-localized-link/);
  assert.match(retorna, /href="\.\/fractaw\.html" data-localized-link/);
  assert.match(caseScript, /portfolio-theme/);
});

test("content has Portuguese translations for navigation and each project", () => {
  for (const key of [
    "Explore the work", "Software that fits your business, not the other way around.",
    "Explore Fractaw's idea", "Explore Retorna's case",
    "Have a problem worth solving?", "The approach",
    "Not a commercial claim", "Fractaw product vision",
    "A loyalty program shaped around each business."
  ]) {
    assert.ok(dictionary.includes(JSON.stringify(key) + ":"), "Missing translation: " + key);
  }
  assert.match(dictionary, /searchParams\.set\("lang", lang\)/);
});

test("intro handles short viewports and shows an operable scroll cue", () => {
  assert.match(home, /id="scrollCue"/);
  assert.match(home, /class="scroll-cue"/);
  assert.match(stageScript, /cue\?\.addEventListener\("click"/);
  assert.match(stageScript, /cue\.hidden = position === scenes\.length/);
  assert.match(stageCSS, /@media \(max-height: 480px\)/);
  assert.match(stageCSS, /font-size: clamp\(3\.15rem, min\(9\.8vw, 14vh\)/);
  assert.match(stageCSS, /prefers-reduced-motion: no-preference/);
});

test("Retorna story remains about loyalty instead of request races", () => {
  assert.match(home, /configurable points, rewards and campaigns instead of a fixed/);
  assert.match(retorna, /configurable by company, with store-level overrides/);
  assert.match(retorna, /Rules that match each business/);
  assert.match(retorna, /Integrate, don't replace/);
  assert.doesNotMatch(home, /What happens when a request arrives twice/);
});

test("Fractaw explains unused-feature costs without invented billing or savings", () => {
  assert.match(home, /pay for software features they never use/);
  assert.match(home, /select the capabilities it needs/);
  assert.match(fractaw, /pay for functions they rarely or never use/);
  assert.match(fractaw, /module-based billing is already available/);
  assert.match(fractaw, /No customer adoption, production deployment, pricing model, proven cost savings/);
});

test("Retorna prioritizes configurable programs, not technical edge cases", () => {
  assert.match(home, /A loyalty program shaped around each business/);
  assert.match(retorna, /store-level overrides, reward and redemption policies/);
  assert.match(retorna, /business's configured loyalty policies/);
  assert.doesNotMatch(home, /What happens when a request arrives twice/);
});

test("viewport improvements preserve readable scenes and touch navigation", () => {
  const quality = read("styles/stage-quality.css");
  assert.match(home, /styles\/stage-quality\.css/);
  assert.match(quality, /100dvh/);
  assert.match(quality, /align-items: safe center/);
  assert.match(quality, /overflow-y: auto/);
  assert.match(stageScript, /touchstart/);
  assert.match(stageScript, /touchend/);
  assert.match(stageScript, /sceneCanScroll\(direction\)/);
  assert.match(stageScript, /event\.repeat/);
});

test("Fractaw uses a real source screenshot with clear fictional fixture scope", () => {
  assert.match(fractaw, /id="preview"/);
  assert.match(fractaw, /docs\/evidencias\/ux143\/modularidade-1440\.png/);
  assert.match(fractaw, /loading="lazy"/);
  assert.match(fractaw, /fictional school fixture/);
  assert.match(fractaw, /not a commercial deployment/);
  assert.match(fractaw, /styles\/case-evidence\.css/);
});

test("Retorna illustrates its configurable loyalty journey without a fake UI", () => {
  assert.match(retorna, /id="journey"/);
  assert.match(retorna, /<ol class="loyalty-journey"/);
  assert.match(retorna, /business's configured loyalty policies/);
  assert.match(retorna, /Product README and scope/);
  assert.match(retorna, /Conceptual product journey/);
  assert.match(retorna, /styles\/case-evidence\.css/);
  for (const phrase of ["Module selection in the prototype", "How a loyalty event becomes a reward"]) {
    assert.ok(dictionary.includes(JSON.stringify(phrase) + ":"), "Missing translation " + phrase);
  }
});

test("content remains accessible when JavaScript is disabled", () => {
  assert.doesNotMatch(home, /<section[^>]*data-scene[^>]*hidden/);
  assert.match(stageCSS, /without JavaScript, scenes are normal document sections/i);
  assert.match(home, /class="skip-link"/);
  assert.match(stageScript, /stage-mode/);
});
