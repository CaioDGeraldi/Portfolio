# Caio Geraldi | Portfolio

A bilingual personal portfolio built with **React 19 and Vite 8**. The homepage is a conventional, responsive page with natural document scrolling. Individual project studies and the recruiter profile remain direct, independently accessible HTML pages.

**Published address:** https://caiodgeraldi.github.io/Portfolio/

**Languages:** [English](https://caiodgeraldi.github.io/Portfolio/?lang=en) · [Português](https://caiodgeraldi.github.io/Portfolio/?lang=pt-BR)

## Experience

The homepage is organized around the information a visitor needs:

- An introduction that explains the focus and current direction.
- Three selected projects with original visuals and direct case-study links.
- About, professional experience and education.
- Engineering approach and technical focus.
- Contact links and a separate professional profile.

Project descriptions distinguish product concepts, collaborative work, prototypes and award recognition. The page does not claim commercial deployment, customer traction or measured business outcomes that are not supported by the project sources.

## Stack

- **React 19** for reusable page components and bilingual content.
- **Vite 8** for development and optimized static builds.
- **GSAP 3 / ScrollTrigger** for restrained entrance and scroll-triggered motion.
- **Lenis** for smooth wheel scrolling while retaining native document scroll.
- **Fontshare** — General Sans and Satoshi, with system fallbacks.
- **Playwright** and **axe-core** for responsive browser checks and automated accessibility checks.

Motion is disabled when `prefers-reduced-motion: reduce` is enabled. Lenis is connected to GSAP's ticker and ScrollTrigger; it does not replace the document with a custom scrolling container.

## Inspiration and implementation notes

The visual research used:

- [Supahero](https://supahero.io/) for hero composition.
- [21st.dev](https://21st.dev/) for React component patterns and card composition.
- [OriginKit](https://www.originkit.dev/) and [React Bits](https://reactbits.dev/) for kinetic typography and scroll-reveal ideas.
- [MotionSites](https://motionsites.org/) for full-page and portfolio direction.
- [Fontshare](https://fontshare.com/) for typefaces.
- [GSAP](https://gsap.com/docs/v3/) and [Lenis](https://lenis.dev/) for motion and scrolling behavior.

These references informed the design direction. The page uses custom components and original project assets rather than importing a prebuilt template or copying another site's identity.

## Local development

Requirements: Node.js 22 or newer.

```sh
npm install
npm run dev
```

The local development server prints the address to open. Production build:

```sh
npm run build
npm run preview
```

The production output is written to `dist/`. Vite builds the homepage, the professional profile and all three project case studies as separate HTML entry points.

## Validation

```sh
npm run test:unit
npm run build
npm run test:e2e
```

The browser suite checks the conventional layout at mobile, tablet and desktop widths, navigation, bilingual content, theme preference and the profile and case-study pages. The axe suite covers automated WCAG 2.0, 2.1 and 2.2 A/AA rules.

Automated checks are not a WCAG 2.2 AA certification. Manual checks are still needed for screen readers, keyboard interaction, zoom, visual contrast and motion behavior.

## GitHub Pages

The deployment workflow builds `dist/` and publishes it with GitHub Pages. The repository's Pages source must be set to **GitHub Actions**:

1. Open repository **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Pushes to `main` can then publish through `.github/workflows/deploy-pages.yml`.

The workflow does not publish pull-request branches. PRs run build and browser validation only.
