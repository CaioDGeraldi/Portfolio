# Design direction: Caio Geraldi

## Product and audience
A personal portfolio for backend engineering opportunities and technical collaborations. It records real work, the decisions behind it and the stage each project has reached.

## Character
**Technical, curious, direct.** The visual language should feel like an engineer's workbench turned into an edited project journal. It must not resemble a generic SaaS landing page or a prebuilt AI portfolio.

## Visual system
Use the Fractaw palette because it already belongs to the user's work:
- Graphite: `#1E2327`, `#252B30`
- Paper/surface: `#E7ECEF`, `#F5F7F7`
- Text: `#E7ECEF` on dark and `#1E2327` on light
- Muted: `#B8C0C5`
- Signal yellow: `#F4B942` (primary action, award mark, occasional emphasis)
- Teal: `#2F6F6D`, `#4FA7A3` (technical diagram and secondary emphasis)

Typography: Clash Grotesk for display and Satoshi for body, both from Fontshare. Use a system monospace stack for small technical metadata. Fontshare describes its catalogue as free for personal and commercial use; each font's specific license still applies.

Grid: 4px base, 8px rhythm, 1280px max content width, 20px mobile gutters and 48px desktop gutters. Controls get a 4px radius, image panels 8px. Build hierarchy with scale, alignment, image crops and rules, not nested cards and shadows.

## Layout
- Keep a conventional, naturally scrolling document.
- Lead with a restrained, single-column introduction based on the résumé. Avoid status dashboards, résumé statistics and decorative project indexes.
- Put the project collection immediately after the introduction. Present Fractaw Modules, Retorna and Centro em Movimento as three individual editorial pitches, not summary cards.
- Give every project a clear narrative: scenario/problem, proposal and how the solution works. Pair the story with one relevant interface capture or a clearly labelled conceptual flow. Keep the project stage visible and factual.
- Give the three projects equal visual weight. Keep experience, education and skills as supporting context after the project presentations.
- Keep bilingual copy, theme switching, semantic navigation, keyboard focus and reduced-motion support.

## Copy direction
Write in first person and use the résumé as the factual baseline: internship maintenance of a legacy ERP, Delphi/Object Pascal, SQL, Oracle, forms, Excel exports and relational searches; Python, Django and PostgreSQL in projects. Describe the projects before describing their outcomes. Distinguish internship work from personal projects and collaborative work. Do not invent metrics, adoption, customers, partnerships, deployments, responsibilities or skills. Avoid vague slogans, hype, adjective triplets and repeated explanations.

## Motion direction
- Supahero: use real hero layouts as anatomy references; keep the opening asymmetrical and evidence-led.
- 21st.dev: adapt one scroll/image reveal interaction, not a full component theme.
- React Bits: use Fold Text as a reference for a one-time title reveal with an accessible static text equivalent.
- MotionSites: use selective scroll choreography and image masks, not motion on every element.
- Lenis + GSAP: preserve native scrolling and working anchors; Lenis must be configured to allow anchors. GSAP selectors must be scoped and cleaned up.
- Kawaii text animation: restrict the playful effect to one tiny monogram or short hover detail. No pastel or childish page-wide styling.
- Originkit: use previewed templates for pacing and section hierarchy. Do not assume premium templates are downloadable on a free account.
- Fontshare: use Clash Grotesk and Satoshi; do not fall back to generic Inter/Roboto styling.

## Anti-patterns
No floating rotated logo cards, repeated decorative 01/02/03 labels, all-caps eyebrow above every section, repeated sparkle glyphs, the same card three times, giant accent-colored final word, arrows on every link, endless tech marquee, vague "real problems" copy, or made-up social proof. Avoid purple gradients/glows, acid green, cream/serif/terracotta substitutions and generic glassmorphism.

## References
- Anti-slop UI skill: https://github.com/nyrthoughts/anti-slop-design/tree/main/skills/anti-slop-ui
- Humanize writing skill: https://github.com/shir-danishyar/humanize
- Supahero: https://supahero.io/
- Fontshare: https://www.fontshare.com/
- 21st.dev: https://21st.dev/
- Originkit: https://www.originkit.dev/
- Kawaii text animation reference collection: https://aimotions.art/
- MotionSites: https://www.motionsites.ai/
- React Bits: https://reactbits.dev/
- Lenis: https://lenis.darkroom.engineering/
- GSAP: https://gsap.com/
