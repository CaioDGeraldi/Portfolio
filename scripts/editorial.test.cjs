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

test("the homepage is a conventional, bilingual, projects-first document", () => {
  assert.match(home, /id="root"/);
  assert.match(home, /src="\/src\/main\.jsx"/);
  assert.match(app, /<main id="main">/);
  for (const id of ["top", "projects", "about", "experience", "skills", "contact"]) {
    assert.match(app, new RegExp(`id="${id}"`));
  }
  assert.doesNotMatch(app, /id="approach"|data-scene|stage-mode|scene-navigation/);
  assert.ok(app.indexOf('id="projects"') < app.indexOf('id="about"'));
  assert.match(app, /data-language-toggle|Header/);
});

test("project entries preserve their real case-study links and image descriptions", () => {
  assert.match(projectCard, /id=\{project\.id\}/);
  assert.match(projectCard, /alt=\{project\.imageAlt/);
  assert.match(projectCard, /onError=/);
  const order = ["fractaw", "retorna", "centro-em-movimento"];
  const positions = order.map(id => copy.indexOf(`id: "${id}"`));
  assert.ok(positions.every(position => position >= 0));
  assert.ok(positions[0] < positions[1] && positions[1] < positions[2]);
  assert.match(copy, /Fractaw Modules/);
  assert.match(copy, /FEFO/);
  assert.match(copy, /Soma Soluções/);
  assert.match(copy, /ETEC Alberto Feres/);
  assert.match(fractaw, /No customer adoption, production deployment/);
  assert.match(retorna, /collaborative loyalty platform/);
  assert.match(centro, /not confirmed partnerships/);
});

test("public copy stays specific, bilingual and free of inflated claims", () => {
  for (const phrase of ["Backend developer", "Desenvolvedor back-end", "Soma Soluções", "ETEC Alberto Feres", "Fractaw Modules", "Retorna"]) {
    assert.ok(copy.includes(phrase), `Missing content: ${phrase}`);
  }
  assert.doesNotMatch(copy, /10\\+ years|senior developer|millions of users|revenue growth|industry-leading/i);
  assert.doesNotMatch(copy, /I build software around real problems|Desenvolvo software a partir de problemas reais/i);
  assert.doesNotMatch(copy, /Open to backend opportunities|Aberto a oportunidades em back-end/);
});

test("the visual system follows its design direction and supports small screens", () => {
  assert.match(home, /clash-grotesk/);
  assert.match(home, /satoshi/);
  assert.match(styles, /Clash Grotesk/);
  assert.match(styles, /Satoshi/);
  assert.match(styles, /@media \(max-width: 760px\)/);
  assert.match(styles, /@media \(max-width: 480px\)/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
  assert.match(styles, /project-grid \{ grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/);
  assert.doesNotMatch(styles, /radial-gradient|hover:scale/);
  assert.doesNotMatch(styles, /\\n/);
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
