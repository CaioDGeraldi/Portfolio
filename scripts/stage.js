/* Static first: each scene is a normal section when JavaScript is unavailable.
   Enhanced: an in-place stage with native View Transitions, focus restoration,
   history, wheel/keyboard controls and reduced-motion support. */
(() => {
  "use strict";
  const scenes = Array.from(document.querySelectorAll("[data-scene]"));
  const sceneIds = scenes.map(node => node.id);
  if (!scenes.length || sceneIds.length !== new Set(sceneIds).size) return;

  const root = document.documentElement;
  const links = Array.from(document.querySelectorAll("[data-scene-link]"));
  const prev = document.querySelector("#prevScene");
  const next = document.querySelector("#nextScene");
  const cue = document.querySelector("#scrollCue");
  const counter = document.querySelector("#sceneNumber");
  const status = document.querySelector("#sceneStatus");
  const theme = document.querySelector("#themeToggle");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const safeLanguage = () => root.lang === "pt-BR" ? "pt-BR" : "en";
  const readTheme = () => {
    try { return localStorage.getItem("portfolio-theme"); }
    catch { return null; }
  };
  const persistTheme = value => {
    try { localStorage.setItem("portfolio-theme", value); }
    catch { /* Preference is optional. */ }
  };

  function updateThemeButton() {
    const dark = !document.body.classList.contains("light-mode");
    const label = safeLanguage() === "pt-BR"
      ? (dark ? "Usar tema claro" : "Usar tema escuro")
      : (dark ? "Switch to light theme" : "Switch to dark theme");
    theme.setAttribute("aria-label", label);
    theme.title = label;
    theme.querySelector("span").textContent = dark ? "◐" : "◑";
  }
  function setTheme(value) {
    document.body.classList.toggle("light-mode", value === "light");
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", value === "light" ? "#F5F4F0" : "#141619");
    updateThemeButton();
  }
  setTheme(readTheme() === "light" ? "light" : "dark");
  theme.addEventListener("click", () => {
    const value = document.body.classList.contains("light-mode") ? "dark" : "light";
    persistTheme(value);
    setTheme(value);
  });

  function stageFromHash() {
    const id = decodeURIComponent(window.location.hash.slice(1));
    return sceneIds.includes(id) ? id : sceneIds[0];
  }
  let current = stageFromHash();
  let moving = false;
  let pendingHistoryScene = null;
  let pendingUserScene = null;
  let lastWheelAt = 0;

  function announce() {
    const position = sceneIds.indexOf(current) + 1;
    const padded = String(position).padStart(2, "0");
    counter.textContent = padded;
    status.textContent = safeLanguage() === "pt-BR"
      ? "Cena " + padded + " de 05"
      : "Scene " + padded + " of 05";
    for (const link of links) {
      const active = link.getAttribute("href") === "#" + current;
      if (active) link.setAttribute("aria-current", "step");
      else link.removeAttribute("aria-current");
    }
    prev.disabled = position === 1;
    next.disabled = position === scenes.length;
    if (cue) {
      cue.hidden = position === scenes.length;
      // The visible cue text is the accessible name in both languages.
    }
  }

  function swapStage(id) {
    current = id;
    for (const scene of scenes) {
      const active = scene.id === id;
      scene.hidden = !active;
      if (active) scene.scrollTop = 0;
    }
    announce();
  }

  function focusHeading() {
    const heading = document.querySelector("#" + current + " h1, #" + current + " h2");
    if (!heading) return;
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }

  function navigate(id, { updateHistory = true, moveFocus = true } = {}) {
    if (!sceneIds.includes(id) || id === current) return;
    if (moving) {
      pendingUserScene = { id, updateHistory, moveFocus };
      return;
    }
    moving = true;
    const change = () => swapStage(id);

    if (!reducedMotion.matches && typeof document.startViewTransition === "function") {
      const transition = document.startViewTransition(change);
      transition.updateCallbackDone.then(() => {
        if (updateHistory) history.pushState({ scene: id }, "", "#" + id);
      }).catch(() => {});
      function finishTransition() {
        if (moveFocus) focusHeading();
        moving = false;
        if (pendingHistoryScene) {
          const target = pendingHistoryScene;
          pendingHistoryScene = null;
          pendingUserScene = null;
          navigate(target, { updateHistory: false });
        } else if (pendingUserScene) {
          const nextChange = pendingUserScene;
          pendingUserScene = null;
          navigate(nextChange.id, { updateHistory: nextChange.updateHistory, moveFocus: nextChange.moveFocus });
        }
      }
      transition.finished.then(finishTransition, finishTransition);
    } else {
      change();
      if (updateHistory) history.pushState({ scene: id }, "", "#" + id);
      if (moveFocus) focusHeading();
      moving = false;
    }
  }

  // Ensure only one scene is exposed to assistive technology in enhanced mode.
  root.classList.add("stage-mode");
  swapStage(current);

  for (const link of links) {
    link.addEventListener("click", event => {
      const target = link.getAttribute("href").slice(1);
      if (!sceneIds.includes(target)) return;
      event.preventDefault();
      navigate(target);
    });
  }

  prev.addEventListener("click", () => {
    const previous = sceneIds[sceneIds.indexOf(current) - 1];
    if (previous) navigate(previous);
  });
  next.addEventListener("click", () => {
    const following = sceneIds[sceneIds.indexOf(current) + 1];
    if (following) navigate(following);
  });
  cue?.addEventListener("click", () => {
    const following = sceneIds[sceneIds.indexOf(current) + 1];
    if (following) navigate(following);
  });

  function syncFromAddress() {
    const target = stageFromHash();
    if (moving) {
      pendingHistoryScene = target;
      return;
    }
    navigate(target, { updateHistory: false });
  }
  window.addEventListener("popstate", syncFromAddress);
  window.addEventListener("hashchange", syncFromAddress);
  window.addEventListener("portfolio-language-change", () => { announce(); updateThemeButton(); });

  function sceneCanScroll(delta) {
    const stage = document.querySelector("#" + current);
    if (!stage) return false;
    const max = stage.scrollHeight - stage.clientHeight;
    if (max < 2) return false;
    if (delta > 0) return stage.scrollTop < max - 2;
    return stage.scrollTop > 2;
  }
  function moveBy(direction) {
    const target = sceneIds[sceneIds.indexOf(current) + direction];
    if (target) navigate(target, { moveFocus: true });
  }

  // An intentional wheel gesture changes the scene, without moving the stage.
  window.addEventListener("wheel", event => {
    if (!root.classList.contains("stage-mode") || event.ctrlKey || moving) return;
    const magnitude = Math.abs(event.deltaY);
    if (magnitude < 20 || Math.abs(event.deltaX) > magnitude) return;
    const direction = Math.sign(event.deltaY);
    if (sceneCanScroll(direction)) return;
    const now = performance.now();
    if (now - lastWheelAt < 700) return;
    lastWheelAt = now;
    moveBy(direction);
  }, { passive: true });

  // Touchscreens preserve normal scrolling inside long scenes. At the top/bottom,
  // a deliberate vertical swipe switches to the adjacent scene.
  const stageWindow = document.querySelector("#stageWindow");
  let touchStart = null;
  stageWindow?.addEventListener("touchstart", event => {
    if (event.touches.length !== 1 || event.target.closest("a, button, input, select, textarea")) {
      touchStart = null;
      return;
    }
    const point = event.touches[0];
    touchStart = { x: point.clientX, y: point.clientY };
  }, { passive: true });
  stageWindow?.addEventListener("touchend", event => {
    if (!touchStart || moving || event.changedTouches.length !== 1) return;
    const point = event.changedTouches[0];
    const dx = point.clientX - touchStart.x;
    const dy = point.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dy) < 70 || Math.abs(dy) < Math.abs(dx) * 1.3) return;
    const direction = dy < 0 ? 1 : -1;
    if (sceneCanScroll(direction)) return;
    moveBy(direction);
  }, { passive: true });
  stageWindow?.addEventListener("touchcancel", () => { touchStart = null; });

  document.addEventListener("keydown", event => {
    if (event.repeat || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const element = event.target;
    if (element?.closest("input, textarea, select, [contenteditable='true']")) return;
    let direction = 0;
    if (["ArrowRight", "PageDown"].includes(event.key)) direction = 1;
    if (["ArrowLeft", "PageUp"].includes(event.key)) direction = -1;
    if (!direction) return;
    if ((event.key === "PageDown" || event.key === "PageUp") && sceneCanScroll(direction)) return;
    const target = sceneIds[sceneIds.indexOf(current) + direction];
    if (!target) return;
    event.preventDefault();
    navigate(target);
  });
})();