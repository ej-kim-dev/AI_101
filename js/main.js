/* =========================================================
   Draws the presentation from CONTENT (js/content.js).

   1. State      — which version and language are selected
   2. Helpers    — pick the right variant, escape text
   3. Drawings   — small line icons (inline SVG)
   4. Sections   — one function per part of the presentation
   5. Controls   — the two sliders

   The section menu, scroll tracking and scroll animations
   live in js/nav.js.
   ========================================================= */

/* ---------- 1. Settings and state ---------- */

// The Company version is switched off for now: everyone sees School.
// Change this to true to bring back the School ↔ Company switch.
// (All the Company text is still in js/content.js.)
const SHOW_COMPANY = false;

// Defaults: School + English. A link like ?lang=ko opens the Korean
// version (and ?view=company the Company one, when it's switched on).
const params = new URLSearchParams(location.search);
const state = {
  view: SHOW_COMPANY && params.get("view") === "company" ? "company" : "school",
  lang: params.get("lang") === "ko" ? "ko" : "en",
};

// Hide the Comparison switch while the Company version is off.
document.getElementById("view-school").closest(".toggle").hidden = !SHOW_COMPANY;

/* ---------- 2. Helpers ---------- */

// A value may be { school, company } — return the one for the current view.
const pick = (value) =>
  value && typeof value === "object" && "school" in value ? value[state.view] : value;

// Make text safe to put inside HTML.
const esc = (text) =>
  String(text).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Like esc, but ==key phrases== become highlighted <strong> text.
const rich = (text) => esc(text).replace(/==(.+?)==/g, '<strong class="hl">$1</strong>');

// The order of the sections. nav.js uses the same list.
const SECTION_IDS = ["opening", "concepts", "distinction", "guide", "example", "context", "takeaway", "more"];

// Large, faint slide number ("01", "02", …) in the corner of each slide.
const slideNum = (id) =>
  `<span class="slide__num" aria-hidden="true">${String(SECTION_IDS.indexOf(id) + 1).padStart(2, "0")}</span>`;

/* ---------- 3. Drawings ----------
   48×48 line icons. They use currentColor, so they follow the theme.
   They are decorative (aria-hidden): the text beside them says the same thing. */
const ICONS = {
  teacher: '<circle cx="17" cy="15" r="6"/><path d="M6 42v-6a11 11 0 0 1 22 0v6"/><rect x="30" y="7" width="14" height="11" rx="1.5"/><path d="M26 27l7-9"/>',
  employee: '<circle cx="24" cy="13" r="6.5"/><path d="M11 43v-7a13 13 0 0 1 26 0v7"/><path d="M24 25l-2.5 4 2.5 9 2.5-9z"/>',
  chat: '<path d="M8 8h21a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H17l-6 5v-5H8a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3z"/><path d="M36 17h4a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2v5l-6-5h-9a3 3 0 0 1-3-3v-1"/>',
  classroom: '<rect x="8" y="6" width="32" height="19" rx="2"/><path d="M14 12h12M14 18h8"/><path d="M8 33h12M28 33h12M11 33v8M17 33v8M31 33v8M37 33v8"/>',
  workspace: '<path d="M4 34h40M9 34v8M39 34v8"/><rect x="7" y="17" width="15" height="11" rx="1.5"/><rect x="26" y="17" width="15" height="11" rx="1.5"/><path d="M14.5 28v6M33.5 28v6"/>',
  books: '<rect x="7" y="9" width="8" height="31" rx="1"/><rect x="17" y="13" width="8" height="27" rx="1"/><path d="M28 14l7-2 7 26-7 2z"/><path d="M7 15h8M17 19h8"/>',
  documents: '<path d="M14 6h14l8 8v24a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/><path d="M28 6v8h8"/><path d="M17 22h14M17 27h14M17 32h9"/><path d="M8 12v28a4 4 0 0 0 4 4h20"/>',
  bookshelf: '<rect x="6" y="5" width="36" height="38" rx="2"/><path d="M6 24h36"/><path d="M11 9v15M15.5 11v13M20 9v15M26 12l4.5 12"/><path d="M11 28v15M16 30v13M21 28v15M33 30v13"/>',
  cabinet: '<rect x="10" y="4" width="28" height="40" rx="2"/><path d="M10 17.5h28M10 30.5h28"/><path d="M21 11h6M21 24h6M21 37h6"/>',
  board: '<rect x="5" y="6" width="38" height="27" rx="2"/><path d="M11 13l2 2 3-3M19 14h17M11 20l2 2 3-3M19 21h13M11 27l2 2 3-3M19 28h9"/><path d="M15 33l-4 9M33 33l4 9"/>',
  guidelines: '<rect x="10" y="8" width="28" height="35" rx="2"/><rect x="18" y="4" width="12" height="7" rx="1.5"/><path d="M15 20l2 2 4-4M25 20h8M15 29l2 2 4-4M25 29h8M15 37h18"/>',
  apps: '<rect x="6" y="6" width="16" height="16" rx="4"/><rect x="26" y="6" width="16" height="16" rx="4"/><rect x="6" y="26" width="16" height="16" rx="4"/><path d="M31 26v5M37 26v5M28 31h12v2a6 6 0 0 1-12 0z M34 39v5"/>',
  outside: '<path d="M5 43V7h17v36"/><path d="M18 26h.01"/><circle cx="34" cy="12" r="4"/><path d="M34 16v12l-5 13M34 28l5 13M28 22h12"/>',
  briefcase: '<rect x="6" y="15" width="36" height="26" rx="3"/><path d="M18 15v-4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4M6 26h36M22 26v4h4v-4"/>',
};

const icon = (name, cls = "icon") =>
  `<svg class="${cls}" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[pick(name)] || ""}</svg>`;

// Section wrapper: every part of the presentation is a card with a heading.
const section = (id, eyebrow, title, inner, extraClass = "") => `
  <section class="slide ${extraClass}" id="${id}" aria-labelledby="${id}-title" tabindex="-1">
    ${slideNum(id)}
    <p class="eyebrow">${esc(eyebrow)}</p>
    ${title ? `<h2 class="slide__title" id="${id}-title">${esc(title)}</h2>` : ""}
    ${inner}
  </section>`;

/* ---------- 4. Sections ---------- */

// 1. Opening
function opening(c) {
  return `
  <section class="slide slide--hero" id="opening" aria-labelledby="opening-title" tabindex="-1">
    ${slideNum("opening")}
    <p class="eyebrow">${esc(c.eyebrow)}</p>
    <h1 class="hero__title" id="opening-title">${esc(c.title)}</h1>
    <p class="lead">${rich(c.body)}</p>
    <div class="metaphor">
      ${icon(c.icon, "icon icon--xl")}
      <div>
        <p class="metaphor__text">${esc(pick(c.metaphor))}</p>
        <p class="metaphor__note">${esc(c.metaphorNote)}</p>
      </div>
    </div>
    <p class="tool-note">${esc(c.toolNote)}</p>
  </section>`;
}

// 2. Main concepts — a numbered sequence of cards
function concepts(c) {
  const cards = c.items.map((item, i) => `
    <li class="card">
      <div class="card__top">
        ${icon(item.icon)}
        <span class="card__num" aria-hidden="true">${i + 1}</span>
      </div>
      <h3 class="card__title">
        <span class="card__term">${esc(item.term)}<span class="sr-only">:</span></span>
        ${esc(pick(item.title))}
      </h3>
      <p class="card__body">${rich(pick(item.body))}</p>
      ${item.note ? `<p class="card__note">${rich(item.note)}</p>` : ""}
    </li>`).join("");
  return section("concepts", c.eyebrow, c.title, `<ol class="cards stagger">${cards}</ol>`);
}

// 3. Chat vs. project — a small diagram made of HTML (so the text translates)
function distinction(c) {
  const shared = pick(c.sharedItems).map((s) => `
    <li class="diagram__item">${icon(s.icon)}<span><strong>${esc(s.label)}</strong><small>${esc(s.sub)}</small></span></li>`).join("");
  const chats = pick(c.chats).map((ch) => `
    <li class="chatcard ${ch.current ? "is-current" : ""}">
      ${icon(c.person)}
      <span>
        ${ch.current ? `<span class="tag">${esc(c.currentTag)}</span>` : ""}
        <strong>${esc(ch.label)}</strong>
        <small>${esc(ch.sub)}</small>
      </span>
    </li>`).join("");

  return section("distinction", c.eyebrow, c.title, `
    <figure class="diagram">
      <div class="diagram__shared">
        <p class="diagram__heading">${esc(pick(c.sharedTitle))}</p>
        <ul class="diagram__list stagger">${shared}</ul>
      </div>
      <p class="diagram__flow"><span class="diagram__arrow" aria-hidden="true"></span>${esc(c.flow)}</p>
      <div class="diagram__chats">
        <p class="diagram__heading">${esc(c.chatsTitle)}</p>
        <ul class="diagram__list stagger">${chats}</ul>
      </div>
      <figcaption class="diagram__caption">${rich(c.caption)}</figcaption>
    </figure>
    <p class="note">${esc(c.note)}</p>`);
}

// 4. "What should I use?" guide
function guide(c) {
  const options = c.options.map((o) => `
    <li class="option">
      ${icon(o.icon)}
      <h3 class="option__name">${esc(o.name)}</h3>
      <p class="option__when"><span class="label">${esc(c.useWhen)}</span>${esc(o.when)}</p>
      <p class="option__like"><span class="label">${esc(c.likeLabel)}</span>${esc(pick(o.like))}</p>
    </li>`).join("");
  return section("guide", c.eyebrow, c.title, `
    <ul class="options stagger">${options}</ul>
    <p class="note note--plain">${rich(c.together)}</p>`);
}

// One highlighted ingredient. The number badge is kept on the same line
// as the first word, so it never ends up alone at the end of a line.
function ingredient(part, c) {
  const space = part.text.indexOf(" ");
  const first = space === -1 ? part.text : part.text.slice(0, space);
  const rest = space === -1 ? "" : part.text.slice(space);
  const hint = `(${c.ingredientWord} ${part.n}: ${c.ingredients[part.n - 1].name})`;
  return `<mark class="ing"><span class="ing__lead"><span class="ing__badge" aria-hidden="true">${part.n}</span><span class="sr-only">${esc(hint)}</span>${esc(first)}</span>${esc(rest)}</mark>`;
}

// 5. Practical example — before/after, numbered ingredients, tiny sample slide
function example(c) {
  const clear = c.clear.map((part) =>
    typeof part === "string"
      ? esc(part)
      : ingredient(part, c)
  ).join("");

  const list = c.ingredients.map((g, i) => `
    <li><span class="ing__badge" aria-hidden="true">${i + 1}</span><span><strong>${esc(g.name)}</strong> — ${esc(g.detail)}</span></li>`).join("");

  const bullets = c.slideBullets.map((b) => `<li>${esc(b)}</li>`).join("");

  // Two columns on large screens, so the whole example fits on one screen.
  return section("example", c.eyebrow, c.title, `
    <div class="example-grid">
      <div class="compare">
        <div class="request request--vague">
          <p class="request__label"><span class="request__mark" aria-hidden="true">✕</span>${esc(c.vagueLabel)}</p>
          <p class="request__text">“${esc(c.vague)}”</p>
        </div>
        <div class="request request--clear">
          <p class="request__label"><span class="request__mark" aria-hidden="true">✓</span>${esc(c.clearLabel)}</p>
          <p class="request__text">${clear}</p>
        </div>
      </div>

      <div class="example-side">
        <h3 class="subhead">${esc(c.ingredientsTitle)}</h3>
        <ol class="ingredients stagger">${list}</ol>

        <div class="sample">
          <div class="sample__text">
            <p class="sample__metaphor">${esc(pick(c.sampleMetaphor))}</p>
            <p class="sample__why">${esc(c.sampleWhy)}</p>
          </div>
          <figure class="slidemock" aria-label="${esc(c.slideLabel)}">
            <span class="slidemock__tag">${esc(c.slideTag)}</span>
            <div class="slidemock__page">
              <p class="slidemock__title">${esc(c.slideTitle)}</p>
              <ul class="slidemock__bullets">${bullets}</ul>
            </div>
            <figcaption class="slidemock__caption">${esc(c.slideCaption)}</figcaption>
          </figure>
        </div>
      </div>
    </div>`);
}

// 6. Choose useful context
function context(c) {
  const checks = c.checks.map((x) => `<li><span aria-hidden="true">✓</span>${esc(x)}</li>`).join("");
  return section("context", c.eyebrow, c.title, `
    <p class="lead lead--left">${rich(c.body)}</p>
    <ul class="checks stagger">${checks}</ul>
    <div class="metaphor metaphor--small">
      ${icon(c.icon, "icon icon--lg")}
      <p class="metaphor__text">${esc(pick(c.metaphor))}</p>
    </div>`);
}

// 7. Main takeaway
function takeaway(c) {
  const steps = c.steps.map((s, i) => `
    <li class="flow__step"><span class="flow__num" aria-hidden="true">${i + 1}</span><span class="flow__text">${esc(s)}</span>${i < c.steps.length - 1 ? '<span class="flow__arrow" aria-hidden="true">→</span>' : ""}</li>`).join("");
  return `
  <section class="slide slide--takeaway" id="takeaway" aria-labelledby="takeaway-title" tabindex="-1">
    ${slideNum("takeaway")}
    <p class="eyebrow">${esc(c.eyebrow)}</p>
    <h2 class="sr-only" id="takeaway-title">${esc(c.eyebrow)}</h2>
    <ol class="flow stagger">${steps}</ol>
    <p class="lead lead--left">${rich(c.body)}</p>
    <div class="examples">
      <div class="example-box"><p class="label">${esc(c.followLabel)}</p><p>${esc(c.follow)}</p></div>
      <div class="example-box"><p class="label">${esc(c.reviewLabel)}</p><p>${esc(c.review)}</p></div>
    </div>
  </section>`;
}

// 8. Learn more — native <details>, so it works with keyboard and screen readers
function more(c, wasOpen) {
  const notes = c.notes.map((n) => `<li>${esc(n)}</li>`).join("");
  const sources = c.sources.map((s) => `
    <li>
      <a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" lang="en">${esc(s.title)}<span class="sr-only"> ${esc(c.newTab)}</span><span aria-hidden="true"> ↗</span></a>
      <span class="source__why">${esc(s.why)}</span>
    </li>`).join("");
  return `
  <section class="slide slide--more" id="more" aria-label="${esc(c.summary)}" tabindex="-1">
    <details class="more" ${wasOpen ? "open" : ""}>
      <summary><span class="more__title">${esc(c.summary)}</span><span class="more__hint">${esc(c.hint)}</span><span class="more__chev" aria-hidden="true"></span></summary>
      <div class="more__body">
        <h3 class="subhead">${esc(c.notesTitle)}</h3>
        <ul class="notes">${notes}</ul>
        <h3 class="subhead">${esc(c.sourcesTitle)}</h3>
        <p class="sources__intro">${esc(c.sourcesIntro)}</p>
        <ul class="sources">${sources}</ul>
      </div>
    </details>
  </section>`;
}

/* ---------- Draw everything ---------- */
const app = document.getElementById("app");

function render({ announce = false } = {}) {
  const c = CONTENT[state.lang];

  // Page-level settings
  document.documentElement.lang = state.lang;
  document.documentElement.dataset.view = state.view;
  document.title = c.ui.docTitle;
  document.querySelectorAll("[data-t]").forEach((el) => { el.textContent = c.ui[el.dataset.t]; });

  // Keep "Learn more" open if it was open before the switch
  const wasOpen = app.querySelector("details.more")?.open ?? false;

  app.innerHTML =
    opening(c.opening) +
    concepts(c.concepts) +
    distinction(c.distinction) +
    guide(c.guide) +
    example(c.example) +
    context(c.context) +
    takeaway(c.takeaway) +
    more(c.more, wasOpen);

  syncControls();
  Nav.afterRender();   // rebuild the section menu and scroll animations (js/nav.js)
  if (announce) document.getElementById("status").textContent = c.ui.status[state.view];
}

/* ---------- 5. Controls ---------- */
function syncControls() {
  document.querySelectorAll(".toggle").forEach((group) => {
    const inputs = [...group.querySelectorAll("input")];
    inputs.forEach((input) => { input.checked = state[input.name] === input.value; });
    // data-pos moves the sliding thumb (0 = left, 1 = right)
    group.querySelector(".toggle__track").dataset.pos = inputs.findIndex((i) => i.checked);
  });
}

document.querySelectorAll(".toggle input").forEach((input) => {
  input.addEventListener("change", () => {
    state[input.name] = input.value;   // only this setting changes; the other is kept
    const url = new URL(location.href);
    if (SHOW_COMPANY) url.searchParams.set("view", state.view);
    else url.searchParams.delete("view");
    url.searchParams.set("lang", state.lang);
    history.replaceState(null, "", url);
    render({ announce: true });
  });
});

render();
