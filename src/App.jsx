import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import ProjectCard from "./components/ProjectCard.jsx";
import { content, technologies } from "./data/content.js";
import { useSiteMotion } from "./hooks/useSiteMotion.js";
import fractawDark from "../assets/fractaw-logo-dark.svg";
import retornaDark from "../assets/retorna-logo-dark.svg";
import "./styles.css";

function initialLanguage() {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("lang");
  if (requested === "pt-BR" || requested === "pt") return "pt-BR";
  if (requested === "en") return "en";

  try {
    const saved = localStorage.getItem("caiodgeraldi.portfolio.language");
    if (saved === "pt-BR" || saved === "en") return saved;
  } catch {
    // Language preference is optional.
  }

  return navigator.language?.toLowerCase().startsWith("pt") ? "pt-BR" : "en";
}

function initialTheme() {
  try {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    // Theme preference is optional.
  }
  return "light";
}

function ArrowDown() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3v13m-5-5 5 5 5-5" /></svg>;
}

function ArrowUpRight() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 15.5 15 5m-8.5 0H15v8.5" /></svg>;
}

function SectionHeading({ eyebrow, title, description, number }) {
  return (
    <div className="section-heading" data-reveal>
      <p className="eyebrow"><span>{number}</span>{eyebrow}</p>
      <div className="section-heading-main">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}

function ExperienceTimeline({ items }) {
  return (
    <div className="experience-list">
      {items.map((item, index) => (
        <article className="experience-item" key={item.title} data-reveal>
          <div className="experience-period"><span>{String(index + 1).padStart(2, "0")}</span>{item.period}</div>
          <div className="experience-copy">
            <h3>{item.title}</h3>
            <p className="experience-role">{item.role}</p>
            <p>{item.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function Footer({ copy }) {
  return (
    <footer className="site-footer">
      <a className="footer-brand" href="#top">C<span>.</span> Caio Geraldi</a>
      <p>{copy.footer.location} <span aria-hidden="true">·</span> {copy.footer.note}</p>
      <a href="#top" className="back-to-top">Back to top <ArrowUpRight /></a>
    </footer>
  );
}

export default function App() {
  const [language, setLanguage] = useState(initialLanguage);
  const [theme, setTheme] = useState(initialTheme);
  const rootRef = useSiteMotion();
  const copy = content[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = copy.documentTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content", copy.description);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#151b20" : "#f3f1eb");
  }, [language, theme, copy]);

  function toggleLanguage() {
    const next = language === "en" ? "pt-BR" : "en";
    setLanguage(next);
    try {
      localStorage.setItem("caiodgeraldi.portfolio.language", next);
    } catch {
      // The page still works when storage is unavailable.
    }

    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState({}, "", url);
  }

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {
      // Theme persistence is optional.
    }
  }

  return (
    <div className="site-root" data-theme={theme} ref={rootRef}>
      <a className="skip-link" href="#main">{copy.skip}</a>
      <Header
        copy={copy}
        language={language}
        onLanguageToggle={toggleLanguage}
        theme={theme}
        onThemeToggle={toggleTheme}
      />

      <main id="main">
        <section className="hero-section" id="top">
          <div className="hero-shell">
            <div className="hero-copy">
              <p className="hero-eyebrow"><span className="status-dot" />{copy.hero.eyebrow}</p>
              <p className="availability-line">{copy.hero.availability}</p>
              <h1 className="hero-title">
                <span className="title-line"><span data-hero-line>{copy.hero.lineOne}</span></span>
                <span className="title-line"><span data-hero-line>{copy.hero.lineTwo}</span></span>
                <span className="title-line title-line-accent"><span data-hero-line>{copy.hero.lineThree}<i className="hero-spark" aria-hidden="true">✳</i></span></span>
              </h1>
              <p className="hero-description">{copy.hero.description}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">{copy.hero.primary}<ArrowDown /></a>
                <a className="button button-text" href="#contact">{copy.hero.secondary}<ArrowUpRight /></a>
              </div>
              <div className="hero-footer-note">
                <span className="note-rule" />
                <span>{copy.hero.asideNote}</span>
              </div>
            </div>

            <div className="hero-art" data-hero-aside aria-label={copy.hero.asideLabel}>
              <div className="hero-art-grid" />
              <div className="art-orbit art-orbit-one" />
              <div className="art-orbit art-orbit-two" />
              <div className="art-artifact artifact-fractaw">
                <span className="artifact-index">PRODUCT / 01</span>
                <img src={fractawDark} alt="Fractaw" />
                <span className="artifact-caption">Modular business software</span>
              </div>
              <div className="art-artifact artifact-retorna">
                <span className="artifact-index">ENGINEERING / 02</span>
                <img src={retornaDark} alt="Retorna" />
                <span className="artifact-caption">Configurable loyalty</span>
              </div>
              <div className="art-award">
                <span className="award-star" aria-hidden="true">✳</span>
                <div><strong>{copy.hero.award}</strong><span>{copy.hero.awardLabel}</span></div>
              </div>
              <div className="hero-art-caption">{copy.hero.asideCaption}</div>
            </div>
          </div>
          <div className="hero-bottom-rule"><span>SCROLL TO EXPLORE</span><ArrowDown /></div>
        </section>

        <div className="marquee-band" aria-label={copy.marqueeLabel}>
          <div className="marquee-track">
            {[0, 1].map(group => (
              <div className="marquee-group" key={group} aria-hidden={group === 1}>
                {technologies.map(item => <span key={item}>{item}<i aria-hidden="true">✳</i></span>)}
              </div>
            ))}
          </div>
        </div>

        <section className="content-section projects-section" id="projects">
          <div className="content-shell">
            <SectionHeading number="01" eyebrow={copy.projects.eyebrow} title={copy.projects.title} description={copy.projects.description} />
            <div className="project-grid">
              {copy.projects.items.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  language={language}
                  viewCase={copy.projects.viewCase}
                  featuredLabel={copy.projects.featured}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="content-shell about-layout">
            <div className="about-main" data-reveal>
              <p className="eyebrow"><span>02</span>{copy.about.eyebrow}</p>
              <h2>{copy.about.title}</h2>
              <p className="about-body">{copy.about.body}</p>
            </div>
            <aside className="about-aside" data-reveal>
              <span className="aside-index">A NOTE ON DIRECTION</span>
              <h3>{copy.about.detailTitle}</h3>
              <p>{copy.about.detail}</p>
              <a href={`./profile.html?lang=${language}`} className="inline-link">{copy.about.link}<ArrowUpRight /></a>
            </aside>
          </div>
        </section>

        <section className="content-section experience-section" id="experience">
          <div className="content-shell">
            <SectionHeading number="03" eyebrow={copy.experience.eyebrow} title={copy.experience.title} />
            <ExperienceTimeline items={copy.experience.items} />
          </div>
        </section>

        <section className="approach-section" id="approach">
          <div className="content-shell">
            <SectionHeading number="04" eyebrow={copy.approach.eyebrow} title={copy.approach.title} />
            <div className="approach-grid">
              {copy.approach.items.map(item => (
                <article className="approach-card" key={item.number} data-reveal>
                  <span className="approach-number">{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section skills-section" id="skills">
          <div className="content-shell skills-layout">
            <div className="skills-intro" data-reveal>
              <p className="eyebrow"><span>05</span>{copy.skills.eyebrow}</p>
              <h2>{copy.skills.title}</h2>
              <p>{copy.skills.learning}</p>
            </div>
            <div className="skills-groups">
              {copy.skills.groups.map(group => (
                <div className="skill-group" key={group.title} data-reveal>
                  <h3>{group.title}</h3>
                  <div className="skill-chips">{group.items.map(item => <span key={item}>{item}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="content-shell contact-shell">
            <div className="contact-copy" data-reveal>
              <p className="eyebrow"><span>06</span>{copy.contact.eyebrow}</p>
              <h2>{copy.contact.title}</h2>
              <p>{copy.contact.body}</p>
              <a className="button button-contact" href="mailto:chdgeraldi@gmail.com">{copy.contact.email}<ArrowUpRight /></a>
            </div>
            <div className="contact-links" data-reveal>
              <a href="https://github.com/CaioDGeraldi" target="_blank" rel="noopener noreferrer"><span>{copy.contact.github}</span><ArrowUpRight /></a>
              <a href="https://www.linkedin.com/in/caio-geraldi/" target="_blank" rel="noopener noreferrer"><span>{copy.contact.linkedin}</span><ArrowUpRight /></a>
              <a href={`./profile.html?lang=${language}`}><span>{copy.contact.profile}</span><ArrowUpRight /></a>
            </div>
          </div>
        </section>
      </main>

      <Footer copy={copy} />
    </div>
  );
}
