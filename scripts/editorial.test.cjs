const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const read = relative => fs.readFileSync(path.join(root, relative), "utf8");
const home = read("index.html");
const app = read("src/App.jsx");
const projectCard = read("src/components/ProjectCard.jsx");
const copy = read("src/data/content.js");
const styles = read("src/styles.css");
const profile = read("profile.html");
const fractaw = read("projects/fractaw.html");
const retorna = read("projects/retorna.html");
const centro = read("projects/centro-em-movimento.html");

test("the homepage remains a conventional, bilingual scrolling document", () => {
  assert.match(home, /id="root"/);
  assert.match(home, /src="\/src\/main\.jsx"/);
  assert.match(app, /<main id="main">/);
  for (const id of ["top", "projects", "about", "experience", "approach", "skills", "contact"]) {
    assert.match(app, new RegExp(\`id="\${id}"\`));
  }
  assert.doesNotMatch(app, /data-scene|stage-mode|scene-navigation/);
  assert.match(app, /data-language-toggle|Header/);
});

test("project entries preserve their real case-study links and image descriptions", () => {
  assert.match(projectCard, /id=\{project\.id\}/);
  assert.match(projectCard, /alt=\{project\.imageAlt/);
  assert.match(projectCard, /onError=/);
  for (const id of ["centro-em-movimento", "fractaw", "retorna"]) {
    assert.ok(copy.includes(\`id: "\${id}"\`));
    assert.ok(copy.includes(\`slug: "\${id}"\`));
  }
  assert.match(copy, /1st place · Inova Araras 2026/);
  assert.match(copy, /1º lugar · Inova Araras 2026/);
  assert.match(copy, /Soma Soluções/);
  assert.match(copy, /ETEC Alberto Feres/);
  assert.match(fractaw, /No customer adoption, production deployment/);
  assert.match(retorna, /collaborative loyalty platform/);
  assert.match(centro, /not confirmed partnerships/);
});

test("public copy stays specific, bilingual and free of inflated claims", () => {
  for (const phrase of ["I start with the", "Eu começo pela", "Soma Soluções", "ETEC Alberto Feres", "Open to backend opportunities", "Aberto a oportunidades em back-end"]) {
    assert.ok(copy.includes(phrase), \`Missing content: \${phrase}\`);
  }
  assert.doesNotMatch(copy, /10\\+ years|senior developer|millions of users|revenue growth|industry-leading/i);
  assert.doesNotMatch(copy, /I build software around real problems|Desenvolvo software a partir de problemas reais/i);
});

test("the visual system follows its design direction and supports small screens", () => {
  assert.match(home, /clash-grotesk/);
  assert.match(home, /satoshi/);
  assert.match(styles, /Clash Grotesk/);
  assert.match(styles, /Satoshi/);
  assert.match(styles, /@media \(max-width: 760px\)/);
  assert.match(styles, /@media \(max-width: 480px\)/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
  assert.match(styles, /project-card-featured/);
  assert.doesNotMatch(styles, /radial-gradient|hover:scale/);
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

test("motion supports native anchors, reduced motion and scoped cleanup", () => {
  const motion = read("src/hooks/useSiteMotion.js");
  assert.match(motion, /prefers-reduced-motion/);
  assert.match(motion, /ScrollTrigger/);
  assert.match(motion, /anchors: true/);
  assert.match(motion, /lenis\.destroy/);
  assert.match(motion, /context\.revert/);
  assert.match(app, /data-reveal/);
  assert.match(app, /copy\.skip/);
});
