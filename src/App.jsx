import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import ProjectCard from "./components/ProjectCard.jsx";
import { content } from "./data/content.js";
import { useSiteMotion } from "./hooks/useSiteMotion.js";
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

function ArrowUpRight() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 15.5 15 5m-8.5 0H15v8.5" /></svg>;
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading" data-reveal>
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
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
      {items.map(item => (
        <article className="experience-item" key={item.title} data-reveal>
          <div className="experience-period">{item.period}</div>
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
      <a className="footer-brand" href="#top">
        <span className="brand-mark" aria-hidden="true">C<span>.</span></span>
        <span>Caio Geraldi</span>
      </a>
      <p>{copy.footer.location} <span aria-hidden="true">/</span> {copy.footer.note}</p>
      <a href="#top" className="back-to-top">{copy.footer.backToTop}</a>
    </footer>
  );
}

export default function App() {
  const [language, setLanguage] = useState(initialLanguage);
  const [theme, setTheme] = useState(initialTheme);
  const rootRef = useSiteMotion();
  const copy = content[language];

  useEffect(() => {
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      // Theme persistence is optional.
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = copy.documentTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content", copy.description);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#1E2327" : "#E7ECEF");
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
    setTheme(current => current === "dark" ? "light" : "dark");
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
          <div className="content-shell hero-shell">
            <div className="hero-copy">
              <p className="hero-eyebrow">{copy.hero.eyebrow}</p>
              <h1 className="hero-title">
                <span className="title-line"><span data-hero-line>{copy.hero.lineOne}</span></span>
                <span className="title-line"><span data-hero-line>{copy.hero.lineTwo}</span></span>
              </h1>
              <p className="hero-description">{copy.hero.description}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">{copy.hero.primary}<span aria-hidden="true">↓</span></a>
                <a className="button button-text" href="https://github.com/CaioDGeraldi" target="_blank" rel="noopener noreferrer">{copy.hero.secondary}<ArrowUpRight /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section projects-section" id="projects">
          <div className="content-shell">
            <SectionHeading eyebrow={copy.projects.eyebrow} title={copy.projects.title} description={copy.projects.description} />
            <div className="project-grid">
              {copy.projects.items.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  language={language}
                  viewCase={copy.projects.viewCase}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="content-shell about-layout">
            <div className="about-heading" data-reveal>
              <h2>{copy.about.title}</h2>
            </div>
            <div className="about-reading" data-reveal>
              {copy.about.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              <aside className="about-aside">
                <span>{copy.about.detailTitle}</span>
                <p>{copy.about.detail}</p>
                <a href={`./profile.html?lang=${language}`} className="inline-link">{copy.about.link}<ArrowUpRight /></a>
              </aside>
            </div>
          </div>
        </section>

        <section className="content-section experience-section" id="experience">
          <div className="content-shell">
            <SectionHeading title={copy.experience.title} />
            <ExperienceTimeline items={copy.experience.items} />
          </div>
        </section>

        <section className="content-section skills-section" id="skills">
          <div className="content-shell skills-layout">
            <div className="skills-intro" data-reveal>
              <h2>{copy.skills.title}</h2>
              <p>{copy.skills.learning}</p>
            </div>
            <div className="skills-groups">
              {copy.skills.groups.map(group => (
                <div className="skill-group" key={group.title} data-reveal>
                  <h3>{group.title}</h3>
                  <ul className="skill-list">
                    {group.items.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="content-shell contact-shell">
            <div className="contact-copy" data-reveal>
              <span className="contact-greeting" aria-hidden="true">
                {Array.from(copy.contact.greeting).map((character, index) => (
                  <span key={index}>{character}</span>
                ))}
              </span>
              <span className="sr-only">{copy.contact.greeting}</span>
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
