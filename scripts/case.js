// Shared theme preference for case-study pages, without loading the homepage's Three.js.
(() => {
  "use strict";
  const button = document.getElementById("caseThemeToggle");
  if (!button) return;

  function readPreference() {
    try { return localStorage.getItem("portfolio-theme"); }
    catch { return null; }
  }
  function writePreference(theme) {
    try { localStorage.setItem("portfolio-theme", theme); }
    catch { /* Storage is optional. */ }
  }
  function label() {
    const pt = document.documentElement.lang === "pt-BR";
    const light = document.body.classList.contains("light-mode");
    return light
      ? (pt ? "Usar tema escuro" : "Switch to dark theme")
      : (pt ? "Usar tema claro" : "Switch to light theme");
  }
  function apply(theme) {
    const light = theme === "light";
    document.body.classList.toggle("light-mode", light);
    button.innerHTML = light
      ? '<i class="fa-solid fa-moon" aria-hidden="true"></i>'
      : '<i class="fa-solid fa-sun" aria-hidden="true"></i>';
    button.setAttribute("aria-label", label());
    button.title = label();
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", light ? "#F4F7F9" : "#1E2327");
  }

  apply(readPreference() === "light" ? "light" : "dark");
  button.addEventListener("click", () => {
    const next = document.body.classList.contains("light-mode") ? "dark" : "light";
    writePreference(next);
    apply(next);
  });
  window.addEventListener("portfolio-language-change", () => {
    button.setAttribute("aria-label", label());
    button.title = label();
  });
})();