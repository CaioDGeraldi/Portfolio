const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const read = relative => fs.readFileSync(path.join(root, relative), "utf8");
const home = read("index.html");
const app = read("src/App.jsx");
const copy = read("src/data/content.js");
const styles = read("src/styles.css");
const profile = read("profile.html");
const fractaw = read("projects/fractaw.html");
const retorna = read("projects/retorna.html");
const centro = read("projects/centro-em-movimento.html");

test("the homepage is a conventional document, not a slide or scene presentation", () => {
  assert.match(home, /id="root"/);
  assert.match(home, /src="\/src\/main\.jsx"/);
  assert.match(app, /<main id="main">/);
  for (const id of ["top", "projects", "about", "experience", "approach", "skills", "contact"]) {
    assert.match(app, new RegExp(`id="${id}"`));
  }
  assert.doesNotMatch(app, /data-scene|stage-mode|scene-navigation/);
  assert.match(styles, /position: sticky/);
  assert.match(styles, /scroll-behavior: smooth/);
});

test("selected projects retain their real case-study destinations and factual boundaries", () => {
  for (const id of ["centro-em-movimento", "fractaw", "retorna"]) {
    assert.ok(app.includes(`id={project.id}`));
    assert.ok(copy.includes(`id: "${id}"`));
    assert.ok(app.includes(`projects/${id}`) || copy.includes(`slug: "${id}"`));
  }
  assert.match(copy, /1st Inova Araras 2026/);
  assert.match(copy, /Soma Soluções/);
  assert.match(copy, /ETEC Alberto Feres/);
  assert.match(fractaw, /No customer adoption, production deployment/);
  assert.match(retorna, /collaborative loyalty platform/);
  assert.match(centro, /not confirmed partnerships/);
});

test("portfolio copy is bilingual and avoids unsupported claims", () => {
  for (const phrase of ["I build software", "Desenvolvo software", "Soma Soluções", "ETEC Alberto Feres", "Open to backend opportunities", "oportunidades em back-end"]) {
    assert.ok(copy.includes(phrase), `Missing content: ${phrase}`);
  }
  assert.doesNotMatch(copy, /10\+ years|senior developer|millions of users|revenue growth/i);
});

test("the visual system is editorial, responsive and reduced-motion aware", () => {
  assert.match(styles, /General Sans/);
  assert.match(styles, /Satoshi/);
  assert.match(styles, /@media \(max-width: 820px\)/);
  assert.match(styles, /@media \(max-width: 620px\)/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
  assert.match(styles, /project-card-featured/);
  assert.match(styles, /approach-grid/);
});

test("profile and source-backed case studies remain available", () => {
  assert.match(app, /profile\.html/);
  assert.match(profile, /Soma Soluções/);
  assert.match(profile, /ETEC Alberto Feres/);
  assert.match(profile, /not a formal employment record or certification/);
  for (const page of [fractaw, retorna, centro]) {
    assert.match(page, /<main id="content"/);
    assert.match(page, /scripts\/i18n\.js/);
    assert.match(page, /scripts\/case\.js/);
  }
});

test("motion is progressively enhanced and accessible", () => {
  const motion = read("src/hooks/useSiteMotion.js");
  assert.match(motion, /prefers-reduced-motion/);
  assert.match(motion, /ScrollTrigger/);
  assert.match(motion, /lenis\.destroy/);
  assert.match(app, /data-reveal/);
  assert.match(app, /Skip to content|copy\.skip/);
});
