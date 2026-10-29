# Portfolio | CaioDGeraldi

Personal portfolio for a **Backend Software Developer** based in Brazil and preparing for international software engineering opportunities.

**Live site:** https://caiodgeraldi.github.io/Portfolio/

**Localized entry points:** [English](https://caiodgeraldi.github.io/Portfolio/?lang=en&source=github) · [Português](https://caiodgeraldi.github.io/Portfolio/?lang=pt-BR&source=github)

## Featured engineering work

**[Retorna](https://github.com/CaioDGeraldi/DataSystemChallenge)** is the sole featured project on the public portfolio. It is a team-developed multi-company loyalty application using Django, Django REST Framework and PostgreSQL, with transaction-safe redemptions, idempotency, concurrency tests and CI.

Explore the [Retorna case study](projects/retorna.html) for engineering context, architecture and source evidence.

## Technology

- HTML5, CSS, JavaScript and Three.js.
- Static hosting on GitHub Pages.
- No application backend or build step.

## Run locally

Open `index.html` directly, or serve this directory through any local static HTTP server.

## Localization and accessibility

- The English copy in `index.html` is the source text. `scripts/i18n.js` contains Brazilian Portuguese translations. The UI does not depend on referrer headers.
- Language resolution follows explicit `?lang=en` / `?lang=pt-BR` in the link, then the visitor's saved selection, then the browser's language, then English.
- GitHub profile links include an explicit language parameter; a `source` parameter is optional and has no effect on the chosen language.
- The EN/PT control updates visible copy, `html[lang]`, metadata, accessible labels, URL and local preference without reloading.
- `scripts/i18n.test.cjs` tests the language rules using Node's built-in test runner; `.github/workflows/portfolio-l10n.yml` runs these checks in pull requests.
- Semantic HTML, navigation landmarks and keyboard-focused controls are used where available.
- Responsive layout and reduced-motion behavior should be checked manually across browsers and devices.


## Editorial portfolio and case studies

The landing page prioritizes engineering work, with a compact introduction, an evidence-linked featured project and no mandatory full-screen animation. The design retains the Fractaw dark/light palette.

- **Retorna case study:** `projects/retorna.html`. Covers the engineering problem, a conceptual architecture diagram, concurrency/idempotency approaches, code evidence and honest team-project attribution.
- **Languages:** `?lang=en` / `?lang=pt-BR` override browser or saved preferences. Localized links carry the selected language between the homepage and case-study pages.
- **Accessibility:** skip links, semantic headings, visible focus, responsive navigation, reduced-motion support and a textual description of the architecture diagram.
- **Performance:** decorative WebGL is limited to wider screens without reduced-motion or data-saver preferences. Project content stays accessible with JavaScript disabled, though localization and theme preferences require JavaScript.

### Verify

```sh
node --check scripts/main.js
node --check scripts/i18n.js
node --check scripts/case.js
node --test scripts/*.test.cjs
```

The tests validate language behavior and structural invariants. They do **not** replace visual testing at mobile/desktop widths, accessibility audits or deployment verification.

## Publication

The project can be published directly from the main branch through GitHub Pages. Deployment configuration and the actual live URL should be checked before adding availability guarantees.
