const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const script = fs.readFileSync(path.join(__dirname, "i18n.js"), "utf8");
const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");

function createPage({ search = "", saved = null, languages = ["en-US"] } = {}) {
  const url = new URL("https://example.com/Portfolio/" + search);
  const storage = new Map(saved ? [["caiodgeraldi.portfolio.language", saved]] : []);
  const makeElement = initial => ({
    attrs: { ...initial },
    dataset: {},
    handlers: {},
    hasAttribute(name) { return Object.hasOwn(this.attrs, name); },
    getAttribute(name) { return this.attrs[name]; },
    setAttribute(name, value) { this.attrs[name] = value; },
    removeAttribute(name) { delete this.attrs[name]; },
    addEventListener(name, cb) { this.handlers[name] = cb; }
  });
  const en = makeElement({ "aria-label": "English language" });
  en.dataset.portfolioLang = "en";
  const pt = makeElement({ "aria-label": "Idioma português" });
  pt.dataset.portfolioLang = "pt-BR";
  const attrElement = makeElement({ "aria-label": "Main navigation" });
  const nodes = ["Explore the work", "Business software should fit the business.", "Retorna", "Unchanged proper noun"]
    .map(value => ({ nodeValue: value, parentElement: { closest: () => null } }));
  let current = -1;
  const walker = {
    currentNode: null,
    nextNode() {
      current += 1;
      if (current >= nodes.length) return false;
      this.currentNode = nodes[current];
      return true;
    }
  };
  const meta = { content: "Caio Darin Geraldi: software development, Fractaw's business problem, and the Retorna engineering case study." };
  const document = {
    readyState: "complete",
    body: {},
    documentElement: { lang: "en" },
    title: "Caio Darin Geraldi | Software Development",
    createTreeWalker() { return walker; },
    querySelectorAll(selector) {
      return selector === "[data-portfolio-lang]" ? [en, pt] : [attrElement, en, pt];
    },
    querySelector(selector) { return selector === 'meta[name="description"]' ? meta : null; }
  };
  const events = [];
  const win = {
    location: { href: url.href, search: url.search },
    dispatchEvent(event) { events.push({ type: event.type, language: event.detail?.language }); }
  };
  const history = {
    replaceState(_state, _title, next) {
      const parsed = new URL(next, win.location.href);
      win.location.href = parsed.href;
      win.location.search = parsed.search;
    }
  };
  const localStorage = {
    getItem(key) { return storage.get(key) ?? null; },
    setItem(key, value) { storage.set(key, value); }
  };
  vm.runInNewContext(script, {
    document, window: win, history, localStorage,
    navigator: { languages, language: languages[0] },
    NodeFilter: { SHOW_TEXT: 4 }, URL, URLSearchParams,
    CustomEvent: class CustomEvent {
      constructor(type, options) { this.type = type; this.detail = options?.detail; }
    }
  }, { timeout: 1000 });
  return { document, meta, nodes, en, pt, storage, win, events };
}

test("portfolio provides English and Portuguese controls and script", () => {
  assert.match(html, /data-portfolio-lang="en"/);
  assert.match(html, /data-portfolio-lang="pt-BR"/);
  assert.match(html, /scripts\/i18n\.js/);
});

test("explicit Portuguese URL overrides stored and browser languages", () => {
  const page = createPage({ search: "?lang=pt-BR&source=github", saved: "en", languages: ["en-US"] });
  assert.equal(page.document.documentElement.lang, "pt-BR");
  assert.equal(page.nodes[0].nodeValue, "Conheça os projetos");
  assert.equal(page.nodes[1].nodeValue, "O software empresarial deve se adaptar à empresa.");
  assert.equal(page.nodes[3].nodeValue, "Unchanged proper noun");
  assert.equal(page.document.title, "Caio Darin Geraldi | Desenvolvimento de Software");
  assert.equal(page.meta.content.startsWith("Caio Darin Geraldi: desenvolvimento"), true);
  assert.equal(page.pt.attrs["aria-current"], "true");
});

test("saved preference takes precedence over browser language", () => {
  const page = createPage({ saved: "en", languages: ["pt-BR"] });
  assert.equal(page.document.documentElement.lang, "en");
  assert.equal(page.nodes[0].nodeValue, "Explore the work");
});

test("browser language is used when URL and stored preference are absent", () => {
  const page = createPage({ languages: ["pt-BR", "en-US"] });
  assert.equal(page.document.documentElement.lang, "pt-BR");
  assert.equal(page.nodes[0].nodeValue, "Conheça os projetos");
});

test("manual switch is reversible, saved and reflected in the URL", () => {
  const page = createPage({ search: "?source=github&lang=en", languages: ["en-US"] });
  let prevented = false;
  page.pt.handlers.click({ preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(page.nodes[0].nodeValue, "Conheça os projetos");
  assert.equal(page.storage.get("caiodgeraldi.portfolio.language"), "pt-BR");
  assert.match(page.win.location.href, /lang=pt-BR/);
  page.en.handlers.click({ preventDefault() {} });
  assert.equal(page.nodes[0].nodeValue, "Explore the work");
  assert.equal(page.document.documentElement.lang, "en");
  assert.equal(page.pt.attrs["aria-current"], undefined);
  assert.equal(page.events.at(-1).language, "en");
  assert.ok(page.events.some(event => event.type === "portfolio-language-change" && event.language === "pt-BR"));
});

test("English from the GitHub link overrides a Portuguese browser", () => {
  const page = createPage({ search: "?lang=en&source=github", languages: ["pt-BR"] });
  assert.equal(page.document.documentElement.lang, "en");
  assert.equal(page.nodes[1].nodeValue, "Business software should fit the business.");
});

test("scenes link to both original project case studies", () => {
  assert.match(html, /id="intro" data-scene/);
  assert.match(html, /id="fractaw" data-scene/);
  assert.match(html, /id="retorna" data-scene/);
  assert.match(html, /data-localized-link>Explore Fractaw's idea/);
  assert.match(html, /data-localized-link>Explore Retorna's case/);
  assert.match(html, /scripts\/stage\.js/);
});
