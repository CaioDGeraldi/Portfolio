(() => {
  "use strict";
  const toggle = document.querySelector("#profileThemeToggle");
  const printButton = document.querySelector("#printProfile");
  if (!toggle) return;

  function readTheme() {
    try { return localStorage.getItem("portfolio-theme"); }
    catch { return null; }
  }
  function saveTheme(value) {
    try { localStorage.setItem("portfolio-theme", value); }
    catch { /* Theme storage is optional. */ }
  }
  function updateTheme() {
    const isLight = document.body.classList.contains("light-mode");
    const pt = document.documentElement.lang === "pt-BR";
    const label = pt
      ? (isLight ? "Usar tema escuro" : "Usar tema claro")
      : (isLight ? "Switch to dark theme" : "Switch to light theme");
    toggle.setAttribute("aria-label", label);
    toggle.title = label;
    toggle.querySelector("span").textContent = isLight ? "◑" : "◐";
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", isLight ? "#f5f4f0" : "#141619");
  }
  document.body.classList.toggle("light-mode", readTheme() === "light");
  updateTheme();
  toggle.addEventListener("click", () => {
    const isLight = !document.body.classList.contains("light-mode");
    document.body.classList.toggle("light-mode", isLight);
    saveTheme(isLight ? "light" : "dark");
    updateTheme();
  });
  window.addEventListener("portfolio-language-change", updateTheme);
  printButton?.addEventListener("click", () => window.print());
})();