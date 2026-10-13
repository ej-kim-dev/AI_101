/* =========================================================
   Moving through the presentation.

   1. Contents   — numbered list in the bottom dock and on the side
   2. Previous / Next, with keyboard, clicker and swipe support
   3. Present mode — one slide at a time, full screen if allowed
   4. Motion     — slides fade up, lists appear one by one,
                   key phrases get a marker highlight

   main.js calls Presenter.afterRender() each time it redraws
   the slides (for example after switching language).
   ========================================================= */

const Presenter = (() => {
  const root = document.documentElement;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

  const dock = document.getElementById("dock");
  const rail = document.getElementById("rail");
  const menu = document.getElementById("index-menu");
  const menuButton = dock.querySelector(".dock__where");
  const prevButton = dock.querySelector("[data-nav='prev']");
  const nextButton = dock.querySelector("[data-nav='next']");
  const presentButton = dock.querySelector(".dock__present");
  const progressBar = document.querySelector(".progress__bar");
  const status = document.getElementById("status");
  const toast = document.getElementById("toast");

  let current = 0;            // index of the slide we're on
  let presenting = false;     // present mode on/off
  let wentFullscreen = false; // did present mode open full screen?
  let spyPausedUntil = 0;     // ignore scroll tracking while we scroll on purpose
  let firstRender = true;
  const seen = new Set();     // slides that already played their entrance

  const words = () => CONTENT[state.lang].ui.nav;
  const slides = () => SECTION_IDS.map((id) => document.getElementById(id));
  const total = () => SECTION_IDS.length;
  const fill = (text, vars) => text.replace(/\{(\w+)\}/g, (_, key) => vars[key]);
  const two = (n) => String(n).padStart(2, "0");

  // Keep the sticky header's height in a CSS variable, so slides
  // scroll into place just below it.
  const header = document.querySelector(".controls");
  new ResizeObserver(() => root.style.setProperty("--header-h", `${header.offsetHeight}px`)).observe(header);

  /* ---------- 1. Contents ---------- */
  function buildContents() {
    const w = words();
    const items = w.sections.map((name, i) => `
      <li><a href="#${SECTION_IDS[i]}" data-index="${i}">
        <span class="idx__num" aria-hidden="true">${two(i + 1)}</span><span class="idx__label">${esc(name)}</span>
      </a></li>`).join("");
    rail.querySelector("ol").innerHTML = items;
    menu.querySelector("ol").innerHTML = items;

    dock.setAttribute("aria-label", w.label);
    rail.setAttribute("aria-label", w.contents);
    dock.querySelectorAll("[data-n]").forEach((el) => { el.textContent = w[el.dataset.n]; });
    updateNav();
  }

  // Reflect the current slide everywhere: dock, contents, progress bar.
  function updateNav() {
    const w = words();
    dock.querySelector(".dock__count").textContent = `${current + 1} / ${total()}`;
    dock.querySelector(".dock__name").textContent = w.sections[current];
    document.querySelectorAll(".rail a, .index-menu a").forEach((a) => {
      if (Number(a.dataset.index) === current) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
    prevButton.setAttribute("aria-disabled", current === 0);
    nextButton.setAttribute("aria-disabled", current === total() - 1);
    presentButton.querySelector(".dock__present-text").textContent = presenting ? w.exit : w.present;
    presentButton.classList.toggle("is-on", presenting);
    progressBar.style.transform = `scaleX(${(current + 1) / total()})`;
  }

  function openMenu() {
    menu.hidden = false;
    menuButton.setAttribute("aria-expanded", "true");
    (menu.querySelector("[aria-current]") || menu.querySelector("a")).focus();
  }
  function closeMenu(returnFocus) {
    if (menu.hidden) return;
    menu.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
    if (returnFocus) menuButton.focus();
  }

  menuButton.addEventListener("click", () => (menu.hidden ? openMenu() : closeMenu(false)));

  // Clicking a contents link goes to that slide.
  document.addEventListener("click", (e) => {
    const link = e.target.closest(".rail a, .index-menu a");
    if (!link) return;
    e.preventDefault();
    closeMenu(false);
    goTo(Number(link.dataset.index), { focus: true });
  });

  // Close the menu when clicking anywhere else.
  document.addEventListener("pointerdown", (e) => {
    if (!menu.hidden && !e.target.closest(".dock__index")) closeMenu(false);
  });

  /* ---------- 2. Previous / Next ---------- */
  function goTo(index, { focus = false } = {}) {
    index = Math.max(0, Math.min(total() - 1, index));
    const direction = index > current ? 1 : index < current ? -1 : 0;
    current = index;
    const target = slides()[index];

    if (presenting) {
      showOnly(index, direction);
      window.scrollTo(0, 0);
    } else {
      spyPausedUntil = performance.now() + 900;
      target.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
    }
    if (focus) target.focus({ preventScroll: true });

    updateNav();
    const w = words();
    status.textContent = fill(w.announce, { n: index + 1, total: total(), name: w.sections[index] });

    const url = new URL(location.href);
    url.hash = SECTION_IDS[index];
    history.replaceState(null, "", url);
  }

  const next = (opts) => goTo(current + 1, opts);
  const prev = (opts) => goTo(current - 1, opts);

  // aria-disabled (not disabled) keeps the button focusable at the first/last slide.
  prevButton.addEventListener("click", () => { if (current > 0) prev(); });
  nextButton.addEventListener("click", () => { if (current < total() - 1) next(); });

  // Keyboard: ← → move between slides (presentation clickers send PageUp/PageDown).
  document.addEventListener("keydown", (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;

    // Inside the contents menu: ↑ ↓ move between items, Esc closes.
    if (!menu.hidden && e.target.closest(".index-menu")) {
      const links = [...menu.querySelectorAll("a")];
      const i = links.indexOf(document.activeElement);
      if (e.key === "ArrowDown") { e.preventDefault(); links[(i + 1) % links.length].focus(); }
      if (e.key === "ArrowUp") { e.preventDefault(); links[(i - 1 + links.length) % links.length].focus(); }
      if (e.key === "Escape") { e.preventDefault(); closeMenu(true); }
      return;
    }
    if (e.key === "Escape" && !menu.hidden) { closeMenu(true); return; }
    if (e.key === "Escape" && presenting) { exitPresent(); return; }

    // Leave keys alone while the sliders (radio buttons) or text fields have focus.
    if (e.target.closest("input, textarea, select, [contenteditable='true']")) return;

    // Move focus to the new slide, unless the person is using the dock buttons.
    const focus = !e.target.closest(".dock, .rail");
    const key = e.key;

    if (key === "ArrowRight" || (presenting && (key === "PageDown" || key === " "))) {
      if (key === " " && e.target.closest("button, a, summary")) return;
      e.preventDefault(); next({ focus });
    } else if (key === "ArrowLeft" || (presenting && key === "PageUp")) {
      e.preventDefault(); prev({ focus });
    } else if (presenting && key === "Home") {
      e.preventDefault(); goTo(0, { focus });
    } else if (presenting && key === "End") {
      e.preventDefault(); goTo(total() - 1, { focus });
    }
  });

  // Touch: swipe left or right in present mode.
  let touchStart = null;
  document.addEventListener("touchstart", (e) => {
    if (!presenting || e.target.closest(".controls, .dock")) { touchStart = null; return; }
    touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });
  document.addEventListener("touchend", (e) => {
    if (!touchStart) return;
    const dx = e.changedTouches[0].clientX - touchStart.x;
    const dy = e.changedTouches[0].clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) (dx < 0 ? next : prev)();
  }, { passive: true });

  /* ---------- 3. Present mode ---------- */
  function showOnly(index, direction) {
    slides().forEach((slide, i) => { slide.hidden = i !== index; });
    const slide = slides()[index];
    slide.classList.remove("enter-next", "enter-prev", "is-visible", "no-anim");
    void slide.offsetWidth; // restart the animations
    if (direction && !reduceMotion.matches) slide.classList.add(direction > 0 ? "enter-next" : "enter-prev");
    slide.classList.add("is-visible");
    seen.add(slide.id);
  }

  function enterPresent() {
    presenting = true;
    root.classList.add("is-presenting");
    showOnly(current, 0);
    window.scrollTo(0, 0);
    updateNav();
    status.textContent = words().presentOn;
    showToast(words().hint);
    // Full screen is a bonus: if the browser says no, present mode still works.
    root.requestFullscreen?.().then(() => { wentFullscreen = true; }).catch(() => {});
  }

  function exitPresent() {
    presenting = false;
    root.classList.remove("is-presenting");
    slides().forEach((slide) => { slide.hidden = false; slide.classList.remove("enter-next", "enter-prev"); });
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    wentFullscreen = false;
    spyPausedUntil = performance.now() + 300;
    slides()[current].scrollIntoView({ block: "start" });
    updateNav();
    status.textContent = words().presentOff;
  }

  presentButton.addEventListener("click", () => (presenting ? exitPresent() : enterPresent()));

  // Leaving full screen (for example with the browser's Esc) also leaves present mode.
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement && presenting && wentFullscreen) exitPresent();
  });

  let toastTimer;
  function showToast(text) {
    toast.textContent = text;
    toast.classList.add("is-shown");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-shown"), 3200);
  }

  /* ---------- 4. Motion and scroll tracking ---------- */

  // Slides fade up the first time they scroll into view.
  const revealer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      seen.add(entry.target.id);
      revealer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -12% 0px" });

  // While scrolling, work out which slide is in the middle of the screen.
  const spy = new IntersectionObserver((entries) => {
    if (presenting || performance.now() < spyPausedUntil) return;
    entries.forEach((entry) => {
      if (entry.isIntersecting) { current = SECTION_IDS.indexOf(entry.target.id); updateNav(); }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  // The last slide is short and may never reach the middle: count the bottom of the page as the last slide.
  addEventListener("scroll", () => {
    if (presenting || performance.now() < spyPausedUntil) return;
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4 && current !== total() - 1) {
      current = total() - 1; updateNav();
    }
  }, { passive: true });

  function afterRender() {
    // The old slides were replaced, so stop watching them.
    revealer.disconnect();
    spy.disconnect();

    // Number the items in each list so they can appear one after another.
    document.querySelectorAll(".stagger").forEach((list) =>
      [...list.children].forEach((item, i) => item.style.setProperty("--i", i)));

    slides().forEach((slide) => {
      if (seen.has(slide.id)) {
        // Already seen (e.g. after a language switch): show it straight away, no replay.
        slide.classList.add("is-visible", "no-anim");
        requestAnimationFrame(() => requestAnimationFrame(() => slide.classList.remove("no-anim")));
      } else {
        revealer.observe(slide);
      }
      spy.observe(slide);
    });

    buildContents();
    toast.classList.remove("is-shown");   // its text was in the old language

    if (firstRender) {
      firstRender = false;
      // Open at the slide named in the link, e.g. index.html#example
      const fromHash = SECTION_IDS.indexOf(location.hash.slice(1));
      if (fromHash > 0) {
        current = fromHash;
        spyPausedUntil = performance.now() + 600;
        slides()[fromHash].scrollIntoView({ block: "start" });
        updateNav();
      }
    } else if (presenting) {
      showOnly(current, 0);
    }
  }

  return { afterRender };
})();
