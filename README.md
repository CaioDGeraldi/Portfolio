# Portfolio | CaioDGeraldi

Personal portfolio for a **Backend Software Developer** based in Brazil and preparing for international software engineering opportunities.

**Live site:** https://caiodgeraldi.github.io/Portfolio/

**Localized entry points:** [English](https://caiodgeraldi.github.io/Portfolio/?lang=en&source=github) · [Português](https://caiodgeraldi.github.io/Portfolio/?lang=pt-BR&source=github)

## Featured engineering work

- **[Retorna](https://github.com/CaioDGeraldi/DataSystemChallenge):** team-developed multi-company loyalty application built with Django, Django REST Framework and PostgreSQL. Includes transaction-safe redemptions, idempotency, concurrency tests and CI.
- **Fractaw Modules:** private modular Django ERP project, still in development.
- **[Kambio](https://github.com/CaioDGeraldi/Kambio):** desktop learning project with Delphi / Object Pascal and FireMonkey.
- **Portfolio:** this static website, built with HTML, CSS, JavaScript and Three.js.

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

## Publication

The project can be published directly from the main branch through GitHub Pages. Deployment configuration and the actual live URL should be checked before adding availability guarantees.
