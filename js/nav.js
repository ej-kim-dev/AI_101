/* =========================================================
   Scrolling and the section menu.

   1. Section menu  — links under the sliders (a dropdown on phones)
   2. Scroll tracking — highlights the section you're reading
   3. Header        — on phones it slides away while you scroll down
   4. Motion        — sections rise in, lists appear one by one,
                      key phrases get a marker highlight

   main.js calls Nav.afterRender() each time it redraws the page
   (for example after switching language).
   ========================================================= */

const Nav = (() => {
  const root = document.documentElement;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

  const header = document.querySelector(".controls");
  const nav = document.getElementById("sectionnav");
  const list = nav.querySelector(".sectionnav__list");
  const indicator = nav.querySelector(".sectionnav__indicator");
  const menuButton = nav.querySelector(".sectionnav__button");
  const menu = document.getElementById("section-menu");
  const status = document.getElementById("status");

  let current = 0;          // index of the section being read
  let pauseSpyUntil = 0;    // ignore scroll tracking while we scroll on purpose
  let firstRender = true;
  const seen = new Set();   // sections that already played their entrance

  const words = () => CONTENT[state.lang].ui.nav;
  const sections = () => SECTION_IDS.map((id) => document.getElementById(id));
  const two = (n) => String(n).padStart(2, "0");

  // Keep the header's height in a CSS variable: sections use it to fill
  // exactly one screen, and to stop just below the header when you jump to them.
  new ResizeObserver(() => root.style.setProperty("--header-h", `${header.offsetHeight}px`)).observe(header);

  /* ---------- 1. Section menu ---------- */
  function buildMenu() {
    const w = words();
    const items = w.sections.map((name, i) => `
      <li><a href="#${SECTION_IDS[i]}" data-index="${i}">
        <span class="idx__num" aria-hidden="true">${two(i + 1)}</span><span class="idx__label">${esc(name)}</span>
      </a></li>`).join("");
    list.innerHTML = items;
    menu.querySelector("ol").innerHTML = items;
    nav.setAttribute("aria-label", w.label);
    nav.querySelectorAll("[data-n]").forEach((el) => { el.textContent = w[el.dataset.n]; });
    update();
  }

  // Show which section is current: link style, sliding underline, phone button.
  function update() {
    nav.querySelectorAll("a[data-index]").forEach((a) => {
      if (Number(a.dataset.index) === current) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });

    const active = list.querySelector("[aria-current]");
    if (active && list.offsetParent) {
      // Move the underline under the active link (like a sliding tab indicator).
      indicator.style.width = `${active.offsetWidth}px`;
      indicator.style.transform = `translateX(${active.offsetLeft - list.scrollLeft}px)`;
      // Keep the active link visible if the list is scrolled sideways.
      const left = active.offsetLeft, right = left + active.offsetWidth;
      if (left < list.scrollLeft || right > list.scrollLeft + list.clientWidth) {
        list.scrollTo({ left: left - 24, behavior: reduceMotion.matches ? "auto" : "smooth" });
      }
    }

    menuButton.querySelector(".sectionnav__count").textContent = two(current + 1);
    menuButton.querySelector(".sectionnav__name").textContent = words().sections[current];
  }
  list.addEventListener("scroll", () => update(), { passive: true });
  addEventListener("resize", () => update());

  // Jump to a section with a smooth scroll.
  function goTo(index) {
    const target = sections()[index];
    current = index;
    pauseSpyUntil = performance.now() + 1000;
    showHeader();
    target.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
    target.focus({ preventScroll: true });   // screen readers continue reading from here
    update();
    const w = words();
    status.textContent = w.announce
      .replace("{n}", index + 1).replace("{total}", SECTION_IDS.length).replace("{name}", w.sections[index]);
    const url = new URL(location.href);
    url.hash = SECTION_IDS[index];
    history.replaceState(null, "", url);
  }

  document.addEventListener("click", (e) => {
    // Section menu, the icon row in the opening, and the "AI-101" name all use data-index.
    const link = e.target.closest("a[data-index]");
    if (!link) return;
    e.preventDefault();
    closeMenu(false);
    goTo(Number(link.dataset.index));
  });

  // Phone dropdown
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
  document.addEventListener("pointerdown", (e) => {
    if (!menu.hidden && !e.target.closest(".sectionnav__compact")) closeMenu(false);
  });
  menu.addEventListener("keydown", (e) => {
    const links = [...menu.querySelectorAll("a")];
    const i = links.indexOf(document.activeElement);
    if (e.key === "ArrowDown") { e.preventDefault(); links[(i + 1) % links.length].focus(); }
    if (e.key === "ArrowUp") { e.preventDefault(); links[(i - 1 + links.length) % links.length].focus(); }
    if (e.key === "Escape") { e.preventDefault(); closeMenu(true); }
  });

  /* ---------- 2. Scroll tracking ---------- */

  // The last section is short and may never reach the middle of the screen,
  // so the bottom of the page always counts as the last section.
  const atBottom = () => innerHeight + scrollY >= root.scrollHeight - 4;

  // A section counts as "current" when it crosses the middle of the screen.
  const spy = new IntersectionObserver((entries) => {
    if (performance.now() < pauseSpyUntil) return;
    entries.forEach((entry) => {
      if (entry.isIntersecting) { current = SECTION_IDS.indexOf(entry.target.id); }
    });
    if (atBottom()) current = SECTION_IDS.length - 1;
    update();
  }, { rootMargin: "-45% 0px -50% 0px" });

  /* ---------- 3. Header on phones ---------- */
  // On small screens the header hides while scrolling down and returns when
  // scrolling up, so the content gets the whole screen.
  const small = matchMedia("(max-width: 700px)");
  let lastY = scrollY;
  function showHeader() { header.classList.remove("is-tucked"); }

  addEventListener("scroll", () => {
    const y = scrollY;
    if (small.matches && !header.contains(document.activeElement) && menu.hidden) {
      if (y > lastY + 6 && y > 200) header.classList.add("is-tucked");
      else if (y < lastY - 6) showHeader();
    } else {
      showHeader();
    }
    lastY = y;

    if (performance.now() >= pauseSpyUntil && atBottom() && current !== SECTION_IDS.length - 1) {
      current = SECTION_IDS.length - 1; update();
    }
  }, { passive: true });
  header.addEventListener("focusin", showHeader);

  /* ---------- 4. Motion ---------- */

  // Sections rise in the first time they scroll into view.
  const revealer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      seen.add(entry.target.id);
      revealer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -15% 0px" });

  function afterRender() {
    // The old sections were replaced, so stop watching them.
    revealer.disconnect();
    spy.disconnect();

    // Number the items in each list so they can appear one after another.
    document.querySelectorAll(".stagger").forEach((group) =>
      [...group.children].forEach((item, i) => item.style.setProperty("--i", i)));

    sections().forEach((section) => {
      if (seen.has(section.id)) {
        // Already seen (e.g. after a language switch): show it straight away, no replay.
        section.classList.add("is-visible", "no-anim");
        requestAnimationFrame(() => requestAnimationFrame(() => section.classList.remove("no-anim")));
      } else {
        revealer.observe(section);
      }
      spy.observe(section);
    });

    buildMenu();

    if (firstRender) {
      firstRender = false;
      // Open at the section named in the link, e.g. index.html#example
      const fromHash = SECTION_IDS.indexOf(location.hash.slice(1));
      if (fromHash > 0) {
        current = fromHash;
        pauseSpyUntil = performance.now() + 600;
        sections()[fromHash].scrollIntoView({ block: "start" });
        update();
      }
    }
  }

  return { afterRender };
})();
