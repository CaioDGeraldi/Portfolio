# Caio Geraldi | Portfolio

A bilingual personal portfolio built as a small **scene-based presentation**. The position of the content is fixed. Navigation changes the scene instead of making visitors scroll past stacked sections.

**Published address:** https://caiodgeraldi.github.io/Portfolio/

**Direct language links:** [English](https://caiodgeraldi.github.io/Portfolio/?lang=en&source=github) · [Português](https://caiodgeraldi.github.io/Portfolio/?lang=pt-BR&source=github)

## Concept

The visitor sees five concise scenes: introduction, **Fractaw**, **Retorna**, experience and contact. The name is revealed briefly on the opening scene. All other changes are crossfades in the same viewport; no full-page scrolling or elaborate dashboard animations.

Fractaw is the **central product idea**, presented through the business problem it aims to solve. The codebase is private and the prototype is not represented as a deployed commercial ERP.

Retorna is the **engineering evidence**, a collaborative Django/PostgreSQL challenge project with source links, idempotent redemption logic, tests, architecture decisions and AI-use disclosure.

Each project has a separate, direct-linkable case-study page:
- [Fractaw: product vision](projects/fractaw.html)
- [Retorna: engineering case study](projects/retorna.html)

## Identity and sources

The project logos are **the actual SVG files from the project repositories**. No invented marks, AI-generated mock-ups, stock photos, fake testimonials, fabricated metrics or generic technology illustrations.

| Portfolio asset | Original repository file |
| --- | --- |
| `assets/fractaw-logo-dark.svg` | `CaioDGeraldi/FractawModules/frontend/src/brand/fractaw-logo-lockup-dark.svg` |
| `assets/fractaw-logo-light.svg` | `CaioDGeraldi/FractawModules/frontend/src/brand/fractaw-logo-lockup.svg` |
| `assets/retorna-logo-dark.svg` | `CaioDGeraldi/DataSystemChallenge/frontend/public/retorna/brand/retorna-logo-dark.svg` |
| `assets/retorna-logo-light.svg` | `CaioDGeraldi/DataSystemChallenge/frontend/public/retorna/brand/retorna-logo-light.svg` |
| `assets/retorna-symbol.svg` | `CaioDGeraldi/DataSystemChallenge/frontend/public/retorna/brand/retorna-symbol.svg` |

The Fractaw asset's appearance is shared here to present the product concept; private implementation details are not copied.

## Implementation

- Semantic HTML, vanilla CSS and JavaScript, with no build step.
- Enhanced navigation in `scripts/stage.js` uses the View Transitions API when supported. Otherwise, scene changes are immediate.
- Five native `<section>` elements remain readable with **JavaScript disabled**. In enhanced mode, only the active scene is visible to keyboard/screen-reader navigation.
- Direct hashes (`#fractaw`, `#retorna`, etc.), browser back/forward, keyboard navigation, next/previous controls and restrained mouse-wheel scene changes are supported.
- The active scene remains in the same position. When a panel is too tall on a small screen, **that panel alone** can scroll to prevent content clipping.
- Respects `prefers-reduced-motion`. No forced 3D, autoplay video or infinite motion.
- The EN/PT selector updates visible strings, metadata and `html[lang]`; links to case studies carry the explicit language preference.
- A saved theme preference is shared with the project detail pages.

## Run and validate

Start a local static server from the repository root:

```sh
python -m http.server 8000
```

Open http://localhost:8000/ and test both languages and themes.

```sh
node --check scripts/i18n.js
node --check scripts/stage.js
node --check scripts/case.js
node --test scripts/*.test.cjs
```

A GitHub Actions workflow runs the checks for every PR to `main`.

## Design principles

- Content explains a *real problem, decision or constraint*.
- No made-up business traction or individual authorship claims for team work.
- Project identities take priority over decorative badges.
- Accessible scene navigation and clear direct links take priority over visual spectacle.
- Contrast, small viewport behavior and focus management must be verified manually before publication.

## Publication

GitHub Pages publishes from `main` after review and squash merge. Visual QA on desktop/mobile remains required in addition to structural tests.
