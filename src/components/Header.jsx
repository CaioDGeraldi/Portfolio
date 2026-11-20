import { useState } from "react";

function ThemeIcon({ theme }) {
  return theme === "dark" ? (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.6" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 15.2A8.4 8.4 0 0 1 8.8 3.6 8.5 8.5 0 1 0 20.4 15.2Z" /></svg>
  );
}

function MenuIcon({ open }) {
  return open ? (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
  );
}

export default function Header({ copy, language, onLanguageToggle, theme, onThemeToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ["#projects", copy.nav.work],
    ["#about", copy.nav.about],
    ["#experience", copy.nav.experience],
    ["#approach", copy.nav.approach],
    ["#contact", copy.nav.contact]
  ];

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="Caio Geraldi — home">
          <span className="brand-mark">C<span>.</span></span>
          <span className="brand-name">Caio Geraldi</span>
        </a>

        <nav id="primary-navigation" className={`primary-nav ${menuOpen ? "is-open" : ""}`} aria-label={copy.navLabel}>
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={closeMenu}>{label}</a>
          ))}
        </nav>

        <div className="header-tools">
          <button className="language-toggle" type="button" onClick={onLanguageToggle} data-language-toggle aria-label={copy.languageLabel}>
            {language === "en" ? "PT" : "EN"}
          </button>
          <button className="icon-button" type="button" onClick={onThemeToggle} data-theme-toggle aria-label={theme === "dark" ? copy.themeToLight : copy.themeToDark} title={theme === "dark" ? copy.themeToLight : copy.themeToDark}>
            <ThemeIcon theme={theme} />
          </button>
          <button className="icon-button menu-toggle" type="button" onClick={() => setMenuOpen(value => !value)} aria-label={menuOpen ? copy.nav.closeMenu : copy.nav.menu} aria-expanded={menuOpen} aria-controls="primary-navigation">
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>
    </header>
  );
}
